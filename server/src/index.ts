import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/context';
import { env } from './lib/env';
import { logger } from './lib/logger';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTRPCToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';
import { presetDB } from './scripts/presetDB';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    await presetDB(ctx);
    const expressApp = express();
    expressApp.use(cors());
    expressApp.get('/ping', (_, res) => {
      res.send('pong');
    });
    applyPassportToExpressApp(expressApp, ctx);
    await applyTRPCToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      logger.info({
        logType: 'expressApp',
        message: `Server started at http://localhost:${env.PORT}`,
      });
    });
  } catch (e) {
    logger.error({
      logType: 'expressApp',
      error: e,
    });
    await ctx?.stop().catch((e) => {
      logger.error({
        logType: 'expressApp',
        error: e,
        meta: {
          ctx,
        },
      });
    });
  }
})();
