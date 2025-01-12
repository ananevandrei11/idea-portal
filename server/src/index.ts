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

    expressApp.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error({
        logType: 'expressApp',
        error,
        meta: {
          req,
        },
      });
      if (res.headersSent) {
        next(error);
        return;
      }
      res.status(500).send('Middleware error. Internal server error');
    });

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
