"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import API_CONFIG from "../../config/api";
import { Package, User, Mail, Phone, Clock, CheckCircle, TruckIcon, AlertTriangle, ShoppingBag, LogOut, ChevronRight, Search, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [searchTerm, setSearchTerm] = useState("");

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
        `${API_CONFIG.BASE_URL}/api/orders?email=${email}`
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
    
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('loginStatusChanged'));
    
    router.push("/user-login");
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      new Date(order.createdAt).toLocaleDateString().includes(searchLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchLower))
    );
  });

  // Helper function to get order status color and icon
  const getOrderStatusInfo = (status) => {
    switch(status?.toLowerCase()) {
      case "processing":
        return { status: "Processing", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-4 h-4" /> };
      case "shipped":
        return { status: "Shipped", color: "bg-blue-100 text-blue-800", icon: <TruckIcon className="w-4 h-4" /> };
      case "delivered":
        return { status: "Delivered", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> };
      default:
        return { status: "Processing", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-4 h-4" /> };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdf6f1] to-[#d7e9ff] font-['Arimo']">
      <main className="flex-grow px-4 sm:px-6 py-12 max-w-7xl mx-auto w-full">
        <div className="relative pb-4 mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            My Account
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Manage your profile and track your orders
          </p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 sm:px-6 py-3 font-semibold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 sm:px-6 py-3 font-semibold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === "orders"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders</span>
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-3xl font-bold text-white uppercase shadow-lg">
                {user.name?.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1">
                  <Mail className="w-4 h-4 text-blue-500" /> {user.email}
                </p>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1 mt-1">
                  <Calendar className="w-4 h-4 text-blue-500" /> Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <User className="w-5 h-5" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-600">
                    Full Name
                  </label>
                  <div className="w-full p-3 border rounded-lg bg-white text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {user.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-600">
                    Email Address
                  </label>
                  <div className="w-full p-3 border rounded-lg bg-white text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-600">
                    Phone Number
                  </label>
                  <div className="w-full p-3 border rounded-lg bg-white text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {user.phone || "Not Provided"}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition shadow-sm font-semibold"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" /> 
                Order History
                <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                  {orders.length}
                </span>
              </h2>
              
          
            </div>

            {loadingOrders ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 border rounded-xl bg-gray-50 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-blue-500" />
                </div>
                <p className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                  No orders yet
                </p>
                <p className="mb-6 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <button
                  onClick={() => router.push("/inline-skates")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base flex items-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> Browse Products
                </button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border rounded-xl bg-gray-50 text-center">
                <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
                <p className="text-lg font-semibold mb-2 text-gray-800">
                  No matching orders
                </p>
                <p className="mb-4 text-gray-500 text-sm sm:text-base">
                  No orders match your search criteria.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const statusInfo = getOrderStatusInfo(order.status);
                  
                  return (
                    <div
                      key={order.id}
                      className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
                    >
                      {/* Order header */}
                      <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Order #{order.id}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 ${statusInfo.color} text-xs rounded-full font-medium flex items-center gap-1`}>
                            {statusInfo.icon} {statusInfo.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Order items */}
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                  {item.quantity}
                                </div>
                                <span className="font-medium text-gray-800">{item.name}</span>
                              </div>
                              <span className="font-semibold text-gray-900">₹{(item.price / 100) * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order tracking */}
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TruckIcon className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Estimated Delivery:</span>
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order total */}
                      <div className="p-4 border-t border-gray-100 bg-blue-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            Total Amount
                          </span>
                          <span className="text-xl font-bold text-blue-900">
                            ₹{order.totalAmount / 100}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
