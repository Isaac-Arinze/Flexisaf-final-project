// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5175 },
  css: {
    postcss: './postcss.config.js', // Make sure this file exists and points to your correct postcss config
  },
});
