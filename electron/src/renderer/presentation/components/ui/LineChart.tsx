interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  title?: string;
  showDots?: boolean;
  showGrid?: boolean;
}

export function LineChart({ data, color = '#bc000c', height = 200, title, showDots = true, showGrid = true }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const padding = 40;
  const chartWidth = 600;
  const chartHeight = height;
  const stepX = (chartWidth - padding * 2) / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: padding + i * stepX,
    y: chartHeight - (d.value / max) * (chartHeight - 20) - 10,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div>
      {title && <h3 className="font-headline text-label-sm font-bold text-on-surface mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="w-full" style={{ maxHeight: height + 50 }}>
          {/* Grid lines */}
          {showGrid && [0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line key={pct} x1={padding} y1={chartHeight - pct * (chartHeight - 20) - 10} x2={chartWidth - padding} y2={chartHeight - pct * (chartHeight - 20) - 10} stroke="#e4e2e2" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {/* Area fill */}
          <path d={areaD} fill={color} fillOpacity="0.1" />

          {/* Line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {showDots && points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
              <text x={p.x} y={p.y - 10} textAnchor="middle" className="fill-on-surface font-headline" fontSize="9" fontWeight="700">
                {data[i].value.toLocaleString()}
              </text>
            </g>
          ))}

          {/* X labels */}
          {data.map((d, i) => (
            <text key={i} x={padding + i * stepX} y={chartHeight + 20} textAnchor="middle" className="fill-on-surface-variant font-body" fontSize="9">
              {d.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
