"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ProductsTable, {
  type Product,
} from "@/components/products/ProductsTable";
import { supabase } from "@/lib/supabase";

type DatabaseProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  status: string;
  created_at: string;
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

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Could not load products:", error);
        setIsLoaded(true);
        return;
      }

      if (data && data.length > 0) {
        const databaseProducts = data as DatabaseProduct[];

        setProducts(
          databaseProducts.map((product) => ({
            name: product.name,
            category: product.category,
            price: formatPrice(product.price),
            sales: product.sales,
            status: product.status,
          })),
        );
      }

      setIsLoaded(true);
    }

    loadProducts();
  }, []);

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;

  function resetForm() {
    setName("");
    setCategory("");
    setPrice("");
    setSales("");
    setStatus("Active");
    setEditingProduct(null);
    setIsModalOpen(false);
  }

  function openAddModal() {
    resetForm();
    setIsModalOpen(true);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.replace(/^\$/, "").replace(/,/g, ""));
    setSales(String(product.sales));
    setStatus(product.status);
    setIsModalOpen(true);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("name", product.name)
      .eq("category", product.category);

    if (error) {
      console.error("Could not delete product:", error);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((item) => item !== product),
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!name.trim() || !category.trim() || !price.trim()) {
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return;
    }

    const numericSales = Math.max(
      0,
      Math.floor(Number(sales) || 0),
    );

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          category: category.trim(),
          price: numericPrice,
          sales: numericSales,
          status,
        })
        .eq("name", editingProduct.name)
        .eq("category", editingProduct.category);

      if (error) {
        console.error("Could not update product:", error);
        return;
      }

      const updatedProduct: Product = {
        name: name.trim(),
        category: category.trim(),
        price: formatPrice(numericPrice),
        sales: numericSales,
        status,
      };

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product === editingProduct
            ? updatedProduct
            : product,
        ),
      );
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name.trim(),
          category: category.trim(),
          price: numericPrice,
          sales: numericSales,
          status,
        })
        .select()
        .single();

      if (error) {
        console.error("Could not create product:", error);
        return;
      }

      const createdProduct = data as DatabaseProduct;

      setProducts((currentProducts) => [
        {
          name: createdProduct.name,
          category: createdProduct.category,
          price: formatPrice(createdProduct.price),
          sales: createdProduct.sales,
          status: createdProduct.status,
        },
        ...currentProducts,
      ]);
    }

    resetForm();
  }

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
                onClick={openAddModal}
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

            {!isLoaded ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                Loading products...
              </div>
            ) : (
              <ProductsTable
                products={products}
                onEdit={handleEdit}
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
                aria-label="Close modal"
                className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Product name
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
                    Price ($)
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
                    htmlFor="product-sales"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Sales
                  </label>

                  <input
                    id="product-sales"
                    type="number"
                    min="0"
                    step="1"
                    value={sales}
                    onChange={(event) =>
                      setSales(event.target.value)
                    }
                    placeholder="0"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="product-status"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="product-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {editingProduct ? "Save changes" : "Add product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}