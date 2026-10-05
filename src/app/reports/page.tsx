"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { supabase } from "@/lib/supabase";

type Invoice = {
  id: number;
  invoice_number: string;
  customer_name: string;
  amount: number | string;
  status: string;
  created_at: string;
};

type Expense = {
  id: number;
  description: string;
  amount: number | string;
  expense_date: string;
  created_at: string;
};

type MonthlyReport = {
  month: string;
  revenue: number;
  expenses: number;
};

export default function ReportsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReportData() {
      setLoading(true);
      setError("");

      const [invoiceResult, expenseResult] = await Promise.all([
        supabase
          .from("invoices")
          .select(
            "id, invoice_number, customer_name, amount, status, created_at",
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("expenses")
          .select("id, description, amount, expense_date, created_at")
          .order("created_at", { ascending: false }),
      ]);

      if (invoiceResult.error) {
        setError(invoiceResult.error.message);
        setInvoices([]);
        setExpenses([]);
        setLoading(false);
        return;
      }

      if (expenseResult.error) {
        setError(expenseResult.error.message);
        setInvoices(invoiceResult.data ?? []);
        setExpenses([]);
        setLoading(false);
        return;
      }

      setInvoices((invoiceResult.data ?? []) as Invoice[]);
      setExpenses((expenseResult.data ?? []) as Expense[]);
      setLoading(false);
    }

    loadReportData();
  }, []);

  const reportTotals = useMemo(() => {
    const paidRevenue = invoices
      .filter((invoice) => invoice.status?.toLowerCase() === "paid")
      .reduce((total, invoice) => total + Number(invoice.amount || 0), 0);

    const outstandingAmount = invoices
      .filter((invoice) => {
        const status = invoice.status?.toLowerCase();

        return status === "pending" || status === "overdue";
      })
      .reduce((total, invoice) => total + Number(invoice.amount || 0), 0);

    const totalExpenses = expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0,
    );

    const netProfit = paidRevenue - totalExpenses;

    return {
      paidRevenue,
      totalExpenses,
      netProfit,
      outstandingAmount,
    };
  }, [invoices, expenses]);

  const monthlyData = useMemo<MonthlyReport[]>(() => {
    const now = new Date();

    const months: MonthlyReport[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      months.push({
        month: date.toLocaleString("en-US", { month: "short" }),
        revenue: 0,
        expenses: 0,
      });
    }

    invoices.forEach((invoice) => {
      if (invoice.status?.toLowerCase() !== "paid") {
        return;
      }

      const date = new Date(invoice.created_at);
      const difference =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      if (difference < 0 || difference > 5) {
        return;
      }

      const index = 5 - difference;

      if (months[index]) {
        months[index].revenue += Number(invoice.amount || 0);
      }
    });

    expenses.forEach((expense) => {
      const date = new Date(expense.expense_date || expense.created_at);

      const difference =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      if (difference < 0 || difference > 5) {
        return;
      }

      const index = 5 - difference;

      if (months[index]) {
        months[index].expenses += Number(expense.amount || 0);
      }
    });

    return months;
  }, [invoices, expenses]);

  const maxMonthlyValue = useMemo(() => {
    const values = monthlyData.flatMap((item) => [
      item.revenue,
      item.expenses,
    ]);

    return Math.max(...values, 1);
  }, [monthlyData]);

  function formatCurrency(value: number) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

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

              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                  Loading reports...
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                  {error}
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">
                        Total Revenue
                      </p>

                      <p className="mt-4 text-2xl font-bold">
                        {formatCurrency(reportTotals.paidRevenue)}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Paid invoices
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">
                        Total Expenses
                      </p>

                      <p className="mt-4 text-2xl font-bold">
                        {formatCurrency(reportTotals.totalExpenses)}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Saved expenses
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">
                        Net Profit
                      </p>

                      <p
                        className={`mt-4 text-2xl font-bold ${
                          reportTotals.netProfit >= 0
                            ? "text-slate-900"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(reportTotals.netProfit)}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Revenue minus expenses
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">
                        Outstanding
                      </p>

                      <p className="mt-4 text-2xl font-bold">
                        {formatCurrency(reportTotals.outstandingAmount)}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        Pending + overdue invoices
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div>
                      <h2 className="font-semibold">Revenue vs Expenses</h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Last 6 months based on saved business data
                      </p>
                    </div>

                    <div className="mt-8 space-y-6">
                      {monthlyData.map((item) => {
                        const revenueWidth =
                          (item.revenue / maxMonthlyValue) * 100;

                        const expenseWidth =
                          (item.expenses / maxMonthlyValue) * 100;

                        return (
                          <div key={item.month}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                              <span className="font-medium">{item.month}</span>

                              <span className="text-xs text-slate-500">
                                Revenue {formatCurrency(item.revenue)} ·
                                Expenses {formatCurrency(item.expenses)}
                              </span>
                            </div>

                            <div className="mb-2 h-3 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-slate-900 transition-all"
                                style={{
                                  width: `${revenueWidth}%`,
                                }}
                              />
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-slate-400 transition-all"
                                style={{
                                  width: `${expenseWidth}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex gap-5 text-xs text-slate-500">
                      <span>■ Revenue</span>
                      <span>■ Expenses</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="font-semibold">Invoice summary</h2>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Total invoices
                          </span>

                          <span className="font-semibold">
                            {invoices.length}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Paid invoices
                          </span>

                          <span className="font-semibold">
                            {
                              invoices.filter(
                                (invoice) =>
                                  invoice.status?.toLowerCase() === "paid",
                              ).length
                            }
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Awaiting payment
                          </span>

                          <span className="font-semibold">
                            {
                              invoices.filter((invoice) => {
                                const status = invoice.status?.toLowerCase();

                                return (
                                  status === "pending" || status === "overdue"
                                );
                              }).length
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="font-semibold">Expense summary</h2>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Expense records
                          </span>

                          <span className="font-semibold">
                            {expenses.length}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Average expense
                          </span>

                          <span className="font-semibold">
                            {formatCurrency(
                              expenses.length > 0
                                ? reportTotals.totalExpenses / expenses.length
                                : 0,
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">
                            Current expense total
                          </span>

                          <span className="font-semibold">
                            {formatCurrency(reportTotals.totalExpenses)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="font-semibold">Report information</h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Reports are connected to your Supabase invoices and
                      expenses data.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}