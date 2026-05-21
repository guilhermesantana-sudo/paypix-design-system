# L4 OS · Style Guide

> **Para:** Gui Moreira (responsável pelo frontend cross-app do L4 OS)
> **De:** Iago Ferreira
> **Versão:** 0.1 (draft inicial — preencher e devolver pra mim refletir no `packages/tokens` + `packages/ui`)
> **Última atualização:** 2026-05-21
>
> **Como usar:** edita as seções marcadas com `[EDIT GUI]` direto neste arquivo, salva, e me devolve via Slack ou Drive. Eu aplico no código (`packages/tokens`, `packages/ui`, ARCHITECTURE.md) e atualizo a página `/styleguide` do Shell quando ela for criada na S5.
>
> Seções sem `[EDIT GUI]` são contexto/decisões já fechadas que vivem aqui pra você consultar enquanto edita.

---

## 1. Visão e princípios

O Style Guide do L4 OS define a base visual que todos os 4 apps (Shell, iAdm, Cria.Aí, Reporta+Aí) compartilham via `@l4/ui` e `@l4/tokens`. **Zero JSX solto reinventando componente** — se algo não existe, abrimos PR no `@l4/ui` antes de usar no app.

Princípios:
- **Mobile-first** onde faz sentido (proto, cria, reporta) e desktop-first onde a UX exige (apps administrativos, dashboards densos)
- **WCAG AA mínimo** — contraste, navegação por teclado, ARIA labels, `prefers-reduced-motion` respeitado
- **Consistência cross-app** — mesmo Card, Modal, Button em todos os 4 apps
- **Densidade controlada** — não é dashboard de Bloomberg, mas também não é landing page

### [EDIT GUI] — Adicione/altere princípios

> Tem algum princípio visual que você quer adicionar/remover? Ex: "Tipografia sempre em SF Pro", "Animações suaves max 200ms", "Dark mode obrigatório", etc.

```
- (proponha aqui)
- (proponha aqui)
```

---

## 2. Tokens visuais

### 2.1 Cores (paleta atual `packages/tokens/colors.ts`)

| Token | Valor atual | Uso |
|---|---|---|
| `primary` | `#D4AF37` (dourado L4) | Botões primários, links, accents |
| `primary-hover` | `#B8941F` | Hover do primary |
| `surface` | `#FFFFFF` | Background de Cards, Modals |
| `surface-muted` | `#F5F5F4` | Background da página |
| `surface-elevated` | `#FAFAF9` | Sidebars, headers |
| `text` | `#18181B` | Texto principal |
| `text-muted` | `#71717A` | Texto secundário, hints |
| `text-subtle` | `#A1A1AA` | Placeholders, disabled |
| `border` | `#E4E4E7` | Bordas de Cards, Inputs |
| `border-strong` | `#D4D4D8` | Bordas com mais contraste |
| `success` | `#16A34A` | Estados positivos, badges OK |
| `warning` | `#EAB308` | Avisos, badges em alerta |
| `danger` | `#DC2626` | Erros, destrutivo (delete) |
| `info` | `#0EA5E9` | Informativo, badges neutros |

### [EDIT GUI] — Cores

> Cores que faltam? Cores que quer ajustar? Lembre que mexer no `primary` afeta todos os 4 apps + logo.

```
- (sugestão de cor nova)
- (ajuste de cor existente)
```

### 2.2 Tipografia (atual)

| Token | Valor | Uso |
|---|---|---|
| `font-sans` | system-ui (default OS) | Tudo |
| `font-mono` | `'JetBrains Mono', ui-monospace` | Code blocks, valores monetários alinhados |
| `text-xs` | 12px | Labels, hints |
| `text-sm` | 14px | Texto secundário, table cells |
| `text-base` | 16px | Texto principal |
| `text-lg` | 18px | Subheadings |
| `text-xl` | 20px | Headings nível 3 |
| `text-2xl` | 24px | Headings nível 2 |
| `text-3xl` | 30px | Headings nível 1, KPIs grandes |

### [EDIT GUI] — Tipografia

> Quer trocar `font-sans` pra algo específico (Inter, SF Pro, Geist)? Lembre do trade-off de webfont (peso no bundle) vs system-ui (consistência OS).

```
- (proposta)
```

### 2.3 Espaçamento

Sistema baseado em 4px (escala Tailwind padrão):
- `xs` = 4px
- `sm` = 8px
- `md` = 16px
- `lg` = 24px
- `xl` = 32px
- `2xl` = 48px

### [EDIT GUI] — Espaçamento

> Está bom assim? Algum espaçamento padrão pra Card padding, Modal padding, etc. que queira fixar?

```
- (proposta)
```

### 2.4 Border radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 4px | Badges, inputs pequenos |
| `radius-md` | 8px | Cards, inputs |
| `radius-lg` | 12px | Modais, panels grandes |
| `radius-full` | 9999px | Avatares, pills |

