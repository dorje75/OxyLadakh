import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Checkout
        </h1>

        {/* Cart Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Cart Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-2 text-gray-700 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ₹{item.price * item.quantity}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:underline mt-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="mb-2 border-gray-300" />
              <div className="text-right font-bold text-lg text-green-700 mb-2">
                Total: ₹{total}
              </div>

              {/* Clear Cart Button */}
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

        {/* Delivery Form */}
        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Phone Number
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="9876543210"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Delivery Address
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              placeholder="Village, PO, District, State, PIN"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Payment Method
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
              required
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
      </div>
    </div>
  );
}
