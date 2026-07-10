import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock fetch globally for HTTP client tests
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Reset mocks before each test
beforeEach(() => {
  mockFetch.mockReset();
});
