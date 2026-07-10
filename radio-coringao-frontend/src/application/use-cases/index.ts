import {
  INewsRepository,
  IMatchRepository,
  ITableRepository,
  IColumnistRepository,
  ICommentRepository,
  INewsletterRepository,
} from "@/domain/repositories";
import {
  CommentInput,
  HomePageData,
  JogosPageData,
  ArticlePageData,
} from "@/application/dto";
import { Columnist, TableEntry, Comment } from "@/domain/entities";

export class GetHomePageDataUseCase {
  constructor(
    private readonly newsRepo: INewsRepository,
    private readonly matchRepo: IMatchRepository
  ) {}

  async execute(): Promise<HomePageData> {
    const [editorialNews, latestNews, scheduledMatches] =
      await Promise.all([
        this.newsRepo.getEditorialNews(),
        this.newsRepo.getLatestNews(),
        this.matchRepo.getScheduledMatches(),
      ]);
    return { editorialNews, latestNews, scheduledMatches };
  }
}

export class GetJogosPageDataUseCase {
  constructor(private readonly matchRepo: IMatchRepository) {}

  async execute(): Promise<JogosPageData> {
    const [nextMatch, recentResults] = await Promise.all([
      this.matchRepo.getNextMatch(),
      this.matchRepo.getRecentResults(),
    ]);
    return { nextMatch, recentResults };
  }
}

export class GetArticlePageDataUseCase {
  constructor(
    private readonly newsRepo: INewsRepository,
    private readonly matchRepo: IMatchRepository
  ) {}

  async execute(slug: string): Promise<ArticlePageData | null> {
    const article = await this.newsRepo.getArticleBySlug(slug);
    if (!article) return null;
    const [editorialNews, nextMatch] = await Promise.all([
      this.newsRepo.getEditorialNews(),
      this.matchRepo.getNextMatch(),
    ]);
    return { article, topStories: editorialNews.slice(0, 3), nextMatch };
  }
}

export class GetColumnistsUseCase {
  constructor(private readonly columnistRepo: IColumnistRepository) {}

  async execute(): Promise<Columnist[]> {
    return this.columnistRepo.getColumnists();
  }
}

export class GetStandingsUseCase {
  constructor(private readonly tableRepo: ITableRepository) {}

  async execute(): Promise<TableEntry[]> {
    return this.tableRepo.getStandings();
  }
}

export class AddCommentUseCase {
  constructor(private readonly commentRepo: ICommentRepository) {}

  async execute(input: CommentInput, articleSlug: string): Promise<Comment> {
    return this.commentRepo.addComment({
      name: input.name,
      content: input.comment,
      articleSlug,
    });
  }
}

export class SubscribeNewsletterUseCase {
  constructor(private readonly newsletterRepo: INewsletterRepository) {}

  async execute(name: string, email: string): Promise<void> {
    return this.newsletterRepo.subscribe({ name, email });
  }
}