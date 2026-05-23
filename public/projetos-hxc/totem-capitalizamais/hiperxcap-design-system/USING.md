# hiperxcap · Design System kit

Conteúdo deste arquivo:

- **tokens.css** — variáveis CSS prontas. Copie o bloco `:root { ... }` direto pro seu projeto (geralmente em `src/styles/tokens.css` ou similar) e importe antes de tudo.
- **tokens.json** — mesmos tokens em formato declarativo. Use em build systems, geradores de tipo, design pipelines.
- **README.md** — referência completa de uso (quando publicada).
- **USING.md** — este arquivo.

## Uso rápido em projeto novo

```css
/* src/styles/global.css */
@import './tokens.css';

.minha-button {
  background: var(--orange-500); /* HiperXCAP */
  /* ou */
  background: var(--ds-color-brand-yellow); /* Apcap */
}
```

## Mantendo sincronizado

Esses arquivos são gerados automaticamente a partir do CSS do hub do
Design System a cada release. Quando o time de DS atualiza um token,
o próximo download desse kit já vem com o valor novo.

Versão gerada em: 2026-05-22T22:44:40.883Z
