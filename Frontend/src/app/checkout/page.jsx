"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import API_CONFIG from "../../config/api";
import { useCart } from "@/context/CartContext";
import Script from "next/script";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  // Shipping/checkout form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    paymentMethod: "cod",
  });

  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Coupon / discount state ---
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponData, setCouponData] = useState({
    studentName: "",
    academicYear: "",
    studentId: "",
  });
  const [discountApplied, setDiscountApplied] = useState(false);

  // Totals
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = discountApplied ? Math.round(cartTotal * 0.1) : 0; // 10%
  const finalTotal = cartTotal - discountAmount;

  const deliveryMessage = "Free Delivery on every orders! | Extra 10% discount for Academic Students"
      

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCouponChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const applyCoupon = async (e) => {
    e.preventDefault();
    if (
      couponData.studentName &&
      couponData.academicYear &&
      couponData.studentId
    ) {
      try {
        // Save student discount information to backend
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/api/student-discounts`,
          couponData
        );
        
        if (response.data.success) {
          setDiscountApplied(true);
          setShowCouponForm(false);
          toast.success("10% academic discount applied!");
        } else {
          toast.error("Failed to apply discount. Please try again.");
        }
      } catch (error) {
        console.error("Error applying discount:", error);
        // Still apply discount on frontend even if backend fails
        setDiscountApplied(true);
        setShowCouponForm(false);
        toast.success("10% academic discount applied!");
      }
    } else {
      toast.error("Please fill all coupon details.");
    }
  };

  // Razorpay script loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // send discounted amount
    const totalAmount = finalTotal;

    if (formData.paymentMethod === "razorpay") {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load Razorpay SDK.");
        setIsSubmitting(false);
        return;
      }

      try {
        // Create Razorpay order
        const { data } = await axios.post(
          `${API_CONFIG.BASE_URL}/api/payment/order`,
          {
            amount: totalAmount,
          }
        );

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Sports Store",
          description: "Order Payment",
          order_id: data.id,
          handler: async (response) => {
            try {
              // Verify + save order
              const verify = await axios.post(
                `${API_CONFIG.BASE_URL}/api/payment/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  formData,
                  cart,
                  totalAmount,
                  discountApplied,
                  discountAmount,
                  couponData,
                }
              );

              if (verify.data.success) {
                localStorage.removeItem("cart");
                clearCart(); // Clear cart state in context
                toast.success("Order placed successfully!");
                router.push("/inline-skates");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (err) {
              console.error("Payment verification error", err);
              toast.error("Payment verification error.");
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment initiation error", error);
        toast.error("Error initiating Razorpay.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Cash on Delivery
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          cart,
          totalAmount,
          discountApplied,
          discountAmount,
          couponData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("cart");
        clearCart(); // Clear cart state in context
        toast.success("Order placed successfully!");
        router.push("/inline-skates");
      } else {
        toast.error("Failed to place order. Try again.");
      }
    } catch (err) {
      console.error("Order Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-gradient-to-r from-orange-100 via-blue-100 to-white font-['Arimo']">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mb-4">Add items to checkout</p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/cart" className="hover:text-orange-500 transition-colors">Cart</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* LEFT: Shipping form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md w-full lg:w-2/3"
          >
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
                {formData.firstName && <div className="absolute right-3 top-9 text-green-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
                {formData.lastName && <div className="absolute right-3 top-9 text-green-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    rows="2"
                    className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    required
                  ></textarea>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <div className="relative">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="mt-6 text-black">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border rounded-full mr-2 ${formData.paymentMethod === "cod" ? 'border-orange-500' : 'border-gray-300'}`}></div>
                    <div className={`absolute inset-0 rounded-full w-3 h-3 m-1 ${formData.paymentMethod === "cod" ? 'bg-orange-500' : 'bg-transparent'}`}></div>
                  </div>
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border rounded-full mr-2 ${formData.paymentMethod === "razorpay" ? 'border-orange-500' : 'border-gray-300'}`}></div>
                    <div className={`absolute inset-0 rounded-full w-3 h-3 m-1 ${formData.paymentMethod === "razorpay" ? 'bg-orange-500' : 'bg-transparent'}`}></div>
                  </div>
                  <span className="text-gray-700">Online Payment (Credit/Debit Card, UPI, Net Banking)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 sm:mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none relative overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Placing Order...
                </div>
              ) : "Place Order"}
            </button>
          </form>

          {/* RIGHT: Coupon button above summary + Order Summary card */}
          <div className="w-full lg:w-1/3">
            {/* Top-right coupon button (above the card) */}
            <div className="flex justify-end mb-2 mt-4 lg:mt-0">
              {!discountApplied ? (
                <button
                  onClick={() => setShowCouponForm(true)}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Apply Academic Coupon
                </button>
              ) : (
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 flex items-center shadow-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  10% discount applied
                </span>
              )}
            </div>

            {/* Order Summary card */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md sticky top-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 border-b pb-4">Order Summary</h2>
              <div className="max-h-48 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm text-gray-700 mb-3 pb-2 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span className="font-medium">
                        {item.name} <span className="text-gray-500 text-xs font-normal">x{item.quantity}</span>
                      </span>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{cartTotal}</span>
                </div>

              {discountApplied && (
                <div className="flex justify-between text-sm text-green-600 mb-2">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Academic Discount (10%)
                  </span>
                  <span className="font-medium">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">₹0</span>
              </div>
              </div>

              <div className="border-t mt-3 pt-4 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-500">₹{finalTotal}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 mb-4">Including GST</p>

              <div className="bg-gray-50 mt-6 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center text-sm text-green-600 mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {deliveryMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white rounded-xl p-4 sm:p-8 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500 " fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Apply Academic Discount
            </h3>
            <form onSubmit={applyCoupon} className="space-y-3 text-black">
                <input
                type="text"
                name="studentName"
                value={couponData.studentName}
                onChange={handleCouponChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
                <input
                type="text"
                name="academicYear"
                value={couponData.academicYear}
                onChange={handleCouponChange}
                placeholder="Skating Academy Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
                <input
                type="text"
                name="studentId"
                value={couponData.studentId}
                onChange={handleCouponChange}
                placeholder="Student Address"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCouponForm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
