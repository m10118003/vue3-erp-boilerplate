import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {

    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: '@import "@/scss/variable.scss";'
      // },
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
        },
        javascriptEnabled: true,
      },
    }
  },
})
