import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function serverRoutesDevPlugin(): Plugin {
  return {
    name: 'server-routes-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        if (url === '/robots.txt') {
          const { default: handler } = await import('./api/robots.ts')
          return handler(req, res)
        }
        if (url === '/llms.txt') {
          const { default: handler } = await import('./api/llms.ts')
          return handler(req, res)
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        if (url === '/robots.txt') {
          const { default: handler } = await import('./api/robots.ts')
          return handler(req, res)
        }
        if (url === '/llms.txt') {
          const { default: handler } = await import('./api/llms.ts')
          return handler(req, res)
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    serverRoutesDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@livekit/components-styles'],
  },
})
