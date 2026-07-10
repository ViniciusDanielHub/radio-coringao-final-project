# Rádio Coringão - Design System & Application Guide

## Visão Geral

O Rádio Coringão é um portal de notícias esportivas dedicado ao Sport Club Corinthians Paulista. Construído com Next.js 16, React 19, TypeScript, Tailwind CSS 4 e Framer Motion.

---

## 1. Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 + Ink (terminal) |
| Estilo | Tailwind CSS 4 (via @tailwindcss/postcss) |
| Animações | Framer Motion 12 |
| Formulários | React Hook Form + Zod |
| Estado | Zustand |
| Ícones | Lucide React |
| Fontes | Manrope (headlines/labels) + Work Sans (body) |
| IA | Material Symbols Outlined (ícones) |

---

## 2. Paleta de Cores (Design Tokens)

### Superfícies
| Token | Cor | Uso |
|-------|-----|-----|
| `--color-surface` | `#fbf9f8` | Fundo principal |
| `--color-surface-dim` | `#dbdad9` | Superfície reduzida |
| `--color-surface-container-lowest` | `#ffffff` | Cards, containers |
| `--color-surface-container-low` | `#f5f3f3` | Hover states |
| `--color-surface-container` | `#efeded` | Inputs, badges |
| `--color-surface-container-high` | `#e9e8e7` | Elevated surfaces |
| `--color-surface-variant` | `#e4e2e2` | Bordas, divisores |

### Cores Primárias
| Token | Cor | Uso |
|-------|-----|-----|
| `--color-primary` | `#000000` | Texto principal, fundo de badges |
| `--color-on-primary` | `#ffffff` | Texto sobre fundo primário |
| `--color-secondary` | `#bc000c` | Destaques, acentos vermelhos |
| `--color-on-secondary` | `#ffffff` | Texto sobre fundo secundário |

### Cores de Texto
| Token | Cor | Uso |
|-------|-----|-----|
| `--color-on-surface` | `#1b1c1c` | Texto principal |
| `--color-on-surface-variant` | `#4c4546` | Texto secundário, labels |
| `--color-outline` | `#7e7576` | Bordas leves |
| `--color-outline-variant` | `#cfc4c5` | Bordas de containers |

### Cores de Status (para tabelas)
| Posição | Cor | Hex |
|---------|-----|-----|
| 1º-4º (Libertadores) | Azul | `#1565C0` |
| 5º (Pré-Libertadores) | Laranja | `#E65100` |
| 6º-11º (Sul-Americana) | Roxo | `#6A1B9A` |
| 12º-17º | Transparente | - |
| 18º-20º (Rebaixamento) | Vermelho | `#b71c1c` |

### Cores de Badges (tabelas)
| Badge | Background | Texto |
|-------|-----------|-------|
| Vitórias | `bg-blue-100` | `text-blue-700` |
| Empates | `bg-yellow-100` | `text-yellow-700` |
| Derrotas | `bg-red-100` | `text-red-700` |
| Saldo + | `bg-blue-100` | `text-blue-700` |
| Saldo - | `bg-red-100` | `text-red-700` |

---

## 3. Tipografia

| Token | Fonte | Tamanho | Peso | Uso |
|-------|-------|---------|------|-----|
| `--font-headline-lg` | Manrope | 48px | 700 | Títulos grandes (desktop) |
| `--font-headline-lg-mobile` | Manrope | 32px | 700 | Títulos grandes (mobile) |
| `--font-headline-md` | Manrope | 24px | 700 | Títulos médios |
| `--font-body-lg` | Work Sans | 18px | 400 | Texto de artigos |
| `--font-body-md` | Work Sans | 16px | 400 | Texto geral |
| `--font-label-sm` | Manrope | 12px | 700 | Labels, badges, botões |

### Tamanhos Utilitários (inline)
- Títulos de cards: `text-[14px]` a `text-[15px]`
- Texto de cards: `text-[13px]`
- Labels/data: `text-[11px]` a `text-[12px]`
- Títulos de artigo: `text-[17px]` (mobile) / `text-headline-lg` (desktop)

