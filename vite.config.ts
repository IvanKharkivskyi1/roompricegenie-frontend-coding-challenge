import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: '/client/index.tsx',
    },
  },
});
