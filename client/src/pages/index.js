export default function Home() {
  return (
    <section className="flex justify-center items-center h-[70vh] px-6">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-lg mb-4">
          Welcome to <span className="text-[#1D3557]">OxyLadakh</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          We provide <strong>oxygen products</strong> and <strong>rentals</strong> for tourists and residents
          at high altitudes in Ladakh. <br />Your safety is our priority.
        </p>
      </div>
    </section>
  )
}
