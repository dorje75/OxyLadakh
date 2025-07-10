import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/ladakh-bg.jpg')] bg-cover bg-no-repeat bg-fixed bg-[center_top_-100px] text-gray-900">
      <div className="backdrop-brightness-[.85] flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
