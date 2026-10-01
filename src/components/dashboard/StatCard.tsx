type StatCardProps = {
  label: string;
  value: string;
  change: string;
  detail: string;
};

export default function StatCard({
  label,
  value,
  change,
  detail,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <span className="text-xs text-slate-300">
          •••
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs font-semibold text-emerald-600">
          {change}
        </span>

        <span className="text-xs text-slate-400">
          {detail}
        </span>
      </div>
    </div>
  );
}