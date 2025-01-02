import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/context';
import { env } from './lib/env';
import { applyPassportToExpressApp } from './lib/passport';
import { applyTRPCToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

void (async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const expressApp = express();
    expressApp.use(cors());
    expressApp.get('/ping', (_, res) => {
      res.send('pong');
    });
    applyPassportToExpressApp(expressApp, ctx);
    await applyTRPCToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      console.info(`Server started at http://localhost:${env.PORT}`);
    });
  } catch (e) {
    console.error(e);
    await ctx?.stop().catch(console.error);
  }
})();
