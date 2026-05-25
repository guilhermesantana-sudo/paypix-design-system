# L4 Design System — HiperXCAP

Guia técnico das telas e tokens em desenvolvimento no workspace **Projetos HXC**. Documento destinado a desenvolvedores que vão implementar, manter ou consumir essas telas em produção.

- **Stack**: Vite + HTML/CSS/JS vanilla (sem framework no shell). Telas individuais podem carregar React via CDN (caso do Totem Capitaliza+).
- **Idioma**: pt-BR em todo o copy.
- **Tema padrão**: dark (azul-marinho HiperXCAP). Não há toggle global de light/dark — cada tela trava sua paleta.
- **Workspace**: [public/projetos-hxc/](public/projetos-hxc/) (renderizado em [/projetos-hxc/](public/projetos-hxc/index.html))
- **Hub de produtos**: [index.html](index.html)

---

## 1. Tokens (CSS Variables)

Todos os tokens vivem em [css/variables.css](css/variables.css) e são expostos como custom properties no `:root`. **Sempre consumir via `var(--token)`** — não usar hex literal em componentes novos.

### 1.1 Cores da paleta

| Token | Hex | Uso |
|---|---|---|
| `--blue-500` | `#0166B3` | Azul de marca (links, info, gradient) |
| `--blue-900` | `#1A2F51` | Azul escuro — fundo de seções dark, texto sobre claro |
| `--blue-950` | `#0C1628` | Quase preto — sidebar, fundos premium |
| `--orange-500` | `#F39208` | **Cor de destaque principal** — CTAs, glow, marca HXC |
| `--orange-300` | `#F8AF4F` | Variante mais clara — labels sobre dark |
| `--gray-100` | `#EEEEEE` | Fundo neutro de seções claras |
| `--coral-500` | `#EF7E5A` | Live/urgência |
| `--coral-300` | `#F4A495` | Variante suave |
| `--yellow-500` | `#F0B909` | Workspace de projetos (amarelo só nesse contexto) |
| `--beige-500` | `#DBC69E` | Suporte/neutro quente |
| `--green-500` / `--green-300` | `#A7C945` / `#B6D37B` | Sucesso, acerto, social |
| `--teal-500` | `#54BBAB` | Reporta, info secundária |
| `--lavender-500` | `#B4B3BC` | Borda neutra de inputs |
| `--purple-500` | `#B26F9A` | Perigo, erro, miss |
| `--skyblue-500` | `#9ED7EB` | New, iAdm, info |
| `--white` / `--black` | `#FFFFFF` / `#000000` | Bases |

> **Regra**: vermelho puro **não existe** no DS. Use `--purple-500` para perigo/erro.

### 1.2 Feedback semântico

```css
--fb-success: #A7C945   --fb-success-bg: rgba(167,201,69,0.12)
--fb-danger:  #B26F9A   --fb-danger-bg:  rgba(178,111,154,0.14)
--fb-warning: #F39208   --fb-warning-bg: rgba(243,146,8,0.12)
--fb-info:    #9ED7EB   --fb-info-bg:    rgba(158,215,235,0.14)
--fb-special: #EF7E5A   --fb-special-bg: rgba(239,126,90,0.14)
```

### 1.3 Glows e gradientes

Sempre derivados da paleta — nunca inventar cor nova num glow.

```css
--glow-orange       /* destaque principal — usar com moderação */
--glow-orange-sm    /* versão menor — chips, badges, inputs em foco */
--glow-blue
--glow-coral
--glow-green
--glow-purple

--grad-blue:    linear-gradient(135deg, #0166B3, #1A2F51)
--grad-orange:  linear-gradient(135deg, #F39208, #F8AF4F)
--grad-deep:    linear-gradient(180deg, #1A2F51, #0166B3)
--grad-special: linear-gradient(135deg, #B26F9A, #EF7E5A)
```

### 1.4 Tipografia

```css
--font-display: 'Bitner', 'Poppins', 'Helvetica Neue', Arial, sans-serif
--font-body:    'Poppins', -apple-system, BlinkMacSystemFont, sans-serif
```

