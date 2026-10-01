import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import RevenueOverview from "@/components/dashboard/RevenueOverview";
import BusinessHealth from "@/components/dashboard/BusinessHealth";
import RecentInvoices from "@/components/dashboard/RecentInvoices";

const stats = [
  {
    label: "Revenue",
    value: "$24,580",
    change: "+12.5%",
    detail: "vs last month",
  },
  {
    label: "Expenses",
    value: "$8,420",
    change: "+4.8%",
    detail: "vs last month",
  },
  {
    label: "Net Profit",
    value: "$16,160",
    change: "+18.2%",
    detail: "vs last month",
  },
  {
    label: "Outstanding",
    value: "$4,280",
    change: "8 invoices",
    detail: "awaiting payment",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Overview
                  </p>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight">
                    Good morning, Monjur Elahi!
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Here&apos;s what&apos;s happening with your business.
                  </p>
                </div>

                <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  + Create invoice
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    detail={stat.detail}
                  />
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <RevenueOverview />
                <BusinessHealth />
              </div>

              <RecentInvoices />

              <footer className="mt-8 pb-4 text-center text-xs text-slate-400">
                BizOS · One workspace for running your business
              </footer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}