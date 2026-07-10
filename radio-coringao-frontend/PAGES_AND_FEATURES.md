# Rádio Coringão - Guia Completo de Páginas e Funcionalidades

## Visão Geral do Projeto

Portal de notícias esportivas do Sport Club Corinthians Paulista. Feito com Next.js 16, React 19, TypeScript, Tailwind CSS 4 e Framer Motion. Arquitetura em Clean Architecture com separação de domínio, aplicação, infraestrutura e apresentação.

---

## PÁGINA INICIAL (`/`)

**Arquivo:** `src/app/page.tsx`

### O que mostra:
1. **Editorial Grid** (lado esquerdo ~55%)
   - Card hero grande com imagem, overlay gradiente, categoria, título e excerpt
   - 2 cards laterais empilhados (lado direito ~45%)
   - Total: 3 cards no topo

2. **4 Cards Adicionais** (abaixo do editorial grid)
   - Grid 2 colunas com imagem, categoria e título
   - Imagens com overlay gradiente escuro

3. **Sidebar** (lado direito, 320px)
   - **Carrossel de Jogos**: 3 cards (Masculino, Feminino, Basquete) com logo dos times, data, hora, local. Auto-play 10s, loop infinito. Seta esquerda aparece a partir do 2º card.
   - **Mais Lidas**: 5 notícias mais vistas com número, título e categoria
   - **Tabela Brasileirão**: 20 posições com barras coloridas por zona, logos dos times, badges coloridos para vitórias/empates/derrotas

4. **Últimas Notícias**
   - Editorial grid (hero + 2 laterais)
   - Grid de 6 cards com imagem e título
   - Sem paginação

5. **Destaques da Semana / Mês**
   - Carrossel se >4 cards, grid se ≤4
   - Auto-play: Semana 10s, Mês 20s
   - Link "Ver mais →" para a página de destaques

### Dados mock:
- `editorialNews[0]` = Card Hero
- `editorialNews[1-2]` = Cards laterais
- `latestNews[0-3]` = 4 cards adicionais
- `latestNews[0-4]` = Mais Lidas

---

## PÁGINA DE NOTÍCIAS (`/news`)

**Arquivo:** `src/app/news/page.tsx` + `src/presentation/components/news/NewsMainContent.tsx`

### O que mostra:
- **Título personalizado** "Notícias" grande (64px desktop) com barra vermelha
- **Editorial Grid** com as 3 primeiras notícias da aba selecionada
- **3 abas**: Últimas Notícias, Destaques da Semana, Destaques do Mês
- **Grid de cards** com imagem, categoria, título, excerpt, autor e data
- **Paginação**: ativa se >10 notícias (8 por página)
- Aba selecionável via URL: `/news?tab=semanais`

---

## CATEGORIAS DE NOTÍCIAS (`/news/category/[category]`)

**Arquivo:** `src/app/news/category/[category]/page.tsx`

### Categorias disponíveis:
- `/news/category/ultimas` - Últimas Notícias
- `/news/category/mercado` - Transferências e contratos
- `/news/category/politica` - Decisões administrativas
- `/news/category/destaques` - Conteúdo selecionado

### O que mostra:
- **Hero** com nome da categoria e descrição
- **Editorial Grid** com 3 primeiras notícias
- **Grid de cards** com paginação se >10 notícias
- **Filtros** por categoria e ordenação (Mais recente, Por data, A-Z)

---

## ARTIGO/NOTÍCIA (`/news/[slug]`)

**Arquivo:** `src/app/news/[slug]/page.tsx` + `src/presentation/components/news/ArticleContent.tsx`

### O que mostra:
- **Voltar** link animado no topo
- **Badge da categoria** cinza + data
- **Título** grande e impactante
- **Excerpt** como resumo
- **Autor** com foto + nome + cargo
- **Botão Compartilhar** (copia link)
- **Imagem hero** com crédito abaixo
- **Corpo do artigo** formatado com:
  - Texto 17px, line-height 1.85
  - Figuras com legendas
  - Blockquote estilizado
  - Box de estatísticas
- **Segunda imagem** com crédito
- **Sidebar**:
  - Próximo jogo com logos dos times
  - Mais Lidas (5 notícias)
- **Destaques da Semana** no final com 4 cards

---

## BUSCA (`/search`)

**Arquivo:** `src/app/search/page.tsx` + `src/presentation/components/search/SearchPageContent.tsx`

### O que mostra:
- **Campo de busca** com ícone de lupa
- **Filtros**: por categoria (11 opções) e ordenação (Mais recente, Por data, A-Z)
- **Resultados**: cards de notícias com imagem e título
- **Paginação**: se >8 resultados
- **Empty state**: "Nenhum resultado encontrado" quando não acha
- **Empty state inicial**: "O que você procura?"
- **Busca**: filtra por título, categoria e excerpt