| Uso | Fonte | Estilo | Peso |
|---|---|---|---|
| Títulos display (hero, section, prêmios) | `--font-display` | italic | 800 |
| Corpo, parágrafo, botões | `--font-body` | normal | 400–700 |
| Eyebrows / labels | `--font-body` | normal | 700 + uppercase + `letter-spacing: 0.08–0.14em` |
| Código, tokens, hex | `'SF Mono', Monaco, monospace` | — | 500–600 |

**Regra crítica do HXC**: `--font-display` só pode ser usada em texto ≥ 14px. Para corpo pequeno, forçar `var(--font-body)` (há `!important` em algumas telas para impedir vazamento).

### 1.5 Raios, espaçamento, sombras

```css
/* Raios — sutis, NÃO pílula */
--r-sm: 6px    /* chips, badges, inputs pequenos */
--r-md: 10px   /* botões, cards, inputs */
--r-lg: 14px   /* containers grandes */
--r-xl: 20px   /* hero blocks */

/* Sombras */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.10)
--shadow-md: 0 4px 12px rgba(0,0,0,0.18)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.22)
```

### 1.6 Acessibilidade

`prefers-reduced-motion: reduce` zera todas as durações de animação/transição. Toda animação nova **deve** respeitar isso por herança (não usar `!important` em duration).

---

## 2. Componentes do DS

Definidos em [css/components.css](css/components.css). Use as classes diretamente — não recriar variantes inline.

### 2.1 Botões — `.btn`

Cantos sutis (`--r-md`), altura mínima 48px, sombra "pressionada" estilo arcade (deslocamento Y no `:active`).

| Classe | Função |
|---|---|
| `.btn-primary` | CTA principal — gradiente laranja, sombra pesada |
| `.btn-secondary` | Azul de marca |
| `.btn-outline` | Borda azul, transparente |
| `.btn-success` | Verde (acerto, finalizar) |
| `.btn-danger` | Roxo (cancelar, deletar) |
| `.btn-ghost` | Sem fundo, hover sutil |
| `.btn-link` | Link sublinhado |

Tamanhos: `.btn--sm` (40px), default (48px), `.btn--lg` (56px), `.btn--xl` (64px). Block: `.btn--block`.
Estado pulsante (CTA crítico): `.btn--pulsing`.
Focus: `outline: 3px solid var(--orange-500)` (acessibilidade obrigatória).

### 2.2 Cards — `.demo-card`

Estrutura: `.demo-card__eyebrow` + `.demo-card__title` + `.demo-card__body` (+ `.demo-card__value` para destaque numérico).

Variantes (todas usam tokens, sem cor crua):
- `.demo-card--neon` — fundo navy + glow laranja + shine animado
- `.demo-card--premium` — gradient deep + shine sutil
- `.demo-card--prize` — laranja sólido + watermark "HXC" enorme atrás
- `.demo-card--featured` — gradient especial + shimmer
- `.demo-card--coral` / `--teal` / `--green` / `--skyblue` / `--beige` / `--dark` / `--orange` — variantes sólidas da paleta
- `.demo-card--outline-white` / `--outline-dashed` — estados vazios

Adaptação automática a `.section--dark` / `.section--blue` (eyebrow vira `--orange-300`, fundo fica translúcido).

### 2.3 Badges — `.badge`

`6px 12px`, uppercase, `letter-spacing: 0.08em`. Variantes: `--prize`, `--featured`, `--live`, `--new`, `--social`, `--outline`. Para "ao vivo" usar `.badge-dot` interno com animação blink.

### 2.4 Alertas inline — `.alert`

Borda lateral grossa (`border-left: 4px`), ícone à esquerda em `.alert__icon`, conteúdo em `.alert__content` com `__title` + `__body`. Variantes: `--success`, `--danger`, `--warning`, `--info`, `--special`.

### 2.5 Inputs — `.field`

```html
<div class="field">
  <label class="field__label">CPF</label>
  <input class="field__input" type="text">
  <span class="field__hint">Apenas números</span>
</div>
```

Altura 52px, borda 2px lavender, foco vira `--orange-500` + glow. Erro: `.field__input--error` + `.field__error`.

