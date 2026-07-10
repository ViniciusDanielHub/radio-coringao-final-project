export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
  foundedYear?: number;
  stadium?: string;
  city?: string;
  website?: string;
}

export interface ClubeCategory {
  id: string;
  name: string;
  slug: string;
  gender: 'MALE' | 'FEMALE';
  modality: 'FOOTBALL' | 'FUTSAL' | 'BASKETBALL';
  isActive: boolean;
  order: number;
}

export interface Competition {
  id: string;
  name: string;
  season: string;
  categoryId: string;
  isActive: boolean;
  slug?: string;
  status?: string;
  isParticipating: boolean;
  eliminationMessage?: string;
  category?: { name: string; slug: string };
  standing?: StandingEntry[];
}

export interface Opponent {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
  stadium?: string;
  city?: string;
  foundedYear?: number;
}

export interface Match {
  id: string;
  competitionId: string;
  opponentId: string;
  date: string;
  venue?: string;
  isHome: boolean;
  status: 'SCHEDULED' | 'IN_PLAY' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  homeScore?: number;
  awayScore?: number;
  round?: string;
  homePossession?: number;
  awayPossession?: number;
  homeShots?: number;
  awayShots?: number;
  homeOnTarget?: number;
  awayOnTarget?: number;
  homeCorners?: number;
  awayCorners?: number;
  opponent?: { id: string; name: string; logoUrl?: string };
  competition?: { id: string; name: string; season: string; category?: { name: string; slug: string } };
}

export interface StandingEntry {
  id: string;
  competitionId: string;
  position: number;
  teamName: string;
  logoUrl?: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference?: number;
  isOwnTeam: boolean;
  form?: string;
  zone: 'NONE' | 'TITLE' | 'LIBERTADORES' | 'LIBERTADORES_PRELIMINARY' | 'SULAMERICANA' | 'RELEGATION';
}

export interface SquadMember {
  id: string;
  categoryId: string;
  name: string;
  position?: string;
  shirtNumber?: number;
  photoUrl?: string;
  birthDate?: string;
  isActive: boolean;
}

export interface PlayerMovement {
  id: string;
  squadMemberId: string;
  type: 'ARRIVAL' | 'DEPARTURE' | 'LOAN_OUT' | 'LOAN_IN' | 'RETURN';
  date: string;
  clubId?: string;
  notes?: string;
  valueCents?: number;
  currency?: string;
  squadMember?: { id: string; name: string; photoUrl?: string };
  club?: { id: string; name: string; logoUrl?: string };
}

export interface TransferClub {
  id: string;
  name: string;
  logoUrl?: string;
}
