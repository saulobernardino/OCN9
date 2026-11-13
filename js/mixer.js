(function () {
  'use strict';

  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  const manifest = window.OCN9_MIX_TRACKS;

  window.createOCN9Mixer = function (dialog, t, clock, setIcons) {
    if (!AudioEngine || !manifest || !dialog || !dialog.showModal) return null;

    const title = dialog.querySelector('#mixTitle');
    const list = dialog.querySelector('[data-mix-tracks]');
    const play = dialog.querySelector('[data-mix-play]');
    const playLabel = dialog.querySelector('[data-mix-play-label]');
    const seek = dialog.querySelector('[data-mix-seek]');
    const time = dialog.querySelector('[data-mix-time]');
    const duration = dialog.querySelector('[data-mix-duration]');
    const feedback = dialog.querySelector('[data-mix-feedback]');
    const status = dialog.querySelector('[data-mix-status]');
    const retry = dialog.querySelector('[data-mix-retry]');
    let current = null;

    function render() {
      if (!current) return;
      const { channels, loaded, length, loading, error, sources, starting, context } = current;
      const playing = sources.length > 0 && context.state === 'running';
      play.disabled = !length || starting;
      seek.disabled = !length;
      playLabel.textContent = t(playing ? 'pause' : 'play');
      setIcons(play, playing);
      duration.textContent = clock(length);
      feedback.hidden = !loading && !error;
      retry.hidden = error !== 'mixError';
      status.textContent = loading
        ? t('mixLoading').replace('{loaded}', loaded).replace('{total}', channels.length)
        : error ? t(error) : '';
    }

    function position(session) {
      if (!session.sources.length) return session.offset;
      return Math.min(session.length, session.offset + Math.max(0, session.context.currentTime - session.startedAt));
    }

    function drawPosition(seconds, length) {
      const ratio = length ? seconds / length : 0;
      seek.value = Math.round(ratio * 1000);
      seek.style.setProperty('--p', (ratio * 100).toFixed(2) + '%');
      time.textContent = clock(seconds);
    }

    function stop(session) {
      cancelAnimationFrame(session.frame);
      session.sources.forEach(source => {
        source.onended = null;
        source.stop();
        source.disconnect();
      });
      session.sources = [];
    }

    function start(session) {
      if (session.offset >= session.length) session.offset = 0;
      const { context } = session;
      const scheduled = session.channels.filter(channel => channel.buffer.duration > session.offset);
      // Todos os canais usam o mesmo relógio e o mesmo ponto de partida.
      session.startedAt = context.currentTime + 0.04;
      scheduled.forEach(channel => {
        const source = context.createBufferSource();
        source.buffer = channel.buffer;
        source.connect(channel.gain);
        source.start(session.startedAt, session.offset);
        session.sources.push(source);
      });

      const last = session.sources.reduce((a, b) => a.buffer.duration > b.buffer.duration ? a : b);
      last.onended = () => {
        stop(session);
        session.offset = 0;
        drawPosition(0, session.length);
        render();
      };
      function tick() {
        if (!session.scrubbing) drawPosition(position(session), session.length);
        session.frame = requestAnimationFrame(tick);
      }
      tick();
      render();
    }

    function setGains(session) {
      const hasSolo = session.channels.some(channel => channel.solo);
      session.channels.forEach(channel => {
        const audible = hasSolo ? channel.solo : !channel.muted;
        channel.row.classList.toggle('is-quiet', !audible);
        if (channel.gain) {
          channel.gain.gain.setTargetAtTime(audible ? channel.volume : 0, session.context.currentTime, 0.012);
        }
      });
    }

    function channelRow(session, file, label) {
      const row = document.createElement('li');
      row.className = 'mix__channel';
      const name = document.createElement('span');
      name.className = 'mix__channel-name';
      name.textContent = label;
      row.append(name);

      const fader = document.createElement('label');
      fader.className = 'mix__fader';
      const slider = document.createElement('input');
      slider.className = 'player__range';
      slider.type = 'range';
      slider.min = '0';
      slider.max = '100';
      slider.value = '100';
      slider.style.setProperty('--p', '100%');
      slider.setAttribute('aria-label', t('mixVolume') + ' · ' + label);
      const value = document.createElement('span');
      value.className = 'mix__value';
      value.setAttribute('aria-hidden', 'true');
      value.textContent = '100%';
      fader.append(slider, value);
      row.append(fader);

      const controls = document.createElement('div');
      controls.className = 'mix__channel-tools';
      row.append(controls);
      const channel = { file, row, volume: 1, solo: false, muted: false };
      function toggle(key, caption) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'player__chip mix__toggle';
        button.textContent = t(caption);
        button.setAttribute('aria-label', t(caption) + ' · ' + label);
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
          channel[key] = !channel[key];
          button.setAttribute('aria-pressed', String(channel[key]));
          setGains(session);
        });
        controls.append(button);
      }
      toggle('muted', 'mixMute');
      toggle('solo', 'mixSolo');

      slider.addEventListener('input', () => {
        channel.volume = Number(slider.value) / 100;
        value.textContent = slider.value + '%';
        slider.style.setProperty('--p', value.textContent);
        setGains(session);
      });
      return channel;
    }

    function release(session) {
      session.controller.abort();
      stop(session);
      if (session.context) session.context.close().catch(() => {});
      session.context = null;
      session.channels.forEach(channel => {
        channel.buffer = null;
        channel.gain = null;
      });
    }

    async function load(session) {
      session.controller = new AbortController();
      const { signal } = session.controller;
      if (location.protocol === 'file:') {
        session.error = 'mixHttp';
        render();
        return;
      }
      list.setAttribute('aria-busy', 'true');
      session.loading = true;
      session.loaded = 0;
      session.error = '';
      render();

      try {
        // Um mix por vez, com até dois decodes em paralelo para limitar a memória.
        const context = new AudioEngine({ sampleRate: 24000 });
        session.context = context;
        context.addEventListener('statechange', () => {
          if (current === session) render();
        });
        const master = context.createGain();
        master.gain.value = 0.5;
        const limiter = context.createDynamicsCompressor();
        limiter.threshold.value = -4;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = 0.003;
        master.connect(limiter);
        limiter.connect(context.destination);

        async function loadChannel(channel) {
          const url = 'assets/audio/stems/' + session.slug + '/' + encodeURIComponent(channel.file);
          const response = await fetch(url, { signal });
          if (!response.ok) throw new Error('Stem HTTP ' + response.status);
          const buffer = await context.decodeAudioData(await response.arrayBuffer());
          if (signal.aborted) return;
          channel.buffer = buffer;
          channel.gain = context.createGain();
          channel.gain.connect(master);
          session.loaded += 1;
          render();
        }

        for (let i = 0; i < session.channels.length; i += 2) {
          await Promise.all(session.channels.slice(i, i + 2).map(loadChannel));
          if (signal.aborted) return;
        }
        session.length = Math.max(...session.channels.map(channel => channel.buffer.duration));
        setGains(session);
        list.removeAttribute('aria-busy');
        session.loading = false;
        render();
      } catch (error) {
        if (signal.aborted) return;
        release(session);
        list.removeAttribute('aria-busy');
        session.loading = false;
        session.error = 'mixError';
        render();
      }
    }

    play.addEventListener('click', async () => {
      const session = current;
      if (session.sources.length && session.context.state === 'running') {
        session.offset = position(session);
        stop(session);
        drawPosition(session.offset, session.length);
        render();
        return;
      }
      session.starting = true;
      session.error = '';
      render();
      try {
        await session.context.resume();
        if (current !== session || !dialog.open) return;
        if (!session.sources.length) start(session);
      } catch (error) {
        stop(session);
        session.error = 'mixPlaybackError';
      } finally {
        session.starting = false;
        if (current === session) render();
      }
    });

    function seekTime() {
      return Number(seek.value) / 1000 * current.length;
    }
    seek.addEventListener('input', () => {
      current.scrubbing = true;
      drawPosition(seekTime(), current.length);
    });
    seek.addEventListener('change', () => {
      const session = current;
      const playing = session.sources.length > 0;
      stop(session);
      session.offset = seekTime();
      session.scrubbing = false;
      if (playing && session.offset < session.length) start(session);
      else {
        drawPosition(session.offset, session.length);
        render();
      }
    });
    seek.addEventListener('pointercancel', () => {
      current.scrubbing = false;
      drawPosition(position(current), current.length);
    });

    retry.addEventListener('click', () => {
      dialog.querySelector('[autofocus]').focus();
      load(current);
    });
    dialog.addEventListener('close', () => {
      if (!current || dialog.open) return;
      release(current);
      const trigger = current.trigger;
      current = null;
      list.removeAttribute('aria-busy');
      list.replaceChildren();
      document.body.classList.remove('has-overlay');
      if (trigger) trigger.focus();
    });

    function has(slug) {
      return Object.prototype.hasOwnProperty.call(manifest, slug);
    }

    return {
      has,
      open(slug, name, trigger) {
        if (!has(slug) || current) return;
        const session = { slug, trigger, offset: 0, length: 0, sources: [], loaded: 0 };
        current = session;
        session.channels = manifest[slug].map(([file, label]) => channelRow(session, file, label));
        title.textContent = name;
        list.replaceChildren(...session.channels.map(channel => channel.row));
        drawPosition(0, 0);
        render();
        dialog.showModal();
        document.body.classList.add('has-overlay');
        load(session);
      }
    };
  };
})();
