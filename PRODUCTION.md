# 🚀 Rádio Coringão - Guia de Produção

## Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## Configuração

### 1. Banco de Dados

```bash
# Criar banco de dados
createdb sports_news_db
createdb clube_db

# Executar migrações
cd sports-news-api-ts && npx prisma migrate deploy
cd ../clube-api && npx prisma migrate deploy
```

### 2. Variáveis de Ambiente

Copie os arquivos `.env.production` para `.env` em cada API e preencha:

```bash
cd sports-news-api-ts && cp .env.production .env
cd ../clube-api && cp .env.production .env
```

### 3. Build

```bash
# Build das APIs
cd sports-news-api-ts && npm run build
cd ../clube-api && npm run build

# Build do frontend
cd ../radio-coringao-frontend && npm run build
```

### 4. Iniciar em Produção

```bash
# Opção 1: Script de produção
./start-production.sh

# Opção 2: Manualmente
cd sports-news-api-ts && node dist/app.js &
cd clube-api && node dist/app.js &
cd radio-coringao-frontend && npm start &
```

## Portas

| Serviço | Porta |
|---------|-------|
| Sports News API | 3007 |
| Clube API | 3010 |
| Frontend | 3000 |

## Estrutura

```
radio-coringao-final-project/
├── sports-news-api-ts/    # API de notícias esportivas
├── clube-api/            # API de dados do clube
├── radio-coringao-frontend/ # Frontend Next.js
├── electron/             # Painel admin Electron
├── seed-data.js          # Script de seed
└── start-production.sh   # Script de produção
```

## Endpoints da API

### Sports News API (3007)
- `GET /api/noticias` - Listar notícias
- `GET /api/noticias/:slug` - Buscar notícia por slug
- `GET /api/noticias/editorial` - Artigos em destaque
- `GET /api/noticias/highlights/week` - Destaques da semana
- `GET /api/noticias/search?q=` - Busca

### Clube API (3010)
- `GET /api/classificacoes` - Classificações
- `GET /api/partidas` - Partidas
- `GET /api/movimentacoes` - Transferências
- `GET /api/elenco` - Elenco

## Deploy

### Railway / Render / Vercel

1. Conectar repositório Git
2. Configurar variáveis de ambiente
3. Build command: `npm run build`
4. Start command: `node dist/app.js` (APIs) ou `npm start` (frontend)

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3007
CMD ["node", "dist/app.js"]
```

## Monitoramento

- Logs: As APIs usam Pino para logging estruturado
- Health check: `GET /api/health` em ambas as APIs
- Erros: Sentry configurado na sports-news-api

## Segurança

- JWT para autenticação admin
- Rate limiting ativo
- Helmet para headers de segurança
- CORS configurado
- Validação de input com Zod/Validator
