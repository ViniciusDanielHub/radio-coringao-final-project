import type { Team, ClubeCategory, Competition, Opponent, Match, StandingEntry, SquadMember, PlayerMovement, TransferClub } from '@/domain/entities/clube';

export const mockTeam: Team = {
  id: 'main', name: 'Sport Club Corinthians Paulista', shortName: 'Corinthians',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWKBx2Dj0ezWpowT-GAX-hfEtbPH1X8D66r6ZhSLqsnt_vyY9yjCXHRwWeFxRmm8iGUbnQ06Lrl3Iv3kldrJXnAqiDKrM156wrrnKwh-UQj-KUl3XzGntd1-5kJXKa4Mhk5d15JWrCZHxOW_EM3rX4JfLvSaaD_LZj-FbVIetGcH6EHT--LOJohLMFKAvbl2tMAQYti3oZVyVMiPBFhI0JDL5TLkQNr8ASfBxTghUckcBEch0Bpoh12A7Lj9UgLzl-xdga3p4BtBg',
  stadium: 'Neo Química Arena', city: 'São Paulo',
};

export const mockClubeCategories: ClubeCategory[] = [
  { id: '1', name: 'Futebol Masculino', slug: 'futebol', gender: 'MALE', modality: 'FOOTBALL', isActive: true, order: 1 },
  { id: '2', name: 'Futebol Feminino', slug: 'feminino', gender: 'FEMALE', modality: 'FOOTBALL', isActive: true, order: 2 },
  { id: '3', name: 'Basquete', slug: 'basquete', gender: 'MALE', modality: 'BASKETBALL', isActive: true, order: 3 },
  { id: '4', name: 'Futsal', slug: 'futsal', gender: 'MALE', modality: 'FUTSAL', isActive: true, order: 4 },
  { id: '5', name: 'Sub-20', slug: 'sub-20', gender: 'MALE', modality: 'FOOTBALL', isActive: true, order: 5 },
  { id: '6', name: 'Sub-17', slug: 'sub-17', gender: 'MALE', modality: 'FOOTBALL', isActive: true, order: 6 },
];

export const mockCompetitions: Competition[] = [
  // Futebol Masculino
  { id: '1', name: 'Brasileirão Série A', season: '2026', categoryId: '1', isActive: true, status: 'Em andamento', isParticipating: true },
  { id: '2', name: 'Libertadores', season: '2026', categoryId: '1', isActive: true, status: 'Fase de Grupos', isParticipating: true },
  { id: '3', name: 'Copa do Brasil', season: '2026', categoryId: '1', isActive: true, status: 'Oitavas de Final', isParticipating: true },
  { id: '4', name: 'Paulistão', season: '2026', categoryId: '1', isActive: true, status: 'Campeão', isParticipating: true },
  // Futebol Feminino
  { id: '5', name: 'Brasileirão Feminino', season: '2026', categoryId: '2', isActive: true, status: 'Em andamento', isParticipating: true },
  { id: '6', name: 'Libertadores Feminina', season: '2026', categoryId: '2', isActive: true, status: 'Fase de Grupos', isParticipating: true },
  { id: '7', name: 'Paulistão Feminino', season: '2026', categoryId: '2', isActive: true, status: 'Em andamento', isParticipating: true },
  // Basquete
  { id: '8', name: 'NBB', season: '2025/26', categoryId: '3', isActive: true, status: 'Em andamento', isParticipating: true },
  // Futsal
  { id: '9', name: 'Paulistão de Futsal', season: '2026', categoryId: '4', isActive: true, status: 'Em andamento', isParticipating: true },
  // Sub-20
  { id: '10', name: 'Paulistão Sub-20', season: '2026', categoryId: '5', isActive: true, status: 'Em andamento', isParticipating: true },
  // Sub-17
  { id: '11', name: 'Paulistão Sub-17', season: '2026', categoryId: '6', isActive: true, status: 'Em andamento', isParticipating: true },
];

export const mockOpponents: Opponent[] = [
  { id: '1', name: 'Palmeiras' }, { id: '2', name: 'São Paulo' },
  { id: '3', name: 'Flamengo' }, { id: '4', name: 'Santos' },
  { id: '5', name: 'Grêmio' }, { id: '6', name: 'Botafogo' },
];

