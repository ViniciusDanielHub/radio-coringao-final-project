export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-6">
        <div className="h-3 w-24 animate-pulse bg-surface-variant rounded mb-4" />
        <div className="h-8 w-full animate-pulse bg-surface-variant rounded mb-2" />
        <div className="h-8 w-3/4 animate-pulse bg-surface-variant rounded mb-4" />
        <div className="flex gap-4">
          <div className="h-4 w-32 animate-pulse bg-surface-variant rounded" />
          <div className="h-4 w-24 animate-pulse bg-surface-variant rounded" />
        </div>
      </div>
      <div className="h-[400px] w-full animate-pulse bg-surface-variant rounded-lg mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse bg-surface-variant rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
        ))}
      </div>
    </div>
  );
}
