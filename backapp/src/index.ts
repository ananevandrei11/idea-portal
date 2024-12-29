import express from 'express';

const expressApp = express();

expressApp.get('/ping', (_, res) => {
  res.send('pong');
});

expressApp.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
