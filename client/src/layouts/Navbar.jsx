import Link from "next/link";
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart(); 

  return (
    <header className="bg-white/70 shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">OxyLadakh</h1>
        <nav className="space-x-4 text-sm font-semibold text-gray-800 relative">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/rentals" className="hover:underline">Rentals</Link>
          <Link href="/checkout" className="relative inline-block hover:underline">
            Checkout
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/education" className="hover:underline">Education</Link>
        </nav>
      </div>
    </header>
  );
}
