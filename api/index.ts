// api/index.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from './src/app.module';

const server: Express = express();
let cachedApp: Express | undefined;

async function bootstrap(): Promise<Express> {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      {
        logger: ['error', 'warn'], // keep cold-start logs lean
      },
    );
    app.setGlobalPrefix('api');
    app.enableCors(); // tighten origins for production later
    await app.init();
    cachedApp = server;
  }
  return cachedApp;
}

export default async (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> => {
  try {
    const app = await bootstrap();
    app(req as any, res as any);
  } catch (err) {
    console.error('BOOTSTRAP_FAILURE', err);
    res.status(500).json({ error: (err as Error).message });
  }
};
