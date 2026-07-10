// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextMatchCard } from '@/presentation/components/news/NextMatchCard';
import { NewsSortBar } from '@/presentation/components/news/NewsSortBar';

const mockMatch = {
  homeTeam: 'Corinthians',
  awayTeam: 'Palmeiras',
  date: '15 de março',
  time: '20:00',
  venue: 'Neo Química Arena',
  competition: 'Brasileirão',
  hasTickets: true,
};

describe('News Components', () => {
  describe('NextMatchCard', () => {
    it('renders team names', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText('Corinthians')).toBeDefined();
      expect(screen.getByText('Palmeiras')).toBeDefined();
    });

    it('renders competition name', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText('Brasileirão')).toBeDefined();
    });

    it('renders date and time', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText(/15 de março/)).toBeDefined();
      expect(screen.getByText(/20:00/)).toBeDefined();
    });

    it('renders venue', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText(/Neo Química Arena/)).toBeDefined();
    });

    it('renders "X" between team names', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText('X')).toBeDefined();
    });

    it('renders ticket link', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText('Ingressos')).toBeDefined();
    });

    it('renders round when provided', () => {
      render(<NextMatchCard {...mockMatch} round="Rodada 10" />);
      expect(screen.getByText('Rodada 10')).toBeDefined();
    });

    it('does not render round when not provided', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.queryByText(/Rodada/)).toBeNull();
    });

    it('renders team initials when no logo provided', () => {
      render(<NextMatchCard {...mockMatch} />);
      expect(screen.getByText('CO')).toBeDefined();
      expect(screen.getByText('PA')).toBeDefined();
    });

    it('renders team logos when provided', () => {
      render(
        <NextMatchCard
          {...mockMatch}
          homeTeamLogo="https://example.com/corinthians.png"
          awayTeamLogo="https://example.com/palmeiras.png"
        />
      );
      const imgs = screen.getAllByRole('img');
      expect(imgs.length).toBeGreaterThanOrEqual(2);
    });

    it('renders dot navigation when dots > 1', () => {
      const { container } = render(<NextMatchCard {...mockMatch} dots={3} activeDot={1} />);
      const dots = container.querySelectorAll('.rounded-full');
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  describe('NewsSortBar', () => {
    it('renders select with sort options', () => {
      render(<NewsSortBar currentSort="recent" />);
      expect(screen.getByText('Mais recentes')).toBeDefined();
      expect(screen.getByText('Mais antigas')).toBeDefined();
      expect(screen.getByText('Mais lidas')).toBeDefined();
      expect(screen.getByText('A — Z')).toBeDefined();
      expect(screen.getByText('Z — A')).toBeDefined();
    });

    it('sets defaultValue to currentSort', () => {
      render(<NewsSortBar currentSort="popular" />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('popular');
    });
  });
});
