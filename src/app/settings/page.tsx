"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type WorkspaceSettings = {
  id: number;
  workspace_name: string;
  account_name: string;
  currency: string;
  updated_at: string;
};

export default function SettingsPage() {
  const [settingsId, setSettingsId] = useState<number | null>(null);

  const [workspaceName, setWorkspaceName] = useState("BizOS");
  const [accountName, setAccountName] = useState("Monjur Elahi");
  const [currency, setCurrency] = useState("USD");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("workspace_settings")
        .select(
          "id, workspace_name, account_name, currency, updated_at",
        )
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      if (data) {
        const settings = data as WorkspaceSettings;

        setSettingsId(settings.id);
        setWorkspaceName(settings.workspace_name);
        setAccountName(settings.account_name);
        setCurrency(settings.currency);
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  async function handleSave() {
    if (!workspaceName.trim() || !accountName.trim()) {
      setError("Workspace name and account name are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    const settingsData = {
      workspace_name: workspaceName.trim(),
      account_name: accountName.trim(),
      currency,
      updated_at: new Date().toISOString(),
    };

    let saveError = null;

    if (settingsId) {
      const { error: updateError } = await supabase
        .from("workspace_settings")
        .update(settingsData)
        .eq("id", settingsId);

      saveError = updateError;
    } else {
      const { data, error: insertError } = await supabase
        .from("workspace_settings")
        .insert(settingsData)
        .select(
          "id, workspace_name, account_name, currency, updated_at",
        )
        .single();

      saveError = insertError;

      if (data) {
        setSettingsId((data as WorkspaceSettings).id);
      }
    }

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Loading settings...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
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

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to Overview
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Workspace
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Business workspace information.
            </p>

            <div className="mt-5">
              <label
                htmlFor="workspace-name"
                className="text-xs font-medium text-slate-500"
              >
                Workspace name
              </label>

              <input
                id="workspace-name"
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

            <div className="mt-5">
              <label
                htmlFor="currency"
                className="text-xs font-medium text-slate-500"
              >
                Currency
              </label>

              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
              >
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="CAD">CAD — Canadian Dollar</option>
                <option value="AUD">AUD — Australian Dollar</option>
              </select>
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
              <label
                htmlFor="account-name"
                className="text-xs font-medium text-slate-500"
              >
                Name
              </label>

              <input
                id="account-name"
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
            disabled={saving}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </main>
  );
}