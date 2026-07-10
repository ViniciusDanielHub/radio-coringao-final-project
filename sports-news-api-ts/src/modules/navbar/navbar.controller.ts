// src/modules/navbar/navbar.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../shared/database/prisma';

export class NavbarController {
  getNavbar = async (_request: FastifyRequest, reply: FastifyReply) => {
    // ── Busca dados do banco ──────────────────────────────────
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { id: true, name: true, slug: true },
    });

    const events = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: { startsAt: 'asc' },
      select: { title: true, slug: true, description: true },
    });

    // Artigos publicados mais recentes, agrupados por categoria
    const allArticles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 40,
      select: {
        title: true,
        slug: true,
        coverImage: true,
        category: { select: { slug: true } },
      },
    });

    const articlesByCategory = (catSlug: string) =>
      allArticles
        .filter((a) => a.category?.slug === catSlug)
        .slice(0, 4)
        .map((a) => ({
          title: a.title,
          image: a.coverImage ?? '',
          slug: a.slug,
        }));

    const latestGeneral = allArticles.slice(0, 4).map((a) => ({
      title: a.title,
      image: a.coverImage ?? '',
      slug: a.slug,
    }));

    // ── Helper: busca label da categoria pelo slug ─────────────
    const catLabel = (slug: string) =>
      categories.find((c) => c.slug === slug)?.name ?? slug;

    // ── Monta navbar com estrutura EXATA que o frontend espera ─
    const navItems = [
      // ═══ FUTEBOL ═══════════════════════════════════════════════
      {
        label: 'Futebol',
        slug: 'sports/futebol',
        subItems: [
          {
            label: 'Masculino',
            slug: 'sports/futebol',
            description: 'O principal do Timão no Brasileirão e copas.',
            link: '/sports/futebol',
          },
          {
            label: 'Feminino',
            slug: 'sports/futebol-feminino',
            description: 'Timão Feminino brilhando na Libertadores.',
            link: '/sports/futebol-feminino',
          },
          {
            label: 'Sub-20',
            slug: 'sports/sub-20',
            description: 'Base formando os próximos craques.',
            link: '/sports/sub-20',
          },
          {
            label: 'Sub-17',
            slug: 'sports/sub-17',
            description: 'Meninos mostrando futebol de primeira.',
            link: '/sports/sub-17',
          },
        ],
      },

      // ═══ BASQUETE ══════════════════════════════════════════════
      {
        label: 'Basquete',
        slug: 'sports/basquete',
        subItems: [
          {
            label: 'Masculino',
            slug: 'masculino',
            description: 'Corinthians no NBB buscando o título.',
          },
          {
            label: 'Feminino',
            slug: 'feminino',
            description: 'Basquete feminino em ascensão.',
          },
        ],
      },

      // ═══ FUTSAL ════════════════════════════════════════════════
      {
        label: 'Futsal',
        slug: 'sports/futsal',
        subItems: [
          {
            label: 'Profissional',
            slug: 'profissional',
            description: 'Corinthians no Campeonato Paulista de Futsal.',
          },
          {
            label: 'Notícias',
            slug: 'noticias',
            description: 'Últimas notícias do futsal corintiano.',
            link: '/sports/futsal',
            articles: articlesByCategory('futsal'),
          },
        ],
      },

      // ═══ NOTÍCIAS ══════════════════════════════════════════════
      {
        label: 'Notícias',
        slug: 'news',
        subItems: [
          {
            label: 'Últimas',
            slug: 'ultimas',
            description: 'As notícias mais recentes do Corinthians.',
            link: '/noticias/category/ultimas',
            articles: articlesByCategory('ultimas'),
          },
          {
            label: 'Mercado',
            slug: 'mercado',
            description: 'Transferências, contratos e rumores do mercado.',
            link: '/noticias/category/mercado',
            articles: articlesByCategory('mercado'),
          },
          {
            label: 'Política',
            slug: 'politica',
            description: 'Política e decisões administrativas do clube.',
            link: '/noticias/category/politica',
            articles: articlesByCategory('politica'),
          },
          {
            label: 'Destaques',
            slug: 'destaques',
            description: 'O melhor do conteúdo selecionado pela redação.',
            link: '/noticias/category/destaques',
            articles: articlesByCategory('destaques'),
          },
        ],
      },

      // ═══ CLASSIFICAÇÕES ════════════════════════════════════════
      {
        label: 'Classificações',
        slug: 'standings',
        subItems: [
          {
            label: 'Brasileirão',
            slug: 'brasileirao',
            description: 'Tabela completa do Campeonato Brasileiro Série A.',
            link: '/standings',
          },
          {
            label: 'Libertadores',
            slug: 'libertadores',
            description: 'Classificação do Grupo do Corinthians na Libertadores.',
            link: '/standings/libertadores',
          },
          {
            label: 'Sul-Americana',
            slug: 'sul-americana',
            description: 'Classificação do Corinthians na Copa Sul-Americana.',
            link: '/standings/sul-americana',
          },
          {
            label: 'Copa do Brasil',
            slug: 'copa-do-brasil',
            description: 'Classificação do Corinthians na Copa do Brasil.',
            link: '/standings/copa-do-brasil',
          },
          {
            label: 'Paulistão',
            slug: 'paulistao',
            description: 'Classificação do Corinthians no Campeonato Paulista.',
            link: '/standings/paulistao',
          },
          {
            label: 'Copinha',
            slug: 'copinha',
            description: 'Classificação do Corinthians na Copinha.',
            link: '/standings/copinha',
          },
        ],
      },

      // ═══ EVENTOS ═══════════════════════════════════════════════
      {
        label: 'Eventos',
        slug: 'events',
        subItems: [
          {
            label: 'Próximos Jogos',
            slug: 'proximos-jogos',
            description: 'Calendário de todos os próximos jogos do Corinthians.',
            link: '/events/proximos-jogos',
          },
          {
            label: 'Sócios',
            slug: 'socios',
            description: 'Vantagens e benefícios para sócios do Corinthians.',
            link: '/events/socios',
          },
          {
            label: 'Neo Química Arena',
            slug: 'neo-quimica-arena',
            description: 'Informações sobre a Neo Química Arena e eventos no estádio.',
            link: '/events/neo-quimica-arena',
          },
          {
            label: 'Fiel Torcida',
            slug: 'fiel-torcida',
            description: 'Informações sobre a organização da Fiel Torcida.',
            link: '/events/fiel-torcida',
          },
        ],
      },
    ];

    return reply.send(navItems);
  };
}
