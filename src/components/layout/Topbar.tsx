"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Topbar() {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) {
      return;
    }

    if (query.includes("invoice") || query.includes("bill")) {
      router.push("/invoices");
      return;
    }

    if (query.includes("customer") || query.includes("client")) {
      router.push("/customers");
      return;
    }

    if (query.includes("product") || query.includes("service")) {
      router.push("/products");
      return;
    }

    if (query.includes("expense") || query.includes("cost")) {
      router.push("/expenses");
      return;
    }

    if (query.includes("report") || query.includes("analytics")) {
      router.push("/reports");
      return;
    }

    if (query.includes("setting") || query.includes("config")) {
      router.push("/settings");
    }
  }

  async function handleSignOut() {
    setProfileOpen(false);

    const { error } = await supabase.auth.signOut();

    if (error) {
      window.alert(error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="relative flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-xs text-slate-400">
          Workspace
        </p>

        <h2 className="text-sm font-semibold text-slate-900">
          Business Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <form
          onSubmit={handleSearch}
          className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex"
        >
          <Search
            className="h-4 w-4 text-slate-400"
            strokeWidth={1.8}
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search invoices..."
            className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <div className="ml-2 flex items-center gap-1 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </form>

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotificationOpen((current) => !current);
              setProfileOpen(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Bell
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  Notifications
                </p>

                <button
                  type="button"
                  onClick={() => setNotificationOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center">
                <Bell className="mx-auto h-5 w-5 text-slate-400" />

                <p className="mt-2 text-sm font-medium text-slate-700">
                  No new notifications
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  You&apos;re all caught up.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((current) => !current);
              setNotificationOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
              ME
            </div>

            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              Monjur
            </span>

            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-sm font-semibold text-slate-900">
                  Monjur Elahi
                </p>

                <p className="text-xs text-slate-400">
                  Administrator
                </p>
              </div>

              <Link
                href="/settings"
                onClick={() => setProfileOpen(false)}
                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>

              <Link
                href="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}