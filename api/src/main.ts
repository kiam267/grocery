
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from './app.module';

const server: Express = express();

let cachedApp: Express | undefined;

async function bootstrap(): Promise<Express> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api'); // remove if you don't want a global prefix
    app.enableCors(); // add/adjust if your frontend needs it
    await app.init();
    cachedApp = server;
  }
  return cachedApp;
}

export default async (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> => {
  const app = await bootstrap();
  app(req as any, res as any);
};
