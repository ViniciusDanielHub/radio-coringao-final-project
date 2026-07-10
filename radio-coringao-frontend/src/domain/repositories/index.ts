import {
  NewsArticle,
  NextMatch,
  Comment,
  Columnist,
  TableEntry,
  MatchResult,
  NewsletterSubscriber,
} from "@/domain/entities";

export interface INewsRepository {
  getEditorialNews(): Promise<NewsArticle[]>;
  getLatestNews(): Promise<NewsArticle[]>;
  getArticleBySlug(slug: string): Promise<NewsArticle | null>;
  getArticlesByCategory(category: string): Promise<NewsArticle[]>;
}

export interface IMatchRepository {
  getNextMatch(): Promise<NextMatch>;
  getNextMatchFeminino(): Promise<NextMatch>;
  getNextMatchBasquete(): Promise<NextMatch>;
  getRecentResults(): Promise<MatchResult[]>;
  getScheduledMatches(): Promise<MatchResult[]>;
}

export interface ITableRepository {
  getStandings(): Promise<TableEntry[]>;
}

export interface IColumnistRepository {
  getColumnists(): Promise<Columnist[]>;
}

export interface ICommentRepository {
  getCommentsByArticle(slug: string): Promise<Comment[]>;
  addComment(comment: Omit<Comment, "id" | "createdAt">): Promise<Comment>;
}

export interface INewsletterRepository {
  subscribe(subscriber: NewsletterSubscriber): Promise<void>;
}