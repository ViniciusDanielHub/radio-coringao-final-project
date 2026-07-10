import { ColumnistCardSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-stack-lg flex items-center gap-2">
        <div className="h-6 w-1 bg-surface-variant animate-pulse" />
        <div className="h-8 w-24 animate-pulse bg-surface-variant rounded" />
      </div>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <ColumnistCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
