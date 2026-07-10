import type {
  Team, ClubeCategory, Competition, Opponent, Match,
  StandingEntry, SquadMember, PlayerMovement, TransferClub,
} from '../entities/clube';

export interface ClubeRepository {
  getTeam(): Promise<Team>;
  updateTeam(data: FormData): Promise<Team>;

  getCategories(): Promise<ClubeCategory[]>;
  createCategory(data: Partial<ClubeCategory>): Promise<ClubeCategory>;
  updateCategory(id: string, data: Partial<ClubeCategory>): Promise<ClubeCategory>;
  deleteCategory(id: string): Promise<void>;

  getCompetitions(categoryId?: string): Promise<Competition[]>;
  createCompetition(data: Partial<Competition>): Promise<Competition>;
  updateCompetition(id: string, data: Partial<Competition>): Promise<Competition>;
  deleteCompetition(id: string): Promise<void>;

  getOpponents(): Promise<Opponent[]>;
  createOpponent(data: FormData): Promise<Opponent>;
  updateOpponent(id: string, data: FormData): Promise<Opponent>;
  deleteOpponent(id: string): Promise<void>;

  getMatches(params?: { category?: string; status?: string; competitionId?: string }): Promise<Match[]>;
  createMatch(data: Partial<Match>): Promise<Match>;
  updateMatch(id: string, data: Partial<Match>): Promise<Match>;
  deleteMatch(id: string): Promise<void>;

  getStandings(competitionId: string): Promise<StandingEntry[]>;
  getStandingsByCategory(categorySlug: string): Promise<{ category: string; tables: { competition: Competition; standings: StandingEntry[] }[] }>;
  upsertStandings(competitionId: string, rows: Partial<StandingEntry>[]): Promise<void>;
  bulkStandings(competitionId: string, rows: Partial<StandingEntry>[]): Promise<void>;

  getSquad(category?: string): Promise<SquadMember[]>;
  createSquadMember(data: FormData): Promise<SquadMember>;
  updateSquadMember(id: string, data: FormData): Promise<SquadMember>;
  deleteSquadMember(id: string): Promise<void>;

  getMovements(params?: { type?: string; limit?: number }): Promise<PlayerMovement[]>;
  createMovement(data: Partial<PlayerMovement>): Promise<PlayerMovement>;
  updateMovement(id: string, data: Partial<PlayerMovement>): Promise<PlayerMovement>;
  deleteMovement(id: string): Promise<void>;

  getTransferClubs(): Promise<TransferClub[]>;
  createTransferClub(data: FormData): Promise<TransferClub>;
  updateTransferClub(id: string, data: FormData): Promise<TransferClub>;
  deleteTransferClub(id: string): Promise<void>;
}
