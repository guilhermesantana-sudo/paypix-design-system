# Logos dos produtos

Coloque aqui os arquivos de logo (SVG preferencialmente, PNG funciona).

## Como nomear

Use o slug do produto (mesmo nome da pasta do DS quando existir):

- `apcap.svg`
- `iadm.svg`
- `paypix.svg`  (já existe via `/assets/sprite.svg#paypix-mono`)
- `hiperxcap.svg`

## Como referenciar no card do hub

Dentro do `<div class="client-card__logo client-card__logo--<slug>">` em
`index.html`, troque o texto-placeholder por:

```html
<img src="/logos/apcap.svg" alt="Apcap da Sorte">
```

O CSS já cuida do tamanho (44×44 com `object-fit: contain`).

## Dicas

- SVG sem viewport fixo cresce sozinho — exporte com viewBox.
- Para logos monocromáticos use `fill="currentColor"` no SVG e a cor
  segue o token `--brand` do card.
- Fundo do quadrado já tem tint da marca; logos com transparência
  funcionam melhor.
