export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-8 h-40 animate-pulse rounded-lg bg-surface-container" />
      <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-surface-container" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-64 animate-pulse rounded-lg bg-surface-container" />
        <div className="h-64 animate-pulse rounded-lg bg-surface-container" />
        <div className="h-64 animate-pulse rounded-lg bg-surface-container" />
        <div className="h-64 animate-pulse rounded-lg bg-surface-container" />
      </div>
    </div>
  );
}