export const mockMatches: Match[] = [
  { id: '1', competitionId: '1', opponentId: '4', date: '2026-06-22T19:00:00Z', venue: 'Neo Química Arena', isHome: true, status: 'FINISHED', homeScore: 2, awayScore: 1, round: 'Rodada 20', homePossession: 58, awayPossession: 42, homeShots: 15, awayShots: 8, homeOnTarget: 7, awayOnTarget: 3, homeCorners: 8, awayCorners: 3 },
  { id: '2', competitionId: '1', opponentId: '1', date: '2026-06-29T16:00:00Z', venue: 'Neo Química Arena', isHome: true, status: 'SCHEDULED', round: 'Rodada 21' },
  { id: '3', competitionId: '1', opponentId: '3', date: '2026-07-02T21:30:00Z', venue: 'Maracanã', isHome: false, status: 'SCHEDULED', round: 'Rodada 22' },
];

const LOGO = 'https://img.icons8.com/color/96/football2.png';

export const mockStandings: StandingEntry[] = [
  // Brasileirão Série A (competitionId: 1)
  { id: '1', competitionId: '1', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 42, played: 20, won: 13, drawn: 3, lost: 4, goalsFor: 35, goalsAgainst: 16, isOwnTeam: true, zone: 'LIBERTADORES' },
  { id: '2', competitionId: '1', position: 2, teamName: 'Palmeiras', logoUrl: LOGO, points: 40, played: 20, won: 12, drawn: 4, lost: 4, goalsFor: 32, goalsAgainst: 14, isOwnTeam: false, zone: 'LIBERTADORES' },
  { id: '3', competitionId: '1', position: 3, teamName: 'Flamengo', logoUrl: LOGO, points: 38, played: 20, won: 11, drawn: 5, lost: 4, goalsFor: 30, goalsAgainst: 15, isOwnTeam: false, zone: 'LIBERTADORES' },
  { id: '4', competitionId: '1', position: 4, teamName: 'Botafogo', logoUrl: LOGO, points: 37, played: 20, won: 11, drawn: 4, lost: 5, goalsFor: 28, goalsAgainst: 17, isOwnTeam: false, zone: 'LIBERTADORES' },
  { id: '5', competitionId: '1', position: 5, teamName: 'São Paulo', logoUrl: LOGO, points: 35, played: 20, won: 10, drawn: 5, lost: 5, goalsFor: 26, goalsAgainst: 18, isOwnTeam: false, zone: 'LIBERTADORES_PRELIMINARY' },
  // Libertadores (competitionId: 2)
  { id: '6', competitionId: '2', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 12, played: 6, won: 4, drawn: 0, lost: 2, goalsFor: 12, goalsAgainst: 6, isOwnTeam: true, zone: 'NONE' },
  { id: '7', competitionId: '2', position: 2, teamName: 'River Plate', logoUrl: LOGO, points: 10, played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 10, goalsAgainst: 8, isOwnTeam: false, zone: 'NONE' },
  { id: '8', competitionId: '2', position: 3, teamName: 'Emelec', logoUrl: LOGO, points: 7, played: 6, won: 2, drawn: 1, lost: 3, goalsFor: 8, goalsAgainst: 10, isOwnTeam: false, zone: 'NONE' },
  { id: '9', competitionId: '2', position: 4, teamName: 'Always Ready', logoUrl: LOGO, points: 4, played: 6, won: 1, drawn: 1, lost: 4, goalsFor: 5, goalsAgainst: 11, isOwnTeam: false, zone: 'NONE' },
  // Brasileirão Feminino (competitionId: 5)
  { id: '10', competitionId: '5', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 28, played: 12, won: 9, drawn: 1, lost: 2, goalsFor: 26, goalsAgainst: 8, isOwnTeam: true, zone: 'NONE' },
  { id: '11', competitionId: '5', position: 2, teamName: 'Palmeiras', logoUrl: LOGO, points: 25, played: 12, won: 8, drawn: 1, lost: 3, goalsFor: 22, goalsAgainst: 10, isOwnTeam: false, zone: 'NONE' },
  { id: '12', competitionId: '5', position: 3, teamName: 'São Paulo', logoUrl: LOGO, points: 22, played: 12, won: 7, drawn: 1, lost: 4, goalsFor: 20, goalsAgainst: 14, isOwnTeam: false, zone: 'NONE' },
  // Libertadores Feminina (competitionId: 6)
  { id: '13', competitionId: '6', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 18, played: 6, won: 6, drawn: 0, lost: 0, goalsFor: 18, goalsAgainst: 4, isOwnTeam: true, zone: 'NONE' },
  { id: '14', competitionId: '6', position: 2, teamName: 'River Plate', logoUrl: LOGO, points: 12, played: 6, won: 4, drawn: 0, lost: 2, goalsFor: 12, goalsAgainst: 8, isOwnTeam: false, zone: 'NONE' },
  // NBB (competitionId: 8)
  { id: '15', competitionId: '8', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 28, played: 15, won: 14, drawn: 0, lost: 1, goalsFor: 1250, goalsAgainst: 1100, isOwnTeam: true, zone: 'NONE' },
  { id: '16', competitionId: '8', position: 2, teamName: 'Flamengo', logoUrl: LOGO, points: 26, played: 15, won: 13, drawn: 0, lost: 2, goalsFor: 1200, goalsAgainst: 1080, isOwnTeam: false, zone: 'NONE' },
  { id: '17', competitionId: '8', position: 3, teamName: 'Franca', logoUrl: LOGO, points: 24, played: 15, won: 12, drawn: 0, lost: 3, goalsFor: 1180, goalsAgainst: 1120, isOwnTeam: false, zone: 'NONE' },
  // Paulistão Futsal (competitionId: 9)
  { id: '18', competitionId: '9', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 22, played: 10, won: 7, drawn: 1, lost: 2, goalsFor: 35, goalsAgainst: 18, isOwnTeam: true, zone: 'NONE' },
  { id: '19', competitionId: '9', position: 2, teamName: 'Carlos Drummond', logoUrl: LOGO, points: 20, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 30, goalsAgainst: 20, isOwnTeam: false, zone: 'NONE' },
  // Paulistão Sub-20 (competitionId: 10)
  { id: '20', competitionId: '10', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 22, played: 8, won: 7, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 5, isOwnTeam: true, zone: 'NONE' },
  { id: '21', competitionId: '10', position: 2, teamName: 'Palmeiras', logoUrl: LOGO, points: 18, played: 8, won: 5, drawn: 3, lost: 0, goalsFor: 14, goalsAgainst: 7, isOwnTeam: false, zone: 'NONE' },
  // Paulistão Sub-17 (competitionId: 11)
  { id: '22', competitionId: '11', position: 1, teamName: 'Corinthians', logoUrl: LOGO, points: 25, played: 9, won: 8, drawn: 1, lost: 0, goalsFor: 22, goalsAgainst: 6, isOwnTeam: true, zone: 'NONE' },
  { id: '23', competitionId: '11', position: 2, teamName: 'Palmeiras', logoUrl: LOGO, points: 20, played: 9, won: 6, drawn: 2, lost: 1, goalsFor: 16, goalsAgainst: 8, isOwnTeam: false, zone: 'NONE' },
];

