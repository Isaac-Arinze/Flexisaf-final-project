import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom', 'react-datepicker'], // Add unresolved dependencies here
    },
  },
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
});