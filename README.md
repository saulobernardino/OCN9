# OCN9

Site de diretrizes do projeto **Oil Can No. 9**. HTML + CSS + JS puro, sem
build e sem dependência: abrir `index.html` no navegador já funciona.

## Estrutura

```
OCN9/
├─ index.html            página única com 4 abas
├─ mockup-prompts.md     prompts de geração de imagem para mockups de merch
├─ css/                  cascata em 5 camadas, nesta ordem
│  ├─ tokens.css         cor, tipo, espaço, forma, motion, z-index (light + dark)
│  ├─ base.css           reset, elementos nativos, acessibilidade, impressão
│  ├─ layout.css         nav, canvas, seções, grades, rodapé, breakpoints
│  ├─ components.css     peças reutilizáveis (bloco__elemento--modificador)
│  └─ utilities.css      exceções de uma propriedade — sempre por último
├─ js/
│  ├─ i18n.js            dicionário PT/EN, único lugar com texto de interface
│  └─ app.js             tema, abas, idioma, moodboard, modal
├─ assets/
│  ├─ audio/             pré-produção (.mp3) e stems (.zip)
│  ├─ covers/            capas dos EPs — vazia; a página cai no placeholder
│  ├─ docs/              letras e BPM de origem (.rtf)
│  ├─ help/              imagens dos modais de contexto
│  ├─ images/            renders de merch (seção Merch da aba de identidade visual)
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

Acima de **900px** as quatro seções ficam lado a lado na barra. Abaixo disso a
barra guarda só marca, seção atual, tema e hambúrguer, e o menu abre como
gaveta com os itens empilhados.

O número 900 é medido, não arbitrário: a barra horizontal completa ocupa 844px
em português (o idioma de rótulos mais longos), e os 56px restantes são folga.
**Se os rótulos das abas mudarem, meça de novo** — o cálculo está comentado em
`layout.css`.

Os botões são os mesmos nos dois modos, sem duplicação de markup: só a
apresentação muda. Atenção a um detalhe da cascata — o hambúrguer carrega a
classe `.nav__tab`, cujo `display:flex` vive em `components.css`; por isso as
regras que escondem e mostram esse botão precisam estar nesse arquivo, e não em
`layout.css`, que carrega antes e perderia o desempate.

## Tema

**O padrão é o escuro** — a UI negativa é a aplicação padrão da marca. Isso é
declarado no próprio markup (`<html data-theme="dark">`), então vale já na
primeira pintura, sem piscar e sem depender de JS. O sistema operacional não
manda aqui: só uma escolha anterior do visitante, gravada em `localStorage`
(`ocn9:theme`), sobrescreve o padrão.

As vitrines da aba de identidade visual (`.stage-white`, `.stage-black`,
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
  correta, porque nunca se vê os dois de uma vez. A aba de identidade visual
  documenta isso.

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
