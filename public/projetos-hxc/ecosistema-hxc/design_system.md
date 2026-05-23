# HiperXCAP — Design System para Desenvolvedores

> Gerado a partir do design system oficial em paypix-design-system.vercel.app/hiperxcap/  
> Plataforma de pagamentos: **PayPix** · Emissor: **CAIXA Capitalização** · Causa: **Hospital de Amor**

---

## Contexto do produto

**HiperXCAP** é um Título de Capitalização da Modalidade Filantropia Premiável.  
- Sorteios semanais ao vivo na RedeTV! (quintas, 21h30)
- Regulado pela SUSEP, emitido pela CAIXA Capitalização
- Parte do valor é cedida como doação ao Hospital de Amor
- Pagamento via Pix — processado pela plataforma **PayPix**

---

## Tokens de design

### Cores — variáveis CSS

```css
/* Primárias */
--blue-500:     #0166B3   /* fundo principal da interface */
--blue-900:     #1A2F51   /* seções premium, surfaces escuras */
--blue-950:     #0C1628   /* sidebar navigation — mais escuro para criar contraste com seções */
--orange-500:   #F39208   /* CTA principal, destaques, glow */
--orange-300:   #F8AF4F   /* hover do laranja, textos em fundo escuro */
--gray-100:     #EEEEEE   /* fundo de seções claras alternadas */

/* Secundárias */
--coral-500:    #EF7E5A   /* "ao vivo", evento em andamento */
--coral-300:    #F4A495
--yellow-500:   #F0B909   /* APENAS gráficos — NUNCA em vestimentas/pessoas */
--beige-500:    #DBC69E   /* conteúdo educativo, histórico */
--green-500:    #A7C945   /* sucesso, impacto social, confirmações */
--green-300:    #B6D37B
--teal-500:     #54BBAB   /* histórico, institucional alternativo */
--lavender-500: #B4B3BC   /* bordas de input no estado normal */
--purple-500:   #B26F9A   /* erro/falha (substitui vermelho), destaque raro */
--skyblue-500:  #9ED7EB   /* informações, lembretes */

/* Neutros */
--white:        #FFFFFF
--black:        #000000
```

### Distribuição de uso (regra 70/20/8/2)

| Cor | % | Uso |
|-----|---|-----|
| `--blue-500` | 70% | Estrutura principal, fundos |
| `--blue-900` | 20% | Profundidade, superfícies premium |
| `--orange-500` | 8% | CTAs, highlights, badges de prêmio |
| `--purple-500` | 2% | Erros, destaque especial (uso muito raro) |

### Feedback semântico

```css
--fb-success:     #A7C945   /* verde */
--fb-success-bg:  rgba(167, 201, 69, 0.12)
--fb-danger:      #B26F9A   /* roxo — NUNCA vermelho */
--fb-danger-bg:   rgba(178, 111, 154, 0.14)
--fb-warning:     #F39208   /* laranja da marca */
--fb-warning-bg:  rgba(243, 146, 8, 0.12)
--fb-info:        #9ED7EB   /* azul-céu */
--fb-info-bg:     rgba(158, 215, 235, 0.14)
--fb-special:     #EF7E5A   /* coral */
--fb-special-bg:  rgba(239, 126, 90, 0.14)
```

### Gradientes oficiais

```css
--grad-blue:    linear-gradient(135deg, #0166B3 0%, #1A2F51 100%)
--grad-orange:  linear-gradient(135deg, #F39208 0%, #F8AF4F 100%)
--grad-deep:    linear-gradient(180deg, #1A2F51 0%, #0166B3 100%)
--grad-special: linear-gradient(135deg, #B26F9A 0%, #EF7E5A 100%)
```

### Glows e sombras

```css
--shadow-sm:      0 1px 3px rgba(0,0,0,0.10)
--shadow-md:      0 4px 12px rgba(0,0,0,0.18)
--shadow-lg:      0 8px 24px rgba(0,0,0,0.22)

--glow-orange:    0 0 24px rgba(243,146,8,0.55), 0 0 48px rgba(243,146,8,0.20)
--glow-orange-sm: 0 0 12px rgba(243,146,8,0.40)
--glow-blue:      0 0 16px rgba(1,102,179,0.55)
--glow-coral:     0 0 16px rgba(239,126,90,0.50)
--glow-green:     0 0 14px rgba(167,201,69,0.50)
--glow-purple:    0 0 16px rgba(178,111,154,0.50)
```

