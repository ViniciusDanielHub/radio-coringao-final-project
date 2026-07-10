import type { Article, Category, Banner, MenuItem, Sponsor, Event, User, SiteSettings, FooterLink, DashboardStats } from '@/domain/entities/news';

const placeholderImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh5rWYWHh2ILCnOZuge7OeXQOKkvhBoXWWT-b9AYqyw9pZt__tGOOpylCVqYgyPvW7AXbw30lvcYaxovQExTo7M1W0l6OxQrWeL1KhgcAXQIUGpp_ZbPBS0XIJr883Dk0-Np7cQXTlFIjsIatMo1VTSGPytM31Hgw5agrY1Id_B_Xo1VhdehqJkGf0kYND39ZapobUQdS-W_QnZgeI6k8nkJQAOuZFjB7rnZ-lWJpwP5UuImNT_1WecNELu_hRA0xyRAlXa-EqY-I';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function generateDashboard(): DashboardStats {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const baseTotal = 120 + Math.floor(Math.random() * 60);
  const basePublished = Math.floor(baseTotal * 0.65);
  const baseDraft = Math.floor(baseTotal * 0.2);
  const baseReview = Math.floor(baseTotal * 0.1);
  const baseArchived = baseTotal - basePublished - baseDraft - baseReview;

  const articlesByMonth = MONTHS.map((month, i) => {
    const isFuture = i > currentMonth;
    const isCurrent = i === currentMonth;
    const factor = isFuture ? 0 : isCurrent ? 0.5 + Math.random() * 0.5 : 0.7 + Math.random() * 0.6;
    const total = Math.max(2, Math.floor((8 + Math.random() * 15) * factor));
    const published = Math.floor(total * (0.6 + Math.random() * 0.3));
    const draft = total - published;
    return { month, total, published, draft };
  });

  const viewsByMonth = MONTHS.map((month, i) => {
    const isFuture = i > currentMonth;
    const isCurrent = i === currentMonth;
    const factor = isFuture ? 0 : isCurrent ? 0.4 + Math.random() * 0.6 : 0.6 + Math.random() * 0.8;
    return { month, views: Math.floor((20000 + Math.random() * 50000) * factor) };
  });

  const totalViews = viewsByMonth.reduce((sum, m) => sum + m.views, 0);

  return {
    total: baseTotal,
    published: basePublished,
    draft: baseDraft,
    review: baseReview,
    archived: baseArchived,
    totalViews,
    last30Days: Math.floor(15 + Math.random() * 20),
    avgViewsPerArticle: Math.floor(totalViews / baseTotal),
    avgViewsPerPublished: Math.floor(totalViews / basePublished),
    articlesByMonth,
    viewsByMonth,
    articlesByCategory: [
      { name: 'Futebol', count: Math.floor(baseTotal * 0.3), color: '#1565C0' },
      { name: 'Mercado', count: Math.floor(baseTotal * 0.18), color: '#E65100' },
      { name: 'Destaques', count: Math.floor(baseTotal * 0.14), color: '#bc000c' },
      { name: 'Política', count: Math.floor(baseTotal * 0.12), color: '#6A1B9A' },
      { name: 'Feminino', count: Math.floor(baseTotal * 0.1), color: '#AD1457' },
      { name: 'Base', count: Math.floor(baseTotal * 0.08), color: '#2E7D32' },
      { name: 'Outros', count: baseTotal - Math.floor(baseTotal * 0.3) - Math.floor(baseTotal * 0.18) - Math.floor(baseTotal * 0.14) - Math.floor(baseTotal * 0.12) - Math.floor(baseTotal * 0.1) - Math.floor(baseTotal * 0.08), color: '#757575' },
    ],
    topArticles: [
      { title: 'Vitória épica na arena: Corinthians vira o jogo', views: Math.floor(8000 + Math.random() * 8000), category: 'Futebol' },
      { title: 'Garro renova e é o novo camisa 10 do Timão', views: Math.floor(7000 + Math.random() * 7000), category: 'Mercado' },
      { title: 'Yuri Alberto lidera artilharia do Brasileirão', views: Math.floor(5000 + Math.random() * 6000), category: 'Destaques' },
      { title: 'Fiel prepara mosaico histórico para o clássico', views: Math.floor(4000 + Math.random() * 5000), category: 'Futebol' },
      { title: 'Ingressos do clássico esgotam em 2 horas', views: Math.floor(3000 + Math.random() * 4000), category: 'Futebol' },
    ].sort((a, b) => b.views - a.views),
  };
}

export const mockCategories: Category[] = [
  { id: '1', name: 'Futebol', slug: 'futebol', color: '#1565C0', isActive: true, order: 1 },
  { id: '2', name: 'Mercado', slug: 'mercado', color: '#E65100', isActive: true, order: 2 },
  { id: '3', name: 'Política', slug: 'politica', color: '#6A1B9A', isActive: true, order: 3 },
  { id: '4', name: 'Destaques', slug: 'destaques', color: '#bc000c', isActive: true, order: 4 },
  { id: '5', name: 'Feminino', slug: 'feminino', color: '#AD1457', isActive: true, order: 5 },
  { id: '6', name: 'Base', slug: 'base', color: '#2E7D32', isActive: true, order: 6 },
];

