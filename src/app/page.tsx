"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { supabase } from "@/lib/supabase";

type RecentInvoice = {
  id: number;
  invoice_number: string;
  customer_name: string;
  amount: number | string;
  status: string;
};

type Expense = {
  id: number;
  amount: number | string;
};

export default function Home() {
  const router = useRouter();

  const [recentInvoices, setRecentInvoices] = useState<RecentInvoice[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [outstanding, setOutstanding] = useState(0);
  const [outstandingCount, setOutstandingCount] = useState(0);

  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [invoiceError, setInvoiceError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      setLoadingInvoices(true);
      setInvoiceError("");

      const [invoiceResult, expenseResult] = await Promise.all([
        supabase
          .from("invoices")
          .select(
            "id, invoice_number, customer_name, amount, status, created_at",
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("expenses")
          .select("id, amount")
          .order("created_at", { ascending: false }),
      ]);

      if (invoiceResult.error) {
        setInvoiceError(invoiceResult.error.message);
        setRecentInvoices([]);
        setRevenue(0);
        setOutstanding(0);
        setOutstandingCount(0);
        setExpenses(0);
        setNetProfit(0);
        setLoadingInvoices(false);
        return;
      }

      if (expenseResult.error) {
        setInvoiceError(expenseResult.error.message);
        setExpenses(0);
        setNetProfit(0);
        setLoadingInvoices(false);
        return;
      }

      const invoices = invoiceResult.data ?? [];
      const expenseData = (expenseResult.data ?? []) as Expense[];

      const paidInvoices = invoices.filter(
        (invoice) => invoice.status?.toLowerCase() === "paid",
      );

      const unpaidInvoices = invoices.filter((invoice) => {
        const status = invoice.status?.toLowerCase();

        return status === "pending" || status === "overdue";
      });

      const revenueTotal = paidInvoices.reduce(
        (total, invoice) => total + Number(invoice.amount || 0),
        0,
      );

      const outstandingTotal = unpaidInvoices.reduce(
        (total, invoice) => total + Number(invoice.amount || 0),
        0,
      );

      const expenseTotal = expenseData.reduce(
        (total, expense) => total + Number(expense.amount || 0),
        0,
      );

      const profitTotal = revenueTotal - expenseTotal;

      setRevenue(revenueTotal);
      setExpenses(expenseTotal);
      setNetProfit(profitTotal);
      setOutstanding(outstandingTotal);
      setOutstandingCount(unpaidInvoices.length);

      setRecentInvoices(invoices.slice(0, 4));
      setLoadingInvoices(false);
    }

    loadDashboardData();
  }, []);

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
                    Good morning, Monjur Elahi
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Here&apos;s what&apos;s happening with your business.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/invoices")}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  + Create invoice
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Revenue
                    </p>

                    <span className="text-xs text-slate-400">•••</span>
                  </div>

                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    ${revenue.toLocaleString()}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-600">
                      Paid invoices
                    </span>

                    <span className="text-xs text-slate-400">
                      total collected
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Expenses
                    </p>

                    <span className="text-xs text-slate-400">•••</span>
                  </div>

                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    ${expenses.toLocaleString()}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Total expenses
                    </span>

                    <span className="text-xs text-slate-400">
                      from Supabase
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Net Profit
                    </p>

                    <span className="text-xs text-slate-400">•••</span>
                  </div>

                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    ${netProfit.toLocaleString()}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        netProfit >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      Revenue - Expenses
                    </span>

                    <span className="text-xs text-slate-400">
                      current total
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Outstanding
                    </p>

                    <span className="text-xs text-slate-400">•••</span>
                  </div>

                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    ${outstanding.toLocaleString()}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-600">
                      {outstandingCount} invoices
                    </span>

                    <span className="text-xs text-slate-400">
                      awaiting payment
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Revenue overview</h4>

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
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Business health</h4>

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
                    <h4 className="font-semibold">Recent invoices</h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Latest invoice activity
                    </p>
                  </div>

                  <button
                    onClick={() => router.push("/invoices")}
                    className="text-xs font-semibold text-slate-700 hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500">
                      <tr>
                        <th className="px-5 py-3 font-medium">Invoice</th>
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Amount</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loadingInvoices ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-6 text-center text-sm text-slate-500"
                          >
                            Loading invoices...
                          </td>
                        </tr>
                      ) : invoiceError ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-6 text-center text-sm text-red-600"
                          >
                            {invoiceError}
                          </td>
                        </tr>
                      ) : recentInvoices.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-6 text-center text-sm text-slate-500"
                          >
                            No invoices found.
                          </td>
                        </tr>
                      ) : (
                        recentInvoices.map((invoice) => {
                          const status = invoice.status?.toLowerCase();

                          const statusClass =
                            status === "paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : status === "pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-red-50 text-red-700";

                          return (
                            <tr
                              key={invoice.id}
                              className="border-t border-slate-100"
                            >
                              <td className="px-5 py-4 font-semibold">
                                {invoice.invoice_number}
                              </td>

                              <td className="px-5 py-4 text-slate-600">
                                {invoice.customer_name}
                              </td>

                              <td className="px-5 py-4 font-medium">
                                ${Number(invoice.amount).toLocaleString()}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
                                >
                                  {invoice.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
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