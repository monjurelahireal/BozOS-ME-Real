export default function BusinessHealth() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Business health</h4>

          <p className="mt-1 text-xs text-slate-500">
            Current operational status
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          Healthy
        </span>
      </div>

      <div className="mt-7 space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-slate-500">
              Payments collected
            </span>

            <span className="font-semibold">82%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 w-[82%] rounded-full bg-slate-900" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-slate-500">
              Invoices paid
            </span>

            <span className="font-semibold">76%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 w-[76%] rounded-full bg-slate-900" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-slate-500">
              Stock availability
            </span>

            <span className="font-semibold">91%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 w-[91%] rounded-full bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
