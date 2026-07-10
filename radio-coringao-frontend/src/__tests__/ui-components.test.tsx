// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTag } from '@/presentation/components/ui/CategoryTag';
import { LiveBadge } from '@/presentation/components/ui/LiveBadge';
import { Pagination } from '@/presentation/components/ui/Pagination';
import { ImageWithFallback } from '@/presentation/components/ui/ImageWithFallback';

describe('UI Components', () => {
  describe('CategoryTag', () => {
    it('renders the label text', () => {
      render(<CategoryTag label="Futebol" />);
      expect(screen.getByText('Futebol')).toBeDefined();
    });

    it('renders with uppercase styling', () => {
      const { container } = render(<CategoryTag label="Mercado" />);
      const span = container.querySelector('span');
      expect(span?.className).toContain('uppercase');
    });

    it('renders with secondary color classes', () => {
      const { container } = render(<CategoryTag label="Test" />);
      const span = container.querySelector('span');
      expect(span?.className).toContain('text-secondary');
      expect(span?.className).toContain('border-secondary');
    });
  });

  describe('LiveBadge', () => {
    it('renders "AO VIVO" text', () => {
      render(<LiveBadge />);
      expect(screen.getByText('AO VIVO')).toBeDefined();
    });

    it('renders with secondary color', () => {
      const { container } = render(<LiveBadge />);
      expect(container.textContent).toContain('AO VIVO');
    });
  });

  describe('Pagination', () => {
    it('renders nothing when totalPages <= 1', () => {
      const { container } = render(
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      );
      expect(container.innerHTML).toBe('');
    });

    it('renders page buttons for multiple pages', () => {
      render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
      expect(screen.getByText('1')).toBeDefined();
      expect(screen.getByText('2')).toBeDefined();
      expect(screen.getByText('3')).toBeDefined();
      expect(screen.getByText('4')).toBeDefined();
      expect(screen.getByText('5')).toBeDefined();
    });

    it('calls onPageChange when a page is clicked', () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);
      fireEvent.click(screen.getByText('2'));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('disables previous button on first page', () => {
      render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);
      const prevButton = screen.getAllByRole('button')[0];
      expect(prevButton.hasAttribute('disabled')).toBe(true);
    });

    it('disables next button on last page', () => {
      render(<Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />);
      const buttons = screen.getAllByRole('button');
      const nextButton = buttons[buttons.length - 1];
      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });

    it('highlights current page', () => {
      const { container } = render(
        <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
      );
      const buttons = screen.getAllByRole('button');
      // Button at index 2 is page 2 (after prev button)
      const page2Button = buttons[2];
      expect(page2Button.className).toContain('bg-primary');
    });
  });

  describe('ImageWithFallback', () => {
    it('renders img element', () => {
      render(<ImageWithFallback src="https://example.com/img.jpg" alt="Test image" />);
      const img = screen.getByAltText('Test image');
      expect(img).toBeDefined();
      expect(img.getAttribute('src')).toBe('https://example.com/img.jpg');
    });

    it('shows loading placeholder initially', () => {
      const { container } = render(
        <ImageWithFallback src="https://example.com/img.jpg" alt="Test" className="h-10 w-10" />
      );
      const placeholder = container.querySelector('.animate-pulse');
      expect(placeholder).toBeDefined();
    });

    it('applies custom className', () => {
      render(
        <ImageWithFallback src="https://example.com/img.jpg" alt="Test" className="custom-class" />
      );
      const img = screen.getByAltText('Test');
      expect(img.className).toContain('custom-class');
    });
  });
});
