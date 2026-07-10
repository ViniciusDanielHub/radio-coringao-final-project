#!/usr/bin/env node
/**
 * Popula as tabelas de classificação de todas as competições do banco
 */
const crypto = require('crypto');
const http = require('http');

const JWT_SECRET = 'sports_news_jwt_secret_troque_em_producao';
const CLUBE_API = 'http://localhost:3010';

function makeToken() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    id: '991c731f-4e32-4596-b24d-6d6a12ae7992',
    email: 'admin@radiocoringao.com',
    role: 'SUPER_ADMIN',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(CLUBE_API + path);
    const token = makeToken();
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: url.hostname, port: url.port, path: url.pathname, method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    };
    const req = http.request(opts, (res) => {
      let buf = '';
      res.on('data', (c) => buf += c);
      res.on('end', () => { try { resolve(JSON.parse(buf)); } catch { resolve(buf); } });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const TEAMS = {
  principal: [
    'Corinthians', 'Palmeiras', 'São Paulo', 'Santos', 'Flamengo',
    'Fluminense', 'Botafogo', 'Vasco da Gama', 'Grêmio', 'Internacional',
    'Cruzeiro', 'Atlético Mineiro', 'Bahia', 'Fortaleza', 'Athletico-PR',
    'Mirassol', 'São Bernardo', 'Criciúma', 'Juventude', 'Vitória'
  ],
  feminino: [
    'Corinthians Feminino', 'Palmeiras Feminino', 'São Paulo Feminino',
    'Santos Feminino', 'Flamengo Feminino', 'Ferroviária', 'Grêmio Feminino',
    'Internacional Feminino', 'Cruzeiro Feminino', 'Red Bull Bragantino Feminino'
  ],
  basquete: [
    'Corinthians Basquete', 'Franca', 'Bauru', 'Pinheiros', 'Sesi Franca',
    'Flamengo Basquete', 'Minas', 'Mogi', 'Paulistano', 'Botafogo Basquete'
  ],
  futsal: [
    'Corinthians Futsal', 'Pato Futsal', 'Cascavel', 'Magnus', 'Coral',
    'Atlântico Erechim', 'Carlos Barbosa', 'Asa', 'Joaçaba', 'Foz Iguaçu'
  ],
  'sub-20': [
    'Corinthians Sub-20', 'Palmeiras Sub-20', 'São Paulo Sub-20',
    'Santos Sub-20', 'Flamengo Sub-20', 'São Caetano Sub-20',
    'Grêmio Sub-20', 'Internacional Sub-20', 'Cruzeiro Sub-20', 'Bahia Sub-20'
  ],
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genFootballStandings(teamList) {
  const shuffled = shuffle(teamList);
  return shuffled.map((name, i) => {
    const played = 10 + Math.floor(Math.random() * 10);
    const won = Math.floor(Math.random() * (played + 1));
    const drawn = Math.floor(Math.random() * Math.min(5, played - won + 1));
    const lost = played - won - drawn;
    const gf = won * (2 + Math.floor(Math.random() * 2)) + drawn;
    const gc = lost * (1 + Math.floor(Math.random() * 2)) + drawn;
    const points = won * 3 + drawn;
    return {
      teamName: name, position: 0, points, played, won, drawn, lost,
      goalsFor: gf, goalsAgainst: gc, goalDifference: gf - gc,
      isOwnTeam: name.includes('Corinthians'), groupName: null, form: null,
      logoUrl: null, teamId: null, opponentId: null, zone: 'NONE',
    };
  }).sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference)
    .map((s, i) => ({ ...s, position: i + 1 }));
}

function genBasketballStandings(teamList) {
  const shuffled = shuffle(teamList);
  return shuffled.map((name, i) => {
    const played = 15 + Math.floor(Math.random() * 15);
    const won = Math.floor(Math.random() * (played + 1));
    const lost = played - won;
    const pf = won * (80 + Math.floor(Math.random() * 20)) + lost * (70 + Math.floor(Math.random() * 15));
    const pa = won * (70 + Math.floor(Math.random() * 15)) + lost * (80 + Math.floor(Math.random() * 20));
    return {
      teamName: name, position: 0, points: 0, played, won, drawn: 0, lost,
      goalsFor: pf, goalsAgainst: pa, goalDifference: pf - pa,
      isOwnTeam: name.includes('Corinthians'), groupName: null, form: null,
      logoUrl: null, teamId: null, opponentId: null, zone: 'NONE',
    };
  }).sort((a, b) => b.won - a.won || b.goalDifference - a.goalDifference)
    .map((s, i) => ({ ...s, position: i + 1 }));
}

function genFutsalStandings(teamList) {
  return genFootballStandings(teamList); // futsal usa mesma pontuação
}

const COMP_CONFIGS = [
  // Brasileirão Série A
  { name: 'Brasileirão Série A', gen: () => genFootballStandings(TEAMS.principal) },
  // Paulistão
  { name: 'Paulistão', gen: () => genFootballStandings(TEAMS.principal.slice(0, 16)) },
  // Sul-Americana
  { name: 'Sul-Americana', gen: () => genFootballStandings(TEAMS.principal.slice(8, 16)) },
  // Brasileirão Feminino
  { name: 'Brasileirão Feminino', gen: () => genFootballStandings(TEAMS.feminino) },
  // Paulista Feminino
  { name: 'Paulista Feminino', gen: () => genFootballStandings(TEAMS.feminino.slice(0, 8)) },
  // NBB Basquete
  { name: 'NBB - Nacional de Basquete', gen: () => genBasketballStandings(TEAMS.basquete) },
  // Paulista Basquete (grupo)
  { name: 'Paulista De Basquete', gen: () => {
    const teams = TEAMS.basquete.slice(0, 8);
    const groups = ['Grupo A', 'Grupo B'];
    const result = [];
    groups.forEach((g) => {
      const st = genBasketballStandings(teams.slice(groups.indexOf(g) * 4, groups.indexOf(g) * 4 + 4));
      result.push(...st.map(s => ({ ...s, groupName: g })));
    });
    return result;
  }},
  // Liga Nacional de Futsal
  { name: 'Liga Nacional de Futsal', gen: () => genFutsalStandings(TEAMS.futsal) },
  // Campeonato Brasileiro Sub-20
  { name: 'Campeonato Brasileiro Sub-20', gen: () => genFootballStandings(TEAMS['sub-20']) },
  // Copinha
  { name: 'Copinha', gen: () => genFootballStandings(TEAMS['sub-20'].slice(0, 12)) },
  // Copa São Paulo Júnior
  { name: 'Copa São Paulo Júnior', gen: () => genFootballStandings(TEAMS['sub-20'].slice(0, 10)) },
];

async function main() {
  console.log('🔍 Buscando competições...');
  const comps = await api('GET', '/api/admin/competicoes');
  const compList = Array.isArray(comps) ? comps : comps.data || [];

  console.log(`📋 ${compList.length} competições encontradas`);

  let total = 0;

  for (const config of COMP_CONFIGS) {
    const comp = compList.find(c => c.name === config.name);
    if (!comp) {
      console.log(`⚠️  Competição "${config.name}" não encontrada, pulando...`);
      continue;
    }

    const standings = config.gen(comp);
    try {
      await api('PUT', `/api/admin/classificacoes/${comp.id}/bulk`, standings);
      console.log(`✅ ${comp.name}: ${standings.length} times`);
      total += standings.length;
    } catch (err) {
      console.log(`❌ ${comp.name}: ${err.message || err}`);
    }
  }

  console.log(`\n🎉 Total: ${total} entradas de classificação populadas!`);
}

main().catch(console.error);
