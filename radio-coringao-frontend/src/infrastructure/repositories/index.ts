import {
  NewsArticle,
  NextMatch,
  Comment,
  Columnist,
  TableEntry,
  MatchResult,
  NewsletterSubscriber,
} from "@/domain/entities";
import {
  INewsRepository,
  IMatchRepository,
  ITableRepository,
  IColumnistRepository,
  ICommentRepository,
  INewsletterRepository,
} from "@/domain/repositories";
import {
  editorialNews,
  latestNews,
  nextMatchM,
  nextMatchF,
  nextMatchBasquete,
  recentResults,
  columnists,
  standings,
} from "@/infrastructure/data";
import { sportsData } from "@/infrastructure/data/sports";
import { newsCategories } from "@/infrastructure/data/news-categories";
import { newsData } from "@/infrastructure/data/news-all";
import { eventsData } from "@/infrastructure/data/events";

export class MockNewsRepository implements INewsRepository {
  async getEditorialNews(): Promise<NewsArticle[]> {
    return editorialNews;
  }

  async getLatestNews(): Promise<NewsArticle[]> {
    return latestNews;
  }

  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    const allArticles: NewsArticle[] = [
      ...editorialNews,
      ...latestNews,
      ...newsData.latestNews,
      ...newsData.weekHighlights,
      ...newsData.monthHighlights,
    ];
    Object.values(newsCategories).forEach((cat) => {
      allArticles.push(...cat.articles);
    });
    Object.values(sportsData).forEach((sport) => {
      allArticles.push(...sport.latestNews, ...sport.weekHighlights);
    });
    return allArticles.find((a) => a.slug === slug) ?? null;
  }

  async getArticlesByCategory(category: string): Promise<NewsArticle[]> {
    const allArticles = [...editorialNews, ...latestNews];
    return allArticles.filter((a) => a.categorySlug === category);
  }
}

export class MockMatchRepository implements IMatchRepository {
  async getNextMatch(): Promise<NextMatch> {
    return nextMatchM;
  }

  async getNextMatchFeminino(): Promise<NextMatch> {
    return nextMatchF;
  }

  async getNextMatchBasquete(): Promise<NextMatch> {
    return nextMatchBasquete;
  }

  async getRecentResults(): Promise<MatchResult[]> {
    return recentResults;
  }

  async getScheduledMatches(): Promise<MatchResult[]> {
    return [nextMatchM, nextMatchF, nextMatchBasquete].filter(Boolean) as unknown as MatchResult[];
  }
}

export class MockTableRepository implements ITableRepository {
  async getStandings(): Promise<TableEntry[]> {
    return standings;
  }
}

export class MockColumnistRepository implements IColumnistRepository {
  async getColumnists(): Promise<Columnist[]> {
    return columnists;
  }
}

export class MockCommentRepository implements ICommentRepository {
  private comments: Comment[] = [];

  async getCommentsByArticle(slug: string): Promise<Comment[]> {
    return this.comments.filter((c) => c.articleSlug === slug);
  }

  async addComment(
    comment: Omit<Comment, "id" | "createdAt">
  ): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.comments.push(newComment);
    return newComment;
  }
}

export class MockNewsletterRepository implements INewsletterRepository {
  async subscribe(subscriber: NewsletterSubscriber): Promise<void> {
    // Simula envio para API
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}