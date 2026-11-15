# OCN9

Site de diretrizes do projeto **Oil Can No. 9**. HTML + CSS + JS puro, sem
build e sem dependência: abrir `index.html` no navegador já funciona.

## Estrutura

```
OCN9/
├─ index.html            página única com 4 seções
├─ mockup-prompts.md     prompts de geração de imagem para mockups de merch
├─ css/                  cascata em 5 camadas, nesta ordem
│  ├─ tokens.css         cor, tipo, espaço, forma, motion, z-index (light + dark)
│  ├─ base.css           reset, elementos nativos, acessibilidade, impressão
│  ├─ layout.css         nav, canvas, seções, grades, rodapé, breakpoints
│  ├─ components.css     peças reutilizáveis (bloco__elemento--modificador)
│  └─ utilities.css      exceções de uma propriedade — sempre por último
├─ js/
│  ├─ i18n.js            dicionário PT/EN, único lugar com texto de interface
│  ├─ app.js             tema, idioma, moodboard, modal, player
│  ├─ bento.js           noise da foto e animação do óleo
│  ├─ mixer.js           transporte e controles das trilhas
│  └─ mix-tracks.js      arquivos e nomes dos canais por faixa
├─ assets/
│  ├─ audio/             pré-produção (.mp3), stems (.zip) e MP3 soltos em stems/
│  ├─ covers/            capas dos EPs — vazia; a página cai no placeholder
│  ├─ docs/              letras e BPM de origem (.rtf)
│  ├─ help/              imagens dos modais de contexto
│  ├─ images/            renders de merch (seção Merch de identidade visual)
│  ├─ logo/              logotipo e símbolo, em SVG
│  └─ moodboard/         mood01…mood10.jpg
└─ backups/              versões anteriores do site
```

## Regras da cascata

1. **Nenhum arquivo além de `tokens.css` declara um valor cru.** Sem hex, sem px
   de espaçamento, sem ms de transição — sempre `var(--token)`.
2. **Componentes usam apenas tokens semânticos** (`--surface-*`, `--text-*`,
   `--accent-*`, `--highlight-*`), nunca os primitivos de marca nem os degraus
   das rampas. É isso que faz o tema escuro funcionar sem uma segunda folha.
3. **Layout posiciona, componente decora.** Se a regra fala de background,
   borda de card ou tipografia de conteúdo, ela vai para `components.css`.
4. **Estado vem de `is-*` ou de atributo ARIA**, nunca de estilo inline.
5. **Utilitário é exceção pontual.** Três utilitários no mesmo elemento em dois
   lugares diferentes significa que ali existe um componente — promova.

## Navegação

As quatro seções ficam na mesma página. O topo tem apenas o seletor de
idioma e o botão de tema, em um grupo de preferências separado do conteúdo.

## Tema

**O padrão é o escuro** — a UI negativa é a aplicação padrão da marca. Isso é
declarado no próprio markup (`<html data-theme="dark">`), então vale já na
primeira pintura, sem piscar e sem depender de JS. O sistema operacional não
manda aqui: só uma escolha anterior do visitante, gravada em `localStorage`
(`ocn9:theme`), sobrescreve o padrão.

As vitrines de identidade visual (`.stage-white`, `.stage-black`,
`.stage-blue`, `.stage-red`) **não** seguem o tema: elas mostram a peça como
ela é aplicada, então têm fundo travado nos quatro valores da marca.

## Idioma

**O padrão é inglês.** O texto estático do HTML é o inglês e `<html lang="en">`
já vem no markup, então não há troca visível ao carregar. Português vem do
dicionário quando o visitante escolhe (gravado em `ocn9:lang`).

Todo nó traduzível carrega `data-i18n="chave"`. As duas metades de
`js/i18n.js` precisam ter exatamente as mesmas chaves — o texto não aparece se
faltar uma. Ao editar uma frase, **edite o dicionário e o HTML**: o HTML é o
que se vê antes do JS rodar.

