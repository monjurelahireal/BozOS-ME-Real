"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  DEFAULT_CURRENCY,
  formatCurrency,
  loadWorkspaceCurrency,
} from "@/lib/currency";

type Expense = {
  id: number;
  description: string;
  amount: number | string;
  expense_date: string;
  created_at: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [expenseError, setExpenseError] = useState("");

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadExpenses() {
    setLoadingExpenses(true);
    setExpenseError("");

    const [expenseResult, workspaceCurrency] = await Promise.all([
      supabase
        .from("expenses")
        .select("id, description, amount, expense_date, created_at")
        .order("created_at", { ascending: false }),

      loadWorkspaceCurrency(),
    ]);

    setCurrency(workspaceCurrency);

    if (expenseResult.error) {
      setExpenseError(expenseResult.error.message);
      setExpenses([]);
      setLoadingExpenses(false);
      return;
    }

    setExpenses((expenseResult.data ?? []) as Expense[]);
    setLoadingExpenses(false);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function createExpense() {
    if (!description.trim() || !amount.trim()) {
      setError("Description and amount are required.");
      return;
    }

    const expenseAmount = Number(amount);

    if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setSaving(true);
    setError("");

    const { error: insertError } = await supabase.from("expenses").insert({
      description: description.trim(),
      amount: expenseAmount,
      expense_date: expenseDate,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    setDescription("");
    setAmount("");
    setExpenseDate(new Date().toISOString().split("T")[0]);
    setShowExpenseForm(false);
    setSaving(false);

    await loadExpenses();
  }

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Business</p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Expenses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage your business expenses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to Overview
            </Link>

            <button
              onClick={() => {
                setError("");
                setShowExpenseForm(true);
              }}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              + Add expense
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total expenses
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {formatCurrency(totalExpenses, currency)}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              From Supabase
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Expense records
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {expenses.length}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Total recorded expenses
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold">All expenses</h2>

            <p className="mt-1 text-xs text-slate-500">
              Latest expense activity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>

              <tbody>
                {loadingExpenses ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      Loading expenses...
                    </td>
                  </tr>
                ) : expenseError ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-sm text-red-600"
                    >
                      {expenseError}
                    </td>
                  </tr>
                ) : expenses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 font-medium">
                        {expense.description}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(expense.amount, currency)}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {expense.expense_date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showExpenseForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Expense</h2>

                <button
                  onClick={() => setShowExpenseForm(false)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Description
                  </label>

                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Office rent, software, supplies..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Amount
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Expense date
                  </label>

                  <input
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  onClick={createExpense}
                  disabled={saving}
                  className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Expense"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}