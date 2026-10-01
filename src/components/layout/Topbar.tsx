"use client";

import {
  Bell,
  ChevronDown,
  Command,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-xs text-slate-400">
          Workspace
        </p>

        <h2 className="text-sm font-semibold text-slate-900">
          Business Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search
            className="h-4 w-4 text-slate-400"
            strokeWidth={1.8}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <div className="ml-2 flex items-center gap-1 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <Bell
            className="h-4 w-4"
            strokeWidth={1.8}
          />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
            ME
          </div>

          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            Monjur
          </span>

          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}