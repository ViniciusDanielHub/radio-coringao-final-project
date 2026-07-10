import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsApi } from '@/infrastructure/api/client';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface MonthData { month: string; published: number; review: number; }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs">
      <p className="font-bold text-sm mb-2 border-b border-white/20 pb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="font-bold ml-auto">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export function DashboardArticlesMonthPage() {
  const [data, setData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    newsApi.get('/admin/dashboard/articles-per-month?months=6')
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalPublished = data.reduce((sum, d) => sum + d.published, 0);
  const totalReview = data.reduce((sum, d) => sum + d.review, 0);
  const avgPublished = data.length ? Math.round(totalPublished / data.length) : 0;
  const maxPublished = Math.max(...data.map((d) => d.published), 0);

  const monthLabels: Record<string, string> = {
    '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
    '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
  };
  const formatted = data.map((d) => {
    const [y, m] = d.month.split('-');
    return { ...d, label: `${monthLabels[m] || m} ${y}` };
  });

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} className="p-2 rounded-xl hover:bg-surface-container-low transition-colors"><ArrowLeft size={18} /></button>
        <div>
          <h1 className="font-headline text-headline-md font-bold text-on-surface">Publicações por Mês</h1>
          <p className="text-sm text-on-surface-variant">Evolução nos últimos 6 meses</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Publicados', value: totalPublished, color: '#6366f1' },
          { label: 'Em Revisão', value: totalReview, color: '#f59e0b' },
          { label: 'Média/Mês', value: avgPublished, color: '#0891b2' },
        ].map((c) => (
          <div key={c.label} className="card text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">{c.label}</p>
            <p className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        {loading ? <p className="text-on-surface-variant py-12 text-center">Carregando...</p> : (
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={formatted} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradPub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={avgPublished} stroke="#0891b2" strokeDasharray="4 4" strokeOpacity={0.5} />
              <Area type="monotone" dataKey="published" name="Publicados" stroke="#6366f1" strokeWidth={3} fill="url(#gradPub)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }} />
              <Area type="monotone" dataKey="review" name="Revisão" stroke="#f59e0b" strokeWidth={2} fill="url(#gradRev)" dot={{ r: 3, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="card overflow-x-auto">
        <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3 flex items-center gap-2"><TrendingUp size={14} /> Detalhamento Mensal</h3>
        <table className="w-full">
          <thead><tr className="border-b border-outline-variant">
            <th className="text-left py-2 px-4 text-xs font-bold text-on-surface-variant">Mês</th>
            <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Publicados</th>
            <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Revisão</th>
            <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Total</th>
            <th className="text-right py-2 px-4 text-xs font-bold text-on-surface-variant">Barra</th>
          </tr></thead>
          <tbody>
            {formatted.map((d) => (
              <tr key={d.month} className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                <td className="py-2.5 px-4 text-sm font-bold text-on-surface">{d.label}</td>
                <td className="py-2.5 px-4 text-sm text-on-surface text-right font-bold">{d.published}</td>
                <td className="py-2.5 px-4 text-sm text-amber-600 text-right">{d.review}</td>
                <td className="py-2.5 px-4 text-sm font-bold text-on-surface text-right">{d.published + d.review}</td>
                <td className="py-2.5 px-4">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-indigo-500 transition-all" style={{ width: `${maxPublished ? (d.published / maxPublished) * 100 : 0}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
