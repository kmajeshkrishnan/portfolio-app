import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4200,
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    },
    allowedHosts: 'all'
  }
}); 