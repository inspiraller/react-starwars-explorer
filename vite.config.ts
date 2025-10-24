import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  // Load .env files based on mode (development, production) %VAR in index.html
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const VITE_PORT = env.VITE_PORT;
  const VITE_API_BASE_URL = env.VITE_API_BASE_URL;
  const VITE_API_PROXY = env.VITE_API_PROXY;

  return {
    define: {
      // Replace %VITE_API_BASE_URL% in index.html
      'process.env': env,
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named', // enables default export for React component
        },
      }),
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            i18n: [
              'i18next',
              'i18next-browser-languagedetector',
              'i18next-http-backend',
              'react-i18next',
            ],
            // TODO add remaining items to build
          },
        },
      },
      minify: 'esbuild',
    },
    esbuild: {
      treeShaking: true,
      target: 'es2020',
      drop:
        process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
        '@tests': path.resolve(__dirname, './__tests__'),
      },
    },

    server: {
      // fix - (failed) net::ERR_CONNECTION_REFUSED
      host: '0.0.0.0',
      port: Number(VITE_PORT) || 5173, // fallback to 5173 if not set
      strictPort: true,
      proxy: {
        [VITE_API_PROXY]: {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace(/^\/api/, ''), // remove /api
        },
      },
    },
  };
});
