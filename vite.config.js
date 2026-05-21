import { resolve } from 'path'
import { defineConfig } from 'vite'
import { execSync } from 'child_process'

function getGitDate() {
  try {
    const iso = execSync('git log -1 --format="%cI"').toString().trim()
    const d = new Date(iso)
    const day   = d.toLocaleDateString('pt-BR', { day: '2-digit' })
    const month = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    const year  = d.getFullYear()
    const hour  = d.getHours().toString().padStart(2, '0')
    const min   = d.getMinutes().toString().padStart(2, '0')
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
      }
    }
  }
})
