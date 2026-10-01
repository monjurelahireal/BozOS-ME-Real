type Invoice = {
  id: string;
  customer: string;
  amount: string;
  status: string;
};

const recentInvoices: Invoice[] = [
  {
    id: "#INV-1048",
    customer: "Acme Studio",
    amount: "$2,450",
    status: "Paid",
  },
  {
    id: "#INV-1047",
    customer: "Nova Digital",
    amount: "$1,820",
    status: "Pending",
  },
  {
    id: "#INV-1046",
    customer: "Vertex Labs",
    amount: "$3,200",
    status: "Overdue",
  },
  {
    id: "#INV-1045",
    customer: "Pixel House",
    amount: "$980",
    status: "Paid",
  },
];

export default function RecentInvoices() {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h4 className="font-semibold">Recent invoices</h4>

          <p className="mt-1 text-xs text-slate-500">
            Latest invoice activity
          </p>
        </div>

        <button className="text-xs font-semibold text-slate-700 hover:underline">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentInvoices.map((invoice) => {
              let statusClass = "bg-red-50 text-red-700";

              if (invoice.status === "Paid") {
                statusClass = "bg-emerald-50 text-emerald-700";
              } else if (invoice.status === "Pending") {
                statusClass = "bg-amber-50 text-amber-700";
              }

              return (
                <tr
                  key={invoice.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-5 py-4 font-semibold">
                    {invoice.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {invoice.customer}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {invoice.amount}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}