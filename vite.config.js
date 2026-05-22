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
      const json = {
        product: p.label,
        slug: p.slug,
        updatedAt: new Date().toISOString(),
        source: p.cssPath,
        count: Object.keys(tokens).length,
        tokens,
      }
      fs.writeFileSync(
        resolve(outDir, `${p.slug}.json`),
        JSON.stringify(json, null, 2)
      )
    })
  }
  return {
    name: 'tokens-export',
    buildStart() { generate() },
    configureServer() { generate() },
  }
}

export default defineConfig({
  plugins: [gitDatePlugin(), tokensPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hiperxcap: resolve(__dirname, 'hiperxcap/index.html'),
        apcap: resolve(__dirname, 'apcap/index.html'),
      }
    }
  }
})
