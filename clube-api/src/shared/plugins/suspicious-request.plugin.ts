import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

interface SuspiciousEntry {
  count: number;
  firstAt: number;
  lastAt: number;
  blocked: boolean;
  blockedAt?: number;
}

const TRACKING_WINDOW_MS = 5 * 60 * 1000;
const BLOCK_THRESHOLD = 50;
const BLOCK_DURATION_MS = 15 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

const tracker = new Map<string, SuspiciousEntry>();

function getClientIp(request: FastifyRequest): string {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return request.ip;
}

function cleanup() {
  const now = Date.now();
  for (const [ip, entry] of tracker) {
    if (entry.blocked && entry.blockedAt && now - entry.blockedAt > BLOCK_DURATION_MS) {
      tracker.delete(ip);
    } else if (!entry.blocked && now - entry.firstAt > TRACKING_WINDOW_MS) {
      tracker.delete(ip);
    }
  }
}

setInterval(cleanup, CLEANUP_INTERVAL_MS);

export async function suspiciousRequestPlugin(app: FastifyInstance) {
  app.addHook('onResponse', async (request: FastifyRequest, reply: FastifyReply) => {
    const ip = getClientIp(request);
    const status = reply.statusCode;

    if (status < 400) return;

    const now = Date.now();
    let entry = tracker.get(ip);

    if (!entry) {
      entry = { count: 1, firstAt: now, lastAt: now, blocked: false };
      tracker.set(ip, entry);
      return;
    }

    if (now - entry.firstAt > TRACKING_WINDOW_MS) {
      entry.count = 1;
      entry.firstAt = now;
      entry.lastAt = now;
      return;
    }

    entry.count++;
    entry.lastAt = now;

    if (entry.count >= BLOCK_THRESHOLD && !entry.blocked) {
      entry.blocked = true;
      entry.blockedAt = now;
      app.log.warn({ ip, count: entry.count }, 'IP bloqueado por requests suspeitos');
    }
  });

  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const ip = getClientIp(request);
    const entry = tracker.get(ip);

    if (entry?.blocked) {
      reply.code(429).header('Retry-After', '900');
      throw new Error('Muitas requisições com erro. Tente novamente em 15 minutos.');
    }
  });
}
