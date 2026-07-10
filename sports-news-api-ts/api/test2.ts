import type { VercelRequest, VercelResponse } from '@vercel/node';
import Fastify from 'fastify';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = Fastify({ logger: false });
    app.get('/api/health', async () => ({ status: 'ok' }));

    const result = await app.inject({
      method: req.method as any,
      url: req.url || '/',
    });

    res.status(result.statusCode);
    res.send(result.payload);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
