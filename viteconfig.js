import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig as defineViteConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify(process.env)
  }
})