### 2.6 Cartelas / dezenas — `.cartela`

Tabuleiro 5×4 (números 1–20) usado pelo Surpresinha e variantes.

Estados de cada `.dezena`:
- `.is-chosen` — laranja (escolhida pelo usuário)
- `.is-drawn` — azul + check no canto (sorteada)
- `.is-hit` — verde + pulso (acerto)
- `.is-miss` — roxo opaco 65% (erradas no fim do sorteio)

Chips de status do tabuleiro: `.cartela__chip--idle | --ready | --live | --result`.

### 2.7 Cupom / bilhete — `.coupon`

Visual de bilhete arcade com recortes laterais via mask radial. Variantes `--dark`, `--gradient`, `--shine` (com shimmer). Selo em `.coupon__seal` (rotacionado 8°), variantes `--new` / `--featured`.

### 2.8 Loaders

- `.spinner` (44px, top-color laranja) — variantes `--blue`, `--purple`
- `.loading-dots` (3 bolas pulando, alternando laranja/coral/roxo)
- `.skeleton` (shimmer linear) — `.skeleton--short` para 60% width

### 2.9 Logo institucional — `.logo-frame`

Padrão obrigatório para exibir logos institucionais (Hospital de Amor, Caixa Capitalização) — sempre em moldura branca arredondada para garantir legibilidade contra o tema dark.

```html
<span class="logo-frame logo-frame--sm">
  <img src="/logos/hospital-de-amor.png" alt="Hospital de Amor">
</span>
```

Variantes:
- `.logo-frame--sm` — altura 44px, uso inline (banners curtos, lista de parceiros).
- `.logo-frame--md` — altura 72px, uso hero/destaque ("Título emitido pela …").

Regra: **nunca** colocar essas logos direto no fundo navy — sempre em `.logo-frame`. O recorte branco vem do componente, não da imagem.

### 2.10 Hub L4 — `.hub-nav` + `.client-card`

Cards do hub principal ([index.html](index.html)). Cada cliente tem `--brand` (RGB triplet) injetada via CSS var local, e o hover pinta border/box-shadow nessa cor.

Variantes: `--paypix`, `--iadm`, `--apcap`, `--projetos` (amarelo, destacado), `--soon` (dashed, em construção).

---

## 3. Padrões de layout

Definidos em [css/layout.css](css/layout.css).

### 3.1 Estrutura geral (`.layout`)

```
┌──────────┬─────────────────────────┐
│ sidebar  │  .main                  │
│ 280px    │   .hero                 │
│ sticky   │   .section--light/--dark│
│          │   .section--gray/--blue │
│          │   .footer               │
└──────────┴─────────────────────────┘
```

Mobile (≤1024px): sidebar vira drawer, abre via `.menu-toggle` (canto sup. direito, círculo laranja).

### 3.2 Seções com tema alternado

- `.section--light` — branco, texto navy
- `.section--gray` — `--gray-100`, texto navy
- `.section--dark` / `.section--blue` — gradient radial + navy, texto branco, eyebrows laranja-300

`.section__header` + `.section__number` (badge laranja pequeno) + `.section__title` (display italic, com chanfro shadow em temas escuros) + `.section__lead`.

Subseção: `.subsection__title` tem barra lateral laranja com glow via `::before`.

### 3.3 Hero (`.hero`)

Padrão dark com pontos decorativos via background-radial-gradient. `.hero__title em` recebe glow laranja pesado em camadas (4 níveis de blur). Usar com parcimônia — efeito caro de pintura.

### 3.4 Footer (`.footer`)

Navy escuro, borda topo laranja sutil. `.footer__brand em` em laranja para destaque do nome.

### 3.5 Print / PDF

`@media print` força A4, preserva tema dark do DS (não inverter para branco). Esconde sidebar/menu/back-to-top. Ativado por `?download=1` na URL — disparado pelo botão "Baixar PDF" do hub.

---

## 4. Telas do workspace

