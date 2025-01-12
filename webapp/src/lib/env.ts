import { z } from 'zod';

export const zEnv = z.object({
  VITE_API_TRPC_URL: z.string().trim().min(1),
  VITE_NAME_TOKEN_COOKIE: z.string().trim().min(1),
  VITE_NODE_ENV: z.enum(['development', 'production']),
  VITE_WEB_SENTRY_DSN: z.string().trim().min(1),
});

// eslint-disable-next-line no-restricted-syntax
export const env = zEnv.parse(import.meta.env);
