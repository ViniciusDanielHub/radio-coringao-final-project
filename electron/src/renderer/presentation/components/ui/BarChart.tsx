interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  title?: string;
}

export function BarChart({ data, maxValue, height = 200, showLabels = true, showValues = true, title }: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);
  const barWidth = Math.max(20, Math.min(40, 600 / data.length));
  const chartWidth = data.length * (barWidth + 8) + 40;
  const chartHeight = height + 40;

  return (
    <div>
      {title && <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ maxHeight: height + 60 }}>
          {data.map((d, i) => {
            const x = i * (barWidth + 8) + 20;
            const barH = (d.value / max) * height;
            const y = height - barH + 10;
            const color = d.color || '#bc000c';
            return (
              <g key={i}>
                <rect x={x} y={y} width={barWidth} height={barH} fill={color} rx={3} className="transition-all duration-300" />
                {showValues && (
                  <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" className="fill-on-surface font-headline" fontSize="10" fontWeight="700">
                    {d.value.toLocaleString()}
                  </text>
                )}
                {showLabels && (
                  <text x={x + barWidth / 2} y={height + 25} textAnchor="middle" className="fill-on-surface-variant font-body" fontSize="10">
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
