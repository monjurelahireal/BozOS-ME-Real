"use client";

import { useMemo, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Product list
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter your products.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400 sm:w-64"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sales
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={`${product.name}-${product.category}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {product.name}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {product.price}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {product.sales}
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}