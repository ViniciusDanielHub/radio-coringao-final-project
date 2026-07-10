import { describe, it, expect, vi, beforeEach } from 'vitest';

// Test the transformArticle logic from API repositories
describe('API Repository Transformations', () => {
  describe('transformArticle logic', () => {
    // Replicate the transformArticle function logic
    function transformArticle(apiArticle: any) {
      return {
        ...apiArticle,
        category: apiArticle.category?.name || apiArticle.category || '',
        categorySlug: apiArticle.category?.slug || apiArticle.categorySlug || '',
        author: apiArticle.author?.name || apiArticle.author || '',
        authorAvatar: apiArticle.author?.avatar || apiArticle.authorAvatar || '',
        authorPosition: apiArticle.author?.position || apiArticle.authorRole || '',
        imageUrl: apiArticle.coverImage || apiArticle.imageUrl || null,
        imageAlt: apiArticle.coverImageAlt || apiArticle.imageAlt || '',
      };
    }

    it('transforms article with nested category object', () => {
      const apiArticle = {
        id: '1',
        title: 'Test',
        slug: 'test',
        category: { name: 'Futebol', slug: 'futebol' },
        author: { name: 'João', avatar: 'avatar.jpg', position: 'Editor' },
        coverImage: 'cover.jpg',
        coverImageAlt: 'Cover alt',
      };

      const result = transformArticle(apiArticle);
      expect(result.category).toBe('Futebol');
      expect(result.categorySlug).toBe('futebol');
      expect(result.author).toBe('João');
      expect(result.authorAvatar).toBe('avatar.jpg');
      expect(result.authorPosition).toBe('Editor');
      expect(result.imageUrl).toBe('cover.jpg');
      expect(result.imageAlt).toBe('Cover alt');
    });

    it('transforms article with flat category string', () => {
      const apiArticle = {
        id: '2',
        title: 'Test 2',
        slug: 'test-2',
        category: 'Futebol',
        categorySlug: 'futebol',
        author: 'Maria',
        imageUrl: 'img.jpg',
        imageAlt: 'Alt text',
      };

      const result = transformArticle(apiArticle);
      expect(result.category).toBe('Futebol');
      expect(result.categorySlug).toBe('futebol');
      expect(result.author).toBe('Maria');
      expect(result.imageUrl).toBe('img.jpg');
    });

    it('handles missing fields gracefully', () => {
      const apiArticle = {
        id: '3',
        title: 'Test 3',
        slug: 'test-3',
      };

      const result = transformArticle(apiArticle);
      expect(result.category).toBe('');
      expect(result.categorySlug).toBe('');
      expect(result.author).toBe('');
      expect(result.authorAvatar).toBe('');
      expect(result.imageUrl).toBeNull();
      expect(result.imageAlt).toBe('');
    });

    it('prefers coverImage over imageUrl', () => {
      const apiArticle = {
        coverImage: 'cover.jpg',
        imageUrl: 'old.jpg',
      };

      const result = transformArticle(apiArticle);
      expect(result.imageUrl).toBe('cover.jpg');
    });

    it('falls back to imageUrl when coverImage is missing', () => {
      const apiArticle = {
        imageUrl: 'fallback.jpg',
      };

      const result = transformArticle(apiArticle);
      expect(result.imageUrl).toBe('fallback.jpg');
    });
  });

  describe('transformMatch logic', () => {
    const CORINTHIANS_LOGO = 'https://res.cloudinary.com/def661xyl/image/upload/corinthians-logo.png';

    function transformMatch(apiMatch: any) {
      if (!apiMatch) return null;

      const matchDate = apiMatch.date ? new Date(apiMatch.date) : null;
      const dateStr = matchDate
        ? matchDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
        : '';
      const timeStr = matchDate
        ? matchDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        : '';

      const opponent = apiMatch.opponent || {};
      const opponentName = typeof opponent === 'string' ? opponent : opponent.name || 'TBD';
      const opponentLogo = typeof opponent === 'object' ? opponent.logoUrl : null;

      return {
        homeTeam: apiMatch.isHome ? 'Corinthians' : opponentName,
        awayTeam: apiMatch.isHome ? opponentName : 'Corinthians',
        homeTeamLogo: apiMatch.isHome ? CORINTHIANS_LOGO : opponentLogo,
        awayTeamLogo: apiMatch.isHome ? opponentLogo : CORINTHIANS_LOGO,
        date: dateStr,
        time: timeStr,
        venue: apiMatch.venue || '',
        competition: apiMatch.competition?.name || apiMatch.competition || '',
        hasTickets: false,
        status: apiMatch.status,
        homeScore: apiMatch.homeScore,
        awayScore: apiMatch.awayScore,
        round: apiMatch.round || null,
      };
    }

    it('transforms home match correctly', () => {
      const apiMatch = {
        isHome: true,
        date: '2025-03-15T20:00:00Z',
        venue: 'Neo Química Arena',
        competition: { name: 'Brasileirão' },
        opponent: { name: 'Palmeiras', logoUrl: 'palmeiras.png' },
        status: 'SCHEDULED',
        homeScore: null,
        awayScore: null,
        round: 'Rodada 10',
      };

      const result = transformMatch(apiMatch);
      expect(result!.homeTeam).toBe('Corinthians');
      expect(result!.awayTeam).toBe('Palmeiras');
      expect(result!.homeTeamLogo).toBe(CORINTHIANS_LOGO);
      expect(result!.awayTeamLogo).toBe('palmeiras.png');
      expect(result!.venue).toBe('Neo Química Arena');
      expect(result!.competition).toBe('Brasileirão');
      expect(result!.round).toBe('Rodada 10');
    });

    it('transforms away match correctly', () => {
      const apiMatch = {
        isHome: false,
        date: '2025-03-20T19:00:00Z',
        venue: 'Morumbi',
        competition: 'Copa do Brasil',
        opponent: 'São Paulo',
      };

      const result = transformMatch(apiMatch);
      expect(result!.homeTeam).toBe('São Paulo');
      expect(result!.awayTeam).toBe('Corinthians');
      expect(result!.homeTeamLogo).toBeNull();
      expect(result!.awayTeamLogo).toBe(CORINTHIANS_LOGO);
    });

    it('returns null for null input', () => {
      expect(transformMatch(null)).toBeNull();
    });

    it('handles missing opponent name', () => {
      const apiMatch = {
        isHome: true,
        opponent: {},
      };

      const result = transformMatch(apiMatch);
      expect(result!.awayTeam).toBe('TBD');
    });
  });

  describe('Standings transformation', () => {
    function transformStandings(apiData: any[]) {
      return apiData.map((row: any) => ({
        pos: row.position,
        time: row.teamName,
        pts: row.points,
        j: row.played,
        v: row.won,
        e: row.drawn,
        d: row.lost,
        gp: row.goalsFor,
        gc: row.goalsAgainst,
      }));
    }

    it('transforms API standings to TableEntry format', () => {
      const apiData = [
        {
          position: 1,
          teamName: 'Corinthians',
          points: 75,
          played: 38,
          won: 22,
          drawn: 9,
          lost: 7,
          goalsFor: 65,
          goalsAgainst: 30,
        },
      ];

      const result = transformStandings(apiData);
      expect(result[0]).toEqual({
        pos: 1,
        time: 'Corinthians',
        pts: 75,
        j: 38,
        v: 22,
        e: 9,
        d: 7,
        gp: 65,
        gc: 30,
      });
    });

    it('handles empty array', () => {
      expect(transformStandings([])).toEqual([]);
    });
  });
});
