import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for react libraries
          'react-vendor': ['react', 'react-dom'],
          // Icons chunk
          'icons': ['react-icons/fa', 'react-icons/si'],
          // Animation libraries
          'animations': ['aos', 'gsap'],
        },
      },
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'aos'],
  },
})
