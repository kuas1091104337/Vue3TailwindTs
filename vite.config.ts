// import { fileURLToPath, URL } from 'node:url'
// import { resolve } from "path";
import path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    // rollupOptions: {
    //   output: {
    //     dir: resolve(__dirname, "dist"),
    //  },
    // }
  },
  plugins: [
    vue(),
    vueDevTools(),
    // eslint(),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/extendMixin.scss" as *;'
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
