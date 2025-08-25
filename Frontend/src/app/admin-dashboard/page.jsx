"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import API_CONFIG from "../../config/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  IndianRupee,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  GraduationCap,
  Calendar,
  FileText,
  Truck,
  CheckSquare,
  ChevronDown,
  X
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [studentDiscounts, setStudentDiscounts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, orderId: null, status: null });

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/admin-login");
    } else {
      setIsLoading(true);
      
      // Fetch orders
      fetch(`${API_CONFIG.BASE_URL}/api/admin/orders`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Add default status if not present
            const ordersWithStatus = data.orders.map(order => ({
              ...order,
              status: order.status || "processing"
            }));
            setOrders(ordersWithStatus);
          }
        })
        .catch(err => {
          console.error("Error fetching orders:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Fetch student discount applications
      axios.get(`${API_CONFIG.BASE_URL}/api/student-discounts`)
        .then(response => {
          if (response.data.success) {
            setStudentDiscounts(response.data.data);
          }
        })
        .catch(error => {
          console.error("Error fetching student discounts:", error);
        });
    }
  }, [router]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchLower) ||
      order.email.toLowerCase().includes(searchLower) ||
      order.phone.includes(searchLower)
    );
  });
  
  // Show confirmation modal before updating status
  const showConfirmationModal = (orderId, newStatus) => {
    setConfirmModal({ show: true, orderId, status: newStatus });
    setOpenDropdown(null); // Close the dropdown
  };

  // Handle order status update after confirmation
  const updateOrderStatus = async () => {
    const { orderId, status: newStatus } = confirmModal;
    setIsUpdating(true);
    try {
      const response = await axios.put(`${API_CONFIG.BASE_URL}/api/admin/orders/status`, {
        orderId,
        status: newStatus
      });
      
      if (response.data.success) {
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // Show success notification
        setNotification({
          show: true,
          message: `Order #${orderId} status updated to ${newStatus}`,
          type: "success"
        });
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          setNotification({ show: false, message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setNotification({
        show: true,
        message: "Failed to update order status",
        type: "error"
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    } finally {
      setIsUpdating(false);
      setConfirmModal({ show: false, orderId: null, status: null });
    }
  };
  
  // Cancel status update
  const cancelStatusUpdate = () => {
    setConfirmModal({ show: false, orderId: null, status: null });
  };
  
  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch(status) {
      case "processing":
        return (
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Processing
          </span>
        );
      case "shipped":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium flex items-center gap-1">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between ${notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <div className="flex items-center">
              {notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <p>{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification({ show: false, message: "", type: "" })}
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Header with gradient underline */}
        <div className="relative pb-2 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Admin Dashboard
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Manage customer orders and student discounts efficiently
          </p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
        </div>
        
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
            <Package className="w-4 h-4 inline mr-1" /> Orders
          </button>
          <button
            onClick={() => setActiveTab("student-discounts")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "student-discounts"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <GraduationCap className="w-4 h-4 inline mr-1" /> Student Discounts
          </button>
        </div>

        {/* Orders Section */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" /> 
              Customer Orders
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                {filteredOrders.length}
              </span>
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredOrders.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg">No orders found</p>
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-4 text-blue-600 hover:text-blue-800 underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white shadow-md rounded-xl p-5 border-l-4 border-blue-500 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">Order #{order.id}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="relative">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)}
                            className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
                            disabled={isUpdating}
                          >
                            {getStatusBadge(order.status)}
                            <ChevronDown className="w-3 h-3 ml-1" />
                          </button>
                          
                          {openDropdown === order.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 z-10 w-40 border border-gray-200">
                              <div className="flex justify-between items-center px-3 py-1 border-b border-gray-100">
                                <span className="text-xs font-medium text-gray-500">Update Status</span>
                                <button 
                                  onClick={() => setOpenDropdown(null)}
                                  className="text-gray-900 hover:text-gray-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <button 
                                onClick={() => showConfirmationModal(order.id, "processing")}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${order.status === "processing" ? "bg-orange-50 text-orange-700" : ""}`}
                              >
                                <Clock className="w-3 h-3 text-orange-700" /> <span className="text-orange-700">Processing</span>
                              </button>
                              <button 
                                onClick={() => showConfirmationModal(order.id, "shipped")}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${order.status === "shipped" ? "bg-blue-50 text-blue-700" : ""}`}
                              >
                                <Truck className="w-3 h-3 text-blue-700" /> <span className="text-blue-700">Shipped</span>
                              </button>
                              <button 
                                onClick={() => showConfirmationModal(order.id, "delivered")}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${order.status === "delivered" ? "bg-green-50 text-green-700" : ""}`}
                              >
                                <CheckCircle className="w-3 h-3 text-green-700" /> <span className="text-green-700">Delivered</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="flex items-center gap-2 mb-1 text-sm">
                            <User className="w-3 h-3 text-orange-700" />
                            <span className="font-medium text-gray-700">{order.firstName} {order.lastName}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-gray-500 pl-6">
                            <Mail className="w-3 h-3 text-gray-700" />
                            <span className="text-gray-700">{order.email}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-gray-500 pl-6">
                            <Phone className="w-3 h-3 text-gray-700" />
                            <span className="text-gray-700">{order.phone}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-700">
                            {order.address}, {order.city}, {order.state} - {order.pincode}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-yellow-500" />
                            <span className="bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded text-xs">{order.paymentMethod}</span>
                          </p>
                          <p className="flex items-center gap-1 font-bold text-gray-900">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            {order.totalAmount / 100}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="font-medium flex items-center gap-2 text-blue-600 mb-2">
                          <Package className="w-4 h-4" /> Order Items
                        </p>
                        <ul className="space-y-1 text-sm">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between bg-blue-50 px-3 py-1 rounded">
                              <span className="text-gray-700">{item.name}</span>
                              <span className="font-medium text-blue-800">× {item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Student Discounts Section */}
        {activeTab === "student-discounts" && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" /> 
              Student Discount Applications
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                {studentDiscounts.length}
              </span>
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading student discounts...</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studentDiscounts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg">No student discount applications found</p>
                  </div>
                ) : (
                  studentDiscounts.map((discount) => (
                    <div
                      key={discount.id}
                      className="bg-white shadow-md rounded-xl p-5 border-l-4 border-green-500 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">Application #{discount.id}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(discount.createdAt).toLocaleDateString("en-IN", { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Applied
                        </span>
                      </div>

                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="font-medium"> Student Name:{discount.studentName}</span>
                          </p>
                          <p className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span>STudent Skating Name: <span className="font-medium">{discount.academicYear}</span></span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-500" />
                            <span>Student Address: <span className="font-medium">{discount.studentId}</span></span>
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">Discount Applied: 10%</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Student Verified</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {confirmModal.status === "processing" && <Clock className="w-8 h-8 text-blue-600" />}
                {confirmModal.status === "shipped" && <Truck className="w-8 h-8 text-blue-600" />}
                {confirmModal.status === "delivered" && <CheckCircle className="w-8 h-8 text-blue-600" />}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Status Update</h3>
              <p className="text-gray-600">
                Are you sure you want to update Order #{confirmModal.orderId} status to <span className="font-medium capitalize">{confirmModal.status}</span>?
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelStatusUpdate}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={updateOrderStatus}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px]"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
