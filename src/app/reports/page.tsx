import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const reports = [
  { label: "Total Revenue", value: "$24,580", note: "Current reporting period" },
  { label: "Total Expenses", value: "$8,420", note: "Current reporting period" },
  { label: "Net Profit", value: "$16,160", note: "Revenue minus expenses" },
  { label: "Outstanding", value: "$4,280", note: "Unpaid invoice amount" },
];

const monthlyData = [
  { month: "Apr", revenue: 45, expenses: 25 },
  { month: "May", revenue: 62, expenses: 35 },
  { month: "Jun", revenue: 52, expenses: 30 },
  { month: "Jul", revenue: 75, expenses: 42 },
  { month: "Aug", revenue: 68, expenses: 38 },
  { month: "Sep", revenue: 90, expenses: 48 },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <p className="text-sm text-slate-500">Workspace</p>
                <h1 className="mt-1 text-2xl font-bold">Reports</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Review your business performance and financial summary.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {reports.map((report) => (
                  <div
                    key={report.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-500">
                      {report.label}
                    </p>
                    <p className="mt-4 text-2xl font-bold">{report.value}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {report.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold">Revenue vs Expenses</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Monthly illustrative comparison
                </p>

                <div className="mt-8 space-y-6">
                  {monthlyData.map((item) => (
                    <div key={item.month}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium">{item.month}</span>
                        <span className="text-xs text-slate-500">
                          Revenue {item.revenue}% · Expenses {item.expenses}%
                        </span>
                      </div>

                      <div className="mb-2 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900"
                          style={{ width: `${item.revenue}%` }}
                        />
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-400"
                          style={{ width: `${item.expenses}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-5 text-xs text-slate-500">
                  <span>■ Revenue</span>
                  <span>■ Expenses</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="font-semibold">Report information</h2>
                <p className="mt-2 text-sm text-slate-500">
                  These are sample figures. Reports are not yet connected to
                  saved invoices or a database.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}