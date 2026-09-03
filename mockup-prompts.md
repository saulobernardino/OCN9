# OCN9 — prompts de mockup

Três prompts para geração de imagem (ChatGPT / GPT Image). Escritos em inglês
porque os modelos de imagem respondem melhor assim e porque a marca já é em
inglês. Cole cada um inteiro, sem editar.

## Antes de gerar — leia

**O modelo não vai desenhar o logotipo nem o símbolo corretamente.** Tipografia
e marca sempre saem deformadas em geração de imagem. Trate o resultado como
**cena, iluminação e material** — depois componha o SVG real por cima em
Figma, Photoshop ou Illustrator. Os prompts descrevem as marcas em detalhe só
para o modelo acertar posição, escala e proporção.

**A regra de coexistência vale em cada prompt.** Logotipo e símbolo nunca
aparecem no mesmo campo visual. Por isso:

- Na camiseta, um está na frente e o outro nas costas — nunca visíveis juntos.
- Na fita, só o **símbolo** aparece como marca gráfica. Na caixinha de
  palhetas, só o **logotipo**. Nenhum dos dois cruza com o outro na mesma
  peça.

**Descrições de referência** (repetidas dentro dos prompts):

- **Logotipo** — placa preta com o formato do rótulo de um galão, mais larga em
  cima e com a base levemente curva; dentro, `Oil Can` em grotesca pesada e,
  abaixo, `No. 9` em itálico bold.
- **Símbolo** — galão de metal retangular em três quartos, tampa de rosca e
  alça no topo, `No. 9` em itálico grande na diagonal da face e um losango de
  inflamável no canto inferior esquerdo. Traço serigráfico de alto contraste,
  com textura gasta.

---

## A · Camiseta — logotipo na frente, símbolo nas costas

```
Product photography of two identical heavyweight black cotton t-shirts (#060606),
shot side by side on a seamless charcoal backdrop: the left one shows the front,
the right one shows the back. Studio product shot, shirts laid flat and lightly
steamed, natural cotton texture visible.

FRONT (left shirt): one small screen print on the left chest, about 8 cm wide —
a white badge shaped like the label plate of a metal jerry can, wider at the top
with a gently curved bottom edge. Inside the badge, the words "Oil Can" in a
heavy geometric grotesque in black, and below them "No. 9" in bold italic in
deep red (#B22425).

BACK (right shirt): one large screen print centred between the shoulder blades,
about 30 cm tall — a vintage rectangular metal jerry can seen at a three-quarter
angle, with a screw cap and a top carry handle, a large italic "No. 9" running
diagonally across its face, and a small diamond-shaped flammable icon at the
lower left. Printed in white only, as high-contrast distressed line art with a
rough halftone texture, like a worn silkscreen.

Lighting: soft key from the left with a subtle deep teal (#175A70) fill and a
faint red rim light on the right edge, echoing stage lighting. Fine 35 mm film
grain over the whole image.

Strictly four colours only: white, near-black #060606, teal #175A70, red
#B22425. No gradients, no other logos, no extra text anywhere on the garments,
no mockup watermarks, no people.
```

---

## B · Fita K7 + J-card

Referência direta do **mood06**: fita de shell transparente, fotografada de
frente, recortada sobre branco, com um pedaço de fita adesiva atravessado e
escrito à mão. Aqui a fita adesiva vira vermelha da marca.

O J-card usa a **aplicação negativa** do símbolo — lata branca sobre preto,
exatamente o `symbol-negative.svg` que já existe, sem vermelho. O vermelho da
peça fica todo na fita adesiva, que é onde ele funciona como acento.

Sem luz de palco neste: o mood06 é um recorte limpo de catálogo, e é o fundo
branco que faz o J-card preto saltar. Para a versão com luz azul e vermelha,
veja a nota no fim desta seção.

```
Straight-on flat product photograph of a clear transparent audio cassette and its
paper case insert, side by side on a pure white seamless background. Catalogue
cut-out lighting: even, frontal, no drop shadows, no perspective — shot dead-on.

LEFT — the cassette: a clear polystyrene shell with visible moulding detail, screw
posts and the transparent window; two black tape reels with pale hubs and exposed
pressure pad; a plain pale grey paper label strip behind the shell. A single strip
of deep red (#B22425) gaffer tape, with visible cloth weave and frayed torn ends,
is stuck across the left half of the cassette, running horizontally and wrapping
over the top and bottom edges. On the tape, "No. 9" is written by hand in thick
black marker, slightly crooked.

RIGHT — the J-card insert: a matte black (#060606) rectangle carrying one large
graphic printed in white ink only, as a negative. The graphic is a vintage
rectangular metal oil can seen from the front at a slight three-quarter angle:
its outline, screw cap, top carry handle and edge highlights are drawn in white
distressed screen-printed line art, while the body of the can is left as the black
of the card showing through. A large bold italic "No. 9" in white runs diagonally
across the face of the can, and a small diamond-shaped flammable icon in white
sits at the lower left. Along the bottom edge of the card, small white monospaced
type reads "OIL CAN No. 9". Nothing else, and no red anywhere on the card.

Texture: rough silkscreen with imperfect ink registration on the printed graphic,
visible uncoated paper grain on the black card, scuffs and fingerprints on the
plastic shell. Fine 35 mm film grain over the whole frame.

The only printed inks are white and near-black #060606, plus the deep red #B22425
of the gaffer tape — the clear plastic and the grey paper label are the only other
tones. No gradients, no other logos, no extra text, no people, no hands, no drop
shadows.
```

**Variante azul** — troque `deep red (#B22425)` por `deep teal (#175A70)` nas duas
menções da fita adesiva. A peça fica preto, branco e azul, sem vermelho nenhum.

