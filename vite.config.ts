import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command !== "build") {
    return {
      plugins: [react(), checker({ typescript: true }), eslint()]
    }
  }

  if (mode === "showcase") {
    console.warn("This is showcase")
    return {
      base: "",
      plugins: [react()]
    }
  }

  return {
    plugins: [react(), dts()],
    publicDir: 'dist',
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/ui-kit/index.tsx'),
        name: '@reef/ui-kit',
        formats: ['es'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        input: path.resolve(__dirname, 'src/ui-kit/index.tsx'),
        external: [
          '@fortawesome/fontawesome-svg-core',
          '@fortawesome/free-regular-svg-icons',
          '@fortawesome/free-solid-svg-icons',
          '@fortawesome/react-fontawesome',
          '@polkadot/react-identicon',
          '@types/jest',
          '@types/node',
          '@types/react',
          '@types/react-dom',
          'qrcode.react',
          'react-syntax-highlighter',
          'react-transition-group',
          'react',
          'react-dom',
          'react-router-dom',
          'bignumber.js'
        ]
      }
    }
  }
})
