// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useContainer } from '@/presentation/hooks/useContainer';
import { container } from '@/application/services/container';

describe('Hooks', () => {
  describe('useContainer', () => {
    it('returns the DI container singleton', () => {
      const { result } = renderHook(() => useContainer());
      expect(result.current).toBe(container);
    });

    it('returns same instance on re-render', () => {
      const { result, rerender } = renderHook(() => useContainer());
      const first = result.current;
      rerender();
      expect(result.current).toBe(first);
    });

    it('container has all expected properties', () => {
      const { result } = renderHook(() => useContainer());
      expect(result.current.newsRepo).toBeDefined();
      expect(result.current.matchRepo).toBeDefined();
      expect(result.current.tableRepo).toBeDefined();
      expect(result.current.columnistRepo).toBeDefined();
      expect(result.current.commentRepo).toBeDefined();
      expect(result.current.newsletterRepo).toBeDefined();
      expect(result.current.getHomePageData).toBeDefined();
      expect(result.current.getJogosPageData).toBeDefined();
      expect(result.current.getArticlePageData).toBeDefined();
      expect(result.current.getColumnists).toBeDefined();
      expect(result.current.getStandings).toBeDefined();
      expect(result.current.addComment).toBeDefined();
      expect(result.current.subscribeNewsletter).toBeDefined();
    });
  });
});
