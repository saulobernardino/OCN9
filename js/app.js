/* ============================================================
   OCN9 — app.js
   Comportamento da página. Sem dependências.
   Blocos: tema · abas · idioma · moodboard · modal.
   Cada bloco é isolado e sai sem erro se o markup dele não
   existir na página — assim o arquivo serve para as próximas
   páginas do projeto sem edição.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_THEME = 'ocn9:theme';
  var STORAGE_LANG = 'ocn9:lang';

  /* Padrões da marca. O HTML já nasce com eles (lang="en",
     data-theme="dark"); estes valores são o mesmo par, para quando o
     JS precisa decidir sem uma escolha salva. */
  var DEFAULT_THEME = 'dark';
  var DEFAULT_LANG = 'en';

  /* localStorage falha em modo privado e em file:// em alguns
     navegadores. Nunca deixe isso derrubar a página. */
  function readStore(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* silencioso por projeto: a preferência só não persiste */
    }
  }

  /* ==========================================================
     TEMA
     Escuro (a UI negativa da marca) é o padrão, definido já no
     atributo data-theme do <html>. O botão troca e persiste.
     ========================================================== */
  var themeToggle = document.querySelector('[data-theme-toggle]');

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    /* Os ícones são SVG: `el.hidden` só existe em HTMLElement, então
       o atributo precisa ser escrito na mão. */
    document.querySelectorAll('[data-theme-icon]').forEach(function (icon) {
      icon.toggleAttribute('hidden', icon.getAttribute('data-theme-icon') !== theme);
    });
    if (persist) writeStore(STORAGE_THEME, theme);
  }

  /* O padrão é DEFAULT_THEME, não o sistema operacional: a UI negativa
     é a aplicação padrão da marca, e a página é uma peça de marca antes
     de ser um documento. O visitante troca no botão e a escolha fica. */
  var savedTheme = readStore(STORAGE_THEME);
  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : DEFAULT_THEME, false);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ==========================================================
     MENU (hambúrguer)
     Abaixo de 900px o mesmo <ul> das abas vira gaveta. O CSS faz
     a troca de apresentação; aqui só cuidamos de abrir, fechar e
     anunciar o estado.
     ========================================================== */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var currentLabel = document.getElementById('navCurrent');

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.querySelectorAll('[data-menu-icon]').forEach(function (icon) {
      icon.toggleAttribute('hidden', icon.getAttribute('data-menu-icon') !== (open ? 'open' : 'closed'));
    });
  }

  function menuIsOpen() {
    return !!nav && nav.classList.contains('is-open');
  }

  /* Mostra na barra a seção em que se está, já que os rótulos
     ficam escondidos enquanto a gaveta está fechada. */
  function syncCurrentLabel() {
    if (!currentLabel) return;
    var active = document.querySelector('[role="tab"][aria-selected="true"]');
    currentLabel.textContent = active ? active.textContent.trim() : '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      var opening = !menuIsOpen();
      setMenu(opening);
      /* A gaveta vem antes das ações no DOM, então o Tab a partir do
         hambúrguer sairia para a página. Ao abrir, joga o foco na
         aba ativa para o teclado continuar dentro do menu. */
      if (opening) {
        var active = document.querySelector('[role="tab"][aria-selected="true"]');
        if (active) active.focus();
      }
    });

    /* Toque fora da gaveta fecha. */
    document.addEventListener('click', function (e) {
      if (menuIsOpen() && !nav.contains(e.target)) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuIsOpen()) {
        setMenu(false);
        burger.focus();
      }
    });

    /* Passando para o layout largo a gaveta não faz mais sentido:
       o menu volta para a barra e o estado precisa zerar junto. */
    window.matchMedia('(max-width: 900px)').addEventListener('change', function (e) {
      if (!e.matches) setMenu(false);
    });
  }

  /* ==========================================================
     ABAS
     Padrão ARIA de tablist: setas navegam, Home/End vão às
     pontas, a aba ativa é a única no fluxo de tabulação.
     ========================================================== */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.classList.toggle('is-active', selected);
    });
    syncCurrentLabel();
    /* Escolher um destino fecha a gaveta — menos quando a troca
       veio da navegação por seta, que continua dentro do menu. */
    if (!focus) setMenu(false);
    if (focus) tab.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      selectTab(tab, false);
    });

    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        selectTab(next, true);
      }
    });
  });

  /* ==========================================================
     IDIOMA
     ========================================================== */
  var DICT = window.OCN9_I18N || {};

  function setLang(lang, persist) {
    var dict = DICT[lang] || DICT[DEFAULT_LANG] || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    /* O rótulo da barra é uma cópia do texto da aba ativa: precisa
       ser refeito depois que o dicionário reescreve as abas. */
    syncCurrentLabel();
    if (persist) writeStore(STORAGE_LANG, lang);
  }

  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.lang, true);
    });
  });

  var savedLang = readStore(STORAGE_LANG);
  setLang(savedLang === 'pt' || savedLang === 'en' ? savedLang : DEFAULT_LANG, false);

  /* ==========================================================
     MOODBOARD
     Monta a grade a partir da contagem de arquivos em
     assets/moodboard/. A altura provisória segura o layout da
     coluna até a imagem chegar; um arquivo que falte some.

     A imagem entra no DOM já montada, e não por `new Image()`:
     um <img loading="lazy"> fora do documento nunca entra no
     viewport, então o navegador adia o carregamento para sempre
     e nem load nem error disparam.
     ========================================================== */
  var moodboard = document.getElementById('moodboard');

  if (moodboard) {
    var MOOD_HEIGHTS = [220, 240, 260, 230, 250, 235, 245, 225, 255, 240];

    MOOD_HEIGHTS.forEach(function (height, index) {
      var id = 'mood' + String(index + 1).padStart(2, '0');

      var item = document.createElement('div');
      item.className = 'moodboard__item';
      item.style.minHeight = height + 'px';

      var img = document.createElement('img');
      img.src = 'assets/moodboard/' + id + '.jpg';
      img.alt = 'Referência visual ' + id;
      img.loading = 'lazy';
      img.addEventListener('load', function () {
        item.style.minHeight = '';
      });
      img.addEventListener('error', function () {
        item.remove();
      });

      var caption = document.createElement('div');
      caption.className = 'moodboard__caption';
      caption.textContent = id;

      item.appendChild(img);
      item.appendChild(caption);
      moodboard.appendChild(item);
    });
  }

  /* ==========================================================
     MODAL
     Um só overlay serve letras e textos de contexto.
     Fecha no X, no fundo e no Esc; devolve o foco a quem abriu
     e prende o Tab dentro do diálogo enquanto está aberto.
     ========================================================== */
  var overlay = document.getElementById('modal');
  var modalTitle = document.getElementById('modalTitle');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');
  var lastFocused = null;

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function openModal(title, html, imageSrc) {
    if (!overlay) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html + (imageSrc
      ? '<img class="modal__image" src="' + imageSrc + '" alt="" onerror="this.remove()">'
      : '');
    modalBody.scrollTop = 0;
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    document.body.classList.add('has-overlay');
    modalClose.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('has-overlay');
    /* Devolve o foco a quem abriu. Se não houver alvo focável — o modal
       foi aberto por script, por exemplo — tira o foco do botão que
       acabou de sumir, em vez de deixá-lo preso num elemento oculto. */
    if (lastFocused && typeof lastFocused.focus === 'function' && lastFocused !== document.body) {
      lastFocused.focus();
    } else {
      modalClose.blur();
    }
  }

  if (overlay) {
    modalClose.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      if (e.key !== 'Tab') return;

      var items = overlay.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* --- Letras: o conteúdo já está no card, escondido --- */
  document.querySelectorAll('[data-lyrics]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.track');
      if (!card) return;
      var body = card.querySelector('.track__lyrics');
      if (!body) return;
      var title = card.querySelector('.track__title').textContent.trim();
      var bpm = card.querySelector('.track__bpm');
      openModal(bpm ? title + '  ·  ' + bpm.textContent.trim() : title, body.innerHTML, null);
    });
  });

  /* --- Textos de contexto (botão "?") --- */
  var HELP = {
    arquetipos: {
      image: 'assets/help/arquetipos.jpg',
      pt: {
        title: 'Arquétipo',
        body:
          '<p class="modal__heading">Conceito</p>' +
          '<p class="modal__text">Arquétipos ajudam a moldar a personalidade de uma marca, criando uma conexão emocional com o público. São doze padrões narrativos — cada um com um desejo central e uma forma própria de falar.</p>' +
          '<p class="modal__heading">O arquétipo do Oil Can No. 9</p>' +
          '<p class="modal__text"><strong>Everyman — urbano.</strong> Desejo central: <strong>pertencimento</strong>. Fala de igual para igual, sem pose de estrela nem de gênio incompreendido. É a banda que ensaia depois do expediente e sabe disso.</p>' +
          '<p class="modal__heading">Exemplos de marcas com o arquétipo Everyman</p>' +
          '<p class="modal__text">Volkswagen, IKEA.</p>'
      },
      en: {
        title: 'Archetype',
        body:
          '<p class="modal__heading">Concept</p>' +
          '<p class="modal__text">Archetypes help shape a brand’s personality, creating an emotional connection with its audience. There are twelve narrative patterns — each with a core desire and a way of speaking of its own.</p>' +
          '<p class="modal__heading">Oil Can No. 9’s archetype</p>' +
          '<p class="modal__text"><strong>Everyman — urban.</strong> Core desire: <strong>belonging</strong>. Speaks as an equal — no rock-star pose, no misunderstood-genius act. It is the band that rehearses after work and knows it.</p>' +
          '<p class="modal__heading">Brands with the Everyman archetype</p>' +
          '<p class="modal__text">Volkswagen, IKEA.</p>'
      }
    }
  };

  document.querySelectorAll('[data-help]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var entry = HELP[btn.dataset.help];
      if (!entry) return;
      var lang = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
      var content = entry[lang] || entry.pt;
      openModal(content.title, content.body, entry.image);
    });
  });
})();