Listadas em [public/projetos-hxc/index.html](public/projetos-hxc/index.html). Cada tela é HTML standalone (não compartilha JS/CSS entre si — copy by reference, não import). Estilos inline em `<style>` no `<head>`.

### 4.1 Ecosistema HXC

#### Landing Lotérico — [landing-loterico.html](public/projetos-hxc/ecosistema-hxc/landing-loterico.html)

- **Propósito**: página de captura mobile-first do canal lotérico. Fluxo 2-step: (1) WhatsApp → (2) Pix com QR.
- **Container**: max 480px, fundo navy `#0C1628` com gradientes radiais.
- **State machine**: `body[data-step="1|2"]` + `data-has-phone="yes|no"` controla qual card aparece. Sem rota.
- **Componentes próprios** (não reusam DS): `.card`, `.loterico-block`, `.promo-banner`, `.submit-btn`, `.phone-modal-card`, `.wa-field`, `.qr-stage` (com 3 `.qr-halo` em pulso), `.pix-copy-block`, `.ct-modal` (consulta de títulos), `.ct-draw`, `.ct-item` (color-coded: gold = R$10, teal = R$5).
- **JS**: vanilla, sem deps. Máscara de telefone live. Clipboard API com fallback `execCommand`. Validação CPF com check-digit (CPFs demo `12345678900` e `11122233344` passam direto).
- **Modais**: `.phone-modal` (z 9000) + `.ct-modal` (z 9500). Cuidado ao adicionar overlay novo.
- **Mock**: `LOTERICO_MOCK` + `MOCK_DB` hardcoded no JS. Sem integração de API; todos delays são `setTimeout`.
- **Gotcha**: 3100+ linhas de CSS inline no `<style>`. Se for migrar para projeto produtivo, extrair primeiro.

#### App Web · Surpresinha — [appweb_surpresinha.html](public/projetos-hxc/ecosistema-hxc/appweb_surpresinha.html)

- **Propósito**: SPA do produto Surpresinha (jogada do HiperXCAP). Mais complexa do workspace (10k+ linhas).
- **Screens** (state machine via `.hidden` em `#home, #state-1..5, #state-pay`):
  1. `home` — picker de tema + scenario buttons
  2. `state-1` — pré-pagamento (cartela travada, qty selector, Pix prompt)
  3. `state-2` — pós-pagamento com confetti, balls em cascata, Giro animado
  4. `state-3` — view repetida (mesma layout, sem celebração)
  5. `state-4` — pós-sorteio: ganhou (acertos highlight, prêmio)
  6. `state-5` — pós-sorteio: não ganhou (CTA retry + Hospital de Amor)
  7. `state-pay` — QR flip 3D + copy Pix
- **Temas**: `body.theme-orange` (default) e `body.theme-blue` — swap de CSS vars. **SVGs com gradient definido inline NÃO atualizam no toggle** (cuidado: lock SVG é hardcoded por tema).
- **Componentes-chave**: `.globo-grid` (10×2 = 20 cells), `.giro-card` (7 dígitos slot), `.qty-selector` (1×/2×/5×/10× + stepper), `.lock-stage` (jiggle + sonar + float coins), `.pay-card`, `.bm-overlay` (modal Buy More).
- **Animações sequenciadas**: cada `.dezena` tem `animation-delay` inline próprio. Tirar um delay quebra o efeito cascata.
- **Confetti**: `#confetti-2` é destruído/recriado a cada entrada em state-2 (DOM trick para re-disparar JS).
- **QR Pix**: SVG decorativo hand-coded. Substituir por encoder real antes de produção.
- **Preço dinâmico**: `data-money="unit"` walks no DOM. Adicionou screen nova? Anota o marker.
- **A11y**: `aria-live`, `role="dialog"`, `inputmode="numeric"`. Falta focus-trap nos modais.
- **Perf gotcha**: todos os 6 screens ficam no DOM (só `.hidden`). Em device fraco pode travar nas animações pesadas do state-2.

#### Totem (Ecosistema) — [totem.html](public/projetos-hxc/ecosistema-hxc/totem.html)

