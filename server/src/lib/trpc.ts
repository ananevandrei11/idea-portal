import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import { type TRPCRouter } from '../router';
import { type AppContext } from './context';

export const trpc = initTRPC.context<AppContext>().create();

export const applyTRPCToExpressApp = (expressApp: Express, appContext: AppContext, TRPCRouter: TRPCRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: TRPCRouter,
      createContext: () => appContext,
    })
  );
};
