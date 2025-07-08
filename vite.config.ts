import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "src/styles/variables";
        @import "src/styles/mixins";
        @import "src/styles/grid";
        @import "src/styles/typography";
        `,
      },
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
