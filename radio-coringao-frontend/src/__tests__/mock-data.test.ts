import { describe, it, expect } from 'vitest';
import {
  heroArticle,
  editorialNews,
  latestNews,
  nextMatchM,
  nextMatchF,
  nextMatchBasquete,
  recentResults,
  standings,
  columnists,
  topStories,
} from '@/infrastructure/data';
import { sportsData } from '@/infrastructure/data/sports';
import { newsCategories } from '@/infrastructure/data/news-categories';
import { newsData } from '@/infrastructure/data/news-all';
import { eventsData } from '@/infrastructure/data/events';
import type { NewsArticle, NextMatch, TableEntry, MatchResult, Columnist } from '@/domain/entities';

describe('Mock Data Integrity', () => {
  describe('Main data (infrastructure/data/index.ts)', () => {
    it('heroArticle has all required fields', () => {
      expect(heroArticle).toHaveProperty('id');
      expect(heroArticle).toHaveProperty('title');
      expect(heroArticle).toHaveProperty('slug');
      expect(heroArticle).toHaveProperty('category');
      expect(heroArticle).toHaveProperty('categorySlug');
      expect(heroArticle).toHaveProperty('author');
      expect(heroArticle).toHaveProperty('imageUrl');
      expect(heroArticle).toHaveProperty('publishedAt');
      expect(typeof heroArticle.viewCount).toBe('number');
    });

    it('editorialNews is a non-empty array of articles', () => {
      expect(Array.isArray(editorialNews)).toBe(true);
      expect(editorialNews.length).toBeGreaterThan(0);
      editorialNews.forEach((a: NewsArticle) => {
        expect(a.id).toBeTruthy();
        expect(a.title).toBeTruthy();
        expect(a.slug).toBeTruthy();
        expect(a.category).toBeTruthy();
      });
    });

    it('latestNews is a non-empty array of articles', () => {
      expect(Array.isArray(latestNews)).toBe(true);
      expect(latestNews.length).toBeGreaterThan(0);
      latestNews.forEach((a: NewsArticle) => {
        expect(a.id).toBeTruthy();
        expect(a.title).toBeTruthy();
      });
    });

    it('topStories is an array', () => {
      expect(Array.isArray(topStories)).toBe(true);
    });

    it('nextMatchM has all required match fields', () => {
      expect(nextMatchM).toHaveProperty('homeTeam');
      expect(nextMatchM).toHaveProperty('awayTeam');
      expect(nextMatchM).toHaveProperty('date');
      expect(nextMatchM).toHaveProperty('time');
      expect(nextMatchM).toHaveProperty('venue');
      expect(nextMatchM).toHaveProperty('competition');
      expect(nextMatchM.homeTeam).toBeTruthy();
      expect(nextMatchM.awayTeam).toBeTruthy();
    });

    it('nextMatchF has all required match fields', () => {
      expect(nextMatchF.homeTeam).toBeTruthy();
      expect(nextMatchF.awayTeam).toBeTruthy();
      expect(nextMatchF.venue).toBeTruthy();
    });

    it('nextMatchBasquete has all required match fields', () => {
      expect(nextMatchBasquete.homeTeam).toBeTruthy();
      expect(nextMatchBasquete.awayTeam).toBeTruthy();
    });

    it('recentResults is an array of match results', () => {
      expect(Array.isArray(recentResults)).toBe(true);
      recentResults.forEach((r: MatchResult) => {
        expect(r).toHaveProperty('home');
        expect(r).toHaveProperty('away');
        expect(r).toHaveProperty('score');
      });
    });

    it('standings is a non-empty array of table entries', () => {
      expect(Array.isArray(standings)).toBe(true);
      expect(standings.length).toBeGreaterThan(0);
      standings.forEach((e: TableEntry) => {
        expect(e).toHaveProperty('pos');
        expect(e).toHaveProperty('time');
        expect(e).toHaveProperty('pts');
        expect(e).toHaveProperty('j');
        expect(e).toHaveProperty('v');
        expect(e).toHaveProperty('e');
        expect(e).toHaveProperty('d');
        expect(e).toHaveProperty('gp');
        expect(e).toHaveProperty('gc');
      });
    });

    it('standings are sorted by position', () => {
      for (let i = 1; i < standings.length; i++) {
        expect(standings[i].pos).toBeGreaterThanOrEqual(standings[i - 1].pos);
      }
    });

    it('standings games played = wins + draws + losses', () => {
      standings.forEach((e: TableEntry) => {
        expect(e.j).toBe(e.v + e.e + e.d);
      });
    });

    it('columnists is a non-empty array', () => {
      expect(Array.isArray(columnists)).toBe(true);
      expect(columnists.length).toBeGreaterThan(0);
      columnists.forEach((c: Columnist) => {
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('role');
        expect(c).toHaveProperty('description');
      });
    });

    it('all articles have unique ids', () => {
      const allArticles = [...editorialNews, ...latestNews];
      const ids = allArticles.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('all articles have unique slugs', () => {
      const allArticles = [...editorialNews, ...latestNews];
      const slugs = allArticles.map((a) => a.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });

  describe('Sports data (infrastructure/data/sports.ts)', () => {
    it('exports sportsData with sport categories', () => {
      expect(sportsData).toBeDefined();
      expect(typeof sportsData).toBe('object');
      expect(Object.keys(sportsData).length).toBeGreaterThan(0);
    });

    it('each sport has required data structures', () => {
      Object.values(sportsData).forEach((sport: any) => {
        expect(sport).toHaveProperty('latestNews');
        expect(sport).toHaveProperty('weekHighlights');
        expect(Array.isArray(sport.latestNews)).toBe(true);
        expect(Array.isArray(sport.weekHighlights)).toBe(true);
      });
    });
  });

  describe('News categories (infrastructure/data/news-categories.ts)', () => {
    it('exports newsCategories with categories', () => {
      expect(newsCategories).toBeDefined();
      expect(typeof newsCategories).toBe('object');
    });

    it('each category has articles array', () => {
      Object.values(newsCategories).forEach((cat: any) => {
        expect(cat).toHaveProperty('articles');
        expect(Array.isArray(cat.articles)).toBe(true);
      });
    });
  });

  describe('News data (infrastructure/data/news-all.ts)', () => {
    it('exports newsData with latestNews, weekHighlights, monthHighlights', () => {
      expect(newsData).toBeDefined();
      expect(Array.isArray(newsData.latestNews)).toBe(true);
      expect(Array.isArray(newsData.weekHighlights)).toBe(true);
      expect(Array.isArray(newsData.monthHighlights)).toBe(true);
    });
  });

  describe('Events data (infrastructure/data/events.ts)', () => {
    it('exports eventsData as object with event categories', () => {
      expect(eventsData).toBeDefined();
      expect(typeof eventsData).toBe('object');
      expect(Object.keys(eventsData).length).toBeGreaterThan(0);
    });

    it('each event has name and either items or categories', () => {
      Object.values(eventsData).forEach((cat: any) => {
        expect(cat).toHaveProperty('name');
        expect(cat).toHaveProperty('slug');
        const hasItems = Array.isArray(cat.items);
        const hasCategories = Array.isArray(cat.categories);
        expect(hasItems || hasCategories).toBe(true);
      });
    });
  });
});
