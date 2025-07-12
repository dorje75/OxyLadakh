import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome, Admin! You're successfully authenticated.</p>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Server-side protection
export async function getServerSideProps(context) {
  const { req, res } = context;

  // Prevent caching of SSR page
  res.setHeader("Cache-Control", "no-store");

  try {
    const verifyRes = await fetch("http://localhost:5000/api/admin/verify", {
      method: "GET",
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });

    if (verifyRes.status !== 200) {
      // Not authenticated → redirect to login
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }

    return { props: {} }; // Authenticated
  } catch (error) {
    // Server/network error → force logout
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
