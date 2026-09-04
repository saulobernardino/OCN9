/* ============================================================
   OCN9 — i18n.js
   Dicionário PT/EN. Único lugar onde texto de interface vive.
   O HTML carrega o texto PT como fallback e cada nó traduzível
   é marcado com data-i18n="chave".
   Valores podem conter HTML simples (strong, br, li).
   ============================================================ */

window.OCN9_I18N = {
  pt: {
    /* --- navegação e rodapé --- */
    navPre: 'Pré-produção',
    navCon: 'Conceito e plano',
    navVis: 'Identidade visual',
    navSon: 'Identidade sonora',
    footerMeta: 'projeto · v0.3 · 2026–2027',

    /* --- topo --- */
    tagline:
      '<span class="is-accent">Indie</span> nerve, <span class="is-accent">Britpop</span> swagger, <span class="is-accent">Stoner</span> rust.<br>Born in <span class="is-highlight">Brazil</span>, 2026.',
    heroLine:
      '<strong>3</strong> EPs com <strong>4</strong> faixas (lançamentos em 2027) &nbsp;•&nbsp; Faixas autorais: <strong>12</strong>',

    /* --- pré-produção --- */
    slPre: 'Pré-produção',
    preprodNote: '12 faixas · divisão em EPs definida após a sessão',
    dlStems: 'Faixas separadas (.zip)',
    lyr: 'Letra',
    noLyr: 'Sem letra',
    soon: 'Em breve',

    /* --- conceito e plano --- */
    mkArq: 'Arquétipo',
    mvArq: 'everyman — urbano',
    mkTom: 'Tom de voz',
    mvTom: 'direta · irônica · confiante',
    mkEst: 'Estilo',
    mkFor: 'Formação',
    slPret: 'Pretensão',
    pret1:
      'Ser <strong>relevante social e culturalmente</strong> para um grupo de pessoas que se importam com música, uma cena local, uma base de fãs em outro lugar. Presença em shows e ouvintes mensais no streaming são o termômetro. Mas entrega e crescimento são consequência, não pré-condição.',
    pret2:
      'A vida adulta tem agenda própria. Por isso a energia da banda precisa ser gasta de forma <strong>estratégica</strong>: conteúdo que valha, eventos com retorno, público que consome música de verdade. Festivais, Bolacha Discos, espaços afins.',
    pret3:
      'Composição e produção precisam ser momentos bons, recompensados pela própria experiência, independente do resultado.',
    slObj: 'Primeiro objetivo',
    objTxt: 'Criar repertório autoral e iniciar as primeiras apresentações.',
    slPlano: 'O plano',
    flow1t: 'Uma sessão só',
    flow1d:
      'Gravar as <strong>12 faixas de uma vez</strong>, ao vivo — baixo, bateria e guitarra tocando juntos.',
    flow2t: 'Depois, de 4 em 4 músicas',
    flow2d: 'Cada bloco percorre o mesmo caminho, na ordem dos EPs:',
    flow2l:
      '<li><strong>Captação final</strong> — vozes e efeitos por cima da base</li><li><strong>Mixagem e masterização</strong></li><li><strong>Audiovisual das 4</strong> — visualiser, lyric video, clipe ou capa</li><li><strong>Registro e distribuição</strong> — ISRC e envio à distribuidora</li><li><strong>Lançamento</strong> — com pitch no Spotify de 1 faixa de trabalho</li>',
    flow3t: 'Tudo em paralelo',
    flow3d:
      'Ninguém espera ninguém. Enquanto um bloco é finalizado, o próximo já está em fila e a banda não para.',
    flow4t: 'No fim',
    flow4d:
      '<strong>3 EPs de 4 faixas, fechados.</strong> Sem singles avulsos, tudo dentro de 2027.<br>Depois: <strong>playlist consolidada no streaming</strong> + <strong>fita K7</strong> com as 12.',
    slLanc: 'Lançamentos',
    lancNote:
      '3 EPs · 4 faixas cada · 1 faixa de trabalho por EP · ao menos um audiovisual por música',
    epTracks: '<li>Faixa 01</li><li>Faixa 02</li><li>Faixa 03</li><li>Faixa 04</li>',
    epNote: 'visualiser · lyric video · clipe',
    coverPend: 'capa pendente',

    /* --- identidade visual : nome em texto --- */
    slName: 'Nome em texto',
    nameIntro:
      'Três formas fechadas, cada uma com um lugar. Elas não são intercambiáveis: trocar uma pela outra no contexto errado enfraquece o reconhecimento do nome.',
    nameFullRole: 'Nome por extenso',
    nameFullDesc:
      'Primeira menção em qualquer texto, créditos, contratos, metadados de release e ficha de distribuidora. Sempre com o ponto e o espaço: <strong>No. 9</strong>.',
    nameShortRole: 'Abreviação',
    nameShortDesc:
      'Espaço curto, uso interno e merch: nome de arquivo, título de aba, etiqueta, cabeçalho de documento. Nunca abre um texto — só aparece depois do nome por extenso.',
    nameHandleRole: 'Conta',
    nameHandleDesc:
      'Redes sociais, e-mail e qualquer identificador de usuário. Sempre em caixa baixa, sem ponto, sem espaço e sem separador.',
    nameDontTitle: 'Não escreva',
    nameDontList:
      '<li>Oil Can #9 &nbsp;·&nbsp; Oil Can nº 9 &nbsp;·&nbsp; Oil Can No.9 <em>(sem o espaço)</em></li><li>OilCan No. 9 &nbsp;·&nbsp; Oilcan No. 9 &nbsp;·&nbsp; OIL CAN NO. 9 <em>(em versal, fora de um título)</em></li><li>OCN 9 &nbsp;·&nbsp; OCN-9 &nbsp;·&nbsp; ocn9 <em>(a abreviação é sempre em versal)</em></li><li>@oil_can_no9 &nbsp;·&nbsp; @OilCanNo9 &nbsp;·&nbsp; @ocn9</li>',

    /* --- identidade visual : logotipo e símbolo --- */
    specTwo: '2 cores',
    specOne: '1 cor',
    specNeg: 'Negativo',
    slLogo: 'Logotipo',
    logoIntro:
      'A placa com o nome. É a assinatura padrão da marca — use quando o público ainda não tem o repertório visual para reconhecer só o símbolo: capa de release, cabeçalho, cartaz, ficha técnica.',
    logoFiles: 'Arquivos: <code>logo-1color.svg</code> · <code>logo-negative.svg</code>',

    slMerch: 'Merch',
    merchIntro:
      'Renders de IA, pré-visualização rápida da direção, não é arte final de produção.',
    merchTee: 'Camiseta — logotipo na frente, símbolo nas costas',
    merchTeeRed: 'Camiseta — variação vermelha',
    merchK7: 'Fita K7 — sobre o amplificador',
    merchBox: 'Caixinha de palhetas — logotipo',

    slSymbol: 'Símbolo',
    symbolIntro:
      'A lata. Funciona sozinha onde o nome já está estabelecido ou já aparece perto: avatar de rede social, selo, bumbo, adesivo, marca d\'água de vídeo. Nunca é a primeira apresentação da marca a um público novo.',
    symbolFiles:
      'Arquivos: <code>symbol-1color.svg</code> · <code>symbol-2colors.svg</code> · <code>symbol-negative.svg</code>',
    symbolRule:
      'Sobre fundo escuro ou colorido, use sempre o <strong>negativo</strong>. A versão de duas cores só existe sobre branco — o vermelho do No. 9 não separa do preto nem do azul.',

    slCoex: 'Coexistência',
    coexIntro:
      'Logotipo e símbolo dividem o mesmo alfabeto visual, mas <strong>não aparecem juntos no mesmo campo visual</strong>. É a regra da Volkswagen: ou o círculo VW, ou "Das Auto" — nunca os dois no mesmo lockup. Numa peça de duas faces a regra continua valendo por face: camiseta com logotipo na frente e símbolo nas costas está correta, porque nunca se vê os dois de uma vez.',
    coexDoLogo: 'Logotipo sozinho — assinatura padrão',
    coexDoSymbol: 'Símbolo sozinho — onde o nome já está dado',
    coexDont: 'Símbolo e logotipo lado a lado, ou empilhados, no mesmo campo visual',
    coexDoBadge: 'Faça',
    coexDontBadge: 'Não faça',

    /* --- identidade visual : paleta e tipo --- */
    slPal: 'Paleta',
    palIntro:
      'Quatro cores fechadas. São elas que vão para peça impressa, capa e vídeo — sem variação, sem tint, sem gradiente.',
    palWhiteUse: 'Fundo padrão. Placa do logotipo e símbolo negativo sobre fundo escuro ou colorido.',
    palBlackUse: 'Tinta. Texto, traço do símbolo e fundo alternativo de peça.',
    palBlueUse: 'Primária. Ação, navegação, rótulo de seção e fundo de peça.',
    palRedUse: 'Acento. O No. 9, marcadores e destaque pontual. Nunca em bloco de texto.',
    slRamp: 'Escalas derivadas — só para tela',
    rampIntro:
      'Extensões geradas a partir do azul e do vermelho, mais uma escala neutra fria. Existem para dar hierarquia, estado e contraste na interface, onde quatro cores não bastam. <strong>Não são cores de marca</strong> e não entram em peça impressa nem em capa.',
    rampBlue: 'Azul — derivado de #175A70',
    rampRed: 'Vermelho — derivado de #B22425',
    rampGray: 'Neutro — cinzas frios',
    a11yNote:
      'Sobre fundo escuro, o azul e o vermelho da marca não alcançam o contraste mínimo de leitura (WCAG AA). No tema escuro a interface usa os degraus 300 dessas escalas para texto e ícone — a cor de marca continua reservada para superfície e peça.',

    slTipo: 'Tipografia',
    tipo1: 'Display · logotipo · títulos — fontshare.com',
    tipo2: 'Geist Mono — texto e rótulos',
    tipo2meta: 'Corpo · interface · metadados — Google Fonts',

    slMood: 'Moodboard visual',
    moodDesc:
      'Referência visual — palco em luz azul e vermelha, grão analógico, objeto urbano, cinema, itens analógicos.',

    /* --- identidade sonora --- */
    slSon: 'Identidade sonora',
    slRefs: 'Referências sonoras'
  },

  en: {
    navPre: 'Pre-production',
    navCon: 'Concept & plan',
    navVis: 'Visual identity',
    navSon: 'Sonic identity',
    footerMeta: 'project · v0.3 · 2026–2027',

    tagline:
      '<span class="is-accent">Indie</span> nerve, <span class="is-accent">Britpop</span> swagger, <span class="is-accent">Stoner</span> rust.<br>Born in <span class="is-highlight">Brazil</span>, 2026.',
    heroLine:
      '<strong>3</strong> EPs of <strong>4</strong> tracks (releasing in 2027) &nbsp;•&nbsp; Original tracks: <strong>12</strong>',

    slPre: 'Pre-production',
    preprodNote: '12 tracks · EP split decided after the session',
    dlStems: 'Stems (.zip)',
    lyr: 'Lyrics',
    noLyr: 'No lyrics',
    soon: 'Coming soon',

    mkArq: 'Archetype',
    mvArq: 'everyman — urban',
    mkTom: 'Tone of voice',
    mvTom: 'direct · ironic · confident',
    mkEst: 'Style',
    mkFor: 'Line-up',
    slPret: 'Ambition',
    pret1:
      'To be <strong>socially and culturally relevant</strong> to a group of people who care about music — a local scene, say, or a fanbase somewhere else. A fair measure might be people showing up at gigs, and monthly listeners on streaming. But output and growth are a consequence, not a condition for existing.',
    pret2:
      'Adult life keeps its own schedule. So the band’s energy has to be spent <strong>strategically</strong>: content worth making, gigs that give something back, audiences that actually consume music. Festivals, Bolacha Discos, rooms of that kind.',
    pret3:
      'Writing and producing have to be good moments, rewarded by the experience itself, whatever the outcome.',
    slObj: 'First goal',
    objTxt: 'Build an original repertoire and start playing live.',
    slPlano: 'The plan',
    flow1t: 'One session only',
    flow1d:
      'Record <strong>all 12 tracks at once</strong>, live — bass, drums and guitar playing together.',
    flow2t: 'Then, four songs at a time',
    flow2d: 'Each block runs the same path, in EP order:',
    flow2l:
      '<li><strong>Final tracking</strong> — vocals and effects over the base</li><li><strong>Mixing and mastering</strong></li><li><strong>Visuals for all four</strong> — visualiser, lyric video, music video or cover art</li><li><strong>Registration and distribution</strong> — ISRC and submission to the distributor</li><li><strong>Release</strong> — with a Spotify pitch on one focus track</li>',
    flow3t: 'All in parallel',
    flow3d:
      'Nobody waits for anybody. While one block is being finished, the next is already queued and the band keeps playing.',
    flow4t: 'In the end',
    flow4d:
      '<strong>Three closed EPs of four tracks.</strong> No standalone singles, all within 2027.<br>Then: a <strong>consolidated playlist</strong> on streaming + the <strong>K7 tape</strong> with all twelve.',
    slLanc: 'Releases',
    lancNote: '3 EPs · 4 tracks each · 1 focus track per EP · at least one video per song',
    epTracks: '<li>Track 01</li><li>Track 02</li><li>Track 03</li><li>Track 04</li>',
    epNote: 'visualiser · lyric video · music video',
    coverPend: 'cover pending',

    slName: 'Name in text',
    nameIntro:
      'Three settled forms, each with its own place. They are not interchangeable: swapping one for another in the wrong context weakens recognition of the name.',
    nameFullRole: 'Full name',
    nameFullDesc:
      'First mention in any text, credits, contracts, release metadata and distributor forms. Always with the period and the space: <strong>No. 9</strong>.',
    nameShortRole: 'Short form',
    nameShortDesc:
      'Tight spaces, internal use and merch: filenames, tab titles, labels, document headers. It never opens a text — it only appears after the full name.',
    nameHandleRole: 'Handle',
    nameHandleDesc:
      'Social media, email and any username. Always lowercase, no period, no space, no separator.',
    nameDontTitle: 'Do not write',
    nameDontList:
      '<li>Oil Can #9 &nbsp;·&nbsp; Oil Can nº 9 &nbsp;·&nbsp; Oil Can No.9 <em>(no space)</em></li><li>OilCan No. 9 &nbsp;·&nbsp; Oilcan No. 9 &nbsp;·&nbsp; OIL CAN NO. 9 <em>(all caps, outside a heading)</em></li><li>OCN 9 &nbsp;·&nbsp; OCN-9 &nbsp;·&nbsp; ocn9 <em>(the short form is always caps)</em></li><li>@oil_can_no9 &nbsp;·&nbsp; @OilCanNo9 &nbsp;·&nbsp; @ocn9</li>',

    specTwo: '2 colours',
    specOne: '1 colour',
    specNeg: 'Negative',
    slLogo: 'Logo',
    logoIntro:
      'The plate with the name. This is the brand’s default signature — use it wherever the audience does not yet have the visual vocabulary to recognise the symbol alone: release covers, headers, posters, credits.',
    logoFiles: 'Files: <code>logo-1color.svg</code> · <code>logo-negative.svg</code>',

    slMerch: 'Merch',
    merchIntro:
      'AI-generated concept renders, a quick preview of the direction, not final production art.',
    merchTee: 'Tee — logo on the chest, symbol on the back',
    merchTeeRed: 'Tee — red colourway',
    merchK7: 'Cassette — on the amp rig',
    merchBox: 'Pick tin — logo',

    slSymbol: 'Symbol',
    symbolIntro:
      'The can. It works alone where the name is already established or already sits nearby: social avatars, seals, bass drum, stickers, video watermark. It is never the brand’s first introduction to a new audience.',
    symbolFiles:
      'Files: <code>symbol-1color.svg</code> · <code>symbol-2colors.svg</code> · <code>symbol-negative.svg</code>',
    symbolRule:
      'On a dark or coloured ground, always use the <strong>negative</strong>. The two-colour version exists on white only — the red of the No. 9 does not separate from black or from blue.',

    slCoex: 'Coexistence',
    coexIntro:
      'Logo and symbol share the same visual alphabet, but they <strong>never appear together in the same visual field</strong>. It is the Volkswagen rule: either the VW roundel, or "Das Auto" — never the two in one lockup. On a two-sided piece the rule holds per face: a tee with the logo on the chest and the symbol on the back is correct, because the two are never seen at once.',
    coexDoLogo: 'Logo alone — the default signature',
    coexDoSymbol: 'Symbol alone — where the name is already given',
    coexDont: 'Symbol and logo side by side, or stacked, in the same visual field',
    coexDoBadge: 'Do',
    coexDontBadge: 'Don’t',

    slPal: 'Palette',
    palIntro:
      'Four settled colours. These are what go to print, covers and video — no variation, no tints, no gradients.',
    palWhiteUse: 'Default ground. Logo plate and negative symbol on a dark or coloured ground.',
    palBlackUse: 'Ink. Type, symbol linework and alternative ground.',
    palBlueUse: 'Primary. Action, navigation, section labels and coloured grounds.',
    palRedUse: 'Accent. The No. 9, markers and single points of emphasis. Never a block of text.',
    slRamp: 'Derived scales — screen only',
    rampIntro:
      'Extensions generated from the blue and the red, plus a cool neutral scale. They exist to give hierarchy, state and contrast in the interface, where four colours are not enough. They are <strong>not brand colours</strong> and never go to print or onto a cover.',
    rampBlue: 'Blue — derived from #175A70',
    rampRed: 'Red — derived from #B22425',
    rampGray: 'Neutral — cool greys',
    a11yNote:
      'On a dark ground, the brand blue and red fall short of the minimum reading contrast (WCAG AA). In dark theme the interface uses the 300 step of those scales for type and icons — the brand colour stays reserved for surfaces and printed pieces.',

    slTipo: 'Typography',
    tipo1: 'Display · logo · headings — fontshare.com',
    tipo2: 'Geist Mono — text and labels',
    tipo2meta: 'Body · interface · metadata — Google Fonts',

    slMood: 'Visual moodboard',
    moodDesc:
      'Visual reference — stage in blue and red light, analog grain, urban objects, cinema, analog items.',

    slSon: 'Sonic identity',
    slRefs: 'Sonic references'
  }
};
