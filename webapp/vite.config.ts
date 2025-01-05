import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  };
});
