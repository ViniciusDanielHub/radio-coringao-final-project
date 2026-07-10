import { describe, it, expect } from 'vitest';
import { container } from '@/application/services/container';
import type { NewsArticle, NextMatch, TableEntry, MatchResult } from '@/domain/entities';

describe('Integration: Full Data Flow', () => {
  describe('Homepage data flow', () => {
    it('fetches and structures homepage data through the full stack', async () => {
      const data = await container.getHomePageData.execute();

      // Editorial news should be an array of articles
      expect(Array.isArray(data.editorialNews)).toBe(true);
      data.editorialNews.forEach((article: NewsArticle) => {
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('slug');
        expect(article).toHaveProperty('category');
        expect(article).toHaveProperty('categorySlug');
        expect(article).toHaveProperty('author');
        expect(article).toHaveProperty('imageUrl');
        expect(article).toHaveProperty('publishedAt');
      });

      // Latest news should be an array of articles
      expect(Array.isArray(data.latestNews)).toBe(true);
      data.latestNews.forEach((article: NewsArticle) => {
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('title');
      });

      // Scheduled matches should be an array
      expect(Array.isArray(data.scheduledMatches)).toBe(true);
    });
  });

  describe('Jogos page data flow', () => {
    it('fetches next match with all required fields', async () => {
      const data = await container.getJogosPageData.execute();

      expect(data.nextMatch).toBeDefined();
      expect(data.nextMatch.homeTeam).toBeTruthy();
      expect(data.nextMatch.awayTeam).toBeTruthy();
      expect(data.nextMatch.date).toBeTruthy();
      expect(data.nextMatch.time).toBeTruthy();
      expect(data.nextMatch.venue).toBeTruthy();
      expect(data.nextMatch.competition).toBeTruthy();
    });

    it('fetches recent results', async () => {
      const data = await container.getJogosPageData.execute();

      expect(Array.isArray(data.recentResults)).toBe(true);
      data.recentResults.forEach((result: MatchResult) => {
        expect(result).toHaveProperty('home');
        expect(result).toHaveProperty('away');
        expect(result).toHaveProperty('score');
      });
    });
  });

  describe('Article page data flow', () => {
    it('fetches article with related data for valid slug', async () => {
      // Get an editorial article first
      const editorialNews = await container.newsRepo.getEditorialNews();
      if (editorialNews.length > 0) {
        const slug = editorialNews[0].slug;
        const data = await container.getArticlePageData.execute(slug);

        expect(data).not.toBeNull();
        expect(data!.article.slug).toBe(slug);
        expect(data!.article.title).toBeTruthy();
        expect(Array.isArray(data!.topStories)).toBe(true);
        expect(data!.topStories.length).toBeLessThanOrEqual(3);
        expect(data!.nextMatch).toBeDefined();
      }
    });

    it('returns null for non-existent article', async () => {
      const data = await container.getArticlePageData.execute('this-slug-does-not-exist');
      expect(data).toBeNull();
    });
  });

  describe('Standings data flow', () => {
    it('fetches standings with all required fields', async () => {
      const standings = await container.getStandings.execute();

      expect(Array.isArray(standings)).toBe(true);
      standings.forEach((entry: TableEntry) => {
        expect(entry).toHaveProperty('pos');
        expect(entry).toHaveProperty('time');
        expect(entry).toHaveProperty('pts');
        expect(entry).toHaveProperty('j');
        expect(entry).toHaveProperty('v');
        expect(entry).toHaveProperty('e');
        expect(entry).toHaveProperty('d');
        expect(entry).toHaveProperty('gp');
        expect(entry).toHaveProperty('gc');
        expect(typeof entry.pos).toBe('number');
        expect(typeof entry.pts).toBe('number');
      });
    });
  });

  describe('Columnists data flow', () => {
    it('fetches columnists with all required fields', async () => {
      const columnists = await container.getColumnists.execute();

      expect(Array.isArray(columnists)).toBe(true);
      columnists.forEach((col) => {
        expect(col).toHaveProperty('name');
        expect(col).toHaveProperty('role');
        expect(col).toHaveProperty('description');
      });
    });
  });

  describe('Comment flow', () => {
    it('can add and retrieve comments for an article', async () => {
      // Add a comment
      const newComment = await container.addComment.execute(
        { name: 'Integration Test', comment: 'This is a test comment for integration testing' },
        'test-article-slug'
      );

      expect(newComment).toHaveProperty('id');
      expect(newComment.name).toBe('Integration Test');
      expect(newComment.content).toBe('This is a test comment for integration testing');
      expect(newComment.articleSlug).toBe('test-article-slug');
      expect(newComment).toHaveProperty('createdAt');
    });
  });

  describe('Newsletter flow', () => {
    it('can subscribe to newsletter', async () => {
      await expect(
        container.subscribeNewsletter.execute('Test User', 'test@example.com')
      ).resolves.toBeUndefined();
    });
  });

  describe('Cross-repository consistency', () => {
    it('all repositories return consistent data types', async () => {
      const [editorialNews, latestNews, standings, columnists] = await Promise.all([
        container.newsRepo.getEditorialNews(),
        container.newsRepo.getLatestNews(),
        container.tableRepo.getStandings(),
        container.columnistRepo.getColumnists(),
      ]);

      // All should be arrays
      expect(Array.isArray(editorialNews)).toBe(true);
      expect(Array.isArray(latestNews)).toBe(true);
      expect(Array.isArray(standings)).toBe(true);
      expect(Array.isArray(columnists)).toBe(true);

      // Articles should have consistent structure
      [...editorialNews, ...latestNews].forEach((a) => {
        expect(typeof a.id).toBe('string');
        expect(typeof a.title).toBe('string');
        expect(typeof a.slug).toBe('string');
      });

      // Standings should have consistent structure
      standings.forEach((s) => {
        expect(typeof s.pos).toBe('number');
        expect(typeof s.time).toBe('string');
        expect(typeof s.pts).toBe('number');
      });
    });
  });
});
