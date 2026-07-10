import { describe, it, expect } from 'vitest';
import {
  CommentInputSchema,
  NewsletterInputSchema,
  type CommentInput,
  type NewsletterInput,
  type HomePageData,
  type JogosPageData,
  type ArticlePageData,
} from '@/application/dto';

describe('DTO Schemas', () => {
  describe('CommentInputSchema', () => {
    it('accepts valid comment input', () => {
      const valid: CommentInput = { name: 'João', comment: 'Excelente article!' };
      expect(CommentInputSchema.parse(valid)).toEqual(valid);
    });

    it('rejects name shorter than 2 chars', () => {
      expect(() =>
        CommentInputSchema.parse({ name: 'A', comment: 'Valid comment here' })
      ).toThrow();
    });

    it('rejects comment shorter than 10 chars', () => {
      expect(() =>
        CommentInputSchema.parse({ name: 'João', comment: 'Short' })
      ).toThrow();
    });

    it('rejects empty name', () => {
      expect(() =>
        CommentInputSchema.parse({ name: '', comment: 'Valid comment here' })
      ).toThrow();
    });

    it('rejects empty comment', () => {
      expect(() =>
        CommentInputSchema.parse({ name: 'João', comment: '' })
      ).toThrow();
    });

    it('accepts exactly 2-char name', () => {
      const result = CommentInputSchema.parse({ name: 'Li', comment: 'Very good article indeed' });
      expect(result.name).toBe('Li');
    });

    it('accepts exactly 10-char comment', () => {
      const result = CommentInputSchema.parse({ name: 'João', comment: '1234567890' });
      expect(result.comment).toBe('1234567890');
    });
  });

  describe('NewsletterInputSchema', () => {
    it('accepts valid newsletter input', () => {
      const valid: NewsletterInput = { email: 'test@example.com', name: 'Maria' };
      expect(NewsletterInputSchema.parse(valid)).toEqual(valid);
    });

    it('rejects invalid email', () => {
      expect(() =>
        NewsletterInputSchema.parse({ email: 'not-an-email', name: 'Maria' })
      ).toThrow();
    });

    it('rejects email without @', () => {
      expect(() =>
        NewsletterInputSchema.parse({ email: 'testexample.com', name: 'Maria' })
      ).toThrow();
    });

    it('rejects name shorter than 2 chars', () => {
      expect(() =>
        NewsletterInputSchema.parse({ email: 'test@example.com', name: 'A' })
      ).toThrow();
    });

    it('accepts email with subdomain', () => {
      const result = NewsletterInputSchema.parse({ email: 'user@sub.example.com', name: 'Test' });
      expect(result.email).toBe('user@sub.example.com');
    });
  });

  describe('Type interfaces', () => {
    it('HomePageData has correct shape', () => {
      const data: HomePageData = {
        editorialNews: [],
        latestNews: [],
        scheduledMatches: [],
      };
      expect(data).toHaveProperty('editorialNews');
      expect(data).toHaveProperty('latestNews');
      expect(data).toHaveProperty('scheduledMatches');
    });

    it('JogosPageData has correct shape', () => {
      const data: JogosPageData = {
        nextMatch: {
          homeTeam: 'Corinthians',
          awayTeam: 'Palmeiras',
          date: '2025-01-01',
          time: '20:00',
          venue: 'Neo Química Arena',
          competition: 'Brasileirão',
          hasTickets: false,
        },
        recentResults: [],
      };
      expect(data).toHaveProperty('nextMatch');
      expect(data).toHaveProperty('recentResults');
    });

    it('ArticlePageData has correct shape', () => {
      const data: ArticlePageData = {
        article: {
          id: '1',
          title: 'Test',
          excerpt: 'Test excerpt',
          category: 'Futebol',
          categorySlug: 'futebol',
          author: 'Author',
          imageUrl: 'http://example.com/img.jpg',
          imageAlt: 'Alt',
          publishedAt: '2025-01-01',
          slug: 'test',
          isBreaking: false,
          isLive: false,
          viewCount: 0,
        },
        topStories: [],
        nextMatch: {
          homeTeam: 'Corinthians',
          awayTeam: 'Palmeiras',
          date: '2025-01-01',
          time: '20:00',
          venue: 'Arena',
          competition: 'Brasileirão',
          hasTickets: false,
        },
      };
      expect(data).toHaveProperty('article');
      expect(data).toHaveProperty('topStories');
      expect(data).toHaveProperty('nextMatch');
    });
  });
});
