import { NewsCardSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-8">
        <div className="h-8 w-48 animate-pulse bg-surface-variant rounded mb-2" />
        <div className="h-4 w-64 animate-pulse bg-surface-variant rounded" />
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => <NewsCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