### [EDIT GUI] — Radius

```
- (ajuste/sugestão)
```

### 2.5 Shadows

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Inputs em foco |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.10)` | Modais, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.12)` | Popovers elevados |

### [EDIT GUI] — Shadows

```
- (ajuste/sugestão)
```

### 2.6 Animações

- Duração padrão: `200ms`
- Easing padrão: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind default)
- Modais entram com `slide-up` mobile, `fade` desktop
- Toasts duram `4s` antes de desaparecer
- **Respeitar `prefers-reduced-motion`**

### [EDIT GUI] — Animações

```
- (proposta)
```

---

## 3. Componentes base do `@l4/ui`

Lista do que já existe ou está planejado. Pra cada um, edita o que precisar e adiciona variantes que faltam.

### 3.1 Button

**Variantes atuais:** `primary` | `secondary` | `ghost` | `danger`
**Tamanhos:** `sm` | `md` | `lg`
**Estados:** default | hover | active | disabled | loading

### [EDIT GUI] — Button

> Quer adicionar variant `subtle`? `link`? Algum tamanho `xs`? Quer ajustar paddings/heights?

```
- (variante nova)
- (ajuste de variante existente)
- (comportamento novo: ex. ícone + texto, ícone-only)
```

### 3.2 Card

**Variantes atuais:** `default` (com border + shadow-md) | `elevated` (com shadow-lg, sem border) | `outlined` (border só)
**Slots:** Header, Body, Footer

### [EDIT GUI] — Card

```
- (proposta)
```

### 3.3 Input / Textarea

**Variantes:** `default` | `error` (border vermelha) | `success` (border verde)
**Tamanhos:** `sm` | `md` | `lg`
**Estados:** default | focus | disabled | readOnly | error

### [EDIT GUI] — Input/Textarea

> Quer ajustar comportamento de label flutuante? Affixes (ícones internos)? Mensagem de erro padronizada?

```
- (proposta)
```

### 3.4 Select / MultiSelect / Combobox

**Atuais:** Select single, MultiSelect, Combobox (com search)
**Comportamento:** dropdown nativo no mobile? Custom em todos? (decisão pendente)

### [EDIT GUI] — Select

```
- (escolha: nativo mobile / custom sempre / outro)
- (variantes)
```

### 3.5 Modal

**Comportamento atual:**
- Mobile: full-screen com slide-up
- Desktop: centered com backdrop + max-width responsivo
- Esc fecha
- Click no backdrop fecha (configurável)

**Tamanhos:** `sm` | `md` | `lg` | `xl` | `full`

### [EDIT GUI] — Modal

```
- (proposta)
```

### 3.6 Toast / Notification

**Tipos:** `success` | `error` | `warning` | `info`
**Posição:** bottom-right desktop, top mobile
**Duração:** 4s default, configurável

### [EDIT GUI] — Toast

```
- (proposta)
```

### 3.7 Tabs

**Variantes:** `default` (underline) | `pills` (rounded background) | `segmented` (iOS-style)

### [EDIT GUI] — Tabs

```
- (proposta)
```

### 3.8 Badge

**Variantes:** `success` | `warning` | `danger` | `info` | `neutral`
**Tamanhos:** `sm` | `md`
**Com ícone:** opcional

### [EDIT GUI] — Badge

```
- (proposta)
```

### 3.9 Avatar

**Tamanhos:** `xs` (20px) | `sm` (24px) | `md` (32px) | `lg` (40px) | `xl` (56px)
**Fallback:** iniciais do nome com background colorido baseado em hash

### [EDIT GUI] — Avatar

```
- (proposta)
```

### 3.10 Spinner / Loading

**Tamanhos:** `sm` | `md` | `lg`
**Inline vs full-page**

### [EDIT GUI] — Spinner

```
- (proposta)
```

### 3.11 EmptyState

**Estrutura:** ícone + título + descrição + ação opcional

### [EDIT GUI] — EmptyState

```
- (ícones default por contexto?)
```

### 3.12 ErrorState / ErrorBoundary

**Estrutura:** ícone alerta + título + descrição + retry button

### [EDIT GUI] — ErrorState

```
- (proposta)
```

### 3.13 Outros componentes existentes ou planejados

`DatePicker`, `Popover`, `Tooltip`, `Drawer`, `Accordion`, `Switch`, `Checkbox`, `Radio`, `Slider`, `Progress`, `Stepper`, `Breadcrumb`, `Pagination`, `SearchBar`, `KPICard`, `ChipEmpresa`

### [EDIT GUI] — Componentes que faltam

> Lista aqui componentes que você acha que precisa criar antes do beta (S6). Eu adiciono no roadmap do `@l4/ui`.

```
- (componente que falta + por quê)
- (componente que falta + por quê)
```

---

## 4. Padrões de tela

### 4.1 Header global (todos os 4 apps)

