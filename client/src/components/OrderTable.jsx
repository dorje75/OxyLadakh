export default function OrderTable({ orders, onReturn }) {
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full text-sm text-left bg-white/50 dark:bg-black/40">
        <thead>
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Bill</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isReturned = order.returned;
            const bill = order.finalBill || order.pricePerDay || 0;
            const pending = isReturned ? 0 : bill - order.pricePerDay;

            return (
              <tr key={order._id} className="border-t border-gray-300">
                <td className="p-2">{order._id.slice(-6)}</td>
                <td className="p-2">{order.customerName || "N/A"}</td>
                <td className="p-2 capitalize">{order.orderType}</td>
                <td className="p-2">
                  {isReturned ? (
                    <span className="text-green-600 font-semibold">Returned</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-2">
                  ₹{bill}{" "}
                  {isReturned ? (
                    <span className="text-xs text-gray-500">(Paid)</span>
                  ) : (
                    <span className="text-xs text-orange-500">
                      (Advance ₹{order.pricePerDay}, Due ₹{pending})
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {!isReturned && order.orderType === "rental" ? (
                    <button
                      onClick={() => onReturn(order._id)}
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Mark Returned
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