> **Regra crítica:** máximo 1 elemento com glow ativo por viewport.

---

## Tipografia

### Famílias

| Variável | Família | Uso |
|----------|---------|-----|
| `--font-display` | Bitner, Poppins (fallback) | Headlines, títulos, valores de prêmio — **sempre Extra Bold Italic** |
| `--font-body` | Poppins | Texto corrido, UI, botões — pesos 400/500/600/700 |

### Escala tipográfica

| Token | Tamanho | Uso |
|-------|---------|-----|
| `text-xs` | 12px | Legal text, captions |
| `text-sm` | 14px | Texto auxiliar |
| `text-base` | **16px** | Body padrão (mínimo para leitura) |
| `text-lg` | 18px | Texto em destaque |
| `text-xl` | 20px | Subtítulos pequenos |
| `text-2xl` | 24px | Títulos de card |
| `text-3xl` | 32px | Títulos de seção |
| `text-4xl` | 44px | Títulos de página |
| `text-5xl` | 60px | Hero principal |
| `text-6xl` | 80px | Valores de prêmio (com gradient laranja) |

```css
/* Padrão para valor de prêmio em destaque */
font-family: var(--font-display);
font-style: italic;
font-weight: 800;
font-size: clamp(60px, 8vw, 80px);
background: var(--grad-orange);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

---

## Espaçamento (sistema 8pt)

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

## Raios de borda

```css
--r-sm: 6px    /* chips, badges, selos */
--r-md: 10px   /* botões, inputs, cards */
--r-lg: 14px   /* mockups, modais */
--r-xl: 20px   /* destaques especiais */
```

> **Proibido:** border-radius acima de 20px (pílulas extremas não fazem parte da identidade).

---

## Componentes — uso correto

### Botões

```html
<!-- Primário: 1 por tela, sempre laranja -->
<button class="btn btn-primary">Garanta seu título</button>
<button class="btn btn-primary btn--lg btn--pulsing">Concorrer agora</button>

<!-- Secundário: ações de suporte -->
<button class="btn btn-secondary">Entrar</button>

<!-- Outline: ação alternativa -->
<button class="btn btn-outline">Como funciona</button>

<!-- Sucesso -->
<button class="btn btn-success">Confirmar pagamento</button>

<!-- Crítico (ROXO — nunca vermelho) -->
<button class="btn btn-danger">Cancelar pedido</button>

<!-- Terciários -->
<button class="btn btn-ghost">Voltar</button>
<button class="btn btn-link">Ler regulamento</button>
```

**Regras:**
- Altura mínima: `48px` (WCAG AAA)
- Texto: **uma linha, sem subtítulo**
- Animação pulsing: só no CTA mais importante da tela
- `btn--sm`: 40px · `btn--lg`: 56px · `btn--xl`: 64px

### Cards

| Classe | Fundo | Uso |
|--------|-------|-----|
| `.demo-card` | Branco | Informação padrão |
| `.demo-card--dark` | `--blue-900` | Dado do usuário, título ativo |
| `.demo-card--neon` | `--blue-900` + glow | Destaque escuro |
| `.demo-card--premium` | `--grad-deep` | Institucional |
| `.demo-card--prize` | `--grad-orange` + glow | Valor de prêmio |
| `.demo-card--featured` | `--grad-special` | Evento especial |
| `.demo-card--coral` | `--coral-500` | "Ao vivo" |
| `.demo-card--green` | `--green-500` | Impacto social |
| `.demo-card--skyblue` | `--skyblue-500` | Lembrete/info |
| `.demo-card--outline-dashed` | Transparente | Estado vazio |

### Badges

```html
<span class="badge badge--prize">Prêmio</span>
<span class="badge badge--live"><span class="badge-dot"></span> Ao vivo</span>
<span class="badge badge--new">Novo</span>
<span class="badge badge--social">Hospital de Amor</span>
<span class="badge badge--featured">Em destaque</span>
<span class="badge badge--outline">Institucional</span>
```

### Alerts / Toasts

```html
<div class="alert alert--success">
  <div class="alert__icon">✓</div>
  <div class="alert__content">
    <div class="alert__title">Pagamento confirmado</div>
    <div class="alert__body">Seu título nº 10.760.046 está ativo.</div>
  </div>
