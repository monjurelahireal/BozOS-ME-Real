"use client";

import { useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Acme Studio",
      email: "hello@acmestudio.com",
      phone: "+1 555-0101",
      status: "Active",
    },
    {
      id: 2,
      name: "Nova Digital",
      email: "contact@novadigital.com",
      phone: "+1 555-0102",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function addCustomer() {
    if (!name.trim() || !email.trim()) {
      return;
    }

    const newCustomer: Customer = {
      id: customers.length + 1,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      status: "Active",
    };

    setCustomers([newCustomer, ...customers]);

    setName("");
    setEmail("");
    setPhone("");
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customers</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your business customers.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            {showForm ? "Close" : "Add Customer"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold">Add New Customer</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Customer name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@email.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555-0100"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <button
              onClick={addCustomer}
              className="mt-5 rounded-lg bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-700"
            >
              Save Customer
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold">
              Customer List ({customers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-4 font-medium">
                      {customer.name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {customer.email}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {customer.phone || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {customer.status}
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