import { describe, it, expect } from 'vitest';
import {
  MockNewsRepository,
  MockMatchRepository,
  MockTableRepository,
  MockColumnistRepository,
  MockCommentRepository,
  MockNewsletterRepository,
} from '@/infrastructure/repositories';

describe('Mock Repositories', () => {
  describe('MockNewsRepository', () => {
    const repo = new MockNewsRepository();

    it('getEditorialNews returns array of articles', async () => {
      const result = await repo.getEditorialNews();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('slug');
      expect(result[0]).toHaveProperty('category');
    });

    it('getLatestNews returns array of articles', async () => {
      const result = await repo.getLatestNews();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('getArticleBySlug returns article for valid slug', async () => {
      const editorial = await repo.getEditorialNews();
      const firstSlug = editorial[0].slug;
      const result = await repo.getArticleBySlug(firstSlug);
      expect(result).not.toBeNull();
      expect(result!.slug).toBe(firstSlug);
    });

    it('getArticleBySlug returns null for invalid slug', async () => {
      const result = await repo.getArticleBySlug('non-existent-slug-xyz');
      expect(result).toBeNull();
    });

    it('getArticlesByCategory filters by categorySlug', async () => {
      const all = await repo.getEditorialNews();
      const category = all[0].categorySlug;
      const result = await repo.getArticlesByCategory(category);
      expect(result.every((a) => a.categorySlug === category)).toBe(true);
    });
  });

  describe('MockMatchRepository', () => {
    const repo = new MockMatchRepository();

    it('getNextMatch returns a match with required fields', async () => {
      const match = await repo.getNextMatch();
      expect(match).toHaveProperty('homeTeam');
      expect(match).toHaveProperty('awayTeam');
      expect(match).toHaveProperty('date');
      expect(match).toHaveProperty('time');
      expect(match).toHaveProperty('venue');
      expect(match).toHaveProperty('competition');
    });

    it('getNextMatchFeminino returns a match', async () => {
      const match = await repo.getNextMatchFeminino();
      expect(match.homeTeam).toBeTruthy();
      expect(match.awayTeam).toBeTruthy();
    });

    it('getNextMatchBasquete returns a match', async () => {
      const match = await repo.getNextMatchBasquete();
      expect(match.homeTeam).toBeTruthy();
    });

    it('getRecentResults returns array of match results', async () => {
      const results = await repo.getRecentResults();
      expect(Array.isArray(results)).toBe(true);
      results.forEach((r) => {
        expect(r).toHaveProperty('home');
        expect(r).toHaveProperty('away');
        expect(r).toHaveProperty('score');
      });
    });

    it('getScheduledMatches returns array', async () => {
      const matches = await repo.getScheduledMatches();
      expect(Array.isArray(matches)).toBe(true);
    });
  });

  describe('MockTableRepository', () => {
    const repo = new MockTableRepository();

    it('getStandings returns array of table entries', async () => {
      const standings = await repo.getStandings();
      expect(Array.isArray(standings)).toBe(true);
      expect(standings.length).toBeGreaterThan(0);
      standings.forEach((entry) => {
        expect(entry).toHaveProperty('pos');
        expect(entry).toHaveProperty('time');
        expect(entry).toHaveProperty('pts');
        expect(entry).toHaveProperty('j');
        expect(entry).toHaveProperty('v');
        expect(entry).toHaveProperty('e');
        expect(entry).toHaveProperty('d');
        expect(entry).toHaveProperty('gp');
        expect(entry).toHaveProperty('gc');
      });
    });

    it('standings are sorted by position', async () => {
      const standings = await repo.getStandings();
      for (let i = 1; i < standings.length; i++) {
        expect(standings[i].pos).toBeGreaterThanOrEqual(standings[i - 1].pos);
      }
    });
  });

  describe('MockColumnistRepository', () => {
    const repo = new MockColumnistRepository();

    it('getColumnists returns array of columnists', async () => {
      const columnists = await repo.getColumnists();
      expect(Array.isArray(columnists)).toBe(true);
      columnists.forEach((c) => {
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('role');
        expect(c).toHaveProperty('description');
      });
    });
  });

  describe('MockCommentRepository', () => {
    it('starts with no comments', async () => {
      const repo = new MockCommentRepository();
      const comments = await repo.getCommentsByArticle('any-slug');
      expect(comments).toHaveLength(0);
    });

    it('addComment creates and returns comment with id and createdAt', async () => {
      const repo = new MockCommentRepository();
      const result = await repo.addComment({
        name: 'Test',
        content: 'Great article!',
        articleSlug: 'test-slug',
      });

      expect(result.id).toBeTruthy();
      expect(result.createdAt).toBeTruthy();
      expect(result.name).toBe('Test');
      expect(result.content).toBe('Great article!');
      expect(result.articleSlug).toBe('test-slug');
    });

    it('getCommentsByArticle returns only matching comments', async () => {
      const repo = new MockCommentRepository();
      await repo.addComment({ name: 'A', content: 'Comment 1', articleSlug: 'slug-a' });
      await repo.addComment({ name: 'B', content: 'Comment 2', articleSlug: 'slug-b' });
      await repo.addComment({ name: 'C', content: 'Comment 3', articleSlug: 'slug-a' });

      const slugAComments = await repo.getCommentsByArticle('slug-a');
      const slugBComments = await repo.getCommentsByArticle('slug-b');

      expect(slugAComments).toHaveLength(2);
      expect(slugBComments).toHaveLength(1);
    });
  });

  describe('MockNewsletterRepository', () => {
    it('subscribe resolves without error', async () => {
      const repo = new MockNewsletterRepository();
      await expect(
        repo.subscribe({ name: 'Test', email: 'test@example.com' })
      ).resolves.toBeUndefined();
    });
  });
});
