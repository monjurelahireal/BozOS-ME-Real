type RevenueOverviewProps = {
  values?: number[];
};

export default function RevenueOverview({
  values = [42, 58, 48, 72, 64, 88, 76, 96, 82, 100, 91, 108],
}: RevenueOverviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Revenue overview</h4>

          <p className="mt-1 text-xs text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
          Last 6 months
        </button>
      </div>

      <div className="mt-8 flex h-56 items-end gap-3 border-b border-slate-100 px-2">
        {values.map((height, index) => (
          <div
            key={index}
            className="flex flex-1 items-end"
          >
            <div
              className="w-full rounded-t-lg bg-slate-900 transition hover:bg-slate-700"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between px-2 text-[11px] text-slate-400">
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
    </div>
  );
}