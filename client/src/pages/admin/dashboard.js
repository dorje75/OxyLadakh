import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchOrders, markAsReturned } from "../../utils/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ type: "", status: "" });
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders(filter.type, filter.status);
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const handleReturn = async (orderId) => {
    try {
      await markAsReturned(orderId);
      loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as returned.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o._id.includes(search) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase());

    const matchType =
      !filter.type ||
      o.items.some(
        (item) => item.type.toLowerCase() === filter.type.toLowerCase()
      );

    const matchStatus =
      !filter.status ||
      (filter.status === "returned" ? o.returned : !o.returned);

    return matchSearch && matchType && matchStatus;
  });
  
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: 'url("/ladakh-bg.jpg")' }}
    >
      <div className="min-h-screen bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6 text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order ID or Customer Name"
              className="w-full p-2 rounded shadow bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Order Type</label>
            <select
              value={filter.type}
              onChange={(e) =>
                setFilter((f) => ({ ...f, type: e.target.value }))
              }
              className="p-2 rounded shadow bg-white"
            >
              <option value="">All</option>
              <option value="rental">Rental</option>
              <option value="purchase">Purchase</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filter.status}
              onChange={(e) =>
                setFilter((f) => ({ ...f, status: e.target.value }))
              }
              className="p-2 rounded shadow bg-white"
            >
              <option value="">All</option>
              <option value="pending">Pending Return</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>

        {/* Table Start */}
        {loading ? (
          <p className="text-gray-800">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center py-8 text-gray-800">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-left text-sm bg-white/50">
              <thead className="bg-white/70">
                <tr>
                  {["ID", "Customer", "Status", "Bill", "Action"].map((h) => (
                    <th key={h} className="p-3 font-medium text-gray-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => {
                  const isReturned = o.returned;
                  const pricePerDay = o.items?.[0]?.price || 0;
                  const bill = o.finalBill ?? pricePerDay;
                  const pending = isReturned ? 0 : bill - pricePerDay;

                  return (
                    <React.Fragment key={o._id}>
                      {/* Main Order Row */}
                      <tr
                        className="border-t border-gray-300 cursor-pointer hover:bg-white/30 transition"
                        onClick={() => toggleExpand(o._id)}
                      >
                        <td className="p-2">{o._id.slice(-6)}</td>
                        <td className="p-2">{o.customerName || "—"}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isReturned
                                ? "bg-green-200 text-green-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {isReturned ? "Returned" : "Pending"}
                          </span>
                        </td>
                        <td className="p-2">
                          ₹{bill}{" "}
                          {!isReturned && (
                            <span className="text-xs text-gray-600">
                              (Adv: ₹{pricePerDay}, Due: ₹{pending})
                            </span>
                          )}
                        </td>
                        <td className="p-2">
                          {!isReturned &&
                          o.items.some((item) => item.type === "rental") ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReturn(o._id);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                            >
                              Return
                            </button>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {expanded === o._id && (
                        <tr className="bg-white/60">
                          <td colSpan="5" className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold mb-2">
                                Order Items:
                              </h3>
                              <table className="w-full text-sm border">
                                <thead>
                                  <tr className="bg-white/80">
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Type</th>
                                    <th className="p-2 border">Qty</th>
                                    <th className="p-2 border">Price</th>
                                    <th className="p-2 border">
                                      Rental Period
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {o.items.map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="p-2 border">
                                        {item.name}
                                      </td>
                                      <td className="p-2 border capitalize">
                                        {item.type}
                                      </td>
                                      <td className="p-2 border">
                                        {item.quantity}
                                      </td>
                                      <td className="p-2 border">
                                        ₹{item.price}
                                      </td>
                                      <td className="p-2 border">
                                        {item.rentalStartDate
                                          ? new Date(
                                              item.rentalStartDate
                                            ).toLocaleDateString()
                                          : "—"}{" "}
                                        →{" "}
                                        {item.rentalEndDate
                                          ? new Date(
                                              item.rentalEndDate
                                            ).toLocaleDateString()
                                          : "—"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  res.setHeader("Cache-Control", "no-store");

  try {
    const verifyRes = await fetch("http://localhost:5000/api/admin/verify", {
      method: "GET",
      headers: { Cookie: req.headers.cookie || "" },
    });

    if (verifyRes.status !== 200) {
      return { redirect: { destination: "/admin/login", permanent: false } };
    }
    return { props: {} };
  } catch {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
}