- **Propósito**: interface vertical touchscreen para PDV lotérico. Fluxo 7-screens (attract → catalog → quantity → phone → payment → sending → success).
- **Viewport**: `viewport-fit=cover, user-scalable=no, touch-action: manipulation` — fullscreen kiosk.
- **Idle timer**: 90s auto-reset (exceto attract/sending/success).
- **Catalog**: grid 3-col. Cards locked recebem `::before` "EM BREVE" rotacionado 38° no canto. Banner é `<img>` full-width (`.catalog-card-prize--banner`); legacy icon/info ficam `display:none` mas com IDs preservados para JS data-binding — não remover.
- **Qty cards**: grid 4-col, selected ganha `::before` checkmark gold no topo. Bump animation (`scale 1→1.15→1` em 400ms) ao trocar qty.
- **Phone**: máscara `(XX) X XXXX-XXXX`, digits armazenados puros.
- **Success**: Fisher-Yates partial shuffle 60 → N para dezenas; random 7-digit para giro. Balls staggered 35ms × index.
- **Sending**: timeline `200ms → 2900ms → 5200ms` (com phone) ou `→ 3500ms` (sem phone). Stacks de `setTimeout`.
- **Tema**: navy locked (sem toggle). Tokens de [css/design-system.css](apcap/css/design-system.css) importado externamente.
- **Modal "Consultar Títulos"**: `.ct-modal` similar à da landing — CPF + math captcha.
- **Sem breakpoint tablet/desktop** — projetado para totem 16:9 portrait.
- **Notas recentes** (commits): logo agora vive no header do card (não dentro do banner), banner full-width, tag "EM BREVE" centralizada na diagonal, APCAP + ValeCap adicionados como locked.

### 4.2 Totem Capitaliza+

#### App do Totem — [totem-capitalizamais/index.html](public/projetos-hxc/totem-capitalizamais/index.html)

- **Stack**: SPA React via CDN (React 18.3.1 + Babel standalone, sem build step). Carrega `shared.jsx` → `screens/*.jsx` → `app.jsx` em ordem.
- **Telas**: Intro, Produtos, Logar, Resumo, Pix, Cartão, Loading, Sucesso, Enviando, QrFinalizar, PixRecusado.
- **Tema**: HiperXCAP dark — gradient `#0166B3 → #1A2F51 → #0C1628`, acentos `#F39208`.
- **Layout**: full-screen, botões oversized (~6.4vh), cards 20vh, units em vh/vw (kiosk lock).
- **Fontes**: Poppins (body), Montserrat (headings), Nunito (números), Space Grotesk (UI).
- **Tokens**: carrega `hiperxcap-design-system/tokens.css` — mas também define `#F39208` hardcoded em alguns pontos. **Unificar com `var(--orange-500)` antes de produção.**
- **Dados**: hardcoded inline. Sem API.

#### Dashboard — [totem-capitalizamais/dashboard.html](public/projetos-hxc/totem-capitalizamais/dashboard.html)

- **Propósito**: painel de operação/gestão do PM. Backlog + sprints + kanban + KPIs + design system reference.
- **Stack**: vanilla JS + localStorage (`cap-pm-v2`). 50+ tarefas mock no `const TASKS = [...]`.
- **Abas**: Dashboard, Kanban, Backlog, Sprints, Analytics, Riscos, Design System.
- **Tema PRÓPRIO** (não usa HXC tokens): vars locais `--bg-0`, `--bg-card`, `--line`, etc. Cor primária amarelo `#ffd600`. **Divergência intencional do DS HXC** — é ferramenta de PM, não produto.
- **Componentes locais**: KPI card (barra lateral colorida), progress bars gradient, status pills (todo/doing/review/done), kanban 4-col drag-drop, tabela com busca/filtros, risk cards, timeline updates.
- **CRUD**: modal de tarefa + drag-drop kanban. Funções centrais: `load()`, `persist()`, `agg()`, `renderDashboard()`, `cycleStatus()`.

---

## 5. Convenções

### 5.1 Naming CSS

