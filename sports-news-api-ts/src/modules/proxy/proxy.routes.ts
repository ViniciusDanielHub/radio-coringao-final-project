// src/modules/proxy/proxy.routes.ts
//
// Rotas públicas de proxy para a clube-api.
// O frontend consome sports-news-api (porta 3001), mas os dados de
// jogos e classificações vivem na clube-api. Estas rotas repassam
// as requisições e transformam a resposta para o formato que o
// frontend espera (NextMatch, MatchResult, TableEntry).
import type { FastifyInstance } from 'fastify';
import { clubeApiRequest } from './clube-api-client';

// ── Helpers de transformação ────────────────────────────────

function toNextMatch(m: any) {
  return {
    homeTeam: m.isHome ? (m.competition?.category?.name ?? 'Corinthians') : (m.opponent?.name ?? 'Adversário'),
    awayTeam: m.isHome ? (m.opponent?.name ?? 'Adversário') : (m.competition?.category?.name ?? 'Corinthians'),
    date: m.date,
    time: m.date ? new Date(m.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '',
    venue: m.venue ?? '',
    competition: m.competition?.name ?? '',
    hasTickets: false,
  };
}

function toMatchResult(m: any) {
  const home = m.isHome ? (m.competition?.category?.name ?? 'Corinthians') : (m.opponent?.name ?? 'Adversário');
  const away = m.isHome ? (m.opponent?.name ?? 'Adversário') : (m.competition?.category?.name ?? 'Corinthians');
  const score = m.homeScore != null && m.awayScore != null ? `${m.homeScore} x ${m.awayScore}` : '';
  return { home, away, score };
}

function toTableEntry(row: any) {
  return {
    pos: row.position,
    time: row.teamName,
    pts: row.points,
    j: row.played,
    v: row.won,
    e: row.drawn,
    d: row.lost,
    gp: row.goalsFor,
    gc: row.goalsAgainst,
  };
}

// ── Rotas ───────────────────────────────────────────────────

export async function proxyPublicRoutes(app: FastifyInstance): Promise<void> {

  // GET /api/matches/next → clube-api GET /api/matches/next
  app.get('/matches/next', async (request, reply) => {
    try {
      const data = await clubeApiRequest<any[]>('/api/matches/next');
      return reply.send(data.map(toNextMatch));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/matches/next-feminino → clube-api GET /api/matches/next-feminino
  app.get('/matches/next-feminino', async (_request, reply) => {
    try {
      const data = await clubeApiRequest<any>('/api/matches/next-feminino');
      return reply.send(data ? toNextMatch(data) : null);
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/matches/next-basquete → clube-api GET /api/matches/next-basquete
  app.get('/matches/next-basquete', async (_request, reply) => {
    try {
      const data = await clubeApiRequest<any>('/api/matches/next-basquete');
      return reply.send(data ? toNextMatch(data) : null);
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/matches/recent → clube-api GET /api/matches/recent
  app.get('/matches/recent', async (_request, reply) => {
    try {
      const data = await clubeApiRequest<any[]>('/api/matches/recent');
      return reply.send(data.map(toMatchResult));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/matches/:id → clube-api GET /api/matches/:id
  app.get('/matches/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const data = await clubeApiRequest<any>(`/api/matches/${id}`);
      return reply.send(toNextMatch(data));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/matches → clube-api GET /api/matches (competition filter)
  app.get('/matches', async (request, reply) => {
    const { competition } = request.query as { competition?: string };
    try {
      const qs = competition ? `?competition=${competition}` : '';
      const data = await clubeApiRequest<any[]>(`/api/matches${qs}`);
      return reply.send(data.map(toMatchResult));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/standings → clube-api GET /api/standings
  app.get('/standings', async (_request, reply) => {
    try {
      const data = await clubeApiRequest<any[]>('/api/standings');
      return reply.send(data.map(toTableEntry));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });

  // GET /api/standings/:competition → clube-api GET /api/standings/:competition
  app.get('/standings/:competition', async (request, reply) => {
    const { competition } = request.params as { competition: string };
    try {
      const data = await clubeApiRequest<any[]>(`/api/standings/${competition}`);
      return reply.send(data.map(toTableEntry));
    } catch (err: any) {
      return reply.code(err.statusCode ?? 502).send({ error: err.message });
    }
  });
}