export const mockSquad: SquadMember[] = [
  { id: '1', categoryId: '1', name: 'Cássio', position: 'Goleiro', shirtNumber: 12, isActive: true },
  { id: '2', categoryId: '1', name: 'Fagner', position: 'Lateral Direito', shirtNumber: 23, isActive: true },
  { id: '3', categoryId: '1', name: 'Gil', position: 'Zagueiro', shirtNumber: 4, isActive: true },
  { id: '4', categoryId: '1', name: 'Garro', position: 'Meia', shirtNumber: 10, isActive: true },
  { id: '5', categoryId: '1', name: 'Yuri Alberto', position: 'Centroavante', shirtNumber: 9, isActive: true },
];

export const mockMovements: PlayerMovement[] = [
  { id: '1', squadMemberId: '4', type: 'ARRIVAL', date: '2026-01-15T00:00:00Z', squadMember: { id: '4', name: 'Garro' }, club: { id: '1', name: 'Argentinos Juniors' } },
  { id: '2', squadMemberId: '5', type: 'ARRIVAL', date: '2026-02-01T00:00:00Z', squadMember: { id: '5', name: 'Yuri Alberto' } },
];

export const mockTransferClubs: TransferClub[] = [
  { id: '1', name: 'Argentinos Juniors' },
  { id: '2', name: 'Vasco' },
  { id: '3', name: 'Zenit' },
  { id: '4', name: 'Boca Juniors' },
];
