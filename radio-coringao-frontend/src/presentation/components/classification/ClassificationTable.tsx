"use client";

interface TeamEntry {
  pos: number;
  name: string;
  pts: number;
}

const teams: TeamEntry[] = [
  { pos: 1, name: "Corinthians", pts: 42 },
  { pos: 2, name: "Palmeiras", pts: 40 },
  { pos: 3, name: "Flamengo", pts: 38 },
  { pos: 4, name: "Botafogo", pts: 37 },
  { pos: 5, name: "São Paulo", pts: 35 },
  { pos: 6, name: "Grêmio", pts: 33 },
  { pos: 7, name: "Internacional", pts: 32 },
  { pos: 8, name: "Bahia", pts: 31 },
  { pos: 9, name: "Cruzeiro", pts: 30 },
  { pos: 10, name: "Santos", pts: 29 },
  { pos: 11, name: "Fluminense", pts: 28 },
  { pos: 12, name: "Athletico-PR", pts: 27 },
  { pos: 13, name: "Vasco", pts: 26 },
  { pos: 14, name: "Fortaleza", pts: 25 },
  { pos: 15, name: "Juventude", pts: 24 },
  { pos: 16, name: "Ceará", pts: 23 },
  { pos: 17, name: "Vitória", pts: 22 },
  { pos: 18, name: "Criciúma", pts: 20 },
  { pos: 19, name: "Atlético-GO", pts: 18 },
  { pos: 20, name: "Sport", pts: 16 },
];

function getBarColor(pos: number): string {
  if (pos <= 4) return "#1565C0";
  if (pos === 5) return "#E65100";
  if (pos <= 12) return "#2e7d32";
  if (pos >= 18) return "#b71c1c";
  return "transparent";
}

export function ClassificationTable() {
  return (
    <div className="overflow-x-auto border border-outline-variant">
      <table className="w-full min-w-[700px] text-left">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="w-10 px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">#</th>
            <th className="px-3 py-3 font-label-sm text-label-sm uppercase text-on-surface-variant">Clube</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm font-bold uppercase text-primary">P</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">PJ</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">VIT</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">E</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">DER</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">GM</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">GC</th>
            <th className="px-3 py-3 text-center font-label-sm text-label-sm uppercase text-on-surface-variant">SG</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr
              key={team.pos}
              className="border-b border-surface-variant transition-colors hover:bg-[#ffffff10]"
            >
              <td className="relative px-3 py-3 text-center">
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: getBarColor(team.pos) }}
                />
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {team.pos}
                </span>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 shrink-0 rounded-full"
                    style={{ backgroundColor: getBarColor(team.pos) }}
                  />
                  <span className="font-body-md text-body-md font-medium text-on-surface">
                    {team.name}
                  </span>
                </div>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="font-headline-md text-headline-md font-bold text-primary">
                  {team.pts}
                </span>
              </td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">20</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">13</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">3</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">4</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">35</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">16</td>
              <td className="px-3 py-3 text-center font-body-md text-body-md text-on-surface-variant">19</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
