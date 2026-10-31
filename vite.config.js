import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fast dev + optimized production build
export default defineConfig({
  plugins: [react()],
})
