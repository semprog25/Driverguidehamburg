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

      // Copy index.html → 404.html for SPA routing on GitHub Pages
      const indexPath = path.resolve(distDir, 'index.html')
      const notFoundPath = path.resolve(distDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
        console.log('Created 404.html')
      }

      // .nojekyll — lets GitHub Pages serve _-prefixed Vite asset files
      fs.writeFileSync(path.resolve(distDir, '.nojekyll'), '')
      console.log('Created .nojekyll')

      // CNAME — custom domain (written directly to dist, bypassing the
      // public/CNAME directory that Figma Make creates automatically)
      const cnameDist = path.resolve(distDir, 'CNAME')
      if (fs.existsSync(cnameDist) && fs.statSync(cnameDist).isDirectory()) {
        fs.rmSync(cnameDist, { recursive: true })
      }
      fs.writeFileSync(cnameDist, 'driverguidehamburg.semprog.de')
      console.log('Created CNAME')
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