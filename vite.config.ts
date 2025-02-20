import { fileURLToPath, URL } from 'node:url';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

const VIEW_SERVICE_PATH = 'juices-maker-view';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${VIEW_SERVICE_PATH}`,
  plugins: [vue(), svgLoader(), tsconfigPaths(),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.json', '.vue'],
  },
  define: {
    __SERVICE_PATH__: JSON.stringify(VIEW_SERVICE_PATH),
  },
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: `
              @import "@/assets/scss/_variables.scss"; 
              @import "@/assets/scss/_mixins.scss"; 
            `
        }
    }
  },
  build: {
    emptyOutDir: true,
    target: browserslistToEsbuild(),
  },
  server: {
    host: '0.0.0.0',
    port: 8081,
    strictPort: true,
    allowedHosts: true,
    cors: {
      origin: '*',
    },
    hmr: {
      port: 8081,
      host: 'localhost',
    },
  },
})
