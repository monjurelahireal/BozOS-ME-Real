export default function CustomersPage() {
  const customers = [
    {
      name: "Acme Studio",
      email: "hello@acmestudio.com",
      invoices: 8,
      total: "$12,450",
      status: "Active",
    },
    {
      name: "Nova Digital",
      email: "team@novadigital.com",
      invoices: 5,
      total: "$8,320",
      status: "Active",
    },
    {
      name: "Vertex Labs",
      email: "contact@vertexlabs.com",
      invoices: 4,
      total: "$6,780",
      status: "Active",
    },
    {
      name: "Pixel House",
      email: "hello@pixelhouse.com",
      invoices: 3,
      total: "$3,240",
      status: "Active",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-slate-400">Workspace</p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Customers
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your customers and business relationships.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            + Add customer
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total customers</p>
            <p className="mt-2 text-2xl font-bold">42</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active customers</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              38
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Customer revenue</p>
            <p className="mt-2 text-2xl font-bold">$30,790</p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold">Customer list</h2>

            <p className="mt-1 text-sm text-slate-400">
              Your latest customer accounts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Invoices</th>
                  <th className="px-5 py-3 font-medium">Revenue</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <tr
                    key={customer.email}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {customer.name}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {customer.email}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {customer.invoices}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-900">
                      {customer.total}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}