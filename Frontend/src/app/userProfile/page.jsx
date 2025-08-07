// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const [user, setUser] = useState({ name: "", email: "" });
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       router.push("/user-login"); // redirect to login if not logged in
//     }
//   }, []);

//   return (
//     <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#fdf6f1] to-[#d7e9ff] font-['Arimo']">
//       <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">My Account</h1>

//       <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//           <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700 uppercase">
//             {user.name?.charAt(0)}
//           </div>
//           <div className="text-center md:text-left">
//             <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
//             <p className="text-sm text-gray-600">{user.email}</p>
//           </div>
//         </div>

//         <hr className="mb-6" />

//         <h3 className="text-lg font-semibold mb-4 text-gray-700">Account Information</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-600">Full Name</label>
//             <input
//               value={user.name}
//               readOnly
//               className="w-full p-2 border rounded-md bg-gray-50 text-gray-700"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-600">Email Address</label>
//             <input
//               value={user.email}
//               readOnly
//               className="w-full p-2 border rounded-md bg-gray-50 text-gray-700"
//             />
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//             router.push("/user-login");
//           }}
//           className="mt-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch orders if user is logged in
      if (parsedUser.email) {
        fetchOrders(parsedUser.email);
      }
    } else {
      router.push("/user-login");
    }
  }, []);

  const fetchOrders = async (email) => {
    try {
      setLoadingOrders(true);
      const res = await fetch(
        `http://localhost:5000/api/orders?email=${email}`
      );
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/user-login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdf6f1] to-[#d7e9ff] font-['Arimo']">
      <main className="flex-grow px-6 py-12">
        <h1 className="text-4xl font-bold mb-5 text-center text-gray-800">
          My Account
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-2 font-semibold border-b-2 ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 font-semibold border-b-2 ${
              activeTab === "orders"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600"
            }`}
          >
            Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700 uppercase">
                {user.name?.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <hr className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Full Name
                </label>
                <input
                  value={user.name}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Email Address
                </label>
                <input
                  value={user.email}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Phone Number
                </label>
                <input
                  value={user.phone || "Not Provided"}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Order History
              </h2>
            </div>

            {loadingOrders ? (
              <p className="text-center text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 border rounded-xl bg-gray-50 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1M9 12h.01M15 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                  No orders yet
                </p>
                <p className="mb-6 text-gray-500 text-sm sm:text-base">
                  You haven't placed any orders yet.
                </p>
                <button
                  onClick={() => router.push("/inline-skates")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-all text-sm sm:text-base"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-500 mb-4">
                      <span>
                        <strong className="text-gray-700">Order ID:</strong> #
                        {order.id}
                      </span>
                      <span>
                        {new Date(order.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-800 mb-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t pt-3 mt-3">
                      <span className="text-sm font-semibold text-gray-600">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
