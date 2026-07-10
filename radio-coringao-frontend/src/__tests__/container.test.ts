import { describe, it, expect, vi, beforeEach } from 'vitest';
import { container } from '@/application/services/container';

describe('DI Container', () => {
  it('exposes all repository getters', () => {
    expect(container.newsRepo).toBeDefined();
    expect(container.matchRepo).toBeDefined();
    expect(container.tableRepo).toBeDefined();
    expect(container.columnistRepo).toBeDefined();
    expect(container.commentRepo).toBeDefined();
    expect(container.newsletterRepo).toBeDefined();
  });

  it('exposes all use case getters', () => {
    expect(container.getHomePageData).toBeDefined();
    expect(container.getJogosPageData).toBeDefined();
    expect(container.getArticlePageData).toBeDefined();
    expect(container.getColumnists).toBeDefined();
    expect(container.getStandings).toBeDefined();
    expect(container.addComment).toBeDefined();
    expect(container.subscribeNewsletter).toBeDefined();
  });

  it('newsRepo implements INewsRepository interface', () => {
    const repo = container.newsRepo;
    expect(typeof repo.getEditorialNews).toBe('function');
    expect(typeof repo.getLatestNews).toBe('function');
    expect(typeof repo.getArticleBySlug).toBe('function');
    expect(typeof repo.getArticlesByCategory).toBe('function');
  });

  it('matchRepo implements IMatchRepository interface', () => {
    const repo = container.matchRepo;
    expect(typeof repo.getNextMatch).toBe('function');
    expect(typeof repo.getNextMatchFeminino).toBe('function');
    expect(typeof repo.getNextMatchBasquete).toBe('function');
    expect(typeof repo.getRecentResults).toBe('function');
    expect(typeof repo.getScheduledMatches).toBe('function');
  });

  it('tableRepo implements ITableRepository interface', () => {
    const repo = container.tableRepo;
    expect(typeof repo.getStandings).toBe('function');
  });

  it('columnistRepo implements IColumnistRepository interface', () => {
    const repo = container.columnistRepo;
    expect(typeof repo.getColumnists).toBe('function');
  });

  it('commentRepo implements ICommentRepository interface', () => {
    const repo = container.commentRepo;
    expect(typeof repo.getCommentsByArticle).toBe('function');
    expect(typeof repo.addComment).toBe('function');
  });

  it('newsletterRepo implements INewsletterRepository interface', () => {
    const repo = container.newsletterRepo;
    expect(typeof repo.subscribe).toBe('function');
  });

  it('returns same repository instance on multiple accesses', () => {
    const repo1 = container.newsRepo;
    const repo2 = container.newsRepo;
    expect(repo1).toBe(repo2);
  });

  it('use cases are created fresh each time', () => {
    const uc1 = container.getHomePageData;
    const uc2 = container.getHomePageData;
    // Use cases are created fresh (new instances) — this is by design
    expect(uc1).not.toBe(uc2);
  });

  it('getHomePageData use case can execute', async () => {
    const result = await container.getHomePageData.execute();
    expect(result).toHaveProperty('editorialNews');
    expect(result).toHaveProperty('latestNews');
    expect(result).toHaveProperty('scheduledMatches');
    expect(Array.isArray(result.editorialNews)).toBe(true);
    expect(Array.isArray(result.latestNews)).toBe(true);
  });

  it('getStandings use case can execute', async () => {
    const result = await container.getStandings.execute();
    expect(Array.isArray(result)).toBe(true);
  });

  it('getColumnists use case can execute', async () => {
    const result = await container.getColumnists.execute();
    expect(Array.isArray(result)).toBe(true);
  });
});
