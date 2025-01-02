import cors from 'cors';
import express from 'express';
import { type AppContext, createAppContext } from './lib/context';
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
    applyTRPCToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(3000, () => {
      console.info('Server started at http://localhost:3000');
    });
  } catch (e) {
    console.error(e);
    await ctx?.stop().catch(console.error);
  }
})();
