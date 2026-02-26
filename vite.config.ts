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
      const cnamePath = path.resolve(distDir, 'CNAME')
      if (!fs.existsSync(cnamePath)) {
        fs.writeFileSync(cnamePath, 'driverguidehamburg.semprog.de')
        console.log('Created CNAME file for custom domain')
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