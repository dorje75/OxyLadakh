// src/layouts/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md py-4 text-center text-sm text-gray-700">
      © {new Date().getFullYear()} OxyLadakh. All rights reserved.
    </footer>
  );
}
