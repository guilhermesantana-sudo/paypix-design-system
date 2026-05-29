import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import { execSync } from 'child_process'

function getGitDate() {
  try {
    const iso = execSync('git log -1 --format="%cI"').toString().trim()
    const d = new Date(iso)
    const locale = 'pt-BR'
    const tz = { timeZone: 'America/Sao_Paulo' }
    const day   = d.toLocaleDateString(locale, { ...tz, day: '2-digit' })
    const month = d.toLocaleDateString(locale, { ...tz, month: 'short' }).replace('.', '')
    const year  = d.toLocaleDateString(locale, { ...tz, year: 'numeric' })
    const time  = d.toLocaleTimeString(locale, { ...tz, hour: '2-digit', minute: '2-digit', hour12: false })
    const [hour, min] = time.replace(':', 'h').split('h')
    return `${day} ${month} ${year} · ${hour}h${min}`
  } catch {
    return new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }
}

function gitDatePlugin() {
  const date = getGitDate()
  return {
    name: 'git-date',
    transformIndexHtml(html) {
      return html.replaceAll('{{GIT_DATE}}', date)
    }
  }
}

/* ============================================================
   tokensPlugin
   ------------------------------------------------------------
   Lê o :root de cada CSS de produto, extrai todas as custom
   properties (--*), e gera public/tokens/<slug>.json no boot
   do dev/build. Assim qualquer ajuste no CSS é refletido no
   JSON automaticamente — sem sincronia manual.
   ============================================================ */
function tokensPlugin() {
  const products = [
    { slug: 'hiperxcap', cssPath: 'css/variables.css',           label: 'HiperXCAP' },
    { slug: 'apcap',     cssPath: 'apcap/css/design-system.css', label: 'Apcap da Sorte' },
  ]
  function parseCssVars(css) {
    const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/)
    if (!rootMatch) return {}
    const body = rootMatch[1]
    const out = {}
    const re = /^\s*(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/gm
    let m
    while ((m = re.exec(body)) !== null) {
      out[m[1]] = m[2].trim().replace(/\s+/g, ' ')
    }
    return out
  }
  function generate() {
    const outDir = resolve(__dirname, 'public/tokens')
    fs.mkdirSync(outDir, { recursive: true })
    products.forEach(p => {
      const cssAbs = resolve(__dirname, p.cssPath)
      if (!fs.existsSync(cssAbs)) return
      const css = fs.readFileSync(cssAbs, 'utf-8')
      const tokens = parseCssVars(css)
      const updatedAt = new Date().toISOString()

      // tokens.json — formato declarativo
      const json = {
        product: p.label,
        slug: p.slug,
        updatedAt,
        source: p.cssPath,
        count: Object.keys(tokens).length,
        tokens,
      }
      fs.writeFileSync(
        resolve(outDir, `${p.slug}.json`),
        JSON.stringify(json, null, 2)
      )

      // tokens.css — só o :root { --* }, standalone, pronto pra colar
      const cssOut = `/* ============================================================
   ${p.label} — Design System tokens
   ------------------------------------------------------------
   Auto-gerado de ${p.cssPath}
   Atualizado: ${updatedAt}
   ${Object.keys(tokens).length} tokens
   ------------------------------------------------------------
   Uso: importe este arquivo antes dos seus styles globais.
        @import './tokens.css';
   ============================================================ */

:root {
${Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}
`
      fs.writeFileSync(resolve(outDir, `${p.slug}.css`), cssOut)
    })
  }
  return {
    name: 'tokens-export',
    buildStart() { generate() },
    configureServer() { generate() },
  }
}

/* ============================================================
   docsPlugin
   ------------------------------------------------------------
   Espelha arquivos de documentação da raiz do repo para
   public/, deixando-os web-acessíveis sem precisar mover a
   fonte de verdade. Reflete em cada boot do dev/build.
   ============================================================ */
function docsPlugin() {
  const docs = ['design_system.md']
  function mirror() {
    const outDir = resolve(__dirname, 'public')
    fs.mkdirSync(outDir, { recursive: true })
    docs.forEach(name => {
      const src = resolve(__dirname, name)
      if (!fs.existsSync(src)) return
      fs.copyFileSync(src, resolve(outDir, name))
    })
  }
  return {
    name: 'docs-mirror',
    buildStart() { mirror() },
    configureServer(server) {
      mirror()
      // Re-espelha quando o arquivo é editado em dev
      docs.forEach(name => {
        const src = resolve(__dirname, name)
        server.watcher.add(src)
      })
      server.watcher.on('change', (file) => {
        if (docs.some(d => file.endsWith(d))) mirror()
      })
    },
  }
}

/* ============================================================
   publicDirIndexPlugin
   ------------------------------------------------------------
   Em dev, o Vite não resolve "/dir/" → "public/dir/index.html"
   automaticamente — ele aplica SPA fallback pro index.html da
   raiz, o que faz qualquer subpasta em public/ servir o hub
   (causando recursão de URL com links relativos).
   Esse middleware reescreve URLs com barra final pra apontar
   pro index.html quando ele existir em public/. Em produção
   o Vercel já faz isso nativamente — esse plugin é dev-only.
   ============================================================ */
function publicDirIndexPlugin() {
  return {
    name: 'public-dir-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const [pathname, query] = req.url.split('?')
        if (!pathname.endsWith('/') || pathname === '/') return next()
        const candidate = resolve(__dirname, 'public' + pathname + 'index.html')
        if (fs.existsSync(candidate)) {
          req.url = pathname + 'index.html' + (query ? '?' + query : '')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [gitDatePlugin(), tokensPlugin(), docsPlugin(), publicDirIndexPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hiperxcap: resolve(__dirname, 'hiperxcap/index.html'),
        apcap: resolve(__dirname, 'apcap/index.html'),
        iadm: resolve(__dirname, 'iadm/index.html'),
      }
    }
  }
})
