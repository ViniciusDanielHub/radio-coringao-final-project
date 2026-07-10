import { TableSkeleton, PageHeaderSkeleton } from "@/presentation/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <PageHeaderSkeleton />
      <TableSkeleton rows={10} />
    </div>
  );
}
