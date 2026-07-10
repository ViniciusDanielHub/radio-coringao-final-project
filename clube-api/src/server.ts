// src/server.ts
import './shared/json/bigint-serialization';
import 'dotenv/config';
import { checkEnv } from './shared/env-check';
import { buildApp } from './app';
import { startLoanReturnScheduler } from './shared/scheduler/loan-return';

checkEnv();

const PORT = Number(process.env.PORT) || 3010;

async function main() {
  const app = await buildApp();

  // ─── Timeouts anti-DDoS ────────────────────────────────────
  app.server.headersTimeout = 10_000;
  app.server.keepAliveTimeout = 5_000;
  app.server.requestTimeout = 30_000;

  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info({ port: PORT, env: process.env.NODE_ENV ?? 'development', health: `http://localhost:${PORT}/api/health` }, 'Servidor iniciado');
    startLoanReturnScheduler();
  } catch (err) {
    app.log.error({ err }, 'Falha ao iniciar o servidor');
    process.exit(1);
  }

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, 'Sinal recebido — encerrando servidor');
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();
