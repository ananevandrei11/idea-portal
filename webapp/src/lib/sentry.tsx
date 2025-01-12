import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useUserContext } from './context';
import { env } from './env';

if (env.VITE_WEB_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_WEB_SENTRY_DSN,
    environment: env.VITE_NODE_ENV,
    normalizeDepth: 10,
    integrations: [],
  });
}

export const sentryCaptureException = (error: Error) => {
  if (env.VITE_WEB_SENTRY_DSN) {
    Sentry.captureException(error);
  }
};

export const SentryUser = () => {
  const user = useUserContext();
  useEffect(() => {
    if (env.VITE_WEB_SENTRY_DSN) {
      if (user) {
        Sentry.setUser({
          email: user.email,
          id: user.id,
          ip_address: '{{auto}}',
          username: user.nick,
        });
      } else {
        Sentry.setUser(null);
      }
    }
  }, [user]);
  return null;
};