Controle que só tem ícone não tem onde pôr texto: esse usa
`data-i18n-aria="chave"`, que manda o mesmo dicionário para o `aria-label` em
vez do conteúdo. E rótulo que muda com o estado (Tocar/Pausar) não pode vir do
HTML — o dicionário sobrescreveria o estado atual a cada troca de idioma. Por
isso `setLang` chama `syncPlayer()` no fim: o player redesenha o que é dele
depois que o dicionário passa.

## Marca nesta página

- **Logotipo**: SVG inline (`#ocn9-logo`), só na versão monocromática — usa
  `currentColor` para trocar de cor por CSS. A aplicação em duas cores existiu
  e foi descontinuada; não use `logo-2colors.svg` nem o reintroduza sem que
  isso seja pedido de novo.
- **Símbolo**: entra por `<img>`. O traço é texturizado e os arquivos são
  grandes demais para inline — por isso existem três variantes prontas em vez
  de uma recolorível.
- Logotipo e símbolo **não aparecem juntos no mesmo campo visual**. A regra
  vale por face: camiseta com logotipo na frente e símbolo nas costas está
  correta, porque nunca se vê os dois de uma vez. A seção de identidade visual
  documenta isso.

## Player

Existe **um** `<audio>` na página, escondido, compartilhado pelos cards com áudio e pela fila. Isso resolve de graça o problema que quatro
`<audio controls>` tinham: dois nunca tocam juntos porque só existe um
elemento. Também deixou de baixar os MP3 no load — nada de áudio sai do
servidor antes de alguém apertar tocar.

A barra é **fixa no rodapé e só aparece quando algo toca**. Não é sidebar de
propósito: a página tem quatro seções e só uma tem áudio, então uma coluna fixa
cobraria largura nas outras três o tempo todo. A barra não cobra nada enquanto
está fechada, acompanha a rolagem — dá para ouvir
lendo o resto. Enquanto está aberta, `body.has-player` reserva a altura dela
no fim da página, senão a barra tapa o rodapé.

**Modo contínuo nasce desligado.** Quem clica em uma faixa quer aquela faixa e
o som para no fim dela; quem quer o bloco inteiro clica em *Tocar tudo*, que
liga o modo. O botão da barra troca a qualquer momento, e avançar/voltar na
mão funciona nos dois casos — o modo só decide o que acontece **quando a faixa
acaba**, e no fim da fila ele para em vez de voltar ao começo.

A fila sai do DOM, na ordem em que os cards estão: **reordenar as faixas no
HTML reordena o player junto**, sem segunda lista para manter em dia. Um card
entra na fila quando tem `data-track` e `data-src`; sem isso ele é só um card.

`render()` é o único lugar que desenha estado — barra, card e fila saem sempre
da mesma leitura, então não têm como divergir.

## Mixer de trilhas

O botão **Abrir mix** aparece no card e na barra do player para músicas com
trilhas em `js/mix-tracks.js`. Ao abrir, o player estéreo pausa e o mixer
carrega só os MP3 dessa música por HTTP. Cada canal tem seu próprio ganho e
todas as trilhas seguem o mesmo relógio do Web Audio. Fechar encerra a
reprodução e libera os buffers.

Para adicionar um mix, extraia os MP3 do ZIP em
`assets/audio/stems/<data-slug>/`, liste os nomes no manifesto e inclua o
botão no card. Exporte as trilhas com a mesma origem de tempo.

## Design system

Nenhum design system de terceiros (Carbon, Material, etc.) está adotado aqui.
Não achei registro de um ter sido escolhido para esta página, e a folha de
estilo atual não segue nenhum deles — as convenções acima são o padrão do
projeto. Se um for adotado depois, ele entra nesta seção.

Note que este projeto **não** usa o *Saulo B_ Design System* (Space Grotesk,
azul #175CE5) que roda em `Hub/` e `Portfolio/`: a paleta e a tipografia são
as da marca Oil Can No. 9.

## Pré-visualizar

`index.html` abre direto no navegador. Para servir por HTTP:

```bash
cd "/Users/saulobernardino/Desktop/Claude" && node OCN9/.server.js
```

O servidor responde `Range` e manda `Content-Length`. Não é capricho: sem
isso o navegador não descobre a duração do mp3 (`duration` vira `Infinity`) e
a barra do player não deixa arrastar.
