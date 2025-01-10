import { type inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import { type TRPCRouter } from '../router';
import { type ExpressRequest } from '../utils/types';
import { type AppContext } from './context';
import { logger } from './logger';

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

export const createTrpcRouter = trpc.router;

export const trpcLoggedProcedure = trpc.procedure.use(
  trpc.middleware(async ({ path, type, next, ctx, rawInput }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    const meta = {
      path,
      type,
      userId: ctx.me?.id || null,
      durationMs,
      rawInput: rawInput || null,
    };
    if (result.ok) {
      logger.info({
        logType: `trpc:${type}:success`,
        message: 'Successfull request',
        meta: {
          ...meta,
          // output: result.data
        },
      });
    } else {
      logger.error({ logType: `trpc:${type}:error`, error: result.error, meta });
    }
    return result;
  })
);

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
