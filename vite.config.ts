import { defineConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin to make the build GitHub Pages-ready
function githubPagesPlugin() {
  return {
    name: 'github-pages',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')

      // Copy index.html to 404.html for SPA client-side routing on GitHub Pages
      const indexPath = path.resolve(distDir, 'index.html')
      const notFoundPath = path.resolve(distDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
        console.log('Created 404.html for GitHub Pages SPA support')
      }

      // Create .nojekyll so GitHub Pages serves _-prefixed Vite asset files
      const nojekyllPath = path.resolve(distDir, '.nojekyll')
      fs.writeFileSync(nojekyllPath, '')
      console.log('Created .nojekyll file')

      // Ensure CNAME persists for custom domain after deployment
      // Always write (overwrite) so a stale directory or file never blocks it
      const cnamePath = path.resolve(distDir, 'CNAME')
      try {
        // Remove if it exists as a directory (edge case in some environments)
        if (fs.existsSync(cnamePath) && fs.statSync(cnamePath).isDirectory()) {
          fs.rmSync(cnamePath, { recursive: true })
        }
        fs.writeFileSync(cnamePath, 'driverguidehamburg.semprog.de')
        console.log('Created/updated CNAME file for custom domain')
      } catch (e) {
        console.error('Failed to write CNAME:', e)
      }
    }
  }
}

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    githubPagesPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
}))