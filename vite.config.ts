import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import path, { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwind(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
