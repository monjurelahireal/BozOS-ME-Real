"use client";

import { useState } from "react";

type Invoice = {
  id: number;
  customer: string;
  amount: number;
  status: "Paid" | "Pending";
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1048,
      customer: "Acme Studio",
      amount: 2450,
      status: "Paid",
    },
    {
      id: 1047,
      customer: "Nova Digital",
      amount: 1820,
      status: "Pending",
    },
  ]);

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);

  function createInvoice() {
    if (!customer.trim() || !amount.trim()) {
      return;
    }

    const newInvoice: Invoice = {
      id: 1049 + invoices.length,
      customer: customer.trim(),
      amount: Number(amount),
      status: "Pending",
    };

    setInvoices([newInvoice, ...invoices]);
    setCustomer("");
    setAmount("");
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="mt-1 text-sm text-slate-500">
              Create and manage your business invoices.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            {showForm ? "Close" : "Create Invoice"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">New Invoice</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer
                </label>

                <input
                  type="text"
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
            </div>

            <button
              onClick={createInvoice}
              className="mt-4 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Save Invoice
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold">Invoice List</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Invoice</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-5 py-4 font-medium">
                      #INV-{invoice.id}
                    </td>

                    <td className="px-5 py-4">{invoice.customer}</td>

                    <td className="px-5 py-4">
                      ${invoice.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}