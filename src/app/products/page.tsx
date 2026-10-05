"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ProductsTable, {
  type Product,
} from "@/components/products/ProductsTable";
import { supabase } from "@/lib/supabase";

type DatabaseProduct = {
  id: number;
  name: string;
  category: string;
  price: number | string;
  stock: number;
  created_at: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("products")
      .select("id, name, category, price, stock, created_at")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts((data ?? []) as Product[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function resetForm() {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setEditingProduct(null);
    setIsModalOpen(false);
    setError("");
  }

  function openAddModal() {
    resetForm();
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setError("");
    setIsModalOpen(true);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setProducts((current) =>
      current.filter((item) => item.id !== product.id),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !category.trim() || !price.trim()) {
      setError("Name, category, and price are required.");
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock || 0);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      setError("Price must be 0 or greater.");
      return;
    }

    if (!Number.isFinite(numericStock) || numericStock < 0) {
      setError("Stock must be 0 or greater.");
      return;
    }

    setSaving(true);
    setError("");

    if (editingProduct) {
      const { data, error: updateError } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          category: category.trim(),
          price: numericPrice,
          stock: Math.floor(numericStock),
        })
        .eq("id", editingProduct.id)
        .select("id, name, category, price, stock, created_at")
        .single();

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? (data as Product)
            : product,
        ),
      );
    } else {
      const { data, error: insertError } = await supabase
        .from("products")
        .insert({
          name: name.trim(),
          category: category.trim(),
          price: numericPrice,
          stock: Math.floor(numericStock),
        })
        .select("id, name, category, price, stock, created_at")
        .single();

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }

      setProducts((current) => [
        data as Product,
        ...current,
      ]);
    }

    setSaving(false);
    resetForm();
  }

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0,
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.stock || 0),
    0,
  );

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

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  ← Back to Overview
                </Link>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  + Add product
                </button>
              </div>
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
                  Total stock
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {totalStock}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">
                  Inventory value
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  ${inventoryValue.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </section>

            {error && !isModalOpen && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2
                  id="product-modal-title"
                  className="text-lg font-semibold text-slate-950"
                >
                  {editingProduct ? "Edit product" : "Add product"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingProduct
                    ? "Update the product information."
                    : "Add a new product or service."}
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Product / Service Name
                </label>

                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Website Development"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="product-category"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>

                <input
                  id="product-category"
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  placeholder="Development"
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-price"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Price
                  </label>

                  <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(event) =>
                      setPrice(event.target.value)
                    }
                    placeholder="2500"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-stock"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Stock
                  </label>

                  <input
                    id="product-stock"
                    type="number"
                    min="0"
                    step="1"
                    value={stock}
                    onChange={(event) =>
                      setStock(event.target.value)
                    }
                    placeholder="0"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                      ? "Save changes"
                      : "Add product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}