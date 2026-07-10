// src/server.ts
import 'dotenv/config';
import { checkEnv } from './shared/env-check';
import { buildApp } from './app';
import { logger } from './shared/logger';
import { startScheduler, stopScheduler } from './shared/workers/scheduler.worker';

checkEnv();

const PORT = Number(process.env.PORT) || 3000;

async function main() {
  const app = await buildApp();

  // ─── Timeouts anti-DDoS ────────────────────────────────────
  app.server.headersTimeout = 10_000;   // 10s para receber todos os headers
  app.server.keepAliveTimeout = 5_000;  // 5s de keep-alive antes de fechar conexão
  app.server.requestTimeout = 30_000;   // 30s timeout total por request

  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    logger.info(
      { port: PORT, env: process.env.NODE_ENV ?? 'development', health: `http://localhost:${PORT}/api/health` },
      'Servidor iniciado',
    );
  } catch (err) {
    logger.error({ err }, 'Falha ao iniciar o servidor');
    process.exit(1);
  }

  if (process.env.NODE_ENV !== 'test') {
    startScheduler({
      intervalMs: Number(process.env.SCHEDULER_INTERVAL_MS) || 60_000,
    });
  }

  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Sinal recebido — encerrando servidor');
    stopScheduler();
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();