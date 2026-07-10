# Rádio Coringão - Documentação da API

## Configuração

Para ativar o consumo da API, altere o arquivo `.env.local`:

```env
NEXT_PUBLIC_USE_API=true
NEXT_PUBLIC_API_URL=https://sua-api.com/api
```

## Endpoints

### Notícias

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| GET | `/news/editorial` | Notícias editoriais (hero + laterais) | - |
| GET | `/news/latest` | Últimas notícias | - |
| GET | `/news` | Buscar notícias | `category`, `page`, `limit`, `q` |
| GET | `/news/:slug` | Artigo por slug | - |
| GET | `/news/search` | Buscar notícias | `q` |
| GET | `/news/:slug/comments` | Comentários do artigo | - |
| POST | `/news/:slug/comments` | Adicionar comentário | `name`, `content` |

### Esportes / Matches

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/matches/next` | Próximo jogo masculino |
| GET | `/matches/next-feminino` | Próximo jogo feminino |
| GET | `/matches/next-basquete` | Próximo jogo basquete |
| GET | `/matches/recent` | Últimos resultados |
| GET | `/matches/:id` | Jogo por ID |
| GET | `/matches` | Buscar jogos por competição |

### Classificações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/standings` | Classificação geral |
| GET | `/standings/:competition` | Classificação por competição |

### Colunistas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/columnists` | Todos os colunistas |
| GET | `/columnists/:slug` | Colunista por slug |

### Newsletter

| Método | Endpoint | Descrição | Corpo |
|--------|----------|-----------|-------|
| POST | `/newsletter/subscribe` | Inscrever email | `{ name, email }` |

---

## Formato de Resposta

### Sucesso
```json
{
  "data": { ... }
}
```

### Erro
```json
{
  "error": {
    "code": 404,
    "message": "Notícia não encontrada"
  }
}
```

---

## Estrutura dos Dados

### NewsArticle
```json
{
  "id": "string",
  "title": "string",
  "excerpt": "string",
  "category": "string",
  "categorySlug": "string",
  "author": "string",
  "authorAvatar": "string",
  "imageUrl": "string",
  "imageAlt": "string",
  "publishedAt": "string",
  "slug": "string",
  "isBreaking": boolean,
  "isLive": boolean,
  "viewCount": number
}
```

### NextMatch
```json
{
  "homeTeam": "string",
  "awayTeam": "string",
  "date": "string",
  "time": "string",
  "venue": "string",
  "competition": "string",
  "hasTickets": boolean
}
```

### TableEntry
```json
{
  "pos": number,
  "time": "string",
  "pts": number,
  "j": number,
  "v": number,
  "e": number,
  "d": number,
  "gp": number,
  "gc": number
}
```

### MatchResult
```json
{
  "home": "string",
  "away": "string",
  "score": "string"
}
```

### Comment
```json
{
  "id": "string",
  "name": "string",
  "content": "string",
  "articleSlug": "string",
  "createdAt": "string"
}
```

---

## Switch Mock ↔ API

Para alternar entre dados mock e API real:

1. **Desenvolvimento** (mock): `NEXT_PUBLIC_USE_API=false`
2. **Produção** (API): `NEXT_PUBLIC_USE_API=true`

O container de dependências (`src/application/services/container.ts`) automaticamente seleciona o repositório correto baseado na variável de ambiente.
