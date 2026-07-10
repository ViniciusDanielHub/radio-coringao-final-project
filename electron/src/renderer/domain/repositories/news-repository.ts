import type {
  Article, Category, Banner, MenuItem, Sponsor, Event, User,
  SiteSettings, FooterLink, Tag, DashboardStats, ArticleImage,
} from '../entities/news';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsRepository {
  getDashboard(): Promise<DashboardStats>;
  getDashboardCategories(): Promise<any>;

  getArticles(params?: { page?: number; limit?: number; status?: string; category?: string; q?: string }): Promise<PaginatedResult<Article>>;
  getArticle(id: string): Promise<Article>;
  createArticle(data: FormData): Promise<Article>;
  updateArticle(id: string, data: FormData): Promise<Article>;
  deleteArticle(id: string): Promise<void>;
  updateArticleStatus(id: string, status: string): Promise<void>;
  archiveArticle(id: string): Promise<void>;
  unarchiveArticle(id: string): Promise<void>;
  addArticleImage(id: string, data: FormData): Promise<ArticleImage>;
  deleteArticleImage(id: string, imageId: string): Promise<void>;

  getCategories(): Promise<Category[]>;
  createCategory(data: Partial<Category>): Promise<Category>;
  updateCategory(id: string, data: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  getBanners(): Promise<Banner[]>;
  createBanner(data: FormData): Promise<Banner>;
  updateBanner(id: string, data: FormData): Promise<Banner>;
  deleteBanner(id: string): Promise<void>;

  getMenu(): Promise<MenuItem[]>;
  createMenuItem(data: Partial<MenuItem>): Promise<MenuItem>;
  updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;

  getSponsors(): Promise<Sponsor[]>;
  createSponsor(data: FormData): Promise<Sponsor>;
  updateSponsor(id: string, data: FormData): Promise<Sponsor>;
  deleteSponsor(id: string): Promise<void>;

  getEvents(): Promise<Event[]>;
  createEvent(data: FormData): Promise<Event>;
  updateEvent(id: string, data: FormData): Promise<Event>;
  deleteEvent(id: string): Promise<void>;

  getUsers(): Promise<User[]>;
  createUser(data: Partial<User> & { password?: string }): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  resetUserPassword(id: string, newPassword: string): Promise<void>;

  getSettings(): Promise<SiteSettings>;
  updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings>;
  updateSettingsLogo(data: FormData): Promise<SiteSettings>;

  getFooterLinks(): Promise<FooterLink[]>;
  createFooterLink(data: Partial<FooterLink>): Promise<FooterLink>;
  updateFooterLink(id: string, data: Partial<FooterLink>): Promise<FooterLink>;
  deleteFooterLink(id: string): Promise<void>;

  deleteTag(id: string): Promise<void>;
}
