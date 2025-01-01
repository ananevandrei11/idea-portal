import cors from 'cors';
import express from 'express';
import { applyTRPCToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

const expressApp = express();
expressApp.use(cors());
expressApp.get('/ping', (_, res) => {
  res.send('pong');
});
applyTRPCToExpressApp(expressApp, trpcRouter);

expressApp.listen(3000, () => {
  console.info('Server started at http://localhost:3000');
});
