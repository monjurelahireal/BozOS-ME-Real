"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Invoice = {
  id: number;
  invoice_number: string;
  customer_name: string;
  amount: number | string;
  status: string;
  due_date: string;
  created_at: string;
};

const statusOptions = ["pending", "paid", "overdue"];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [invoiceError, setInvoiceError] = useState("");

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [status, setStatus] = useState("pending");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadInvoices() {
    setLoadingInvoices(true);
    setInvoiceError("");

    const { data, error: fetchError } = await supabase
      .from("invoices")
      .select(
        "id, invoice_number, customer_name, amount, status, due_date, created_at",
      )
      .order("created_at", { ascending: false });

    if (fetchError) {
      setInvoiceError(fetchError.message);
      setInvoices([]);
      setLoadingInvoices(false);
      return;
    }

    setInvoices((data ?? []) as Invoice[]);
    setLoadingInvoices(false);
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  function resetForm() {
    setCustomer("");
    setAmount("");
    setDueDate(new Date().toISOString().split("T")[0]);
    setStatus("pending");
    setEditingInvoice(null);
    setShowInvoiceForm(false);
    setSaving(false);
    setError("");
  }

  function openCreateForm() {
    resetForm();
    setShowInvoiceForm(true);
  }

  function openEditForm(invoice: Invoice) {
    setEditingInvoice(invoice);
    setCustomer(invoice.customer_name);
    setAmount(String(invoice.amount));
    setDueDate(invoice.due_date);
    setStatus(invoice.status.toLowerCase());
    setError("");
    setShowInvoiceForm(true);
  }

  async function saveInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!customer.trim() || !amount.trim() || !dueDate) {
      setError("Customer, amount, and due date are required.");
      return;
    }

    const invoiceAmount = Number(amount);

    if (!Number.isFinite(invoiceAmount) || invoiceAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (!statusOptions.includes(status.toLowerCase())) {
      setError("Please select a valid status.");
      return;
    }

    setSaving(true);
    setError("");

    if (editingInvoice) {
      const { data, error: updateError } = await supabase
        .from("invoices")
        .update({
          customer_name: customer.trim(),
          amount: invoiceAmount,
          status: status.toLowerCase(),
          due_date: dueDate,
        })
        .eq("id", editingInvoice.id)
        .select(
          "id, invoice_number, customer_name, amount, status, due_date, created_at",
        )
        .single();

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setInvoices((current) =>
        current.map((invoice) =>
          invoice.id === editingInvoice.id
            ? (data as Invoice)
            : invoice,
        ),
      );
    } else {
      const invoiceNumber = `INV-${Date.now()
        .toString()
        .slice(-6)}`;

      const { data, error: insertError } = await supabase
        .from("invoices")
        .insert({
          invoice_number: invoiceNumber,
          customer_name: customer.trim(),
          amount: invoiceAmount,
          status: status.toLowerCase(),
          due_date: dueDate,
        })
        .select(
          "id, invoice_number, customer_name, amount, status, due_date, created_at",
        )
        .single();

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }

      setInvoices((current) => [
        data as Invoice,
        ...current,
      ]);
    }

    resetForm();
  }

  async function deleteInvoice(invoice: Invoice) {
    const confirmed = window.confirm(
      `Delete ${invoice.invoice_number}? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const { error: deleteError } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoice.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setInvoices((current) =>
      current.filter((item) => item.id !== invoice.id),
    );
  }

  async function changeStatus(
    invoice: Invoice,
    newStatus: string,
  ) {
    setError("");

    const { data, error: updateError } = await supabase
      .from("invoices")
      .update({
        status: newStatus,
      })
      .eq("id", invoice.id)
      .select(
        "id, invoice_number, customer_name, amount, status, due_date, created_at",
      )
      .single();

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setInvoices((current) =>
      current.map((item) =>
        item.id === invoice.id
          ? (data as Invoice)
          : item,
      ),
    );
  }

  function getStatusClass(statusValue: string) {
    const normalizedStatus = statusValue.toLowerCase();

    if (normalizedStatus === "paid") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (normalizedStatus === "pending") {
      return "bg-amber-50 text-amber-700";
    }

    if (normalizedStatus === "overdue") {
      return "bg-red-50 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Business
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Invoices
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, edit, track, and manage your business invoices.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            + Create invoice
          </button>
        </div>

        {error && !showInvoiceForm && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="font-semibold">All invoices</h2>

              <p className="mt-1 text-xs text-slate-500">
                {invoices.length} invoice
                {invoices.length === 1 ? "" : "s"} found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">
                    Invoice
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Customer
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Amount
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Due date
                  </th>

                  <th className="px-6 py-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loadingInvoices ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      Loading invoices...
                    </td>
                  </tr>
                ) : invoiceError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-red-600"
                    >
                      {invoiceError}
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 font-semibold">
                        #{invoice.invoice_number}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {invoice.customer_name}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        $
                        {Number(invoice.amount).toLocaleString(
                          "en-US",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={invoice.status.toLowerCase()}
                          onChange={(event) =>
                            changeStatus(
                              invoice,
                              event.target.value,
                            )
                          }
                          className={`rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none ${getStatusClass(
                            invoice.status,
                          )}`}
                        >
                          {statusOptions.map((statusOption) => (
                            <option
                              key={statusOption}
                              value={statusOption}
                              className="bg-white text-slate-900"
                            >
                              {statusOption.charAt(0).toUpperCase() +
                                statusOption.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {invoice.due_date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(invoice)
                            }
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteInvoice(invoice)
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showInvoiceForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
            <div
              role="dialog"
              aria-modal="true"
              className="my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {editingInvoice
                      ? "Edit Invoice"
                      : "Create Invoice"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {editingInvoice
                      ? `Update ${editingInvoice.invoice_number}.`
                      : "Create a new business invoice."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={saveInvoice} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Customer
                  </label>

                  <input
                    value={customer}
                    onChange={(event) =>
                      setCustomer(event.target.value)
                    }
                    placeholder="Customer name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                    required
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
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Due date
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(event) =>
                      setDueDate(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-slate-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingInvoice
                        ? "Save changes"
                        : "Save Invoice"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}