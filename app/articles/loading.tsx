export default function ArticlesLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6 dir-rtl" aria-busy="true" aria-label="جاري تحميل المقالات">
      <div className="h-10 w-56 animate-pulse rounded bg-slate-800" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
            <div className="aspect-[16/8] animate-pulse bg-slate-800" />
            <div className="space-y-3 p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
              <div className="h-6 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
