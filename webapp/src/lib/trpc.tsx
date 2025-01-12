import type { TRPCRouter } from '@idea-portal/server/src/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, type TRPCLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { observable } from '@trpc/server/observable';
import Cookies from 'js-cookie';
import superjson from 'superjson';
import { env } from './env';
import { sentryCaptureException } from './sentry';

export const trpc = createTRPCReact<TRPCRouter>({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const customTrpcLink: TRPCLink<TRPCRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(error) {
          if (!error.data?.isExpected) {
            sentryCaptureException(error);
            // if (env.VITE_NODE_ENV !== 'development') {
            //   console.error(error);
            // }
          }
          observer.error(error);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};

const trpcClient = trpc.createClient({
  links: [
    customTrpcLink,
    loggerLink({ enabled: () => env.VITE_NODE_ENV === 'development' }),
    httpBatchLink({
      url: env.VITE_API_TRPC_URL,
      headers: () => {
        const token = Cookies.get(env.VITE_NAME_TOKEN_COOKIE);
        return {
          ...(token && { Authorization: `Bearer ${token}` }),
        };
      },
    }),
  ],
  transformer: superjson,
});

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
