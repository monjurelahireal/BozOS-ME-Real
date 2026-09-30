export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm text-slate-500">
          Wednesday, September 30
        </p>

        <h2 className="text-xl font-bold tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 sm:block">
          English
        </button>

        <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
          Search
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          M
        </button>
      </div>
    </header>
  );
}