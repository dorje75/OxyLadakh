import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Head from 'next/head';

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import('../components/MapView'), { ssr: false });

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Refill Station Map | OxyLadakh</title>
      </Head>
      <div className="min-h-screen px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-4">Oxygen Refill Stations</h1>
        <MapContainer />
      </div>
    </>
  );
}
