import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "#INV-1048",
      customer: "Acme Studio",
      amount: "$2,450",
      status: "Paid",
      date: "Sep 28, 2026",
    },
    {
      id: "#INV-1047",
      customer: "Nova Digital",
      amount: "$1,820",
      status: "Pending",
      date: "Sep 26, 2026",
    },
    {
      id: "#INV-1046",
      customer: "Vertex Labs",
      amount: "$3,200",
      status: "Overdue",
      date: "Sep 22, 2026",
    },
    {
      id: "#INV-1045",
      customer: "Pixel House",
      amount: "$980",
      status: "Paid",
      date: "Sep 18, 2026",
    },
  ];

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-6 lg:px-8">
            <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-1 text-sm text-slate-400">
                  Workspace
                </p>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Invoices
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage and track your business invoices.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                + Create invoice
              </button>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Total invoices
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  24
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Paid
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-600">
                  16
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Outstanding
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  $4,280
                </p>
              </div>
            </section>

            <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold text-slate-900">
                  Recent invoices
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Latest invoice activity
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-medium">
                        Invoice
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Customer
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Date
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Amount
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-medium text-slate-900">
                          {invoice.id}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {invoice.customer}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {invoice.date}
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-900">
                          {invoice.amount}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              invoice.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : invoice.status === "Pending"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-red-50 text-red-700"
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
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}