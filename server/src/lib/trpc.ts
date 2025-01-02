import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import { type TRPCRouter } from '../router';
import { type AppContext } from './context';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
});

export const applyTRPCToExpressApp = async (expressApp: Express, appContext: AppContext, TRPCRouter: TRPCRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: TRPCRouter,
      createContext: () => appContext,
    })
  );

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: TRPCRouter,
      request: {
        superjson: true,
      },
    })
  );
};