---

## 4. Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--spacing-margin-desktop` | 64px | Margem lateral desktop |
| `--spacing-margin-mobile` | 20px | Margem lateral mobile |
| `--spacing-gutter` | 24px | Gap entre colunas |
| `--spacing-section-gap` | 80px | Gap entre seções |
| `--spacing-stack-sm` | 8px | Gap pequeno |
| `--spacing-stack-md` | 16px | Gap médio |
| `--spacing-stack-lg` | 32px | Gap grande |

### Gap entre cards
- Cards de notícias: `gap-[5px]`
- Cards de destaques: `gap-4`
- Grid de categorias: `gap-4`

---

## 5. Layout da Página Inicial

```
┌─────────────────────────────────────────┬──────────────┐
│  Editorial Grid (55%)                   │  Carrossel   │
│  ┌──────────────┬──────────┐            │  de Jogos    │
│  │ Hero Card    │ Side 1   │            │  (3 cards)   │
│  │ (grande)     ├──────────┤            ├──────────────┤
│  │              │ Side 2   │            │  Mais Lidas  │
│  └──────────────┴──────────┘            │  (5 itens)   │
├─────────────────────────────────────────┼──────────────┤
│  4 Cards Adicionais (grid 2 colunas)    │  Tabela      │
│  [Card 1] [Card 2]                      │  Brasileirão │
│  [Card 3] [Card 4]                      │  (20 times)  │
├─────────────────────────────────────────┴──────────────┤
│  Últimas Notícias                                      │
│  ┌──────────────┬──────────┐                           │
│  │ Hero Card    │ Side 1   │                           │
│  ├──────────────┼──────────┤                           │
│  │ Card 1       │ Card 2   │                           │
│  └──────────────┴──────────┘                           │
│  [Card 3] [Card 4] [Card 5] [Card 6]                  │
├────────────────────────────────────────────────────────┤
│  Destaques da Semana (carrossel se >4)                 │
│  Destaques do Mês (carrossel se >4)                   │
└────────────────────────────────────────────────────────┘
```

---

## 6. Componentes Principais

### NewsCard (`ui/NewsCard.tsx`)
- Variantes: `default` (vertical) e `horizontal`
- Imagem com `loading="lazy"`
- Título: `line-clamp-2`, `text-[14px]` (mobile) / `text-[15px]` (desktop)
- Badge de categoria: `bg-surface-container`, `text-[10px]`
- Padding: `p-3` (mobile) / `p-4` (desktop)

### EditorialGrid (`news/EditorialGrid.tsx`)
- Layout: `grid-cols-[55%_45%]` no desktop
- Hero: `min-h-[320px]` (mobile) / `min-h-[500px]` (desktop)
- Side cards: `min-h-[200px]`
- Gap: `gap-[5px]`
- Overlay: `bg-gradient-to-t from-black/80 via-black/20 to-transparent`
- Título hero: `text-[17px]` (mobile) / `text-[20px]` (desktop)
- Título side: `text-[14px]`

### MatchCarousel (`news/MatchCarousel.tsx`)
- 3 cards: Masculino, Feminino, Basquete
- Auto-play: 10 segundos
- Infinito (volta ao início)
- Seta esquerda aparece a partir do 2º card
- Bolinhas de paginação dentro do card

### NextMatchCard (`news/NextMatchCard.tsx`)
- Fundo: gradiente escuro `from-[#111] via-[#1a1a1a] to-[#222]`
- Logo do time: `h-14 w-14`, iniciais em círculo
- Título do time: `clamp(0.75rem, 4vw, 1.4rem)`
- Botão Ingressos: branco com hover para fundo branco
- Bolinhas: `h-2`, ativa: `w-6 bg-white`, inativa: `w-2 bg-white/30`

### ClassificationCarousel (`classification/ClassificationCarousel.tsx`)
- Visual escuro combinando com carrossel de jogos
- 2 páginas (10 times cada)
- Auto-play: 10 segundos
- Barra lateral colorida por posição

