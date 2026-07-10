import type { ClubeRepository } from '@/domain/repositories/clube-repository';
import type { Team, ClubeCategory, Competition, Opponent, Match, StandingEntry, SquadMember, PlayerMovement, TransferClub } from '@/domain/entities/clube';
import { mockTeam, mockClubeCategories, mockCompetitions, mockOpponents, mockMatches, mockStandings, mockSquad, mockMovements, mockTransferClubs } from '../mock/clube-mock';

let team = { ...mockTeam };
let categories = [...mockClubeCategories];
let competitions = [...mockCompetitions];
let opponents = [...mockOpponents];
let matches = [...mockMatches];
let standings = [...mockStandings];
let squad = [...mockSquad];
let movements = [...mockMovements];
let transferClubs = [...mockTransferClubs];
let nextId = 100;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export class MockClubeRepository implements ClubeRepository {
  async getTeam(): Promise<Team> { await delay(); return team; }
  async updateTeam(data: FormData): Promise<Team> { await delay(); team = { ...team, name: String(data.get('name') || team.name) }; return team; }

  async getCategories(): Promise<ClubeCategory[]> { await delay(); return categories; }
  async createCategory(data: Partial<ClubeCategory>): Promise<ClubeCategory> {
    await delay();
    const cat: ClubeCategory = { id: String(++nextId), name: data.name || '', slug: data.name?.toLowerCase().replace(/\s+/g, '-') || '', gender: data.gender || 'MALE', modality: data.modality || 'FOOTBALL', isActive: true, order: data.order || 0 };
    categories.push(cat);
    return cat;
  }
  async updateCategory(id: string, data: Partial<ClubeCategory>): Promise<ClubeCategory> {
    await delay();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx >= 0) categories[idx] = { ...categories[idx], ...data };
    return categories[idx];
  }
  async deleteCategory(id: string): Promise<void> { await delay(); categories = categories.filter((c) => c.id !== id); }

  async getCompetitions(categoryId?: string): Promise<Competition[]> {
    await delay();
    return categoryId ? competitions.filter((c) => c.categoryId === categoryId) : competitions;
  }
  async createCompetition(data: Partial<Competition>): Promise<Competition> {
    await delay();
    const comp: Competition = { id: String(++nextId), name: data.name || '', season: data.season || '2026', categoryId: data.categoryId || '', isActive: true, isParticipating: true, ...data };
    competitions.push(comp);
    return comp;
  }
  async updateCompetition(id: string, data: Partial<Competition>): Promise<Competition> {
    await delay();
    const idx = competitions.findIndex((c) => c.id === id);
    if (idx >= 0) competitions[idx] = { ...competitions[idx], ...data };
    return competitions[idx];
  }
  async deleteCompetition(id: string): Promise<void> { await delay(); competitions = competitions.filter((c) => c.id !== id); }

  async getOpponents(): Promise<Opponent[]> { await delay(); return opponents; }
  async createOpponent(data: FormData): Promise<Opponent> {
    await delay();
    const opp: Opponent = { id: String(++nextId), name: String(data.get('name') || '') };
    opponents.push(opp);
    return opp;
  }
  async updateOpponent(id: string, data: FormData): Promise<Opponent> {
    await delay();
    const idx = opponents.findIndex((o) => o.id === id);
    if (idx >= 0) opponents[idx] = { ...opponents[idx], name: String(data.get('name') || opponents[idx].name) };
    return opponents[idx];
  }
  async deleteOpponent(id: string): Promise<void> { await delay(); opponents = opponents.filter((o) => o.id !== id); }

  async getMatches(params?: { category?: string; status?: string; competitionId?: string }): Promise<Match[]> {
    await delay();
    let filtered = [...matches];
    if (params?.status) filtered = filtered.filter((m) => m.status === params.status);
    if (params?.competitionId) filtered = filtered.filter((m) => m.competitionId === params.competitionId);
    return filtered;
  }
  async createMatch(data: Partial<Match>): Promise<Match> {
    await delay();
    const match: Match = { id: String(++nextId), competitionId: data.competitionId || '', opponentId: data.opponentId || '', date: data.date || new Date().toISOString(), isHome: data.isHome ?? true, status: data.status || 'SCHEDULED', ...data };
    matches.push(match);
    return match;
  }
  async updateMatch(id: string, data: Partial<Match>): Promise<Match> {
    await delay();
    const idx = matches.findIndex((m) => m.id === id);
    if (idx >= 0) matches[idx] = { ...matches[idx], ...data };
    return matches[idx];
  }
  async deleteMatch(id: string): Promise<void> { await delay(); matches = matches.filter((m) => m.id !== id); }

  async getStandings(competitionId: string): Promise<StandingEntry[]> { await delay(); return standings.filter((s) => s.competitionId === competitionId); }
  async getStandingsByCategory(categorySlug: string): Promise<any> { await delay(); return { category: categorySlug, tables: [] }; }
  async upsertStandings(competitionId: string, rows: Partial<StandingEntry>[]): Promise<void> { await delay(); }
  async bulkStandings(competitionId: string, rows: Partial<StandingEntry>[]): Promise<void> { await delay(); }

  async getSquad(category?: string): Promise<SquadMember[]> {
    await delay();
    return category ? squad.filter((s) => { const cat = categories.find((c) => c.id === s.categoryId); return cat?.slug === category; }) : squad;
  }
  async createSquadMember(data: FormData): Promise<SquadMember> {
    await delay();
    const member: SquadMember = { id: String(++nextId), categoryId: String(data.get('categoryId') || ''), name: String(data.get('name') || ''), isActive: true };
    squad.push(member);
    return member;
  }
  async updateSquadMember(id: string, data: FormData): Promise<SquadMember> {
    await delay();
    const idx = squad.findIndex((s) => s.id === id);
    if (idx >= 0) squad[idx] = { ...squad[idx], name: String(data.get('name') || squad[idx].name) };
    return squad[idx];
  }
  async deleteSquadMember(id: string): Promise<void> { await delay(); squad = squad.filter((s) => s.id !== id); }

  async getMovements(params?: { type?: string; limit?: number }): Promise<PlayerMovement[]> {
    await delay();
    let filtered = [...movements];
    if (params?.type) filtered = filtered.filter((m) => m.type === params.type);
    return params?.limit ? filtered.slice(0, params.limit) : filtered;
  }
  async createMovement(data: Partial<PlayerMovement>): Promise<PlayerMovement> {
    await delay();
    const mov: PlayerMovement = { id: String(++nextId), squadMemberId: data.squadMemberId || '', type: data.type || 'ARRIVAL', date: data.date || new Date().toISOString(), ...data };
    movements.push(mov);
    return mov;
  }
  async updateMovement(id: string, data: Partial<PlayerMovement>): Promise<PlayerMovement> {
    await delay();
    const idx = movements.findIndex((m) => m.id === id);
    if (idx >= 0) movements[idx] = { ...movements[idx], ...data };
    return movements[idx];
  }
  async deleteMovement(id: string): Promise<void> { await delay(); movements = movements.filter((m) => m.id !== id); }

  async getTransferClubs(): Promise<TransferClub[]> { await delay(); return transferClubs; }
  async createTransferClub(data: FormData): Promise<TransferClub> {
    await delay();
    const club: TransferClub = { id: String(++nextId), name: String(data.get('name') || '') };
    transferClubs.push(club);
    return club;
  }
  async updateTransferClub(id: string, data: FormData): Promise<TransferClub> {
    await delay();
    const idx = transferClubs.findIndex((c) => c.id === id);
    if (idx >= 0) transferClubs[idx] = { ...transferClubs[idx], name: String(data.get('name') || transferClubs[idx].name) };
    return transferClubs[idx];
  }
  async deleteTransferClub(id: string): Promise<void> { await delay(); transferClubs = transferClubs.filter((c) => c.id !== id); }
}
