import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';

const expressApp = express();

expressApp.get('/ping', (_, res) => {
  res.send('pong');
});

expressApp.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter }));

expressApp.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
