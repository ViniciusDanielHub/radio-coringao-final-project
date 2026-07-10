export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-container rounded ${className}`} />;
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead><tr className="border-b border-outline-variant">
          {Array.from({ length: cols }).map((_, i) => <th key={i} className="py-3 px-4"><Skeleton className="h-3 w-20" /></th>)}
        </tr></thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b border-outline-variant/30">
              {Array.from({ length: cols }).map((_, c) => <td key={c} className="py-3 px-4"><Skeleton className="h-4 w-full max-w-[120px]" /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CardGridSkeleton({ count = 8, cols = 4 }: { count?: number; cols?: number }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card"><Skeleton className="h-4 w-16 mb-2" /><Skeleton className="h-7 w-24" /></div>
        ))}
      </div>
      <div className="card space-y-3">
        <Skeleton className="h-5 w-32" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2"><Skeleton className="w-8 h-8 rounded-full" /><Skeleton className="w-11 h-11 rounded-xl" /><div className="flex-1 space-y-1.5"><Skeleton className="h-3.5 w-3/4" /><Skeleton className="h-2.5 w-1/3" /></div><Skeleton className="h-4 w-12" /></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="card"><Skeleton className="h-5 w-48 mb-3" /><Skeleton className="h-16 w-full" /></div>)}
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-1.5"><Skeleton className="h-7 w-48" /><Skeleton className="h-3 w-72" /></div>
      <Skeleton className="h-9 w-36 rounded-lg" />
    </div>
  );
}

export function StatsCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card flex items-start gap-3">
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
          <div className="space-y-1"><Skeleton className="h-3 w-16" /><Skeleton className="h-6 w-20" /></div>
        </div>
      ))}
    </div>
  );
}
