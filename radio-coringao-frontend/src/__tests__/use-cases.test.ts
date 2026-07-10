import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  GetHomePageDataUseCase,
  GetJogosPageDataUseCase,
  GetArticlePageDataUseCase,
  GetColumnistsUseCase,
  GetStandingsUseCase,
  AddCommentUseCase,
  SubscribeNewsletterUseCase,
} from '@/application/use-cases';
import type {
  INewsRepository,
  IMatchRepository,
  ITableRepository,
  IColumnistRepository,
  ICommentRepository,
  INewsletterRepository,
} from '@/domain/repositories';
import type { NewsArticle, NextMatch, MatchResult, TableEntry, Columnist, Comment } from '@/domain/entities';

// --- Mock data ---
const mockArticle: NewsArticle = {
  id: '1',
  title: 'Corinthians vence',
  excerpt: 'Resumo',
  category: 'Futebol',
  categorySlug: 'futebol',
  author: 'Autor',
  imageUrl: 'img.jpg',
  imageAlt: 'alt',
  publishedAt: '2025-01-01',
  slug: 'corinthians-vence',
  isBreaking: false,
  isLive: false,
  viewCount: 100,
};

const mockMatch: NextMatch = {
  homeTeam: 'Corinthians',
  awayTeam: 'Palmeiras',
  date: '2025-03-15',
  time: '20:00',
  venue: 'Arena',
  competition: 'Brasileirão',
  hasTickets: false,
};

const mockMatchResult: MatchResult = {
  home: 'Corinthians',
  away: 'São Paulo',
  score: '2 x 1',
};

const mockTableEntry: TableEntry = {
  pos: 1,
  time: 'Corinthians',
  pts: 75,
  j: 38,
  v: 22,
  e: 9,
  d: 7,
  gp: 65,
  gc: 30,
};

const mockColumnist: Columnist = {
  name: 'Ronaldo Koeler',
  role: 'Colunista',
  description: 'Jornalista',
};

const mockComment: Comment = {
  id: 'uuid-1',
  name: 'Torcedor',
  content: 'Vai Corinthians!',
  articleSlug: 'corinthians-vence',
  createdAt: '2025-01-15T12:00:00Z',
};

// --- Mock repositories ---
function createMockNewsRepo(overrides?: Partial<INewsRepository>): INewsRepository {
  return {
    getEditorialNews: vi.fn().mockResolvedValue([mockArticle]),
    getLatestNews: vi.fn().mockResolvedValue([mockArticle, { ...mockArticle, id: '2' }]),
    getArticleBySlug: vi.fn().mockImplementation((slug: string) =>
      Promise.resolve(slug === 'corinthians-vence' ? mockArticle : null)
    ),
    getArticlesByCategory: vi.fn().mockResolvedValue([mockArticle]),
    ...overrides,
  };
}

function createMockMatchRepo(overrides?: Partial<IMatchRepository>): IMatchRepository {
  return {
    getNextMatch: vi.fn().mockResolvedValue(mockMatch),
    getNextMatchFeminino: vi.fn().mockResolvedValue({ ...mockMatch, homeTeam: 'Corinthians Feminino' }),
    getNextMatchBasquete: vi.fn().mockResolvedValue({ ...mockMatch, homeTeam: 'Corinthians Basquete' }),
    getRecentResults: vi.fn().mockResolvedValue([mockMatchResult]),
    getScheduledMatches: vi.fn().mockResolvedValue([mockMatchResult]),
    ...overrides,
  };
}

function createMockTableRepo(): ITableRepository {
  return {
    getStandings: vi.fn().mockResolvedValue([mockTableEntry]),
  };
}

function createMockColumnistRepo(): IColumnistRepository {
  return {
    getColumnists: vi.fn().mockResolvedValue([mockColumnist]),
  };
}

function createMockCommentRepo(): ICommentRepository {
  return {
    getCommentsByArticle: vi.fn().mockResolvedValue([mockComment]),
    addComment: vi.fn().mockImplementation((c) =>
      Promise.resolve({ ...c, id: 'new-id', createdAt: new Date().toISOString() })
    ),
  };
}

function createMockNewsletterRepo(): INewsletterRepository {
  return {
    subscribe: vi.fn().mockResolvedValue(undefined),
  };
}

