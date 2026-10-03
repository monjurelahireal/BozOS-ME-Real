"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  Users,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Invoices",
    icon: FileText,
    href: "/invoices",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    label: "Products",
    icon: Package,
    href: "/products",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-[72px] items-center border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            B
          </div>

          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
              BizOS
            </h1>

            <p className="text-[11px] text-slate-400">
              Business workspace
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className="h-[17px] w-[17px]"
                  strokeWidth={1.8}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-3">
        <Link
          href="/settings"
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            pathname.startsWith("/settings")
              ? "bg-slate-100 font-medium text-slate-900"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Settings
            className="h-[17px] w-[17px]"
            strokeWidth={1.8}
          />

          <span>Settings</span>
        </Link>

        <button
          type="button"
          className="mt-3 flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left transition hover:bg-slate-100"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            ME
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              Monjur Elahi
            </p>

            <p className="truncate text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}