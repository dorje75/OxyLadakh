import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";

export default function RentalsPage() {
  const { addToCart } = useCart();
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await api.get("/products");
        const rentals = res.data.filter((item) => item.type === "rental");
        setRentalItems(rentals);
      } catch (err) {
        console.error(err);
        setError("Failed to load rental products.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-7xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Oxygen Cylinders for Rent
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading rental items...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentalItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.image || "/images/rentals/default.webp"}
                alt={item.name}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-green-600 font-bold mb-1">
                ₹{item.price}{" "}
                <span className="text-sm text-gray-500">(Per Day)</span>
              </p>

              <button
                onClick={(e) => {
                  addToCart(item);
                  e.currentTarget.blur();
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 cursor-pointer"
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
