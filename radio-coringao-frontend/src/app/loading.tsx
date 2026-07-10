import { HeroCardSkeleton, SidebarCardSkeleton, NewsCardSkeleton, MatchCardSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      {/* Hero + Sidebar */}
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[1fr_350px]">
        <div className="space-y-gutter">
          <HeroCardSkeleton />
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => <NewsCardSkeleton key={i} />)}
          </div>
        </div>
        <div className="space-y-gutter">
          <div className="border border-outline-variant bg-surface-container-lowest p-4">
            <div className="h-4 w-32 animate-pulse bg-surface-variant rounded mb-4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-outline-variant last:border-0">
                <div className="h-5 w-5 animate-pulse bg-surface-variant rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-full animate-pulse bg-surface-variant rounded" />
                  <div className="h-3 w-2/3 animate-pulse bg-surface-variant rounded" />
                </div>
              </div>
            ))}
          </div>
          {Array.from({ length: 2 }).map((_, i) => <SidebarCardSkeleton key={i} />)}
        </div>
      </div>

      {/* Matches */}
      <div className="mt-stack-lg">
        <div className="h-6 w-48 animate-pulse bg-surface-variant rounded mb-4" />
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <MatchCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
