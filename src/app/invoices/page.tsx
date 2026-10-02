"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  function createInvoice() {
    if (!customer.trim() || !amount.trim()) {
      return;
    }

    alert(
      `Invoice created for ${customer} - $${Number(amount).toLocaleString()}`
    );

    setCustomer("");
    setAmount("");
    setShowInvoiceForm(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="mt-1 text-sm text-slate-500">
            Business overview and financial summary.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Revenue</p>
            <h2 className="mt-2 text-2xl font-bold">$24,580</h2>
            <p className="mt-2 text-sm text-green-600">+12.5% vs last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Expenses</p>
            <h2 className="mt-2 text-2xl font-bold">$8,420</h2>
            <p className="mt-2 text-sm text-yellow-600">+4.8% vs last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Net Profit</p>
            <h2 className="mt-2 text-2xl font-bold">$16,160</h2>
            <p className="mt-2 text-sm text-green-600">+18.2% vs last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Outstanding</p>
            <h2 className="mt-2 text-2xl font-bold">$4,280</h2>
            <p className="mt-2 text-sm text-slate-500">
              8 invoices awaiting payment
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>

            <div className="mt-6 flex h-48 items-end gap-3">
              {[45, 65, 52, 80, 62, 90, 72, 95, 78, 100, 86, 110].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-slate-800"
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Business Health</h2>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[82%] rounded-full bg-slate-800" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Customer Growth</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[68%] rounded-full bg-slate-800" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Payment Collection</span>
                  <span className="font-medium">74%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[74%] rounded-full bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold">Recent Invoices</h2>

            <button
              onClick={() => setShowInvoiceForm(true)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Create Invoice
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Invoice</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium">#INV-1048</td>
                  <td className="px-6 py-4">Acme Studio</td>
                  <td className="px-6 py-4">$2,450</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Paid
                    </span>
                  </td>
                </tr>

                <tr className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium">#INV-1047</td>
                  <td className="px-6 py-4">Nova Digital</td>
                  <td className="px-6 py-4">$1,820</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {showInvoiceForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create Invoice</h2>

                <button
                  onClick={() => setShowInvoiceForm(false)}
                  className="text-xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Customer
                  </label>

                  <input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Customer name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Amount
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>

                <button
                  onClick={createInvoice}
                  className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-700"
                >
                  Save Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}