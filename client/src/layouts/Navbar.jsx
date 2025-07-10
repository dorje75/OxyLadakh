// src/layouts/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white/70 shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">OxyLadakh</h1>
        <nav className="space-x-4 text-sm font-semibold text-gray-800">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/rentals">Rentals</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/map">Map</Link>
          <Link href="/education">Education</Link>
        </nav>
      </div>
    </header>
  );
}
