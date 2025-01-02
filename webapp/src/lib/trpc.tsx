import type { TRPCRouter } from '@idea-portal/server/src/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import Cookies from 'js-cookie';
import superjson from 'superjson';
import { tokenNameCookie } from './constants';

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
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: () => {
        const token = Cookies.get(tokenNameCookie);
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
