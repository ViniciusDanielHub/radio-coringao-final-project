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
  await app.register(rateLimit, { global: true, max: 100, timeWindow: '15 minutes' });

  // Health
  app.get('/api/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  }));

  // Notícias públicas
  app.get('/api/noticias', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    try {
      const articles = await prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        take: 20,
        orderBy: { publishedAt: 'desc' },
        include: { category: true, author: true },
      });
      return reply.send(articles);
    } catch (err: any) {
      console.error('DB error:', err.message);
      return reply.code(500).send({ error: err.message });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.get('/api/noticias/editorial', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      take: 10,
      orderBy: { publishedAt: 'desc' },
      include: { category: true, author: true },
    });
    await prisma.$disconnect();
    return reply.send(articles);
  });

  app.get('/api/noticias/:slug', async (req, reply) => {
    const { slug } = req.params as { slug: string };
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const article = await prisma.article.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { category: true, author: true },
    });
    await prisma.$disconnect();
    if (!article) return reply.code(404).send({ error: 'Not found' });
    return reply.send(article);
  });

  app.get('/api/categorias', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    await prisma.$disconnect();
    return reply.send(categories);
  });

  app.get('/api/banners', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const banners = await prisma.banner.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    await prisma.$disconnect();
    return reply.send(banners);
  });

  app.get('/api/navbar', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const items = await prisma.menuItem.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    await prisma.$disconnect();
    return reply.send(items);
  });

  app.get('/api/eventos', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const events = await prisma.event.findMany({ where: { isActive: true }, orderBy: { startsAt: 'desc' } });
    await prisma.$disconnect();
    return reply.send(events);
  });

  app.get('/api/patrocinadores', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const sponsors = await prisma.sponsor.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    await prisma.$disconnect();
    return reply.send(sponsors);
  });

  app.get('/api/links-rodape', async (req, reply) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const links = await prisma.footerLink.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
    await prisma.$disconnect();
    return reply.send(links);
  });

  app.get('/api/cronistas', async (req, reply) => {
    return reply.send([]);
  });

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
    Object.entries(result.headers).forEach(([key, value]) => { if (value) res.setHeader(key, value); });
    res.send(result.payload);
  } catch (err: any) {
    console.error('Handler error:', err?.stack || err?.message || err);
    res.status(500).json({ error: 'Server error', message: err?.message || 'Unknown' });
  }
}