- **DS oficial** (em `css/`): BEM-like com hífen — `.component__element--modifier`. Modifiers de estado começam com `is-` (ex.: `.dezena.is-hit`, `.sidebar.is-open`).
- **Telas standalone do workspace**: cada tela usa prefixo próprio (ex.: `.ph-*` no workspace index, `.ct-*` no modal de consulta, `.qty-*` no totem). **Não há cross-import**; cada arquivo é fechado.
- **Estados via data-attribute**: `data-step`, `data-screen`, `data-variant`, `data-has-phone`, `data-qty`. Preferir data-attr a múltiplas classes para state machine.

### 5.2 Naming JS

- Funções camelCase com prefixo de domínio: `ctOpen()`, `ctSubmit()` (consulta-títulos), `selectQty()`, `regeneratePixCode()`, `navTo(id)`.
- IIFE para encapsular state local (padrão no totem).
- Sem dependências externas além de JSZip (kit ZIP do hub) e React CDN (Totem Capitaliza+).

### 5.3 Assets

- **Logos**: `/logos/*.png` (paypix, apcap, iadm) e `/logos/hiperxcap.svg`. Sempre referenciar com path absoluto (`/logos/...`), não relativo.
- **Banners**: `/banners/Home_*.png` — slots marcados com `data-banner-slot="..."` para troca dinâmica.
- **SVG sprite**: `/assets/sprite.svg` — carregado via `fetch` no hub e injetado em `#svg-sprite` no body. Use `<svg><use href="#icon-name"/></svg>` para referenciar.
- **Fontes**: Poppins via Google Fonts (`ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,800`). Bitner é fallback para Poppins quando não disponível.

### 5.4 Animações

Catálogo em [css/variables.css](css/variables.css) (final do arquivo):

`pulse-glow`, `blink`, `shimmer`, `spin`, `float-up`, `ticker`, `confetti-fall`, `scale-pop`, `check-draw`, `circle-draw`, `flip-x`, `ripple`, `coin-flip`, `scratch-reveal`, `shake`, `glow-breath`, `border-trace`, `badge-shine`, `ball-drop`, `mark-stamp`, `hit-pulse`, `ppa-text-in`, `surface-shine`, `glow-pulse-border`.

**Não criar keyframe novo se já existe variante** — reutilizar e ajustar via wrapper class.

### 5.5 Tokens consumíveis externos

O hub gera um kit ZIP por download:
- `/tokens/hiperxcap.css` — `:root { ... }` standalone para colar em outro projeto.
- `/tokens/hiperxcap.json` — mesmos tokens em JSON declarativo.
- `/downloads/hiperxcap.md` — README de uso.

Gerado pelo plugin `tokens-export` no build do Vite. Atualiza automaticamente quando `variables.css` muda.

---

## 6. Como rodar local

```bash
npm install
npm run dev      # Vite dev server, abre o hub em /
```

Telas do workspace ficam em `/projetos-hxc/`. Abrir cada uma em aba nova (target `_blank`) — ajustes nos arquivos `.html` refletem direto via HMR do Vite.

Para gerar PDF de uma tela do DS oficial: `<url>?download=1` (abre, espera fontes/imagens carregarem, dispara `window.print()`).

---

## 7. Checklist pra implementar uma tela nova

- [ ] Importa `variables.css` → `layout.css` → `components.css` → `animations.css` nessa ordem.
- [ ] Usa apenas tokens da paleta — `var(--token)` em todos os hex.
- [ ] Display font (`--font-display`) só em texto ≥ 14px.
- [ ] Raios entre `--r-sm` e `--r-xl` — nada de pílula (`border-radius: 999px` apenas em chips muito pequenos como `.badge-dot`).
- [ ] Botão tem altura mínima 48px e estado focus visível.
- [ ] Modais respeitam hierarquia de z-index (consulta o que já existe na tela antes de chumbar valor).
- [ ] Animação custosa (glow heavy, shimmer infinito) **opt-in** — não aplicar global.
- [ ] Texto pt-BR com acentuação correta. Sem placeholders em inglês escapando.
- [ ] Mobile: testar em ≤480px, ≤768px e ≤1024px (breakpoints do DS).
- [ ] `prefers-reduced-motion` respeitado por herança (sem `!important` em duration).
