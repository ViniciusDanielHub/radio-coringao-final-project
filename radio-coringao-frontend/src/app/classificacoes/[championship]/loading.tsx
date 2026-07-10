import { TableSkeleton, PageHeaderSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <PageHeaderSkeleton />
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-24 animate-pulse bg-surface-variant rounded" />
        ))}
      </div>
      <TableSkeleton rows={10} />
    </div>
  );
}
