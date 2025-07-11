export default function CheckoutPage() {
  const cartItems = [
    { id: 1, name: "Oxygen Mask", price: 250 },
    { id: 2, name: "Large Oxygen Cylinder (10L)", price: 499 }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Checkout</h1>

        {/* Cart Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Cart Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between py-2 text-gray-700">
                <span>{item.name}</span>
                <span className="font-semibold">₹{item.price}</span>
              </li>
            ))}
          </ul>
          <hr className="mb-2 border-gray-300" />
          <div className="text-right font-bold text-lg text-green-700">Total: ₹{total}</div>
        </div>

        {/* Delivery Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="9876543210"
              required
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Delivery Address</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              placeholder="Village, PO, District, State, PIN"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Payment Method</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI (Pay on Delivery)</option>
              <option value="prepaid_upi">UPI (Pay Now)</option>
            </select>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-semibold shadow"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
