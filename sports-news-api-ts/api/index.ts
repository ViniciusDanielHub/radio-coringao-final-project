import type { VercelRequest, VercelResponse } from '@vercel/node';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';

let app: any = null;

async function getApp() {
  if (app) return app;

  app = Fastify({ logger: false });

  await app.register(helmet, { global: true });
  await app.register(compress, { global: true, threshold: 1024 });
  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || true,
    credentials: true,
  });
  await app.register(rateLimit, {
    global: true,
    max: 100,
    timeWindow: '15 minutes',
  });

  // Health check
  app.get('/api/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }));

  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const fastify = await getApp();

    const result = await fastify.inject({
      method: req.method as any,
      url: req.url || '/',
      headers: req.headers as Record<string, string>,
      body: req.body,
      query: req.query as Record<string, string>,
    });

    res.status(result.statusCode);
    Object.entries(result.headers).forEach(([key, value]) => {
      if (value) res.setHeader(key, value);
    });
    res.send(result.payload);
  } catch (err: any) {
    console.error('Function error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
