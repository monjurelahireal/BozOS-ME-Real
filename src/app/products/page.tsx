"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductsTable, {
  Product,
} from "@/components/products/ProductsTable";

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  status: "Active" | "Inactive";
  created_at: string;
};

const initialProducts: Product[] = [
  {
    name: "Analytics Pro",
    category: "Software",
    price: "$149",
    sales: 124,
    status: "Active",
  },
  {
    name: "Starter Plan",
    category: "Subscription",
    price: "$49",
    sales: 86,
    status: "Active",
  },
  {
    name: "Business Suite",
    category: "Software",
    price: "$299",
    sales: 64,
    status: "Active",
  },
  {
    name: "Consulting Pack",
    category: "Service",
    price: "$499",
    sales: 32,
    status: "Inactive",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  async function loadProducts() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as ProductRow[];

    setProducts(
      rows.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: `$${Number(product.price).toFixed(2)}`,
        sales: product.sales,
        status: product.status,
      })),
    );

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function openAddModal() {
    setEditingProduct(null);
    setName("");
    setCategory("");
    setPrice("");
    setStatus("Active");
    setError("");
    setShowModal(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.replace("$", ""));
    setStatus(product.status === "Inactive" ? "Inactive" : "Active");
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingProduct(null);
    setName("");
    setCategory("");
    setPrice("");
    setStatus("Active");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const numericPrice = Number(price);

    if (
      !name.trim() ||
      !category.trim() ||
      price.trim() === "" ||
      Number.isNaN(numericPrice)
    ) {
      setError("Please enter a valid product name, category, and price.");
      return;
    }

    if (editingProduct?.id) {
      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          category: category.trim(),
          price: numericPrice,
          status,
        })
        .eq("id", editingProduct.id);

      if (updateError) {
        console.error(updateError);
        setError(updateError.message);
        return;
      }
    } else {
      const { error: insertError } = await supabase.from("products").insert({
        name: name.trim(),
        category: category.trim(),
        price: numericPrice,
        sales: 0,
        status,
      });

      if (insertError) {
        console.error(insertError);
        setError(insertError.message);
        return;
      }
    }

    closeModal();
    await loadProducts();
  }

  async function handleDelete(product: Product) {
    if (!product.id) {
      setError("This product does not have a database ID.");
      return;
    }

    setError("");

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (deleteError) {
      console.error(deleteError);
      setError(deleteError.message);
      return;
    }

    await loadProducts();
  }

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Catalog
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage products, pricing, sales, and availability.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Add Product
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Products
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {products.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Active Products
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {products.filter((product) => product.status === "Active").length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Product Revenue
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              $30,450
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white">
          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-400">
              Loading products...
            </div>
          ) : (
            <ProductsTable
              products={products}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {editingProduct
                  ? "Update the product information."
                  : "Add a new product to your catalog."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Product Name
                </label>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Analytics Pro"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="e.g. Software"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Price
                </label>

                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="149"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "Active" | "Inactive")
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
