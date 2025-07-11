import '@/styles/globals.css';
import Layout from '@/layouts/Layout';
import 'leaflet/dist/leaflet.css';
import { CartProvider } from '@/context/CartContext'; 

export default function App({ Component, pageProps }) {
  return (
    <CartProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
