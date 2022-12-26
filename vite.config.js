import { resolve } from 'path'
import { defineConfig } from 'vite'

const baseDir = 'components';
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');


export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        autocomplete: resolve(root, `${baseDir}/autocomplete/index.html`),
      }
    },
  },
})