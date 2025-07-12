import { useCart } from "@/context/CartContext";
import { useState } from "react";
import api from "@/lib/api";

export default function CheckoutPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cartItems.reduce((sum, item) => {
    const days = item.type === "rental" ? 1 : 1;
    return sum + item.price * item.quantity * days;
  }, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const orderPayload = {
      customerName: form.name,
      phoneNumber: form.phone,
      address: form.address,
      items: cartItems.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        type: item.type,
        quantity: item.quantity,
        price: item.price,
        durationDays: item.type === "rental" ? 1 : undefined,
      })),
    };

    try {
      const res = await api.post("/orders", orderPayload);
      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        clearCart();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Checkout
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Cart Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-4">
                {cartItems.map((item, index) => {
                  const itemTotal = item.price * item.quantity * (item.type === "rental" ? 1 : 1);
                  return (
                    <li
                      key={item._id || item.id || index}
                      className="py-2 text-gray-700 flex justify-between items-start"
                    >
                      <div className="w-3/4">
                        <div className="font-medium">{item.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              decreaseQuantity(item._id || item.id || index)
                            }
                            className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              increaseQuantity(item._id || item.id || index)
                            }
                            className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        {item.type === "rental" && (
                          <p className="text-sm text-gray-500 mt-1">
                            1-day rental charge collected as advance. Final billing at return.
                          </p>
                        )}
                        <div className="text-sm text-gray-600 mt-1">
                          ₹{item.price} × {item.quantity} = ₹{itemTotal}
                        </div>
                      </div>
                      <div className="text-right w-1/4">
                        <div className="font-semibold">₹{itemTotal}</div>
                        <button
                          onClick={() =>
                            removeFromCart(item._id || item.id || index)
                          }
                          className="text-xs text-red-500 hover:underline mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <hr className="mb-2 border-gray-300" />
              <div className="text-right font-bold text-lg text-green-700 mb-2">
                Total: ₹{total}
              </div>

              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:underline cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              placeholder="Village, PO, District, State, PIN"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Payment Method
            </label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI (Pay on Delivery)</option>
              <option value="prepaid_upi">UPI (Pay Now)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-semibold shadow cursor-pointer"
          >
            Place Order
          </button>
        </form>

        {status === "loading" && (
          <p className="text-blue-500 mt-4 text-center">Placing your order...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 mt-4 text-center font-semibold">
            Order placed successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center font-semibold">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
