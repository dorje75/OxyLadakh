import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const saleItems = res.data.filter((item) => item.type === "sale");
        setProducts(saleItems);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-7xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Available Products
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image || "/images/products/default.webp"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-green-600 font-bold mb-3">₹{product.price}</p>

              <button
                onClick={(e) => {
                  addToCart(product);
                  e.currentTarget.blur();
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-200 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
