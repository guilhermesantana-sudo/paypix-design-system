# HXC · Playbook de padrões visuais e de UX

Documento de referência para replicar o visual e os fluxos do landing-lotérico HiperXCap em outros módulos do ecossistema. Consolida tipografia, cores, componentes, padrões de step/modal, regras de negócio e anti-patterns aprendidos durante o ajuste fino de 2026-05.

> **Como usar:** Quando começar um novo módulo, percorra a **[checklist final](#-checklist-pro-pr%C3%B3ximo-m%C3%B3dulo)** ao final deste doc. Cada seção pode ser consultada isoladamente.

---

## ⚖️ Copy & Compliance (CRÍTICO — fonte: PDFs em `docs/`)

Regras de comunicação obrigatórias do HiperXCAP. Valem para **toda** peça/tela. Fontes: `docs/O que é o HiperXCAP_.pdf`, `docs/Tom de Comunicação -HiperXCAP.pdf`, `docs/Hospital de Amor.pdf`.

### O produto
- HiperXCAP é um **Título de Capitalização Filantropia Premiável**, emitido pela **CAIXA Capitalização** (grafia `CAIXA` sempre em maiúsculas). Evolução da marca HiperCap Brasil.
- Framing: **o título é o produto; os sorteios são o incentivo.** Ao adquirir, o cliente **cede o direito de resgate ao Hospital de Amor**.

### ❌ Terminologia PROIBIDA
- Nunca: "aposta", "bet", "jogo", "jogo de azar", "fezinha", "concurso", "loteria", "bilhete", "renda extra".
- Nunca comparar com loteria/bingo/bets. Nunca expressões em outro idioma. Nunca garantir resultado ("você vai ganhar").
- Nunca mencionar prêmio que não seja **em dinheiro**.
- ⚠️ **Nunca comunicar o número exato de acertos/dezenas.** Use "a maior quantidade de acertos próximo às dezenas sorteadas". (No HXC isso eliminou "19/20", "20 acertos" etc.)

### ✅ Obrigatório em toda peça
- Marca com **"Título de Capitalização"** acima e **"Filantropia Premiável"** abaixo.
- Texto legal: emitido pela CAIXA Capitalização · cessão de resgate ao **Hospital de Amor** (nome em destaque) · premiações em dinheiro · **proibida venda a menores de 18 anos** · sujeito às condições gerais SUSEP.
- Sorteios: **toda quinta-feira às 21h30** (RedeTV!, Record News, YouTube). *(Migrou de domingo 15h30 → quinta 21h30.)*

### Estrutura de prêmios (Globos da Sorte)
- 1º · 2º · 3º Globo: **R$ 30.000** cada.
- 4º Globo (Grande Prêmio): **R$ 500.000 a R$ 1.000.000** (comunicar "até R$ 1 milhão").
- **Na Trave**: R$ 10.000 a R$ 25.000 (acertos mais próximos).
- **Hiper Giro da Sorte**: 30 prêmios de R$ 5.000 (algoritmo randômico).
- Valores variam por semana — sempre "consulte a cartela da semana".

### Tom de voz
- Pilares: Confiança (CAIXA) · Emoção (propósito/Hospital) · Clareza · Propósito.
- Linguagem simples, direta, positiva. Frases curtas. Urgência **honesta** (dia/horário reais).
- Mascotes oficiais (só estes): **Amora** (elefantinha, Hospital de Amor) e **Capzinha** (formiguinha, ação). Nenhum outro.
- CTAs aprovados: "Garanta o seu agora", "Ainda dá tempo de participar".

### Nota de escopo
A LP do lotérico é **genérica do produto HiperXCAP** (não focada na "Surpresinha" — essa terá LP própria). Use **"título"** como substantivo, não "Surpresinha".

---

## 📐 Tipografia

- **Display:** `Poppins italic 800` — títulos, badges, números das dezenas
- **Body:** `Poppins` 400-800 — textos correntes
- **Mono:** `JetBrains Mono` — códigos (PayPix, Pix copia-e-cola)
- **Tabular-nums:** sempre em datas, valores e cartelas (`font-variant-numeric: tabular-nums`)
- **Letter-spacing:**
  - `0.16-0.22em` em labels UPPERCASE
  - `0.04em` em texto display
  - `0.01-0.02em` em corpo

### Escala compacta (corte aplicado em todas as telas)

| Elemento | Tamanho |
|---|---|
| Título de tela (`.success-title`) | `clamp(22px, 5.6vw, 26px)` (era `clamp(28px, 8vw, 34px)`) |
| Subtítulo | `12.5-13px` |
| Section title gold | `11px uppercase` |
| Label gold | `9.5-10px uppercase` |
| Texto card body | `11-13px` |
| Microtexto / meta | `9-11px` |

Aplicar `text-wrap: balance` em títulos de step pra quebra de linha agradável.

---

## 🎨 Paleta

| Token | Hex | Uso |
|---|---|---|
| `--navy-950` / `--giro-bg` | `#0C1628` | bg principal |
| `--gold-bright` | `#F39208` | accent primário (CTAs, badges, dezenas drawn) |
| `--gold-deep` | `#C97500` | gradiente gold (stop final) |
| `--gold-light` | `#F8AF4F` | título acentuado, gradient stop intermediário |
| `--success` / `--green-300` | `#A7C945` / `#B6D37B` | confirmação, "hit" nas dezenas |
| `--skyblue-500` | `#9ED7EB` | dezenas **selecionadas** pelo user, accents secundários |
| `--purple-500` | `#B26F9A` | erros, validação |
| Muted | `#c7d6e8`, `#7e93b0` | textos secundários e terciários |
| Brand orange (Cloudflare simulado) | `#F38020` | só no widget Turnstile simulado |

**Backgrounds combinados** (recipe de `body`):

```css
background:
  radial-gradient(ellipse 100% 70% at 50% 25%, rgba(20, 55, 140, 0.55) 0%, transparent 60%),
  radial-gradient(ellipse 80% 40% at 50% 95%, rgba(20, 55, 140, 0.35) 0%, transparent 60%),
  var(--giro-bg);
background-attachment: fixed;
```

---

## 📦 Cards (padrão único)

```css
.card-base {
  background:
    linear-gradient(180deg, rgba(26,47,81,0.55), rgba(12,22,40,0.85));
    /* OU pra cards "destacados": */
    /* linear-gradient(135deg, rgba(243,146,8,0.10), rgba(0,0,0,0.42)); */
  border: 1-1.5px solid rgba(243,146,8, 0.18-0.45);
  border-radius: 12-14px;
  padding: 10-14px 12-16px;  /* compacto */
  box-shadow:
    0 4-8px 14-22px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.06-0.10);
}
```

### Variantes

- **Cards de benefícios / "como pagar":** grid 3 colunas, 1 ícone gold + título bold + sub muted (centralizado)
- **Cards de listagem (modal):** layout vertical (header row + body), `flex-direction: column`
- **Cards destacados / ativos:** aumentar opacity da borda gold e adicionar `box-shadow` colorido

---

## 🪟 Modais — receita

```css
.modal-overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background:
    radial-gradient(ellipse at 50% 18%, rgba(243,146,8,0.14), transparent 55%),
    rgba(12,22,40, 0.94);
  backdrop-filter: blur(10-12px);
  overflow: hidden;  /* ⚠️ NÃO use overflow-y: auto aqui */
  padding: 12-16px;
}
.modal-card {
  max-height: 92-95vh;
  display: flex; flex-direction: column;
  gap: 12-14px;
  overflow: hidden;
}
/* Quando state ativo é result/lista grande, força altura concreta: */
.modal-card:has(.state[data-state="result"].active) {
  height: 92vh;
}
.state.active {
  display: flex; flex-direction: column;
  gap: 14px;
  min-height: 0;
}
.state[data-state="result"].active {
  flex: 1 1 auto;
  min-height: 0;
}
.result-scroll {
  flex: 1; min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
```

> ⚠️ **Pegadinha crítica:** `flex: 1 1 0` (basis zero) num filho de container que só tem `max-height` faz o item colapsar pra altura 0 (modal abre vazio, só com X visível). Sempre use `flex: 1 1 auto` + `:has()` pra forçar altura concreta no card quando precisar de scroll interno.

---

## 🎯 Steps multi-tela (state machine)

- `<body data-step="...">` controla qual seção fica visível
- Steps padronizados: `step-1` (captura) → `step-2` (pagamento) → `step-await` (aguardando) **ou** `step-3` (revelado)
- Cada step: `display: flex; flex-direction: column; max-width: 480px; gap: 12-16px; align-items: center`
- Animação de entrada padrão:

```css
@keyframes rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.step-X { animation: rise 0.5s var(--ease-out); }
```

- Padding lateral do step: `0 4px` (o `<main>` já tem `padding: 20px 16px 40px`)
- CSS toggle:

```css
.step-N { display: none; }
body[data-step="N"] .step-1,
body[data-step="N"] .step-2 { display: none; }
body[data-step="N"] .step-N { display: flex; }
```

---

## 🍀 Banner Hospital de Amor (padronizado em TODAS as telas)

**Componente único. Mesmo texto em todo lugar:**

```html
<div class="hospital-banner">
  <span class="logo-frame logo-frame--sm" aria-hidden="true">
    <img src="/logos/hospital-de-amor.png" alt="" />
  </span>
  <span class="text">
    Cada Surpresinha ajuda o <b>Hospital de Amor</b>
    a oferecer tratamento gratuito contra o câncer.
  </span>
</div>
```

```css
.hospital-banner {
  width: 100%;
  background: linear-gradient(135deg, rgba(178,111,154,0.12), rgba(76,5,25,0.4));
  border: 1px solid rgba(178,111,154, 0.30);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex; align-items: center; gap: 10px;
}
.hospital-banner b { color: #fff; font-weight: 800; }
.hospital-banner .text { font-size: 11px; color: var(--muted); line-height: 1.4; }
```

> Regra: **não criar variantes de texto por contexto.** Mesmo copy em step-1, step-2, step-3, step-await, modais, etc.

---

## 🔘 CTAs — receitas

| Variante | Quando usar | Estilo |
|---|---|---|
| `.submit-btn` | Ação primária do step | Gold gradient sólido + sombra 28px gold + shimmer |
| `.reveal-back-btn` / `.ct-btn` | Ação secundária | Outline gold @0.35, transparent, padding 9-11px |
| `.await-cross-cta` | Cross-sell (comprar mais) | Grid `auto 1fr auto`, ícone+ gold 38px, título+sub, seta gold direita |
| `.pay-confirm-btn` | Botão "demo" / utilitário | Outline green sutil, pill format, font 11.5px |
| `.await-demo-btn` | Demo / dev | Dashed border green, font 10.5px |
| `.howto-card-num` | Badges numéricos (1/2/3) | Círculo 22px gold gradient, font display italic |

### Submit-btn (ação primária — receita exata)

```css
.submit-btn {
  padding: 16px 18px;
  background: linear-gradient(135deg, #fef3c7, #F8AF4F 40%, var(--gold-bright));
  color: #0C1628;
  font: 800 italic 15px/1 var(--font-display);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  border-radius: 14px;
  box-shadow:
    0 10px 28px rgba(243, 146, 8, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
/* Shimmer sweep */
.submit-btn::after {
  content: '';
  position: absolute;
  top: 0; left: -30%;
  width: 30%; height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}
.submit-btn:hover::after { left: 130%; }
```

---

## ✓ Success-chip (pagamento confirmado / tudo pronto)

```css
.success-chip {
  display: inline-flex; align-items: center;
  gap: 6px;
  padding: 4px 11px;
  margin-top: 10px;             /* respiro do logo */
  background: linear-gradient(135deg, rgba(167,201,69,0.16), rgba(167,201,69,0.04));
  border: 1px solid rgba(167,201,69, 0.5);
  color: var(--green-300);
  border-radius: 18px;
  font: 800 italic 9.5px var(--font-display);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.success-chip .check {
  width: 13px; height: 13px;
  background: var(--success);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font: 900 8.5px/1 sans-serif;
}
```

---

## 🎲 Dezenas (cartelas) — variantes

| Estado | Visual | Quando |
|---|---|---|
| `.ct-bola` (default) | Quadrado branco, border-radius 7-8px, sombra suave | Cartela do usuário não sorteada |
| `.ct-bola--drawn` | Bolinha redonda gold gradient + brilho radial | Dezena que saiu no sorteio ao vivo |
| `.ct-bola--hit` | Quadrado verde com glow | Casou com sorteio (na cartela do user) |
| `.ct-bola--miss` | Dessaturado/grayscale | Não casou (histórico) |
| `.ct-bola--placeholder` | Navy escuro, "?" | Status `awaiting` (não gerada ainda) |
| `.ct-bola--selected` | Azul claro `#9ED7EB` gradient | User clicou pra marcar |

### Receita base

```css
.ct-bola {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #e8edf2 100%);
  color: #0C1628;
  font: 800 italic clamp(11px, 3vw, 14px) var(--font-display);
  font-variant-numeric: tabular-nums;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow:
    0 2px 6px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.9),
    inset 0 -2px 4px rgba(0,0,0,0.08);
}
.ct-bola--selected {
  background: linear-gradient(180deg, #B6E5F2 0%, #9ED7EB 100%);
  border-color: rgba(158,215,235, 0.65);
  box-shadow:
    0 0 0 2px rgba(158,215,235, 0.30),
    0 2px 8px rgba(158,215,235, 0.40),
    inset 0 1px 0 rgba(255,255,255, 0.65);
}
.ct-cartela-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5-7px;
}
```

### Interatividade

- `role="button"`, `tabindex="0"`, `aria-pressed="false"` por chip interativo
- Handler **delegado** no document (não inline) + ignora placeholders e modal histórico:

```js
function _toggleBola(el) {
  if (!el || el.classList.contains('ct-bola--placeholder')) return;
  if (el.closest('.ct-modal')) return; // bloqueia interação no modal de histórico
  const next = !el.classList.contains('ct-bola--selected');
  el.classList.toggle('ct-bola--selected', next);
  el.setAttribute('aria-pressed', next ? 'true' : 'false');
}
document.addEventListener('click', e => {
  const bola = e.target.closest && e.target.closest('.ct-bola');
  if (bola) _toggleBola(bola);
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const t = e.target;
  if (t?.classList?.contains('ct-bola')) {
    e.preventDefault();
    _toggleBola(t);
  }
});
```

- `:focus-visible` outline `2px solid #9ED7EB`
- `:active` `transform: scale(0.94)`

---

## 💾 Persistência (UX patterns)

- `localStorage` com chave prefixada por módulo (ex: `hxc.whatsapp`)
- Quando dado existe: **pular o modal** de captura, ir direto pro próximo step
- Mostrar chip "X salvo: ..." com botão "trocar" pra limpar
- Função `forget()` pra apagar o storage e resetar estado relacionado

```js
const WA_STORAGE_KEY = 'hxc.whatsapp';
function openPhoneModal(opts) {
  const force = !!(opts && opts.force);
  const saved = localStorage.getItem(WA_STORAGE_KEY);
  if (saved && !force) {
    // pula modal — vai direto pro step seguinte
    document.body.dataset.step = '2';
    document.body.dataset.hasPhone = 'yes';
    return;
  }
  // abre modal normal
}
```

---

## 🆔 CPFs de demonstração (padrão)

| CPF | Cenário |
|---|---|
| `000.000.000-00` | **sem compras** — empty state |
| `000.000.000-01` | **com títulos prontos** — `status: 'next'`, cartelas geradas |
| `000.000.000-02` | **comprou aguardando** — `status: 'awaiting'`, `cartelas: null` |

**Validação:** `_isValidCpf(raw)` aceita série demo sem validar dígito verificador:

```js
const isDemoCpf = /^000000000\d{2}$/.test(raw);
if (!isDemoCpf && !_isValidCpf(raw)) {
  // mostra erro
}
```

**Empty state:** sempre listar os 3 cenários em `<b>` gold pra facilitar a demo.

---

## 🛒 Modelo de produto (regra de negócio)

- **1 Surpresinha = 4 cartelas** (uma por sorteio)
- Sorteios 1-3: **R$ 30 mil** cada (chip outline gold)
- Sorteio Final: **R$ 1 milhão** (chip solid gold + `.ct-cartela--jackpot` com glow extra)
- **Todos os 4 sorteios no mesmo dia** — informar data única no `<dl>` meta
- Cada cartela: **20 dezenas** (1-60), grid 5×4

---

## ⏱️ Step "aguardando sorteio" — anatomia

1. Chip "Pagamento confirmado" (verde)
2. Cross-sell CTA "Comprar mais Surpresinhas / Mais chances no mesmo sorteio"
3. Ícone clock circular gold (84px)
4. Title + sub explicativo
5. **Countdown flip clock** (DD:HH:MM:SS) em real-time:

```js
const NEXT_DRAW_TARGET = new Date(2026, 4, 31, 21, 30);
function updateAwaitCountdown() {
  const diff = Math.max(0, NEXT_DRAW_TARGET.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  // ... atualiza DOM
}
setInterval(updateAwaitCountdown, 1000);
```

6. Card "Sorteio ao vivo" (RedeTV! · Record News · YouTube) com ícone play teal
7. 4 cartelas placeholder com "?"
8. Footnote: "Pode fechar a página: seu pagamento está garantido..."
9. Botão dashed "Demo: simular sorteio aberto" (atalho dev)
10. Hospital banner

---

## 🎬 Overlay de sucesso (transição entre steps)

Tela fullscreen verde com check animado entre `step-2` (pagamento) e `step-await`/`step-3`:

- Background: `linear-gradient(135deg, #6F8C2F 0%, #A7C945 55%, #B6D37B 100%)`
- Sequência (~2.4s total):
  - **0-350ms:** fade-in + card scale-up
  - **0-550ms:** círculo SVG `stroke-dashoffset` 220→0
  - **450-900ms:** check SVG `stroke-dashoffset` 80→0
  - **600ms+:** pulse rings atrás (loop)
  - **1500ms:** troca `data-step` underneath
  - **1850-2400ms:** fade-out
- `document.body.style.overflow = 'hidden'` durante transição

---

## 🛡️ Cloudflare Turnstile simulado

Substitui captchas humanos (math, image, etc) por um widget mockado fiel:

- Widget `#232323` com borda `#3a3a3a`
- 3 estados: `idle` → `verifying` (spinner gold) → `success` (check verde)
- Auto-roda no `open` do modal (350ms idle → 1700ms success)
- Bloqueia submit (`disabled`) até verificar
- Gera token cosmético `0.<rand>.<rand>` no hidden input
- Layout: `[checkbox box] | [label] | [divider] | [brand]`
- Brand: SVG cloud (gradiente Cloudflare orange/yellow) + "Cloudflare" + "Privacidade · Termos" embaixo

```html
<div class="ct-turnstile" data-state="idle">
  <div class="ct-ts-check"><span class="ct-ts-box">
    <span class="ct-ts-spinner"></span>
    <svg class="ct-ts-tick">...</svg>
  </span></div>
  <div class="ct-ts-text">
    <span data-ts-idle>Verifique que você é humano</span>
    <span data-ts-verifying>Verificando…</span>
    <span data-ts-success>Sucesso! Você é humano.</span>
  </div>
  <div class="ct-ts-brand">[svg cloud] Cloudflare · Privacidade · Termos</div>
</div>
```

---

## 🃏 "Como pagar em 3 passos" — cards verticais

Padrão pra qualquer instrução tipo "passo-a-passo":

```html
<div class="howto-title">Como pagar em 3 passos</div>
<div class="howto-grid">
  <div class="howto-card">
    <div class="howto-card-num">1</div>
    <div class="howto-card-icon"><svg>...</svg></div>
    <div class="howto-card-title">Abra o banco</div>
    <div class="howto-card-sub">vá em "Pagar com Pix"</div>
  </div>
  <!-- ... 2 e 3 ... -->
</div>
```

- Grid 3 colunas, gap 10px
- Card: padding `16px 8px 12px`, bg navy gradient, border gold@0.22
- Badge numérico flutuando no topo (círculo 22px gold gradient)
- Ícone 38px gold gradient bg + svg 20px gold
- Title 12.5px bold, sub 11px muted
- Media query `<= 380px`: reduz ainda mais

> **Princípio:** menos texto, mais visual. 3 frases curtas, não parágrafos.

---

## ⚠️ Anti-patterns / lições aprendidas

1. **Não use `flex: 1 1 0`** num filho cujo pai só tem `max-height` — usar `flex: 1 1 auto` + altura concreta via `:has()`
2. **Sempre `grep`** antes de remover uma constante (ex: `TODAY`, `NEXT_DRAW_DATE`) — funções podem referenciar
3. **Modal `overflow-y: auto`** rouba o scroll do scroller interno. Use `overflow: hidden` no overlay e scroll interno no `.result-scroll`
4. **Não duplique JS utility** (`_pad2`, `_isValidCpf`) entre IIFEs — manter num escopo só
5. **Hospital banner**: um texto só, em todas as telas — não criar variantes por contexto
6. **CTAs de demo/dev** devem ser visivelmente "dashed" ou diferentes pra não parecer produção
7. **Validação de CPF**: sempre isentar a série de demo `^000000000\d{2}$` via regex
8. **`daysUntil(d)`**: usar `Date.now()` direto, não constante mock-anchor (vira `ReferenceError` se a const for removida)
9. **Cards lotéricos**: não duplicar info de localização (cidade no endereço + 📍 cidade no meta = dedup); remover info de data/hora se não agrega
10. **Banner promo no card**: thumb pequeno (52×52, border gold) com `loading="lazy"` apontando pra `/banners/Home_01.png` ou equivalente da promoção vigente

---

## 📋 Checklist pro próximo módulo

Antes de copiar o pattern HXC pra outro módulo, conferir:

- [ ] Tokens de cor (gold/navy/green/skyblue) substituídos pela paleta do novo produto, mantendo o mesmo papel semântico
- [ ] Hospital de Amor banner aparece em **todos os** steps (mesmo texto)
- [ ] Steps em `body[data-step]` com `display: none` por padrão + `display: flex` quando ativo
- [ ] Modal com `:has(.state-active)` pra altura, `overflow: hidden` no overlay, scroll interno no scroller
- [ ] Cards de info: padding compacto 10-14px, border 1-1.5px, gradients navy
- [ ] Success-chip pequeno (4×11px padding, 9.5px font) com margin-top pra respirar do logo
- [ ] Dezenas com 6 variantes (default/drawn/hit/miss/placeholder/selected) — handler delegado
- [ ] CPFs demo `000.000.000-0X` com 3 cenários
- [ ] localStorage com prefix de namespace (`<modulo>.<chave>`)
- [ ] Persistência: pular modal de captura se dado existe + chip "salvo" com trocar
- [ ] Bug fix `daysUntil`: usar `Date.now()` direto, não constante mock-anchor
- [ ] Cloudflare Turnstile simulado se tiver formulário "público"
- [ ] Overlay de sucesso reaproveitado pra qualquer transição "ok-confirmado"
- [ ] Tipografia em escala compacta (não inflar fontes)
- [ ] Cards verticais "passo-a-passo" (3 col) ao invés de instruções em lista textual
- [ ] Removed: info redundante nos cards (cidade duplicada, data/hora desnecessária)
- [ ] Thumb da promoção vigente nos cards de listagem (52×52 + lazy)
- [ ] Botão "demo / dev" sempre com tom diferenciado (dashed, color verde lima)

---

## 📚 Referência rápida — arquivos de origem

- `public/projetos-hxc/ecosistema-hxc/landing-loterico.html` — implementação canônica
- `public/projetos-hxc/ecosistema-hxc/appweb_surpresinha.html` — origem do componente `.dezena` (bolinha gold)
- `css/design-system.css` — tokens base do DS
- `banners/Home_01.png` — arte da promoção vigente (1 milhão)
- `logos/hospital-de-amor.png` — logo institucional

Quando começar o novo módulo, abra a landing canônica em paralelo e use ela como referência viva.