</div>
```

Variantes: `alert--success` · `alert--danger` · `alert--warning` · `alert--info` · `alert--special`

### Inputs

```html
<div class="field">
  <label class="field__label">CPF</label>
  <input class="field__input" type="text" placeholder="000.000.000-00" />
  <span class="field__hint">Como no seu documento</span>
</div>

<!-- Erro -->
<input class="field__input field__input--error" type="text" />
<span class="field__error">⚠ CPF inválido.</span>
```

**Especificações:** altura `52px`, fonte `16px` (evita zoom no iOS), borda `--lavender-500` no normal, `--orange-500` no foco.

### Loadings

```html
<div class="spinner"></div>                          <!-- padrão laranja -->
<div class="spinner spinner--blue"></div>
<div class="loading-dots"><span></span><span></span><span></span></div>
<div class="skeleton"></div>
<div class="skeleton skeleton--short"></div>
```

---

## Cartela de dezenas

Estados do componente `.dezena`:

| Classe | Cor | Significado |
|--------|-----|-------------|
| _(nenhuma)_ | Cinza translúcido | Não escolhida |
| `.is-chosen` | `--orange-500` | Palpite do usuário |
| `.is-drawn` | `--blue-500` | Sorteada (não estava no palpite) |
| `.is-hit` | `--green-500` | Acerto (escolhida + sorteada) |
| `.is-miss` | `--purple-500` opaco | Erro (escolhida + não sorteada) |

```html
<div class="cartela__grid">
  <div class="dezena is-chosen">2</div>
  <div class="dezena is-hit">5</div>
  <div class="dezena is-drawn">7</div>
  <div class="dezena is-miss">14</div>
</div>
```

Grid fixo: **5 colunas × 4 linhas** = 20 dezenas. Mínimo 44×44px por dezena (alvo de toque WCAG AAA).

---

## Cupons / bilhetes

```html
<div class="coupon coupon--dark">
  <div class="coupon__stub">
    <span class="coupon__stub-label">Nº</span>
    <span class="coupon__stub-num">046</span>
  </div>
  <div class="coupon__divider"></div>
  <div class="coupon__body">
    <div class="coupon__brand">HiperXCAP · Título</div>
    <div class="coupon__value">R$ 15,00</div>
    <div class="coupon__meta">
      <div class="coupon__meta-item">
        <span class="coupon__meta-label">Sorteio</span>
        <span>Qui · 21h30</span>
      </div>
    </div>
  </div>
</div>
```

Variantes: `.coupon` (claro) · `.coupon--dark` · `.coupon--gradient` · Selos: `.coupon__seal` · `.coupon__seal--new` · `.coupon__seal--featured`

---

## Componentes de gamificação

Componentes específicos para fluxos de sorteio, compra de títulos e premiação. Todos usam exclusivamente os tokens do design system — nenhuma cor nova.

---

### Stack de prêmios (`.premio-stack`)

Hierarquia visual de prêmios com tiers `--gold`, `--silver` e `--base`.

```html
<div class="premio-stack">
  <div class="premio-row premio-row--gold">
    <div class="premio-row__icon"> <!-- ícone SVG --> </div>
    <div class="premio-row__info">
      <span class="premio-row__cat">1º Prêmio</span>
      <div class="premio-row__value">R$ 10.000</div>
    </div>
    <span class="premio-row__badge premio-row__badge--new">Novo</span>
  </div>
  <!-- premio-row--silver, premio-row--base -->
