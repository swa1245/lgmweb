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
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/admin-login");
    } else {
      fetch("http://localhost:5000/api/admin/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          }
        })
        .catch((err) => console.error("Failed to fetch orders", err));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#e8f0ff] to-[#ffffff] font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          View all user orders and details.
        </p>

        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3"><User className="inline w-4 h-4 mr-1" />User</th>
                <th className="px-4 py-3"><Mail className="inline w-4 h-4 mr-1" />Email</th>
                <th className="px-4 py-3"><Phone className="inline w-4 h-4 mr-1" />Phone</th>
                <th className="px-4 py-3"><MapPin className="inline w-4 h-4 mr-1" />Address</th>
                <th className="px-4 py-3"><CreditCard className="inline w-4 h-4 mr-1" />Payment</th>
                <th className="px-4 py-3"><IndianRupee className="inline w-4 h-4 mr-1" />Total</th>
                <th className="px-4 py-3"><Clock className="inline w-4 h-4 mr-1" />Date</th>
                <th className="px-4 py-3"><Package className="inline w-4 h-4 mr-1" />Items</th>
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
                    <td className="px-4 py-3 font-medium text-gray-800">#{order.id}</td>
                    <td className="px-4 py-3">{order.firstName} {order.lastName}</td>
                    <td className="px-4 py-3">{order.email}</td>
                    <td className="px-4 py-3">{order.phone}</td>
                    <td className="px-4 py-3 text-xs">
                      {order.address}, {order.city}, {order.state} - {order.pincode}
                    </td>
                    <td className="px-4 py-3">{order.paymentMethod}</td>
                    <td className="px-4 py-3 font-semibold text-black">₹{order.totalAmount}</td>
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
      </div>
    </div>
  );
}
