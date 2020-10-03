import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { proxy } from 'aws-serverless-express';

import { bootstrap } from './app';

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrap();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