</div>
```

**Badges de estado:**

| Classe | Cor | Uso |
|--------|-----|-----|
| `--new` | coral | Prêmio novo neste sorteio |
| `--acum` | skyblue | Prêmio acumulado |
| `--multi` | orange | Multiplicador ativo (2×, 3×…) |

---

### Seletor de quantidade (`.qty-picker`) e Stepper

```html
<!-- Grade de opções pré-definidas -->
<div class="qty-picker">
  <div class="qty-option">          <!-- padrão -->
  <div class="qty-option qty-option--active">  <!-- selecionado -->
</div>

<!-- Chips sobre a opção -->
<span class="qty-chip qty-chip--popular">Popular</span>
<span class="qty-chip qty-chip--top">Melhor</span>

<!-- Stepper manual -->
<div class="stepper">
  <button class="stepper__btn">−</button>
  <div class="stepper__val">7</div>
  <button class="stepper__btn">+</button>
</div>
```

---

### Número do título (`.titulo-num`)

Série em `--orange-500` · Sequência em `--skyblue-500` · Fonte monospaced.

```html
<div class="titulo-num">                  <!-- tamanho padrão -->
<div class="titulo-num titulo-num--lg">   <!-- destaque principal -->
<div class="titulo-num titulo-num--sm">   <!-- tabela / inline -->

<!-- Estrutura interna -->
<span class="titulo-num__part titulo-num__part--serie">001</span>
<span>.</span>
<span class="titulo-num__part titulo-num__part--seq">048271</span>
```

---

### Causa social (`.causa-card`)

Usa `var(--grad-special)` como background. Sempre com barra de progresso indicando % da meta.

```html
<div class="causa-card">
  <!-- título, descrição, ícone da causa -->
  <div class="causa-stat"> <!-- stat individual --> </div>
  <!-- barra de progresso -->
</div>
```

---

### Live broadcast chip (`.live-broadcast`)

```html
<!-- Ao vivo -->
<div class="live-broadcast">
  <span class="live-broadcast__dot"></span>  <!-- anima com blink -->
  <span>Ao vivo agora</span>
</div>
```

O `.live-broadcast__dot` usa `background: var(--coral-500)` e `animation: blink`.

---

### Countdown (`.countdown__num`)

```html
<!-- Grande (seções de destaque) -->
<div class="countdown__num">14</div>  <!-- h2 estilo, laranja com glow -->

<!-- Inline pequeno -->
<span class="countdown__num countdown__num--sm">37</span>
```

Separador `:` deve ter `color: var(--orange-400); font-weight: 700`.

---

### Reveal state (`.reveal-card`)

Três estados para revelar resultado do sorteio:

| Classe | Estado | Visual |
|--------|--------|--------|
| `.reveal-card--locked` | Bloqueado | Borda laranja tracejada, cadeado |
| `.reveal-card--open` | Ganhou | Fundo verde sutil, check verde |
| *(sem modificador)* | Não premiado | Fundo neutro, X branco opaco |

```html
<div class="reveal-card reveal-card--locked"> <!-- aguardando -->
<div class="reveal-card reveal-card--open">   <!-- premiado -->
```

---

## Logo PayPix

O SVG sprite está em `/assets/sprite.svg` com dois símbolos:

| ID | Fundo permitido | Uso |
|----|-----------------|-----|
| `#paypix-original` | Branco ou cinza claro **apenas** | Versão colorida oficial |
| `#paypix-mono` | Azul, escuro — qualquer cor via CSS | Versão monocromática |

> ⚠️ **`#paypix-original` NÃO pode ser aplicada sobre fundo escuro ou preto.** Use sempre `#paypix-mono` em fundos azul-900, azul-500 ou qualquer superfície escura.

```html
<!-- Original — APENAS sobre branco ou cinza-100 -->
<svg viewBox="0 0 1749.41 596.91" style="width:160px">
  <use href="/assets/sprite.svg#paypix-original"/>
</svg>

<!-- Mono branca — sobre azul ou escuro -->
<svg viewBox="0 0 1749.41 596.91" style="width:160px; color: white">
  <use href="/assets/sprite.svg#paypix-mono"/>
</svg>

<!-- Mono preta — sobre branco -->
<svg viewBox="0 0 1749.41 596.91" style="width:160px; color: black">
  <use href="/assets/sprite.svg#paypix-mono"/>
</svg>
```

