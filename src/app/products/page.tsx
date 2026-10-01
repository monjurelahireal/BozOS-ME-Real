"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ProductsTable from "@/components/products/ProductsTable";

type Product = {
  name: string;
  category: string;
  price: string;
  sales: number;
  status: string;
};

const initialProducts: Product[] = [
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState("");

  function handleAddProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !category.trim() || !price.trim()) {
      return;
    }

    const newProduct: Product = {
      name: name.trim(),
      category: category.trim(),
      price: price.startsWith("$") ? price.trim() : `$${price.trim()}`,
      sales: Number(sales) || 0,
      status: "Active",
    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    setName("");
    setCategory("");
    setPrice("");
    setSales("");
    setIsModalOpen(false);
  }

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

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
                onClick={() => setIsModalOpen(true)}
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
                  {products.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Active products
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-600">
                  {activeProducts}
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

            <ProductsTable products={products} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Add product
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new product or service.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Product name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Website Development"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Development"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="text"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="2500"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Sales
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={sales}
                    onChange={(event) => setSales(event.target.value)}
                    placeholder="0"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Add product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}