- Altura: 64px
- Padding horizontal: 24px (md)
- Background: `surface-elevated`
- Conteúdo: Logo L4 OS | OrgEmpresaSelector | SearchBar (cmd+K) | Bell notifications | Avatar do user
- Em mobile (<768px): colapsa pra hamburger menu

### [EDIT GUI] — Header

```
- (ajustes propostos)
```

### 4.2 Sidebar

- Largura: 240px desktop, colapsada 64px (só ícones)
- Background: `surface-elevated`
- Conteúdo: Logo app | Menu principal | Menu secundário | Footer com user

### [EDIT GUI] — Sidebar

```
- (ajustes propostos)
```

### 4.3 Estados padronizados

#### Loading
- Inline em botões: spinner pequeno + texto "Salvando..."
- Full page: spinner centralizado, sem texto
- Skeleton pra listas/cards (não usar spinner em listas)

#### Empty state
- Tela vazia: ícone + título + 1-2 frases + CTA primário

#### Error state
- Erro de rede: "Sem conexão. Tente novamente." + retry button
- Erro 500: "Algo deu errado. Time avisado." + retry + link pra reportar

### [EDIT GUI] — Estados

```
- (ajustes)
```

---

## 5. Mobile

### Breakpoints (Tailwind default)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Comportamentos

- Mobile (<768px): sidebar vira hamburger, Modais full-screen, Tabs viram dropdown se >3 tabs
- Tablet (768-1024px): sidebar colapsada por default, layouts 2 colunas onde fazia sentido 3
- Desktop (>1024px): layout completo

### [EDIT GUI] — Mobile

> Algum comportamento mobile específico que você acha que tá faltando? Gestos? Pull-to-refresh?

```
- (proposta)
```

---

## 6. Acessibilidade (WCAG AA)

- **Contraste**: AA mínimo em textos (4.5:1) e UI (3:1)
- **Keyboard navigation**: Tab funciona em todos os fluxos críticos
- **Focus visible**: outline customizado (sem `outline: none` sem substituto)
- **ARIA labels**: em ícones-only, modais, popovers
- **Screen reader**: testar com VoiceOver/NVDA antes de cada release
- **`prefers-reduced-motion`**: animações reduzidas a 0.01ms

### [EDIT GUI] — A11y

> Quer subir pra AAA em alguma área? Algum requisito específico de LGPD?

```
- (proposta)
```

---

## 7. Branding

### Logo

Tema: bolinha dourada (referência ao Golden retriever da L4 + bola de tênis + Play button). Edu Santana fazendo V2.

### Logos secundários

Reporta+Aí, Distribui.Aí, Cria.Aí precisam ser refeitas (Ian usou Sonnet, ficou ruim — refazer com Opus ou criar do zero).

### [EDIT GUI] — Branding

> Sugestões pra harmonizar logos dos sub-apps com o L4 OS? Cores derivadas do dourado?

```
- (proposta)
```

### Sistema de temas (gamificação)

Concurso mensal — cada colaborador propõe tema com nome próprio. Ian declarou que isso é parte do produto (não só dev fun). Implementação na S5.

Temas iniciais propostos: `default` (dourado L4), `ocean` (azul Helio), `forest` (verde), `sunset` (rosa/laranja).

### [EDIT GUI] — Temas

> Quer propor um tema seu? Quer ajustar a paleta dos temas iniciais?

```
- Tema "<nome>" — descrição da paleta
- Tema "<nome>" — descrição da paleta
```

---

## 8. O que NÃO fazer (resumo)

- ❌ Não criar Button/Card/Modal/Input/Toast/Select/Tabs/Badge próprios — use `@l4/ui`
- ❌ Não usar `className` solto com hex literal (`#D4AF37`) — sempre tokens
- ❌ Não usar Material UI, Chakra, Ant Design, Tailwind UI
- ❌ Não usar Redux/Jotai — Zustand
- ❌ Não usar moment.js — date-fns ou Intl
- ❌ Não esquecer `prefers-reduced-motion`
- ❌ Não desativar warnings de a11y (resolver, não silenciar)
- ❌ Não usar `outline: none` sem `:focus-visible` substituto

### [EDIT GUI] — Adições ao "Não fazer"

```
- (regra nova)
```

---

## 9. Como devolver este documento

Quando terminar de editar, salva e me passa por:
- **Slack DM** (anexa o arquivo)
- **Drive** (compartilha link)
- **Notion** (cola conteúdo numa página nova ou edita esta página direto se preferir)

Eu pego, reflito as decisões em:
- `packages/tokens/` (cores, radius, shadows, espaçamento, tipografia)
- `packages/ui/` (componentes novos ou variantes)
- `ARCHITECTURE.md` §6 (Design System)
- Página `/styleguide` do Shell (quando criada na S5)

Qualquer dúvida durante a edição, me chama no Slack #l4-os ou DM.

Valeu! 🎾
