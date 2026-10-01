type Product = {
  name: string;
  category: string;
  price: string;
  sales: number;
  status: string;
};

type ProductsTableProps = {
  products: Product[];
};

export default function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
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
  );
}