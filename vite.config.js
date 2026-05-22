import { resolve } from 'path'
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

export default defineConfig({
  plugins: [gitDatePlugin()],
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