### Dropdown de busca (Header):
- Abre ao digitar 1+ caractere no input
- Mostra até 5 resultados com imagem e título
- Enter redireciona para `/search?q=...`
- Escape fecha o dropdown

---

## PÁGINAS DE ESPORTES (`/sports/[sport]`)

**Arquivo:** `src/app/sports/[sport]/page.tsx` + `src/presentation/components/sports/SportsContent.tsx`

### Esportes disponíveis:
- `/sports/futebol` - Futebol Masculino Profissional
- `/sports/futebol-feminino` - Futebol Feminino Profissional
- `/sports/basquete` - Basquete Masculino Profissional
- `/sports/futsal` - Futsal Masculino Profissional
- `/sports/sub-20` - Futebol Sub-20
- `/sports/sub-17` - Futebol Sub-17

### O que mostra (para cada esporte):
- **Hero** com gradiente escuro, título e descrição
- **Próximo Jogo** com logos dos times, data, hora, local
- **Últimos Resultados** com placar
- **3 abas**:
  - **Notícias**: Últimas Notícias + Destaques da Semana (carrossel se >4)
  - **Tabelas**: Tabela principal + tabelas adicionais por competição
  - **Transferências**: Contratações e saídas com imagem dos jogadores

### Tabelas adicionais por esporte:
- **Futebol Feminino**: Brasileirão Feminino, Libertadores Feminina, Copa do Brasil Feminina, Paulistão Feminino
- **Sub-20**: Paulistão Sub-20
- **Sub-17**: Paulistão Sub-17

---

## CLASSIFICAÇÕES (`/standings`)

**Arquivo:** `src/app/standings/page.tsx`

### O que mostra:
- **Hero** "Brasileirão" com gradiente escuro
- **Tabela completa** com 20 times:
  - Barra lateral colorida por posição
  - Logo do time
  - Pontos em círculo
  - Badges: Vitórias (azul), Empates (amarelo), Derrotas (vermelho)
  - Saldo de gols colorido

### Campeonatos (`/standings/[championship]`):
- `/standings/brasileirao` - Brasileirão Série A (20 times)
- `/standings/libertadores` - Libertadores (4 times)
- `/standings/sul-americana` - Sul-Americana (mensagem de não participação)
- `/standings/copa-do-brasil` - Copa do Brasil (oitavas)
- `/standings/paulistao` - Paulistão (campeão)
- `/standings/copinha` - Copinha (quartas)

### Cada página mostra:
- Hero com nome e status do campeonato
- Última partida e próxima partida com logos
- Tabela de classificação completa
- Mensagem de eliminação quando aplicável

---

## EVENTOS (`/events/[event]`)

**Arquivo:** `src/app/events/[event]/page.tsx`

### Eventos disponíveis:
- `/events/proximos-jogos` - Próximos jogos com logos dos times
- `/events/socios` - Benefícios para sócios
- `/events/neo-quimica-arena` - Eventos no estádio (4 notícias)
- `/events/fiel-torcida` - Organização da torcida (4 notícias)

### Layout por tipo:
- **Próximos Jogos**: cards com logo dos dois times, data, hora, local
- **Neo Química Arena / Fiel Torcida**: layout editorial (hero + 2 laterais) + grid de cards

---

## PÁGINAS ESTÁTICAS

### Termos de Uso (`/terms-of-use`)
- 8 seções: Aceitação, Propriedade Intelectual, Uso do Conteúdo, Comentários, Links Externos, Isenção, Alterações, Contato

### Anuncie Conosco (`/advertise`)
- Por que anunciar (estatísticas)
- Email e telefone de contato

### Fale Conosco (`/contact`)
- Email e telefone
- Formulário: nome, email, assunto, mensagem

### Quem Somos (`/about`)
- História da empresa (desde 2020)
- Missão
- Equipe (4 membros com foto e cargo)

### Trabalhe Conosco (`/careers`)
- Vagas abertas (4 posições)
- Como se candidatar com email e telefone

---

## HEADER/NAVBAR

**Arquivo:** `src/presentation/components/layout/Header.tsx`

### Desktop:
- Logo à esquerda
- Nav centralizada: Futebol, Basquete, Futsal, Notícias, Classificações, Eventos
- Busca + Menu hamburguer à direita

### Mega Menu (hover):
- Futebol: Masculino, Feminino, Sub-20, Sub-17
- Basquete: Masculino, Feminino
- Futsal: Profissional
- Notícias: Últimas, Mercado, Política, Destaques
- Classificações: Brasileirão, Libertadores, Sul-Americana, Copa do Brasil, Paulistão, Copinha
- Eventos: Próximos Jogos, Sócios, Neo Química Arena, Fiel Torcida

