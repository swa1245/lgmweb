"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  IndianRupee,  
  Clock,
  Package,
  Boxes,
  CheckCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [stockUpdates, setStockUpdates] = useState({});

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/admin-login");
    } else {
      fetch("http://localhost:5000/api/admin/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOrders(data.orders);
        });

      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }
  }, []);

  const handleStockChange = (productId, newStock) => {
    const value = parseInt(newStock);
    if (!isNaN(value)) {
      setStockUpdates((prev) => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const updateStock = async (productId) => {
    const updatedStock = stockUpdates[productId];
    if (updatedStock === undefined || isNaN(updatedStock)) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockQuantity: updatedStock }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Stock updated successfully!");
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stockQuantity: updatedStock } : p
          )
        );
        setStockUpdates((prev) => {
          const { [productId]: _, ...rest } = prev;
          return rest;
        });
      } else {
        alert("❌ Failed to update stock.");
      }
    } catch (err) {
      console.error("Error updating stock:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#e8f0ff] to-[#ffffff] font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage orders and product stock.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("stocks")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "stocks"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Manage Stock
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">
                    <User className="inline w-4 h-4 mr-1" />User
                  </th>
                  <th className="px-4 py-3">
                    <Mail className="inline w-4 h-4 mr-1" />Email
                  </th>
                  <th className="px-4 py-3">
                    <Phone className="inline w-4 h-4 mr-1" />Phone
                  </th>
                  <th className="px-4 py-3">
                    <MapPin className="inline w-4 h-4 mr-1" />Address
                  </th>
                  <th className="px-4 py-3">
                    <CreditCard className="inline w-4 h-4 mr-1" />Payment
                  </th>
                  <th className="px-4 py-3">
                    <IndianRupee className="inline w-4 h-4 mr-1" />Total
                  </th>
                  <th className="px-4 py-3">
                    <Clock className="inline w-4 h-4 mr-1" />Date
                  </th>
                  <th className="px-4 py-3">
                    <Package className="inline w-4 h-4 mr-1" />Items
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        #{order.id}
                      </td>
                      <td className="px-4 py-3">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="px-4 py-3">{order.email}</td>
                      <td className="px-4 py-3">{order.phone}</td>
                      <td className="px-4 py-3 text-xs">
                        {order.address}, {order.city}, {order.state} -{" "}
                        {order.pincode}
                      </td>
                      <td className="px-4 py-3">{order.paymentMethod}</td>
                      <td className="px-4 py-3 font-semibold text-black">
                        ₹{order.totalAmount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <ul className="list-disc ml-4 text-xs">
                          {order.items.map((item) => (
                            <li key={item.id}>
                              {item.name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Stock Tab */}
        {activeTab === "stocks" && (
          <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">
                    <Boxes className="inline w-4 h-4 mr-1" />Product
                  </th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Current Stock</th>
                  <th className="px-4 py-3">Update</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">₹{product.price}</td>
                    <td className="px-4 py-3">{product.stockQuantity}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        placeholder="Enter new stock"
                        value={stockUpdates[product.id] ?? ""}
                        onChange={(e) =>
                          handleStockChange(product.id, e.target.value)
                        }
                        className="border px-2 py-1 w-24 rounded mr-2"
                      />
                      <button
                        onClick={() => updateStock(product.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" /> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