---

## B2 · Fita K7 sobre o amplificador

Mesma peça do B, agora em contexto: em cima de um Vox AC30, sob luz azul e
vermelha. É o par da foto de catálogo — uma mostra o produto, a outra mostra
onde ele vive.

A descrição dos dois objetos é **idêntica à do prompt B, palavra por palavra**.
Isso é de propósito: é o que faz a lata e a fita adesiva saírem iguais nas duas
imagens. Se for mexer no J-card, mexa nos dois prompts juntos.

```
Photograph of a clear transparent audio cassette and its paper case insert on top
of a Vox AC30 guitar amplifier, in a dark rehearsal room at night.

THE AMPLIFIER: a classic Vox AC30 combo — black vinyl covering with a fine pebble
texture, a thick brown leather handle, chrome corner protectors, and the gold
control panel along the back edge of the top surface with a row of cream
chicken-head knobs. The top of its brown-and-gold diamond-pattern grille cloth is
just visible along the bottom edge of the frame, out of focus. The amp is scuffed
and gigged: worn edges, dust, a strip of old gaffer tape residue. Camera just in
front of the amp and slightly above it, looking down across the top panel, so the
panel fills most of the frame and the knobs sit behind the objects.

THE CASSETTE, lying flat on the amp's top panel: a clear polystyrene shell with
visible moulding detail, screw posts and the transparent window; two black tape
reels with pale hubs and exposed pressure pad; a plain pale grey paper label strip
behind the shell. A single strip of deep red (#B22425) gaffer tape, with visible
cloth weave and frayed torn ends, is stuck across the left half of the cassette,
running horizontally and wrapping over the top and bottom edges. On the tape,
"No. 9" is written by hand in thick black marker, slightly crooked.

THE J-CARD, propped upright against the amplifier's control panel behind the
cassette: a matte black (#060606) rectangle carrying one large graphic printed in
white ink only, as a negative. The graphic is a vintage rectangular metal oil can
seen from the front at a slight three-quarter angle: its outline, screw cap, top
carry handle and edge highlights are drawn in white distressed screen-printed line
art, while the body of the can is left as the black of the card showing through. A
large bold italic "No. 9" in white runs diagonally across the face of the can, and
a small diamond-shaped flammable icon in white sits at the lower left. Along the
bottom edge of the card, small white monospaced type reads "OIL CAN No. 9".
Nothing else, and no red anywhere on the card.

LIGHTING: a hard deep teal (#175A70) key raking in from the upper left and a deep
red (#B22425) rim light from the lower right, like a small club stage between
sets. Deep shadows, faint haze in the air, strong speculars on the clear plastic
and the chrome corners. Shallow depth of field — the cassette and card sharp, the
knobs and grille falling off. Heavy 35 mm film grain, slight halation on the
highlights, subtle vignette. Night-time, analog, unglamorous.

The only printed inks are white, near-black #060606 and the deep red #B22425 of
the gaffer tape. No gradients, no logos other than the amplifier's own, no extra
text, no people, no hands.
```

**Se o amp sair genérico** — acrescente no fim: `the amplifier must be clearly a
Vox AC30: gold control panel on top with chicken-head knobs, brown diamond-pattern
grille cloth, brown leather handle`.

**Se a luz comer os objetos** — a fita e o card precisam continuar legíveis.
Acrescente: `the cassette and the J-card stay evenly lit and fully readable; the
coloured lights fall on the amplifier and the background, not on the artwork`.

---

## C · Caixinha de palhetas

Ajustado a partir da primeira geração: caixa **retangular**, com o
**logotipo** na tampa em vez do símbolo, e palhetas **sem nada escrito** — só
cor sólida. Sem símbolo em cena, a peça nem entra na regra de coexistência.

```
Close-up product photograph of a small rectangular metal tin box with a hinged
flat lid, about 8 x 5 cm, open with the lid tilted back, guitar picks spilling
out across a scratched dark workbench surface with faint oil stains.

The lid is a flat deep red (#B22425) rectangle with rounded corners, carrying
one white graphic centred on it: a badge shaped like the label plate of a metal
jerry can, wider at the top with a gently curved bottom edge. Inside the badge,
the words "Oil Can" in a heavy geometric grotesque, and below them "No. 9" in
bold italic — both printed in white, as high-contrast distressed screen-printed
line art with rough halftone texture. No other graphic and no other text on the
lid.

The guitar picks are solid colours only — a mix of near-black, white and deep
teal — completely plain, with no text, no logo and no printing of any kind on
them. The tin body is bare brushed steel with visible scuffs and fingerprints.

Lighting: deep teal (#175A70) key from the upper left, hard red (#B22425) rim
light from the lower right, strong speculars on the brushed metal and the tin's
rounded edges. Shallow depth of field, heavy 35 mm film grain, slight vignette.
Feels like a photo taken backstage on a phone-sized flash, but sharp.

Strictly four colours only: white, near-black #060606, teal #175A70, red
#B22425. No gradients, no extra logos, no brand names other than the ones
described, no text on the picks, no people, no hands.
```

---

## Se o resultado sair errado

- **Duas camisas viraram uma só, ou a frente e as costas se misturaram** — gere
  em duas rodadas, uma por vez, cortando o prompt na metade.
- **Apareceu laranja, roxo ou dourado** — repita no fim: `only white, #060606,
  #175A70 and #B22425; no other hues anywhere`.
- **A cena ficou limpa demais** — reforce: `heavy analog film grain, dust,
  scratches, worn print, imperfect registration`.
- **O texto saiu embaralhado** — é esperado. Peça `no text at all` e componha a
  tipografia depois com os arquivos de `assets/logo/`.
