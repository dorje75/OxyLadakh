import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const refillStations = [
  { name: 'Station 1', lat: 34.1526, lng: 77.5771 },
  { name: 'Station 2', lat: 34.1467, lng: 77.5763 }
];

// Optional custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30]
});

export default function MapView() {
  return (
    <div className="h-[70vh] rounded-xl overflow-hidden">
      <MapContainer
        center={[34.1526, 77.5771]} // Leh coordinates
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {refillStations.map((station, idx) => (
          <Marker
            key={idx}
            position={[station.lat, station.lng]}
            icon={customIcon}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
