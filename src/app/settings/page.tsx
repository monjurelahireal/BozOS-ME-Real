"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("BizOS");
  const [accountName, setAccountName] = useState("Monjur Elahi");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Settings
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your BizOS workspace and account settings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Workspace
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Business workspace information.
            </p>

            <div className="mt-5">
              <label className="text-xs font-medium text-slate-500">
                Workspace name
              </label>

              <input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500">
                Workspace type
              </p>

              <p className="mt-2 text-sm font-medium text-slate-900">
                Business
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your account information.
            </p>

            <div className="mt-5">
              <label className="text-xs font-medium text-slate-500">
                Name
              </label>

              <input
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
              />
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-500">
                Role
              </p>

              <p className="mt-2 text-sm font-medium text-slate-900">
                Administrator
              </p>
            </div>
          </section>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm font-medium text-emerald-600">
              Settings saved
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save changes
          </button>
        </div>
      </div>
    </main>
  );
}
