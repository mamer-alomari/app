import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native-web'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hot-toast',
      '@react-google-maps/api',
      'date-fns',
      'react-native-web'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      },
      resolveExtensions: ['.web.js', '.web.ts', '.web.jsx', '.web.tsx', '.js', '.ts', '.jsx', '.tsx']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          maps: ['@react-google-maps/api'],
          utils: ['date-fns']
        }
      }
    }
  }
});