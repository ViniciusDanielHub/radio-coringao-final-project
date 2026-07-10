import { useEffect, useState } from 'react';
import { clubeApi } from '@/infrastructure/api/client';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function formatBRL(cents: string | number): string {
  const value = Number(cents) / 100;
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function pctChange(a: number, b: number): number | null {
  if (a === 0 && b === 0) return null;
  if (a === 0) return 100;
  return Math.round(((b - a) / Math.abs(a)) * 100);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs">
      <p className="font-bold text-sm mb-2 border-b border-white/20 pb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="font-bold ml-auto">{formatBRL(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

interface MonthSummary {
  incomeCents: string;
  expenseCents: string;
  balanceCents: string;
  movementsCount: number;
  biggestSale: { player: string; club: string | null; valueCents: string } | null;
  biggestPurchase: { player: string; club: string | null; valueCents: string } | null;
}

interface EvolutionRow {
  month: string;
  incomeCents: string;
  expenseCents: string;
  balanceCents: string;
  movementsCount: number;
}

interface ClubRankingRow {
  clubName: string;
  logoUrl: string | null;
  soldToCents: string;
  boughtFromCents: string;
  totalCents: string;
  movementsCount: number;
}

const monthLabels: Record<string, string> = {
  '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
  '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
};

export function FinancePage() {
  const [summary, setSummary] = useState<MonthSummary | null>(null);
  const [evolution, setEvolution] = useState<EvolutionRow[]>([]);
  const [ranking, setRanking] = useState<ClubRankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    Promise.all([
      clubeApi.get(`/admin/finance/month?month=${month}&season=${selectedSeason}`),
      clubeApi.get(`/admin/finance/evolution?months=12&season=${selectedSeason}`),
      clubeApi.get(`/admin/finance/club-ranking?season=${selectedSeason}`),
    ])
      .then(([s, e, r]) => {
        setSummary(s);
        setEvolution(Array.isArray(e) ? e : []);
        setRanking(Array.isArray(r) ? r : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedSeason]);

  if (loading) return <div className="card"><p className="text-on-surface-variant py-12 text-center">Carregando dados financeiros...</p></div>;
  if (error) return <div className="card border-red-200"><p className="text-red-500 py-12 text-center">{error}</p></div>;

  const income = Number(summary?.incomeCents ?? 0);
  const expense = Number(summary?.expenseCents ?? 0);
  const balance = Number(summary?.balanceCents ?? 0);

  const chartData = evolution.map((e) => {
    const [y, m] = e.month.split('-');
    return { ...e, label: `${monthLabels[m] || m} ${y}` };
  });

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-headline-md font-bold text-on-surface">Financeiro</h1>
        <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm font-bold text-on-surface outline-none focus:border-primary">
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={String(y)}>Temporada {y}</option>
          ))}
        </select>
      </div>

      {/* Resumo do mês */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Receitas do Mês', value: income, icon: <TrendingUp size={18} />, color: '#22c55e', positive: true },
          { label: 'Despesas do Mês', value: expense, icon: <TrendingDown size={18} />, color: '#ef4444', positive: false },
          { label: 'Saldo', value: balance, icon: <DollarSign size={18} />, color: balance >= 0 ? '#22c55e' : '#ef4444', positive: balance >= 0 },
        ].map((c) => (
          <div key={c.label} className="card flex items-start gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: c.color + '15', color: c.color }}>{c.icon}</div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">{c.label}</p>
              <p className="text-lg font-bold" style={{ color: c.color }}>{formatBRL(c.value)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Movimentações', value: summary?.movementsCount ?? 0 },
          { label: 'Maior Venda', value: summary?.biggestSale ? formatBRL(summary.biggestSale.valueCents) : '—' },
          { label: 'Maior Compra', value: summary?.biggestPurchase ? formatBRL(summary.biggestPurchase.valueCents) : '—' },
          { label: 'Clubes Envolvidos', value: ranking.length },
        ].map((c) => (
          <div key={c.label} className="card text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">{c.label}</p>
            <p className="text-sm font-bold text-on-surface mt-1">{typeof c.value === 'number' ? c.value.toLocaleString() : c.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de evolução */}
      {chartData.length > 0 && (
        <div className="card">
          <h3 className="font-headline text-label-sm font-bold text-on-surface mb-4 flex items-center gap-2">
            <BarChart3 size={14} /> Evolução — Últimos 6 meses
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 100).toFixed(0)}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="incomeCents" name="Receitas" stroke="#22c55e" strokeWidth={2} fill="url(#gradIncome)" dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} />
              <Area type="monotone" dataKey="expenseCents" name="Despesas" stroke="#ef4444" strokeWidth={2} fill="url(#gradExpense)" dot={{ r: 3, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Ranking por clube */}
      {ranking.length > 0 && (
        <div className="card">
          <h3 className="font-headline text-label-sm font-bold text-on-surface mb-4 flex items-center gap-2">
            <ArrowUpRight size={14} /> Ranking por Clube de Transferência
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left py-2 px-4 text-xs font-bold text-on-surface-variant">#</th>
                  <th className="text-left py-2 px-4 text-xs font-bold text-on-surface-variant">Clube</th>
                  <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Vendas</th>
                  <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Compras</th>
                  <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Total</th>
                  <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Mov.</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r, i) => (
                  <tr key={r.clubName} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-2.5 px-4 text-sm font-bold text-on-surface">{i + 1}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        {r.logoUrl ? <img src={r.logoUrl} alt="" className="w-6 h-6 rounded-full object-cover" /> : <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant">{r.clubName.charAt(0)}</div>}
                        <span className="text-sm font-bold text-on-surface">{r.clubName}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-sm text-green-600 text-right font-bold">{formatBRL(r.soldToCents)}</td>
                    <td className="py-2.5 px-4 text-sm text-red-500 text-right font-bold">{formatBRL(r.boughtFromCents)}</td>
                    <td className="py-2.5 px-4 text-sm font-bold text-on-surface text-right">{formatBRL(r.totalCents)}</td>
                    <td className="py-2.5 px-4 text-sm text-on-surface-variant text-right">{r.movementsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Maiores operações */}
      {(summary?.biggestSale || summary?.biggestPurchase) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {summary?.biggestSale && (
            <div className="card">
              <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <ArrowUpRight size={14} className="text-green-600" /> Maior Venda
              </h3>
              <p className="text-sm font-bold text-on-surface">{summary.biggestSale.player}</p>
              {summary.biggestSale.club && <p className="text-xs text-on-surface-variant">para {summary.biggestSale.club}</p>}
              <p className="text-lg font-bold text-green-600 mt-2">{formatBRL(summary.biggestSale.valueCents)}</p>
            </div>
          )}
          {summary?.biggestPurchase && (
            <div className="card">
              <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <ArrowDownRight size={14} className="text-red-500" /> Maior Compra
              </h3>
              <p className="text-sm font-bold text-on-surface">{summary.biggestPurchase.player}</p>
              {summary.biggestPurchase.club && <p className="text-xs text-on-surface-variant">de {summary.biggestPurchase.club}</p>}
              <p className="text-lg font-bold text-red-500 mt-2">{formatBRL(summary.biggestPurchase.valueCents)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
