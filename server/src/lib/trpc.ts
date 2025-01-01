import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import { type TRPCRouter } from '../router';

export const trpc = initTRPC.create();

export const applyTRPCToExpressApp = (expressApp: Express, TRPCRouter: TRPCRouter) => {
  expressApp.use('/trpc', trpcExpress.createExpressMiddleware({ router: TRPCRouter }));
};
