import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Add process.env polyfill
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Configure static asset handling
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Copy files from src/assets to dist/assets during build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  // Define base path for assets
  base: '/',
  // Configure server to properly handle assets
  server: {
    fs: {
      // Allow accessing files from these directories
      allow: ['src', 'public', 'assets', 'node_modules']
    }
  }
});