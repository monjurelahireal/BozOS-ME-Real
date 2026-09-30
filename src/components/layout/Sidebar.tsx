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

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            B
          </div>

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
  );
}