// --- Tests ---
describe('Use Cases', () => {
  describe('GetHomePageDataUseCase', () => {
    it('returns editorial news, latest news, and scheduled matches', async () => {
      const newsRepo = createMockNewsRepo();
      const matchRepo = createMockMatchRepo();
      const useCase = new GetHomePageDataUseCase(newsRepo, matchRepo);

      const result = await useCase.execute();

      expect(result).toHaveProperty('editorialNews');
      expect(result).toHaveProperty('latestNews');
      expect(result).toHaveProperty('scheduledMatches');
      expect(result.editorialNews).toHaveLength(1);
      expect(result.latestNews).toHaveLength(2);
      expect(result.scheduledMatches).toHaveLength(1);
      expect(newsRepo.getEditorialNews).toHaveBeenCalledOnce();
      expect(newsRepo.getLatestNews).toHaveBeenCalledOnce();
      expect(matchRepo.getScheduledMatches).toHaveBeenCalledOnce();
    });

    it('calls all repositories in parallel', async () => {
      const newsRepo = createMockNewsRepo();
      const matchRepo = createMockMatchRepo();
      const useCase = new GetHomePageDataUseCase(newsRepo, matchRepo);

      await useCase.execute();

      // All three should be called (parallel execution)
      expect(newsRepo.getEditorialNews).toHaveBeenCalledTimes(1);
      expect(newsRepo.getLatestNews).toHaveBeenCalledTimes(1);
      expect(matchRepo.getScheduledMatches).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetJogosPageDataUseCase', () => {
    it('returns next match and recent results', async () => {
      const matchRepo = createMockMatchRepo();
      const useCase = new GetJogosPageDataUseCase(matchRepo);

      const result = await useCase.execute();

      expect(result).toHaveProperty('nextMatch');
      expect(result).toHaveProperty('recentResults');
      expect(result.nextMatch.homeTeam).toBe('Corinthians');
      expect(result.recentResults).toHaveLength(1);
    });
  });

  describe('GetArticlePageDataUseCase', () => {
    it('returns article with top stories and next match for valid slug', async () => {
      const newsRepo = createMockNewsRepo();
      const matchRepo = createMockMatchRepo();
      const useCase = new GetArticlePageDataUseCase(newsRepo, matchRepo);

      const result = await useCase.execute('corinthians-vence');

      expect(result).not.toBeNull();
      expect(result!.article.slug).toBe('corinthians-vence');
      expect(result!.topStories).toHaveLength(1);
      expect(result!.nextMatch).toBeDefined();
    });

    it('returns null for non-existent slug', async () => {
      const newsRepo = createMockNewsRepo();
      const matchRepo = createMockMatchRepo();
      const useCase = new GetArticlePageDataUseCase(newsRepo, matchRepo);

      const result = await useCase.execute('non-existent');

      expect(result).toBeNull();
    });

    it('limits top stories to 3', async () => {
      const fourArticles = Array.from({ length: 4 }, (_, i) => ({
        ...mockArticle,
        id: String(i),
      }));
      const newsRepo = createMockNewsRepo({
        getEditorialNews: vi.fn().mockResolvedValue(fourArticles),
      });
      const matchRepo = createMockMatchRepo();
      const useCase = new GetArticlePageDataUseCase(newsRepo, matchRepo);

      const result = await useCase.execute('corinthians-vence');

      expect(result!.topStories).toHaveLength(3);
    });
  });

  describe('GetColumnistsUseCase', () => {
    it('returns columnists from repository', async () => {
      const repo = createMockColumnistRepo();
      const useCase = new GetColumnistsUseCase(repo);

      const result = await useCase.execute();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Ronaldo Koeler');
      expect(repo.getColumnists).toHaveBeenCalledOnce();
    });
  });

  describe('GetStandingsUseCase', () => {
    it('returns standings from repository', async () => {
      const repo = createMockTableRepo();
      const useCase = new GetStandingsUseCase(repo);

      const result = await useCase.execute();

      expect(result).toHaveLength(1);
      expect(result[0].time).toBe('Corinthians');
      expect(result[0].pts).toBe(75);
    });
  });

  describe('AddCommentUseCase', () => {
    it('adds comment with correct data mapping', async () => {
      const repo = createMockCommentRepo();
      const useCase = new AddCommentUseCase(repo);

      const result = await useCase.execute(
        { name: 'Torcedor', comment: 'Vai Corinthians!' },
        'corinthians-vence'
      );

      expect(result.name).toBe('Torcedor');
      expect(result.content).toBe('Vai Corinthians!');
      expect(result.articleSlug).toBe('corinthians-vence');
      expect(result.id).toBeTruthy();
      expect(repo.addComment).toHaveBeenCalledWith({
        name: 'Torcedor',
        content: 'Vai Corinthians!',
        articleSlug: 'corinthians-vence',
      });
    });
  });

  describe('SubscribeNewsletterUseCase', () => {
    it('subscribes with name and email', async () => {
      const repo = createMockNewsletterRepo();
      const useCase = new SubscribeNewsletterUseCase(repo);

      await useCase.execute('Maria', 'maria@example.com');

      expect(repo.subscribe).toHaveBeenCalledWith({
        name: 'Maria',
        email: 'maria@example.com',
      });
    });
  });
});
