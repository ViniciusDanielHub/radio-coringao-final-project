interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  title?: string;
}

export function DonutChart({ data, size = 180, title }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = size / 2 - 10;
  const innerRadius = radius * 0.6;
  let cumulative = 0;

  const segments = data.map((d) => {
    const startAngle = (cumulative / total) * 360;
    const sweepAngle = (d.value / total) * 360;
    cumulative += d.value;
    return { ...d, startAngle, sweepAngle };
  });

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div>
      {title && <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3">{title}</h3>}
      <div className="flex items-center gap-6">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((s, i) => (
            <path key={i} d={describeArc(size / 2, size / 2, radius, s.startAngle, s.startAngle + s.sweepAngle)} fill="none" stroke={s.color} strokeWidth={radius - innerRadius} strokeLinecap="butt" />
          ))}
          <text x={size / 2} y={size / 2 - 5} textAnchor="middle" className="fill-on-surface font-headline" fontSize="22" fontWeight="800">
            {total}
          </text>
          <text x={size / 2} y={size / 2 + 12} textAnchor="middle" className="fill-on-surface-variant font-body" fontSize="10">
            artigos
          </text>
        </svg>
        <div className="flex flex-col gap-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="font-body text-xs text-on-surface-variant">{d.label}</span>
              <span className="font-headline text-xs font-bold text-on-surface">{d.value}</span>
              <span className="font-body text-xs text-on-surface-variant/60">({((d.value / total) * 100).toFixed(0)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
