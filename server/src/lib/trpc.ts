import { type inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import { type TRPCRouter } from '../router';
import { type ExpressRequest } from '../utils/types';
import { type AppContext } from './context';

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => {
    const me = (req as ExpressRequest).user || null;
    return {
      ...appContext,
      me,
    };
  };

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>;

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const applyTRPCToExpressApp = async (expressApp: Express, appContext: AppContext, TRPCRouter: TRPCRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: TRPCRouter,
      createContext: getCreateTrpcContext(appContext),
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