export const mockArticles: Article[] = [
  {
    id: '1', title: 'Vitória épica na arena: Corinthians vira o jogo nos acréscimos',
    excerpt: 'Em uma partida dramática, o Timão garantiu os três pontos.', slug: 'vitoria-epica-na-arena',
    content: '<p>Conteúdo do artigo...</p>', status: 'PUBLISHED', type: 'NEWS',
    isFeatured: true, isBreaking: false, isPinned: true, coverImage: placeholderImg,
    coverImageAlt: 'Jogador comemorando', authorId: '1', categoryId: '1',
    author: { id: '1', name: 'João Fiel' }, category: { id: '1', name: 'Futebol', slug: 'futebol' },
    viewCount: 12500, publishedAt: '2026-06-25T10:00:00Z', createdAt: '2026-06-25T08:00:00Z', updatedAt: '2026-06-25T10:00:00Z',
  },
  {
    id: '2', title: 'Garro renova e é o novo camisa 10 do Timão',
    excerpt: 'Meia argentino se compromete por mais 3 anos.', slug: 'garro-renova-10',
    content: '<p>Conteúdo do artigo...</p>', status: 'PUBLISHED', type: 'NEWS',
    isFeatured: true, isBreaking: false, isPinned: false, coverImage: placeholderImg,
    authorId: '1', categoryId: '2', author: { id: '1', name: 'João Fiel' },
    category: { id: '2', name: 'Mercado', slug: 'mercado' },
    viewCount: 11000, publishedAt: '2026-06-24T14:00:00Z', createdAt: '2026-06-24T12:00:00Z', updatedAt: '2026-06-24T14:00:00Z',
  },
  {
    id: '3', title: 'Yuri Alberto lidera artilharia do Brasileirão com 18 gols',
    excerpt: 'Atacante marcou 8 gols em 5 jogos.', slug: 'yuri-artilharia',
    content: '<p>Conteúdo do artigo...</p>', status: 'DRAFT', type: 'ANALYSIS',
    isFeatured: false, isBreaking: false, isPinned: false, coverImage: placeholderImg,
    authorId: '2', categoryId: '1', author: { id: '2', name: 'Pedro Silva' },
    category: { id: '1', name: 'Futebol', slug: 'futebol' },
    viewCount: 0, createdAt: '2026-06-25T09:00:00Z', updatedAt: '2026-06-25T09:00:00Z',
  },
];

export const mockBanners: Banner[] = [
  { id: '1', title: 'Sócio Fiel 2026', subtitle: 'Garanta sua vaga', imageUrl: placeholderImg, linkUrl: '/eventos/socios', isActive: true, order: 1 },
  { id: '2', title: 'Ingressos Derby', subtitle: 'Corinthians x Palmeiras', imageUrl: placeholderImg, isActive: true, order: 2 },
];

export const mockMenuItems: MenuItem[] = [
  { id: '1', label: 'Futebol', url: '/sports/futebol', target: '_self', order: 1, isActive: true },
  { id: '2', label: 'Basquete', url: '/sports/basquete', target: '_self', order: 2, isActive: true },
  { id: '3', label: 'Notícias', url: '/news', target: '_self', order: 3, isActive: true },
];

export const mockSponsors: Sponsor[] = [
  { id: '1', name: 'Patrocinador Máster', logoUrl: placeholderImg, websiteUrl: 'https://example.com', isActive: true, order: 1 },
];

export const mockEvents: Event[] = [
  {
    id: '1', title: 'Próximos Jogos', slug: 'proximos-jogos',
    description: 'Calendário de jogos do Corinthians.', startsAt: '2026-06-25T10:00:00Z',
    isActive: true, coverImage: placeholderImg,
  },
  {
    id: '2', title: 'Neo Química Arena', slug: 'neo-quimica-arena',
    description: 'Eventos no estádio.', startsAt: '2026-06-25T10:00:00Z',
    isActive: true, coverImage: placeholderImg,
  },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Admin', email: 'admin@radiocoringao.com', role: 'SUPER_ADMIN', isActive: true, lastSeenAt: new Date().toISOString(), createdAt: '2026-01-01T00:00:00Z' },
  { id: '2', name: 'João Fiel', email: 'joao@radiocoringao.com', role: 'EDITOR_CHEFE', isActive: true, lastSeenAt: new Date(Date.now() - 5 * 60000).toISOString(), createdAt: '2026-01-15T00:00:00Z' },
  { id: '3', name: 'Pedro Silva', email: 'pedro@radiocoringao.com', role: 'JORNALISTA', isActive: true, lastSeenAt: new Date(Date.now() - 3 * 3600000).toISOString(), createdAt: '2026-02-01T00:00:00Z' },
  { id: '4', name: 'Maria Clara', email: 'maria@radiocoringao.com', role: 'JORNALISTA', isActive: true, lastSeenAt: new Date(Date.now() - 45 * 60000).toISOString(), createdAt: '2026-02-15T00:00:00Z' },
  { id: '5', name: 'Ana Fiel', email: 'ana@radiocoringao.com', role: 'COLUNISTA', isActive: true, lastSeenAt: new Date(Date.now() - 24 * 3600000).toISOString(), createdAt: '2026-03-01T00:00:00Z' },
];

export const mockSettings: SiteSettings = {
  siteName: 'Rádio Coringão',
  siteDescription: 'O portal da Fiel. Jornalismo independente sobre o Corinthians.',
  primaryColor: '#bc000c',
  socialInstagram: 'https://instagram.com/radiocoringao',
  socialYoutube: 'https://youtube.com/radiocoringao',
  socialTiktok: 'https://tiktok.com/@radiocoringao',
  footerText: '© 2026 Rádio Coringão. Todos os direitos reservados.',
  copyrightText: '© 2026 Rádio Coringão',
};

export const mockFooterLinks: FooterLink[] = [
  { id: '1', label: 'Termos de Uso', href: '/terms-of-use', order: 1, isActive: true },
  { id: '2', label: 'Anuncie Conosco', href: '/advertise', order: 2, isActive: true },
  { id: '3', label: 'Quem Somos', href: '/about', order: 3, isActive: true },
  { id: '4', label: 'Trabalhe Conosco', href: '/careers', order: 4, isActive: true },
];
