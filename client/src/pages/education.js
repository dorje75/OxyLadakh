import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Staying Safe at High Altitudes
        </h1>

        {/* What is AMS */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🌬️ What is Altitude Sickness?</h2>
          <p className="text-gray-700">
            Altitude sickness (AMS) happens when you ascend to high altitudes too quickly. It is caused by reduced oxygen levels and pressure above 2,500 meters and is common among travelers in Ladakh.
          </p>
        </section>

        {/* Government Advisory */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🛂 Government Health Advisory (Leh)</h2>
          <p className="text-gray-700">
            According to the Leh District Health Department, <strong>“All tourists must undergo at least 48 hours of acclimatization after arriving in Leh before traveling to higher altitude locations like Khardung La.”</strong>
          </p>
          <p className="text-gray-700 mt-2">
            You can read the full advisory at:{" "}
            <a
              href="https://www.lahdclehpermit.in/healthadvisory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              lahdclehpermit.in/healthadvisory
            </a>
          </p>
        </section>

        {/* YouTube Embed */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📹 Watch: Understanding Altitude Sickness</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              className="rounded-xl w-full h-64"
              src="https://www.youtube.com/embed/O4eB9S7PuJg?mute=1&autoplay=0"
              title="Altitude Sickness Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">⚠️ Common Symptoms</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Headache</li>
            <li>Nausea or vomiting</li>
            <li>Dizziness and fatigue</li>
            <li>Shortness of breath</li>
            <li>Loss of appetite</li>
            <li>Disturbed sleep</li>
          </ul>
        </section>

        {/* First Aid */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🛟 First Aid Tips</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Stop ascending and rest</li>
            <li>Use portable oxygen or oxygen mask</li>
            <li>Stay hydrated (avoid alcohol & smoking)</li>
            <li>Take prescribed medication like Diamox</li>
            <li>Descend to a lower altitude if symptoms worsen</li>
          </ul>
        </section>

        {/* Extra Advice */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📌 Helpful Advice</h2>
          <p className="text-gray-700">
            Always allow time to acclimatize, especially when traveling to Ladakh. Carry oxygen essentials, avoid overexertion on Day 1, and contact local health authorities if symptoms persist.
          </p>
        </section>

        {/* Button to Products */}
        <div className="mt-8 text-center">
          <Link href="/products">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
              View Oxygen Supplies
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
