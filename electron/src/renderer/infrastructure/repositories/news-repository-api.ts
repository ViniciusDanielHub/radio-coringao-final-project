import type { NewsRepository, PaginatedResult } from '@/domain/repositories/news-repository';
import type { Article, Category, Banner, MenuItem, Sponsor, Event, User, SiteSettings, FooterLink, DashboardStats, ArticleImage } from '@/domain/entities/news';
import { getNewsClient } from '../api/http-client';

export class ApiNewsRepository implements NewsRepository {
  private get http() { return getNewsClient(); }
  async getDashboard(): Promise<DashboardStats> {
    return this.http.get('/admin/dashboard');
  }

  async getDashboardCategories(): Promise<any> {
    return this.http.get('/admin/dashboard/categorias');
  }

  // Articles
  async getArticles(params?: { page?: number; limit?: number; status?: string; category?: string; q?: string }): Promise<PaginatedResult<Article>> {
    return this.http.get('/admin/materias', { params: params as any });
  }

  async getArticle(id: string): Promise<Article> {
    return this.http.get(`/admin/materias/${id}`);
  }

  async createArticle(data: FormData): Promise<Article> {
    return this.http.post('/admin/materias', { data });
  }

  async updateArticle(id: string, data: FormData): Promise<Article> {
    return this.http.put(`/admin/materias/${id}`, { data });
  }

  async deleteArticle(id: string): Promise<void> {
    await this.http.delete(`/admin/materias/${id}`);
  }

  async updateArticleStatus(id: string, status: string): Promise<void> {
    await this.http.put(`/admin/materias/${id}/status`, { body: { status } });
  }

  async archiveArticle(id: string): Promise<void> {
    await this.http.put(`/admin/materias/${id}/archive`);
  }

  async unarchiveArticle(id: string): Promise<void> {
    await this.http.put(`/admin/materias/${id}/unarchive`);
  }

  async addArticleImage(id: string, data: FormData): Promise<ArticleImage> {
    return this.http.post(`/admin/materias/${id}/images`, { data });
  }

  async deleteArticleImage(id: string, imageId: string): Promise<void> {
    await this.http.delete(`/admin/materias/${id}/images/${imageId}`);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.http.get('/admin/categorias');
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    return this.http.post('/admin/categorias', { body: data });
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    return this.http.put(`/admin/categorias/${id}`, { body: data });
  }

  async deleteCategory(id: string): Promise<void> {
    await this.http.delete(`/admin/categorias/${id}`);
  }

  // Banners
  async getBanners(): Promise<Banner[]> {
    return this.http.get('/admin/banners');
  }

  async createBanner(data: FormData): Promise<Banner> {
    return this.http.post('/admin/banners', { data });
  }

  async updateBanner(id: string, data: FormData): Promise<Banner> {
    return this.http.put(`/admin/banners/${id}`, { data });
  }

  async deleteBanner(id: string): Promise<void> {
    await this.http.delete(`/admin/banners/${id}`);
  }

  // Menu
  async getMenu(): Promise<MenuItem[]> {
    return this.http.get('/admin/menu');
  }

  async createMenuItem(data: Partial<MenuItem>): Promise<MenuItem> {
    return this.http.post('/admin/menu', { body: data });
  }

  async updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    return this.http.put(`/admin/menu/${id}`, { body: data });
  }

  async deleteMenuItem(id: string): Promise<void> {
    await this.http.delete(`/admin/menu/${id}`);
  }

  // Sponsors
  async getSponsors(): Promise<Sponsor[]> {
    return this.http.get('/admin/patrocinadores');
  }

  async createSponsor(data: FormData): Promise<Sponsor> {
    return this.http.post('/admin/patrocinadores', { data });
  }

  async updateSponsor(id: string, data: FormData): Promise<Sponsor> {
    return this.http.put(`/admin/patrocinadores/${id}`, { data });
  }

  async deleteSponsor(id: string): Promise<void> {
    await this.http.delete(`/admin/patrocinadores/${id}`);
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return this.http.get('/admin/eventos');
  }

  async createEvent(data: FormData): Promise<Event> {
    return this.http.post('/admin/eventos', { data });
  }

  async updateEvent(id: string, data: FormData): Promise<Event> {
    return this.http.put(`/admin/eventos/${id}`, { data });
  }

  async deleteEvent(id: string): Promise<void> {
    await this.http.delete(`/admin/eventos/${id}`);
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.http.get('/admin/users');
  }

  async createUser(data: Partial<User> & { password?: string }): Promise<User> {
    return this.http.post('/admin/users', { body: data });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.http.put(`/admin/users/${id}`, { body: data });
  }

  async deleteUser(id: string): Promise<void> {
    await this.http.delete(`/admin/users/${id}`);
  }

  async resetUserPassword(id: string, newPassword: string): Promise<void> {
    await this.http.put(`/admin/users/${id}/password`, { body: { newPassword } });
  }

  // Settings
  async getSettings(): Promise<SiteSettings> {
    return this.http.get('/admin/configuracoes');
  }

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.http.put('/admin/configuracoes', { body: data });
  }

  async updateSettingsLogo(data: FormData): Promise<SiteSettings> {
    return this.http.put('/admin/configuracoes/logo', { data });
  }

  // Footer Links
  async getFooterLinks(): Promise<FooterLink[]> {
    return this.http.get('/admin/links-rodape');
  }

  async createFooterLink(data: Partial<FooterLink>): Promise<FooterLink> {
    return this.http.post('/admin/links-rodape', { body: data });
  }

  async updateFooterLink(id: string, data: Partial<FooterLink>): Promise<FooterLink> {
    return this.http.put(`/admin/links-rodape/${id}`, { body: data });
  }

  async deleteFooterLink(id: string): Promise<void> {
    await this.http.delete(`/admin/links-rodape/${id}`);
  }

  // Tags
  async deleteTag(id: string): Promise<void> {
    await this.http.delete(`/admin/tags/${id}`);
  }
}
