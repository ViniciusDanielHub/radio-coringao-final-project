export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-variant rounded ${className}`} />;
}

export function NewsCardSkeleton() {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-32 mt-3" />
      </div>
    </div>
  );
}

export function HeroCardSkeleton() {
  return (
    <div className="relative overflow-hidden border border-outline-variant bg-surface-container-lowest">
      <Skeleton className="h-[400px] w-full rounded-none" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 space-y-2">
        <Skeleton className="h-3 w-16 bg-white/20" />
        <Skeleton className="h-6 w-3/4 bg-white/30" />
        <Skeleton className="h-4 w-1/2 bg-white/20" />
      </div>
    </div>
  );
}

export function SidebarCardSkeleton() {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest overflow-hidden">
      <Skeleton className="h-32 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="divide-y divide-outline-variant">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6">
      <Skeleton className="h-3 w-24 mb-4" />
      <div className="flex items-center justify-center gap-8 py-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-16 w-16 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
        <Skeleton className="h-8 w-12" />
        <div className="text-center space-y-2">
          <Skeleton className="h-16 w-16 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222] p-8">
      <Skeleton className="h-8 w-48 bg-white/20 mb-3" />
      <Skeleton className="h-5 w-96 bg-white/10" />
    </div>
  );
}

export function ColumnistCardSkeleton() {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6">
      <Skeleton className="h-16 w-16 mb-4" />
      <Skeleton className="h-5 w-32 mb-2" />
      <Skeleton className="h-3 w-20 mb-4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full mt-1" />
      <Skeleton className="h-3 w-2/3 mt-1" />
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
