import type { NewsRepository, PaginatedResult } from '@/domain/repositories/news-repository';
import type { Article, Category, Banner, MenuItem, Sponsor, Event, User, SiteSettings, FooterLink, DashboardStats, ArticleImage } from '@/domain/entities/news';
import { mockDashboard, mockCategories, mockArticles, mockBanners, mockMenuItems, mockSponsors, mockEvents, mockUsers, mockSettings, mockFooterLinks, generateDashboard } from '../mock/sports-news-mock';

let articles = [...mockArticles];
let categories = [...mockCategories];
let banners = [...mockBanners];
let menuItems = [...mockMenuItems];
let sponsors = [...mockSponsors];
let events = [...mockEvents];
let users = [...mockUsers];
let settings = { ...mockSettings };
let footerLinks = [...mockFooterLinks];
let nextId = 100;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export class MockNewsRepository implements NewsRepository {
  async getDashboard(): Promise<DashboardStats> { await delay(); return generateDashboard(); }
  async getDashboardCategories(): Promise<any> { await delay(); return []; }

  async getArticles(params?: { page?: number; limit?: number; status?: string; category?: string; q?: string }): Promise<PaginatedResult<Article>> {
    await delay();
    let filtered = [...articles];
    if (params?.status) filtered = filtered.filter((a) => a.status === params.status);
    if (params?.category) filtered = filtered.filter((a) => a.category?.slug === params.category);
    if (params?.q) filtered = filtered.filter((a) => a.title.toLowerCase().includes(params.q!.toLowerCase()));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    return { data: filtered.slice(start, start + limit), total: filtered.length, page, limit, totalPages: Math.ceil(filtered.length / limit) };
  }

  async getArticle(id: string): Promise<Article> { await delay(); return articles.find((a) => a.id === id)!; }

  async createArticle(data: FormData): Promise<Article> {
    await delay();
    const article: Article = {
      id: String(++nextId), title: String(data.get('title') || 'Novo Artigo'),
      content: String(data.get('content') || ''), slug: 'novo-artigo-' + nextId,
      status: 'DRAFT', type: 'NEWS', isFeatured: false, isBreaking: false, isPinned: false,
      authorId: '1', categoryId: String(data.get('categoryId') || '1'),
      author: { id: '1', name: 'Admin' }, category: { id: '1', name: 'Futebol', slug: 'futebol' },
      viewCount: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    articles.unshift(article);
    return article;
  }

  async updateArticle(id: string, data: FormData): Promise<Article> {
    await delay();
    const idx = articles.findIndex((a) => a.id === id);
    if (idx >= 0) { articles[idx] = { ...articles[idx], title: String(data.get('title') || articles[idx].title), updatedAt: new Date().toISOString() }; }
    return articles[idx];
  }

  async deleteArticle(id: string): Promise<void> { await delay(); articles = articles.filter((a) => a.id !== id); }
  async updateArticleStatus(id: string, status: string): Promise<void> {
    await delay();
    const a = articles.find((x) => x.id === id);
    if (a) a.status = status as any;
  }

  async archiveArticle(id: string): Promise<void> {
    await delay();
    const a = articles.find((x) => x.id === id);
    if (a) a.status = 'ARCHIVED';
  }

  async unarchiveArticle(id: string): Promise<void> {
    await delay();
    const a = articles.find((x) => x.id === id);
    if (a) a.status = 'DRAFT';
  }

  async addArticleImage(id: string, data: FormData): Promise<ArticleImage> {
    await delay();
    return { id: String(++nextId), url: 'https://placeholder.com/image.jpg', order: 1 };
  }
  async deleteArticleImage(id: string, imageId: string): Promise<void> { await delay(); }

  async getCategories(): Promise<Category[]> { await delay(); return categories; }
  async createCategory(data: Partial<Category>): Promise<Category> {
    await delay();
    const cat: Category = { id: String(++nextId), name: data.name || '', slug: data.name?.toLowerCase().replace(/\s+/g, '-') || '', isActive: true, order: data.order || 0, ...data };
    categories.push(cat);
    return cat;
  }
  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    await delay();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx >= 0) categories[idx] = { ...categories[idx], ...data };
    return categories[idx];
  }
  async deleteCategory(id: string): Promise<void> { await delay(); categories = categories.filter((c) => c.id !== id); }

  async getBanners(): Promise<Banner[]> { await delay(); return banners; }
  async createBanner(data: FormData): Promise<Banner> {
    await delay();
    const b: Banner = { id: String(++nextId), title: String(data.get('title') || ''), imageUrl: 'https://placeholder.com/banner.jpg', isActive: true, order: Number(data.get('order') || 0) };
    banners.push(b);
    return b;
  }
  async updateBanner(id: string, data: FormData): Promise<Banner> {
    await delay();
    const idx = banners.findIndex((b) => b.id === id);
    if (idx >= 0) banners[idx] = { ...banners[idx], title: String(data.get('title') || banners[idx].title) };
    return banners[idx];
  }
  async deleteBanner(id: string): Promise<void> { await delay(); banners = banners.filter((b) => b.id !== id); }

  async getMenu(): Promise<MenuItem[]> { await delay(); return menuItems; }
  async createMenuItem(data: Partial<MenuItem>): Promise<MenuItem> {
    await delay();
    const item: MenuItem = { id: String(++nextId), label: data.label || '', url: data.url || '', target: '_self', order: data.order || 0, isActive: true, ...data };
    menuItems.push(item);
    return item;
  }
  async updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    await delay();
    const idx = menuItems.findIndex((m) => m.id === id);
    if (idx >= 0) menuItems[idx] = { ...menuItems[idx], ...data };
    return menuItems[idx];
  }
  async deleteMenuItem(id: string): Promise<void> { await delay(); menuItems = menuItems.filter((m) => m.id !== id); }

  async getSponsors(): Promise<Sponsor[]> { await delay(); return sponsors; }
  async createSponsor(data: FormData): Promise<Sponsor> {
    await delay();
    const s: Sponsor = { id: String(++nextId), name: String(data.get('name') || ''), logoUrl: 'https://placeholder.com/logo.jpg', isActive: true, order: 0 };
    sponsors.push(s);
    return s;
  }
  async updateSponsor(id: string, data: FormData): Promise<Sponsor> {
    await delay();
    const idx = sponsors.findIndex((s) => s.id === id);
    if (idx >= 0) sponsors[idx] = { ...sponsors[idx], name: String(data.get('name') || sponsors[idx].name) };
    return sponsors[idx];
  }
  async deleteSponsor(id: string): Promise<void> { await delay(); sponsors = sponsors.filter((s) => s.id !== id); }

  async getEvents(): Promise<Event[]> { await delay(); return events; }
  async createEvent(data: FormData): Promise<Event> {
    await delay();
    const e: Event = { id: String(++nextId), title: String(data.get('title') || ''), slug: 'evento-' + nextId, description: String(data.get('description') || ''), startsAt: new Date().toISOString(), isActive: true };
    events.push(e);
    return e;
  }
  async updateEvent(id: string, data: FormData): Promise<Event> {
    await delay();
    const idx = events.findIndex((e) => e.id === id);
    if (idx >= 0) events[idx] = { ...events[idx], title: String(data.get('title') || events[idx].title) };
    return events[idx];
  }
  async deleteEvent(id: string): Promise<void> { await delay(); events = events.filter((e) => e.id !== id); }

  async getUsers(): Promise<User[]> { await delay(); return users; }
  async createUser(data: Partial<User>): Promise<User> {
    await delay();
    const u: User = { id: String(++nextId), name: data.name || '', email: data.email || '', role: data.role || 'JORNALISTA', isActive: true, createdAt: new Date().toISOString() };
    users.push(u);
    return u;
  }
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await delay();
    const idx = users.findIndex((u) => u.id === id);
    if (idx >= 0) users[idx] = { ...users[idx], ...data };
    return users[idx];
  }
  async deleteUser(id: string): Promise<void> { await delay(); users = users.filter((u) => u.id !== id); }
  async resetUserPassword(id: string, newPassword: string): Promise<void> { await delay(); }

  async getSettings(): Promise<SiteSettings> { await delay(); return settings; }
  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    await delay();
    settings = { ...settings, ...data };
    return settings;
  }
  async updateSettingsLogo(data: FormData): Promise<SiteSettings> {
    await delay();
    settings.logoUrl = 'https://placeholder.com/logo.jpg';
    return settings;
  }

  async getFooterLinks(): Promise<FooterLink[]> { await delay(); return footerLinks; }
  async createFooterLink(data: Partial<FooterLink>): Promise<FooterLink> {
    await delay();
    const link: FooterLink = { id: String(++nextId), label: data.label || '', href: data.href || '', order: data.order || 0, isActive: true };
    footerLinks.push(link);
    return link;
  }
  async updateFooterLink(id: string, data: Partial<FooterLink>): Promise<FooterLink> {
    await delay();
    const idx = footerLinks.findIndex((l) => l.id === id);
    if (idx >= 0) footerLinks[idx] = { ...footerLinks[idx], ...data };
    return footerLinks[idx];
  }
  async deleteFooterLink(id: string): Promise<void> { await delay(); footerLinks = footerLinks.filter((l) => l.id !== id); }

  async deleteTag(id: string): Promise<void> { await delay(); }
}
