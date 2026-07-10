import { describe, it, expect } from 'vitest';
import type {
  NewsArticle,
  NextMatch,
  Comment,
  Columnist,
  TableEntry,
  MatchResult,
  NewsletterSubscriber,
} from '@/domain/entities';

describe('Domain Entities', () => {
  describe('NewsArticle', () => {
    it('has all required fields', () => {
      const article: NewsArticle = {
        id: '1',
        title: 'Corinthians vence clássico',
        excerpt: 'Resumo da partida',
        category: 'Futebol',
        categorySlug: 'futebol',
        author: 'João Silva',
        imageUrl: 'https://example.com/img.jpg',
        imageAlt: 'Imagem do jogo',
        publishedAt: '2025-01-15T10:00:00Z',
        slug: 'corinthians-vence-classico',
        isBreaking: false,
        isLive: false,
        viewCount: 1234,
      };
      expect(article.id).toBe('1');
      expect(article.title).toBeTruthy();
      expect(article.slug).toBeTruthy();
      expect(typeof article.viewCount).toBe('number');
    });

    it('allows optional fields', () => {
      const article: NewsArticle = {
        id: '1',
        title: 'Test',
        excerpt: 'Test',
        category: 'Cat',
        categorySlug: 'cat',
        author: 'Author',
        imageUrl: 'url',
        imageAlt: 'alt',
        publishedAt: '2025-01-01',
        slug: 'test',
        isBreaking: false,
        isLive: false,
        viewCount: 0,
        content: 'Full content',
        authorAvatar: 'avatar.jpg',
        authorPosition: 'Editor',
      };
      expect(article.content).toBe('Full content');
      expect(article.authorAvatar).toBe('avatar.jpg');
    });
  });

  describe('NextMatch', () => {
    it('has all required fields', () => {
      const match: NextMatch = {
        homeTeam: 'Corinthians',
        awayTeam: 'São Paulo',
        date: '2025-03-15',
        time: '20:00',
        venue: 'Neo Química Arena',
        competition: 'Brasileirão Série A',
        hasTickets: true,
      };
      expect(match.homeTeam).toBeTruthy();
      expect(match.awayTeam).toBeTruthy();
      expect(match.venue).toBeTruthy();
    });

    it('allows optional logo and round', () => {
      const match: NextMatch = {
        homeTeam: 'Corinthians',
        awayTeam: 'Palmeiras',
        date: '2025-03-15',
        time: '20:00',
        venue: 'Arena',
        competition: 'Brasileirão',
        hasTickets: false,
        homeTeamLogo: 'https://logo.png',
        awayTeamLogo: null,
        round: 'Rodada 10',
      };
      expect(match.homeTeamLogo).toBeTruthy();
      expect(match.awayTeamLogo).toBeNull();
      expect(match.round).toBe('Rodada 10');
    });
  });

  describe('Comment', () => {
    it('has all required fields', () => {
      const comment: Comment = {
        id: 'uuid-1',
        name: 'Torcedor',
        content: 'Vai Corinthians!',
        articleSlug: 'corinthians-vence',
        createdAt: '2025-01-15T12:00:00Z',
      };
      expect(comment.id).toBeTruthy();
      expect(comment.name).toBeTruthy();
      expect(comment.content).toBeTruthy();
      expect(comment.articleSlug).toBeTruthy();
    });
  });

  describe('Columnist', () => {
    it('has required fields', () => {
      const columnist: Columnist = {
        name: 'Ronaldo Koeler',
        role: 'Colunista',
        description: 'Jornalista esportivo',
      };
      expect(columnist.name).toBeTruthy();
      expect(columnist.role).toBeTruthy();
    });
  });

  describe('TableEntry', () => {
    it('has all required fields', () => {
      const entry: TableEntry = {
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
      expect(entry.pos).toBe(1);
      expect(entry.pts).toBeGreaterThan(0);
      expect(entry.j).toBe(entry.v + entry.e + entry.d);
    });
  });

  describe('MatchResult', () => {
    it('has required fields', () => {
      const result: MatchResult = {
        home: 'Corinthians',
        away: 'Palmeiras',
        score: '2 x 1',
      };
      expect(result.home).toBeTruthy();
      expect(result.away).toBeTruthy();
      expect(result.score).toMatch(/\d\s*x\s*\d/);
    });
  });

  describe('NewsletterSubscriber', () => {
    it('has required fields', () => {
      const sub: NewsletterSubscriber = {
        name: 'Maria',
        email: 'maria@example.com',
      };
      expect(sub.name).toBeTruthy();
      expect(sub.email).toContain('@');
    });
  });
});
