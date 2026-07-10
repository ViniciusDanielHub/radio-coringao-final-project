import { MatchCardSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-stack-lg flex items-center gap-2">
        <div className="h-6 w-1 bg-surface-variant animate-pulse" />
        <div className="h-8 w-24 animate-pulse bg-surface-variant rounded" />
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        <MatchCardSkeleton />
        <div className="border border-outline-variant bg-surface-container-lowest p-6">
          <div className="h-4 w-32 animate-pulse bg-surface-variant rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-outline-variant last:border-0">
                <div className="h-8 w-8 animate-pulse bg-surface-variant rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-3/4 animate-pulse bg-surface-variant rounded" />
                  <div className="h-3 w-1/2 animate-pulse bg-surface-variant rounded" />
                </div>
                <div className="h-5 w-8 animate-pulse bg-surface-variant rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
