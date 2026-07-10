import { GenericPage } from './GenericPage';

export function StandingsPage() {
  return (
    <GenericPage
      title="Classificações"
      apiBase="clube"
      apiPath="/admin/classificacoes"
      columns={[
        { key: 'position', label: '#' },
        { key: 'teamName', label: 'Time' },
        { key: 'points', label: 'PTS' },
        { key: 'played', label: 'J' },
        { key: 'won', label: 'V' },
        { key: 'drawn', label: 'E' },
        { key: 'lost', label: 'D' },
        { key: 'goalsFor', label: 'GP' },
        { key: 'goalsAgainst', label: 'GC' },
      ]}
      formFields={[
        { key: 'teamName', label: 'Time', required: true },
        { key: 'position', label: 'Posição', type: 'number', required: true },
        { key: 'points', label: 'Pontos', type: 'number' },
        { key: 'played', label: 'Jogos', type: 'number' },
        { key: 'won', label: 'Vitórias', type: 'number' },
        { key: 'drawn', label: 'Empates', type: 'number' },
        { key: 'lost', label: 'Derrotas', type: 'number' },
        { key: 'goalsFor', label: 'Gols Pró', type: 'number' },
        { key: 'goalsAgainst', label: 'Gols Contra', type: 'number' },
      ]}
    />
  );
}
