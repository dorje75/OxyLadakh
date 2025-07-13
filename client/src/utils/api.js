const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;


export const fetchOrders = async (type = "", status = "") => {
  const res = await fetch(`${BASE_URL}/api/admin/orders?type=${type}&status=${status}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return await res.json();
};

export const markAsReturned = async (orderId) => {
  const res = await fetch(`${BASE_URL}/api/admin/orders/mark-returned`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ orderId }),
  });
  if (!res.ok) throw new Error("Failed to mark order as returned");
  return await res.json();
};
