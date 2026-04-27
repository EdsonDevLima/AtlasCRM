import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { Request, Response } from 'express';

import { AppModule } from './app.module';

let cachedServer: express.Express;

async function bootstrapServer(): Promise<express.Express> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors({
      origin: true,
      credentials: true,
    });

    await nestApp.init();
    cachedServer = expressApp;
  }

  return cachedServer;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrapServer();
  return server(req, res);
}
