import { describe, it, expect, beforeEach } from 'vitest';
import { useNavStore } from '@/presentation/stores/navStore';

describe('NavStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    useNavStore.setState({
      activeCategory: 'noticias',
      isMobileMenuOpen: false,
    });
  });

  it('has correct initial state', () => {
    const state = useNavStore.getState();
    expect(state.activeCategory).toBe('noticias');
    expect(state.isMobileMenuOpen).toBe(false);
  });

  describe('setActiveCategory', () => {
    it('updates active category', () => {
      useNavStore.getState().setActiveCategory('futebol');
      expect(useNavStore.getState().activeCategory).toBe('futebol');
    });

    it('can be set multiple times', () => {
      useNavStore.getState().setActiveCategory('futebol');
      useNavStore.getState().setActiveCategory('basquete');
      expect(useNavStore.getState().activeCategory).toBe('basquete');
    });
  });

  describe('toggleMobileMenu', () => {
    it('toggles from false to true', () => {
      expect(useNavStore.getState().isMobileMenuOpen).toBe(false);
      useNavStore.getState().toggleMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(true);
    });

    it('toggles from true to false', () => {
      useNavStore.getState().toggleMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(true);
      useNavStore.getState().toggleMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(false);
    });

    it('can toggle multiple times', () => {
      useNavStore.getState().toggleMobileMenu();
      useNavStore.getState().toggleMobileMenu();
      useNavStore.getState().toggleMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(true);
    });
  });

  describe('closeMobileMenu', () => {
    it('closes mobile menu', () => {
      useNavStore.getState().toggleMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(true);
      useNavStore.getState().closeMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(false);
    });

    it('is idempotent when already closed', () => {
      useNavStore.getState().closeMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(false);
      useNavStore.getState().closeMobileMenu();
      expect(useNavStore.getState().isMobileMenuOpen).toBe(false);
    });
  });

  describe('independence of actions', () => {
    it('setActiveCategory does not affect isMobileMenuOpen', () => {
      useNavStore.getState().toggleMobileMenu();
      useNavStore.getState().setActiveCategory('basquete');
      expect(useNavStore.getState().isMobileMenuOpen).toBe(true);
      expect(useNavStore.getState().activeCategory).toBe('basquete');
    });
  });
});
