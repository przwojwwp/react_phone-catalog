import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "src/styles/variables";
        @import "src/styles/mixins";
        @import "src/styles/grid";
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
