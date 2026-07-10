import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatDate, formatRelativeDate } from '@/shared/utils/date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('formats a valid date string', () => {
      const result = formatDate('2025-01-15T10:00:00Z');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('returns empty string for null', () => {
      expect(formatDate(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(formatDate(undefined)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(formatDate('')).toBe('');
    });

    it('returns "Invalid Date" for invalid date string (Date does not throw)', () => {
      const result = formatDate('not-a-date');
      // new Date('not-a-date') creates Invalid Date; toLocaleDateString returns "Invalid Date"
      expect(result).toBe('Invalid Date');
    });

    it('formats date with day, month, and year', () => {
      const result = formatDate('2025-06-15T12:00:00Z');
      // Should contain some representation of the date
      expect(result).toMatch(/\d/);
    });
  });

  describe('formatRelativeDate', () => {
    it('returns "Agora" for very recent dates', () => {
      const now = new Date();
      const result = formatRelativeDate(now.toISOString());
      expect(result).toBe('Agora');
    });

    it('returns minutes format for recent dates', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60000);
      const result = formatRelativeDate(fiveMinAgo.toISOString());
      expect(result).toMatch(/^Há \d+min$/);
    });

    it('returns hours format for dates within 24h', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 3600000);
      const result = formatRelativeDate(threeHoursAgo.toISOString());
      expect(result).toMatch(/^Há \d+h$/);
    });

    it('returns days format for dates within 7 days', () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 86400000);
      const result = formatRelativeDate(twoDaysAgo.toISOString());
      expect(result).toMatch(/^Há \d+d$/);
    });

    it('returns formatted date for older dates', () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
      const result = formatRelativeDate(thirtyDaysAgo.toISOString());
      // Should fall back to formatDate which returns a pt-BR formatted date
      expect(result).toBeTruthy();
      expect(result).not.toMatch(/^Há/);
    });

    it('returns empty string for null', () => {
      expect(formatRelativeDate(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(formatRelativeDate(undefined)).toBe('');
    });

    it('returns "Invalid Date" for invalid date string', () => {
      // new Date('invalid') creates Invalid Date; falls through to formatDate
      expect(formatRelativeDate('invalid')).toBe('Invalid Date');
    });
  });
});
