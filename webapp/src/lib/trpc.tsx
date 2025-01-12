import type { TRPCRouter } from '@idea-portal/server/src/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import Cookies from 'js-cookie';
import superjson from 'superjson';
import { env } from './env';

export const trpc = createTRPCReact<TRPCRouter>({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
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
