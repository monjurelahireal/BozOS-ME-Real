import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function ProductsPage() {
  const products = [
    {
      name: "Website Development",
      category: "Development",
      price: "$2,500",
      sales: 12,
      status: "Active",
    },
    {
      name: "UI/UX Design",
      category: "Design",
      price: "$1,200",
      sales: 18,
      status: "Active",
    },
    {
      name: "Business Dashboard",
      category: "Software",
      price: "$3,800",
      sales: 7,
      status: "Active",
    },
    {
      name: "Maintenance Plan",
      category: "Support",
      price: "$450",
      sales: 24,
      status: "Active",
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
                  Products
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your products and services.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                + Add product
              </button>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Total products
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  18
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Active products
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-600">
                  16
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Product revenue
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  $30,450
                </p>
              </div>
            </section>

            <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold text-slate-900">
                  Product list
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your products and services
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-medium">
                        Product
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Category
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Price
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Sales
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {products.map((product) => (
                      <tr
                        key={product.name}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-medium text-slate-900">
                          {product.name}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-900">
                          {product.price}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {product.sales}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {product.status}
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