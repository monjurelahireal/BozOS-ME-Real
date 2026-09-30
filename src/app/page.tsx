"use client";

import { useState } from "react";

const navItems = [
{ label: "Dashboard", icon: "▦" },
{ label: "Customers", icon: "♙" },
{ label: "Products", icon: "□" },
{ label: "Invoices", icon: "▤" },
{ label: "Expenses", icon: "−" },
{ label: "Payments", icon: "$" },
{ label: "Reports", icon: "◒" },
{ label: "Notifications", icon: "○" },
{ label: "Settings", icon: "⚙" },
];

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

const recentInvoices = [
{
id: "#INV-1048",
customer: "Acme Studio",
amount: "$2,450",
status: "Paid",
},
{
id: "#INV-1047",
customer: "Nova Digital",
amount: "$1,820",
status: "Pending",
},
{
id: "#INV-1046",
customer: "Vertex Labs",
amount: "$3,200",
status: "Overdue",
},
{
id: "#INV-1045",
customer: "Pixel House",
amount: "$980",
status: "Paid",
},
];

export default function Home() {
const [activeItem, setActiveItem] = useState("Dashboard");

return ( <main className="min-h-screen bg-[#f7f8fa] text-slate-900"> <div className="flex min-h-screen"> <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex"> <div className="flex h-20 items-center border-b border-slate-200 px-6"> <div className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
B </div>

```
          <div>
            <h1 className="text-lg font-bold tracking-tight">BizOS</h1>
            <p className="text-xs text-slate-500">
              Business Workspace
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {navItems.map((item) => {
          const active = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="flex w-5 justify-center text-base">
                {item.icon}
              </span>

              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">
            Business Plan
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Free workspace
          </p>

          <button className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
            View plans
          </button>
        </div>
      </div>
    </aside>

    <section className="flex min-w-0 flex-1 flex-col">
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

      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Overview
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight">
                Good morning, Monjur
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
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <span className="text-xs text-slate-400">
                    •••
                  </span>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600">
                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    {stat.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    Revenue overview
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    Monthly revenue performance
                  </p>
                </div>

                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                  Last 6 months
                </button>
              </div>

              <div className="mt-8 flex h-56 items-end gap-3 border-b border-slate-100 px-2">
                {[42, 58, 48, 72, 64, 88, 76, 96, 82, 100, 91, 108].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-lg bg-slate-900 transition hover:bg-slate-700"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
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

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    Business health
                  </h4>

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
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h4 className="font-semibold">
                  Recent invoices
                </h4>

                <p className="mt-1 text-xs text-slate-500">
                  Latest invoice activity
                </p>
              </div>

              <button className="text-xs font-semibold text-slate-700 hover:underline">
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">
                      Invoice
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Customer
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Amount
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-5 py-4 font-semibold">
                        {invoice.id}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {invoice.customer}
                      </td>

                      <td className="px-5 py-4 font-medium">
                        {invoice.amount}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            invoice.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : invoice.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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