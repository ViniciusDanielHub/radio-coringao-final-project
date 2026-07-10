export default function PatrocinadoresLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mb-8 animate-pulse">
        <div className="mb-2 h-10 w-64 rounded bg-surface-container" />
        <div className="h-6 w-96 rounded bg-surface-container" />
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse flex-col items-center gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
          >
            <div className="h-24 w-full rounded bg-surface-container" />
            <div className="h-4 w-24 rounded bg-surface-container" />
          </div>
        ))}
      </div>
    </div>
  );
}