### HighlightsSection (`news/HighlightsSection.tsx`)
- 2 seções: "Destaques da Semana" e "Destaques do Mês"
- Carrossel se >4 cards, grid se ≤4
- "Ver mais →" link para a página de destaques
- Tamanho dos cards varia: xl (1-2 cards), lg (3 cards), md (4+)

### ArticleContent (`news/ArticleContent.tsx`)
- Largura: `max-w-full` (mobile) / `max-w-[700px]` (desktop)
- Imagens com crédito abaixo em itálico
- Blockquote: `border-l-4 border-secondary`
- Sidebar: próximo jogo + mais lidas
- Destaques da Semana no final

---

## 7. Navbar & Mega Menu

### Navbar
- Sticky: `sticky top-0 z-50`
- Fundo: `bg-surface`
- Logo à esquerda, nav ao centro, busca + menu à direita
- Nav centralizado com `absolute left-1/2 -translate-x-1/2`

### Mega Menu
- Abre no hover dos itens Futebol, Basquete, Futsal, Notícias, Classificações, Eventos
- 2 colunas: subitens à esquerda (`w-56`), conteúdo dinâmico à direita
- Animação: `height: 0 → auto` com framer-motion
- Fecha ao clicar fora

### Busca
- Input aparece com animação ao clicar no ícone
- Dropdown compacto (`w-64`/`w-72`) aparece ao digitar 1+ caractere
- Mostra imagem + título das notícias
- Enter redireciona para `/search?q=...`

---

## 8. Páginas Estáticas

### Páginas de Informação
| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/terms-of-use` | TermsContent | 8 seções com termos |
| `/advertise` | AdvertiseContent | Publicidade e contato |
| `/contact` | ContactContent | Formulário + contato |
| `/about` | AboutContent | História, missão, equipe |
| `/careers` | JobsContent | Vagas abertas |

### Páginas de Classificação
| Rota | Descrição |
|------|-----------|
| `/standings` | Brasileirão principal |
| `/standings/brasileirao` | Brasileirão completo |
| `/standings/libertadores` | Libertadores |
| `/standings/sul-americana` | Sul-Americana |
| `/standings/copa-do-brasil` | Copa do Brasil |
| `/standings/paulistao` | Paulistão |
| `/standings/copinha` | Copinha |

### Páginas de Esportes (`/sports/[sport]`)
| Rota | Tabs |
|------|------|
| `/sports/futebol` | Notícias, Tabelas, Transferências |
| `/sports/futebol-feminino` | Notícias, Tabelas (Brasileirão, Libertadores, Copa do Brasil, Paulistão) |
| `/sports/basquete` | Notícias, Tabelas, Transferências |
| `/sports/futsal` | Notícias, Tabelas |
| `/sports/sub-20` | Notícias, Tabelas (Paulistão Sub-20) |
| `/sports/sub-17` | Notícias, Tabelas (Paulistão Sub-17) |

### Páginas de Notícias
| Rota | Descrição |
|------|-----------|
| `/news` | Principal com abas (Últimas, Semanais, Mensais) |
| `/news/[slug]` | Artigo individual |
| `/news/category/ultimas` | Categoria Últimas |
| `/news/category/mercado` | Categoria Mercado |
| `/news/category/politica` | Categoria Política |
| `/news/category/destaques` | Categoria Destaques |

### Páginas de Eventos (`/events/[event]`)
| Rota | Descrição |
|------|-----------|
| `/events/proximos-jogos` | Próximos jogos com logos dos times |
| `/events/socios` | Benefícios para sócios |
| `/events/neo-quimica-arena` | Eventos no estádio |
| `/events/fiel-torcida` | Organização da torcida |

---

## 9. Clean Architecture

```
src/
├── app/                          # Next.js App Router (rotas)
│   ├── about/                    # Quem Somos
│   ├── advertise/                # Anuncie Conosco
│   ├── careers/                  # Trabalhe Conosco
│   ├── columns/                  # Colunas
│   ├── contact/                  # Fale Conosco
│   ├── events/[event]/           # Eventos dinâmicos
│   ├── games/                    # Jogos
│   ├── news/                     # Notícias
│   │   ├── [slug]/               # Artigo individual
│   │   └── category/[category]/  # Categorias
│   ├── search/                   # Busca
│   ├── sports/[sport]            # Esportes dinâmicos
│   ├── standings/                # Classificações
│   │   └── [championship]/       # Campeonatos
│   ├── terms-of-use/             # Termos de Uso
│   ├── layout.tsx                # Layout raiz
│   ├── loading.tsx               # Loading global
│   ├── not-found.tsx             # Página 404
│   └── page.tsx                  # Homepage
│
├── domain/                       # Camada de Domínio
│   ├── entities/index.ts         # Entidades (NewsArticle, NextMatch, etc.)
│   └── repositories/index.ts     # Interfaces de repositórios
│
├── application/                  # Camada de Aplicação
│   ├── dto/index.ts              # Data Transfer Objects
│   ├── services/container.ts     # Container de injeção de dependência
│   └── use-cases/index.ts        # Casos de uso
│
├── infrastructure/               # Camada de Infraestrutura
│   ├── api/                      # Client HTTP
│   │   ├── http-client.ts
│   │   └── repositories.ts       # Repositórios da API
│   ├── data/                     # Dados mock
│   │   ├── index.ts              # Dados principais
│   │   ├── sports.ts             # Dados de esportes
│   │   ├── news-categories.ts    # Categorias de notícias
│   │   ├── news-all.ts           # Dados de notícias
│   │   ├── events.ts             # Dados de eventos
│   │   └── championships.ts      # Dados de campeonatos
│   └── repositories/index.ts     # Repositórios mock
│
└── presentation/                 # Camada de Apresentação
    ├── components/
    │   ├── classification/       # Tabelas de classificação
    │   ├── events/               # Páginas de eventos
    │   ├── layout/               # Header, Footer, MegaMenu
    │   ├── news/                 # Componentes de notícias
    │   ├── pages/                # Páginas estáticas
    │   ├── search/               # Busca
    │   ├── sports/               # Páginas de esportes
    │   ├── standings/            # Páginas de classificação
    │   └── ui/                   # Componentes genéricos
    ├── hooks/                    # Hooks customizados
    └── stores/                   # Zustand stores
