export default function RentalsPage() {
  const rentalItems = [
    {
      id: 1,
      name: "Large Oxygen Cylinder (10L)",
      price: 499,
      image: "/images/rentals/10L-cylinder.jpg",
      duration: "Per Day"
    },
    {
      id: 2,
      name: "Large Oxygen Cylinder (15L)",
      price: 649,
      image: "/images/rentals/15L-cylinder.jpg",
      duration: "Per Day"
    },
    {
      id: 3,
      name: "Portable Oxygen Kit (5L)",
      price: 399,
      image: "/images/rentals/5L-cylinder.jpg",
      duration: "Per Day"
    }
  ]

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-7xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Oxygen Cylinders for Rent</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentalItems.map(item => (
            <div
              key={item.id}
              className="bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-green-600 font-bold mb-1">
                ₹{item.price} <span className="text-sm text-gray-500">({item.duration})</span>
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