**Tamanhos:** mínimo `80px` · rodapé `120–160px` · B2B `200–280px`  
**Área de proteção:** ≥ 50% da altura do logo em todos os lados

---

## Copy e tom de voz

### Vocabulário do produto

| Use | Evite |
|-----|-------|
| título | aposta, bilhete, cartela de loto |
| sorteio | jogo, loteria |
| prêmio | jackpot |
| concorrer | apostar |
| ganhador | vencedor |
| HiperXCAP | Hiper XCAP, hiperxcap |

### CTAs (sempre 1 linha, sem subtítulo)

```
Garanta seu título
Comprar agora
Garanta mais 1 título
Concorrer ao prêmio
Confirmar pagamento
Entrar
Como funciona
Conhecer ganhadores
Assistir ao sorteio
```

### Headlines

```
Concorra a até R$ 1.000.000,00 toda semana.
R$ 1 milhão nesta quinta.
Mais títulos, mais chances.
O próximo milionário pode ser você.
Quinta · 21h30 · RedeTV!
```

### Microcopy

```
✓ Pagamento confirmado! Seu título está garantido.
⏳ Processando seu pagamento. Aguarde um instante.
✕ Não foi possível processar. Tente novamente ou use outra forma de pagamento.
○ Você ainda não tem títulos. Garanta o primeiro e comece a concorrer.
```

---

## Compliance — regras inegociáveis

| # | Regra |
|---|-------|
| 01 | Texto legal em todas as comunicações |
| 02 | Marca sempre com "Título de Capitalização" acima e "Filantropia Premiável" abaixo |
| 03 | Revisão ortográfica obrigatória |
| 04 | Apenas patterns aprovados — paleta primária prioritária |
| 05 | Quantidade de sorteios realizados em destaque quando aplicável |
| 06 | Espaço para QR Code e número do título em impressos |
| 07 | Número de proposta visível em títulos físicos |
| 08 | Aviso "proibida a venda a menores de 18 anos" |
| 09 | Mascotes apenas CAPzinha e Amora |
| 10 | Logo + textos próximos |
| **11** | **VESTIMENTAS: NUNCA vermelho ou amarelo (#F0B909)** |
| 12 | Não criar sub-marca com o logo HiperXCAP |
| 13 | Cessão do direito de resgate mencionada |
| 14 | Hospital de Amor em destaque |
| 15 | Premiação sempre em moeda corrente (R$) |
| 16 | Linguagem simples, clara, sem termos em outro idioma |

### Texto legal padrão (colar no rodapé de toda peça)

```
Título de Capitalização da Modalidade Filantropia Premiável, de pagamento único,
com sorteios realizados por meios próprios.
Título emitido pela CAIXA Capitalização S.A. — CNPJ 33.135.804/0001-32,
processo SUSEP nº [inserir conforme campanha].
A aprovação deste título pela SUSEP não implica, por parte da Autarquia, em incentivo
ou recomendação a sua aquisição, representando, exclusivamente, sua adequação às normas em vigor.
Proibida a venda a menores de 18 anos. Antes de contratar, consulte previamente as Condições Gerais.
O valor do resgate será destinado integralmente ao Hospital de Amor.
SAC CAIXA: 0800 030 1508. Ouvidoria CAIXA: 0800 030 1508.
```

---

## Estrutura de arquivos do design system

```
paypix-design-system/
├── hiperxcap/
│   └── index.html          ← design system completo (27 seções)
├── css/
│   ├── variables.css       ← :root tokens, @keyframes, reset
│   ├── layout.css          ← sidebar, hero, sections, hub
│   ├── components.css      ← todos os componentes UI
│   └── animations.css      ← animações e micro-interações
├── js/
│   ├── nav.js              ← scroll spy + menu mobile
│   └── animations.js       ← confete, flip, ripple, shake
└── assets/
    └── sprite.svg          ← SVG sprite (paypix-original + paypix-mono)
```

---

*Mantido em sincronia com o design system em [paypix-design-system.vercel.app](https://paypix-design-system.vercel.app) · L4 Design System · maio 2026*