### Comportamento:
- Abre no hover dos itens
- 2 colunas: subitens à esquerda, conteúdo dinâmico à direita
- Fecha ao clicar fora
- Animação suave com framer-motion

### Mobile:
- Menu hamburguer com animação
- Itens aparecem com delay escalonado

### Busca:
- Input com animação ao clicar no ícone
- Dropdown compacto ao digitar (1+ caractere)
- Enter redireciona para `/search?q=...`

---

## FOOTER

**Arquivo:** `src/presentation/components/layout/Footer.tsx`

- Logo + descrição
- 2 colunas de links: Termos de Uso, Anuncie Conosco, Quem Somos, Trabalhe Conosco
- Redes sociais: Instagram, YouTube, TikTok
- Copyright 2026

---

## 404 PAGE

**Arquivo:** `src/app/not-found.tsx`

- Número 404 grande (80px mobile, 100px desktop)
- Título "Página não encontrada"
- Botões: "Início" e "Notícias"
- Centralizado com padding

---

## LOADING STATES

Cada rota tem um `loading.tsx` com skeleton:
- `/loading.tsx` - Homepage
- `/news/loading.tsx` - Notícias
- `/news/[slug]/loading.tsx` - Artigo
- `/news/category/loading.tsx` - Categorias
- `/sports/loading.tsx` - Esportes
- `/sports/[sport]/loading.tsx` - Esporte individual
- `/standings/loading.tsx` - Classificações
- `/standings/[championship]/loading.tsx` - Campeonato
- `/events/loading.tsx` - Eventos
- `/events/[event]/loading.tsx` - Evento individual
- `/search/loading.tsx` - Busca

---

## COMPONENTES REUTILIZÁVEIS

### NewsCard (`ui/NewsCard.tsx`)
- Variantes: default (vertical) e horizontal
- Imagem lazy loading
- Badge de categoria
- Título, excerpt, autor, data

### EditorialGrid (`news/EditorialGrid.tsx`)
- Layout 55% / 45% no desktop
- Hero card + 2 side cards
- Overlay gradiente escuro

### MatchCarousel (`news/MatchCarousel.tsx`)
- 3 cards de jogos
- Auto-play 10s, loop infinito
- Bolinhas de paginação

### NextMatchCard (`news/NextMatchCard.tsx`)
- Logo dos times (iniciais em círculo)
- Data, hora, local
- Botão Ingressos

### ClassificationCarousel (`classification/ClassificationCarousel.tsx`)
- 2 páginas (10 times cada)
- Auto-play 10s
- Barra lateral colorida

### HighlightsSection (`news/HighlightsSection.tsx`)
- Destaques da Semana e Mês
- Carrossel se >4, grid se ≤4
- Auto-play (10s semana, 20s mês)

### Pagination (`ui/Pagination.tsx`)
- Botões numéricos
- Só aparece se >1 página

### ImageWithFallback (`ui/ImageWithFallback.tsx`)
- Imagem com fallback para erro
- Loading skeleton

---

## DADOS MOCK

### Estrutura:
- `infrastructure/data/index.ts` - editorialNews, latestNews, nextMatch, standings
- `infrastructure/data/sports.ts` - dados por esporte
- `infrastructure/data/news-categories.ts` - categorias de notícias
- `infrastructure/data/news-all.ts` - dados consolidados
- `infrastructure/data/events.ts` - eventos
- `infrastructure/data/championships.ts` - campeonatos

### Imagens:
Todas usam placeholder do Google (mesma URL).

---

## ROTAS DINÂMICAS

| Rota | Parâmetro | Fonte de dados |
|------|-----------|----------------|
| `/sports/[sport]` | futebol, feminino, basquete, futsal, sub-20, sub-17 | `sportsData` |
| `/news/[slug]` | slug da notícia | `getArticlePageData` |
| `/news/category/[category]` | ultimas, mercado, politica, destaques | `newsCategories` |
| `/standings/[championship]` | brasileirao, libertadores, etc. | `championshipsData` |
| `/events/[event]` | proximos-jogos, socios, etc. | `eventsData` |

---

## COMO ADICIONAR UMA NOVA PÁGINA

1. Criar pasta em `src/app/nome-da-pagina/`
2. Criar `page.tsx` com o componente
3. Se dinâmica, criar `loading.tsx`
4. Adicionar dados mock em `src/infrastructure/data/`
5. Atualizar Header/Footer se necessário

## COMO ADICIONAR UM NOVO COMPONENTE

1. Criar arquivo em `src/presentation/components/categoria/`
2. Seguir padrão: `"use client"`, interface de props, export nomeado
3. Usar classes Tailwind do design system
4. Adicionar `loading="lazy"` em imagens
5. Usar `framer-motion` para animações
