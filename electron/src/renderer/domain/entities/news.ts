export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  type: 'NEWS' | 'ANALYSIS' | 'INTERVIEW' | 'LIVE' | 'GALLERY';
  isFeatured: boolean;
  isBreaking: boolean;
  isPinned: boolean;
  coverImage?: string;
  coverImageAlt?: string;
  coverImageCredit?: string;
  quotes?: { author: string; text: string }[];
  authorId: string;
  categoryId: string;
  author?: { id: string; name: string; avatar?: string };
  category?: { id: string; name: string; slug: string; color?: string };
  tags?: { tag: { id: string; name: string; slug: string } }[];
  images?: ArticleImage[];
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  credit?: string;
  description?: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  order: number;
  startsAt?: string;
  endsAt?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target: string;
  order: number;
  parentId?: string;
  isActive: boolean;
  children?: MenuItem[];
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  isActive: boolean;
  order: number;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location?: string;
  startsAt: string;
  endsAt?: string;
  coverImage?: string;
  isActive: boolean;
  images?: EventImage[];
  categories?: EventCategory[];
}

export interface EventImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  order: number;
}

export interface EventCategory {
  id: string;
  name: string;
  order: number;
  items?: EventItem[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  venue?: string;
  status: string;
  image?: string;
  link?: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  position?: string;
  isActive: boolean;
  lastSeenAt?: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  socialTiktok?: string;
  googleAnalytics?: string;
  footerText?: string;
  copyrightText?: string;
  biography?: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface DashboardStats {
  total: number;
  published: number;
  draft: number;
  review: number;
  archived: number;
  totalViews: number;
  last30Days: number;
  avgViewsPerArticle: number;
  avgViewsPerPublished: number;
  articlesByMonth: { month: string; total: number; published: number; draft: number }[];
  viewsByMonth: { month: string; views: number }[];
  articlesByCategory: { name: string; count: number; color: string }[];
  topArticles: { title: string; views: number; category: string }[];
}
