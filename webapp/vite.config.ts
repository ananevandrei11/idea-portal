import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr(),
      sentryVitePlugin({
        org: 'studying-t9',
        project: 'idea-portal',
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
    ],
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
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'mixed-decls', 'slash-div'],
        },
      },
    },
    define: {
      'process.env': env,
    },
  };
});