```

---

## 10. Responsividade

### Breakpoints
| Prefixo | Largura | Uso |
|---------|---------|-----|
| (base) | < 640px | Mobile |
| `sm:` | ≥ 640px | Mobile grande |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |

### Padrões Responsivos
- **Container**: `px-margin-mobile` (20px) → `md:px-margin-desktop` (64px)
- **Grid principal**: `grid-cols-1` → `lg:grid-cols-[1fr_320px]`
- **Cards**: tamanhos menores no mobile, maiores no desktop
- **Tabelas**: `overflow-x-auto` com `min-w-[700px]` para scroll horizontal
- **Navbar**: hamburger menu no mobile, nav completa no desktop
- **Mega Menu**: não aparece no mobile (usa hamburger menu)

---

## 11. Animações (Framer Motion)

### Padrões
- **Entrada de página**: `opacity: 0 → 1`, `y: 20 → 0`, `duration: 0.5`
- **Cards**: `opacity: 0 → 1`, `y: 15 → 0`, `duration: 0.3`, `delay: i * 0.05`
- **Mega Menu**: `height: 0 → auto`, `opacity: 0 → 1`, `duration: 0.25`
- **Dropdown busca**: `opacity: 0 → 1`, `y: -5 → 0`, `duration: 0.15`
- **Menu mobile**: `height: 0 → auto`, `opacity: 0 → 1`, `duration: 0.3`
- **Itens do menu**: `opacity: 0 → 1`, `x: -20 → 0`, `delay: i * 0.05`

---

## 12. Loading States

Cada rota tem um `loading.tsx` com skeleton:
- **Homepage**: grid de skeleton blocks
- **Notícias**: skeleton de hero + grid
- **Artigo**: skeleton de artigo + sidebar
- **Esportes**: skeleton de hero + cards
- **Eventos**: skeleton de cards
- **Classificações**: skeleton de tabela
- **Busca**: skeleton de search + grid

---

## 13. Lazy Loading

Todas as imagens usam `loading="lazy"` exceto:
- Hero image dos artigos: `loading="eager"`
- Logo do site: sem lazy loading (crítico para render)

---

## 14. 404 Page

- Número 404 grande (80px mobile, 100px desktop)
- Título "Página não encontrada"
- Botões: "Início" e "Notícias"
- Centralizado com padding generoso

---

## 15. Dados Mock

### Estrutura
- `infrastructure/data/index.ts`: Dados principais (editorialNews, latestNews, etc.)
- `infrastructure/data/sports.ts`: Dados por esporte (futebol, basquete, etc.)
- `infrastructure/data/news-categories.ts`: Categorias de notícias
- `infrastructure/data/news-all.ts`: Dados consolidados de notícias
- `infrastructure/data/events.ts`: Dados de eventos
- `infrastructure/data/championships.ts`: Dados de campeonatos

### Imagens
Todas as imagens mock usam o mesmo placeholder do Google:
```
https://lh3.googleusercontent.com/aida-public/AB6AXuCh5rWYWHh2ILCnOZuge7OeXQOKkvhBoXWWT-b9AYqyw9pZt__...
```

---

## 16. Rotas Dinâmicas

| Rota | Parâmetro | Dados |
|------|-----------|-------|
| `/sports/[sport]` | futebol, basquete, futsal, volei, futebol-feminino, sub-20, sub-17 | sportsData |
| `/news/[slug]` | slug da notícia | getArticlePageData |
| `/news/category/[category]` | ultimas, mercado, politica, destaques | newsCategories |
| `/standings/[championship]` | brasileirao, libertadores, sul-americana, copa-do-brasil, paulistao, copinha | championshipsData |
| `/events/[event]` | proximos-jogos, socios, neo-quimica-arena, fiel-torcida | eventsData |

---

## 17. Navegação

### Navbar (Desktop)
Futebol → Basquete → Futsal → Notícias → Classificações → Eventos

### Mega Menu
Cada item tem submenu com:
- **Coluna esquerda**: lista de subitens clicáveis
- **Coluna direita**: conteúdo dinâmico (artigos, placares, tabelas)

### Footer
- Logo + descrição
- Links: Termos de Uso, Anuncie Conosco, Quem Somos, Trabalhe Conosco
- Redes Sociais: Instagram, YouTube, TikTok

---

## 18. Busca

- **Dropdown**: aparece ao digitar 1+ caractere no input
- **Conteúdo**: imagem + título + categoria
- **Filtros**: por categoria e ordenação (Mais recente, Por data, A-Z)
- **Paginação**: se >8 resultados
- **Empty state**: mensagem quando não encontra resultados
- **Rota**: `/search?q=...`

---

## 19. Padrões de Cores nos Cards de Notícias

### Cards de imagem (EditorialGrid, LatestNews)
- Fundo: imagem com overlay gradiente
- Badge categoria: `bg-white/20`, `text-white`, `backdrop-blur-sm`
- Título: `text-white`, fonte bold

### Cards de conteúdo (NewsCard)
- Fundo: `bg-surface-container-lowest`
- Badge categoria: `bg-surface-container`, `text-on-surface-variant`
- Título: `text-primary`, fonte bold
- Borda: `border-outline-variant` → hover: `border-primary`

---

## 20. Tabelas de Classificação

### Design
- Header: gradiente `from-primary to-[#222]`, texto branco
- Linhas alternadas: `bg-surface` / `bg-surface-container-lowest`
- Corinthians: `bg-gradient-to-r from-primary/5 to-transparent`
- Hover: `hover:bg-surface-container-low`

### Elementos visuais
- Barra lateral colorida por posição (4px)
- Logo do time (círculo com iniciais)
- Pontos em círculo preenchido
- Vitórias: badge azul
- Empates: badge amarelo
- Derrotas: badge vermelho
- Saldo: azul (+) ou vermelho (-)
