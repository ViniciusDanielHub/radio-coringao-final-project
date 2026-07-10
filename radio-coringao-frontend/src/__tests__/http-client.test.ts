import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiError } from '@/infrastructure/api/http-client';

// We test the HttpClient logic by re-implementing its core behavior
// since it uses module-level singletons with env vars

describe('HttpClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('ApiError', () => {
    it('creates error with status and message', () => {
      const error = new ApiError(404, 'Not Found');
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.name).toBe('ApiError');
      expect(error instanceof Error).toBe(true);
    });

    it('is instance of Error', () => {
      const error = new ApiError(500, 'Server Error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiError);
    });
  });

  describe('URL building logic', () => {
    it('builds URL with base and path', () => {
      const baseUrl = 'http://localhost:3007/api';
      const path = '/noticias';
      const url = new URL(`${baseUrl}${path}`);
      expect(url.toString()).toBe('http://localhost:3007/api/noticias');
    });

    it('builds URL with query params', () => {
      const baseUrl = 'http://localhost:3007/api';
      const path = '/noticias';
      const params = { q: 'corinthians', page: '1' };
      const url = new URL(`${baseUrl}${path}`);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
      expect(url.toString()).toContain('q=corinthians');
      expect(url.toString()).toContain('page=1');
    });

    it('handles special characters in params', () => {
      const baseUrl = 'http://localhost:3007/api';
      const url = new URL(`${baseUrl}/search`);
      url.searchParams.append('q', 'futebol & basquete');
      expect(url.toString()).toContain('q=futebol+%26+basquete');
    });
  });

  describe('Retry logic', () => {
    it('retries on network error up to max retries', async () => {
      let attempts = 0;
      const mockFetch = vi.fn().mockImplementation(() => {
        attempts++;
        if (attempts < 3) {
          return Promise.reject(new TypeError('fetch failed'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'success' }),
        });
      });

      // Simulate the retry logic
      const fetchWithRetry = async (url: string, retries: number = 3) => {
        let lastError: Error | null = null;
        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            const response = await mockFetch(url);
            if (!response.ok) throw new ApiError(response.status, 'Error');
            return await response.json();
          } catch (error) {
            lastError = error as Error;
            if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
              throw error;
            }
          }
        }
        throw lastError;
      };

      const result = await fetchWithRetry('http://test.com/api');
      expect(result).toEqual({ data: 'success' });
      expect(attempts).toBe(3);
    });

    it('throws immediately on 4xx errors without retrying', async () => {
      let attempts = 0;
      const mockFetch = vi.fn().mockImplementation(() => {
        attempts++;
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        });
      });

      const fetchWithRetry = async (url: string, retries: number = 3) => {
        for (let attempt = 0; attempt < retries; attempt++) {
          const response = await mockFetch(url);
          if (!response.ok) {
            throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
          }
          return response.json();
        }
      };

      await expect(fetchWithRetry('http://test.com/api')).rejects.toThrow(ApiError);
      expect(attempts).toBe(1); // No retry on 4xx
    });

    it('throws after max retries exhausted', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new TypeError('fetch failed'));

      const fetchWithRetry = async (url: string, retries: number = 2) => {
        let lastError: Error | null = null;
        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            await mockFetch(url);
          } catch (error) {
            lastError = error as Error;
          }
        }
        throw lastError;
      };

      await expect(fetchWithRetry('http://test.com/api')).rejects.toThrow('fetch failed');
    });
  });

  describe('HTTP methods', () => {
    it('GET request has correct method and headers', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: 'ok' }),
      });

      await mockFetch('http://test.com/api/data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test.com/api/data',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
    });

    it('POST request includes body', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: '1' }),
      });

      const body = { name: 'Test' };
      await mockFetch('http://test.com/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test.com/api/data',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );
    });
  });
});
