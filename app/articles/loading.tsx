export default function ArticlesLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 dir-rtl px-4 sm:px-6" aria-busy="true" aria-label="جاري تحميل المقالات">
      {/* Header skeleton */}
      <div className="space-y-3 text-center">
        <div className="h-6 w-40 animate-pulse rounded-full bg-[var(--bg-muted)] mx-auto" />
        <div className="h-10 w-72 animate-pulse rounded-xl bg-[var(--bg-muted)] mx-auto" />
        <div className="h-4 w-56 animate-pulse rounded bg-[var(--bg-muted)] mx-auto" />
      </div>
      {/* Category chips skeleton */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-[var(--bg-muted)]" />
        ))}
      </div>
      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-[var(--border-main)]/60 bg-[var(--bg-card)]">
            <div className="aspect-[16/9] animate-pulse bg-[var(--bg-muted)]" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-24 animate-pulse rounded bg-[var(--bg-muted)]" />
              <div className="h-5 w-full animate-pulse rounded bg-[var(--bg-muted)]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--bg-muted)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
