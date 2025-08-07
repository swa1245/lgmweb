
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    paymentMethod: "cod", //Updated default to "cod" (Cash on Delivery)
  });

  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = cartTotal > 10000 ? 0 : 400;
  const deliveryMessage =
    cartTotal > 10000
      ? "Free Delivery on every orders! | Extra 10% discount for Academic Students"
      : "Fixed ₹400 Delivery + 12% GST on other orders";

  const calculateGST = (amount) => Math.round((amount * 12) / 100);
  const calculateTotalWithGST = (subtotal, delivery) =>
    subtotal + delivery + calculateGST(subtotal + delivery);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const totalAmount = calculateTotalWithGST(cartTotal, deliveryCharge);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          cart,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("cart");

        toast.success("Order placed successfully!");

        router.push("/userProfile");
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
          <h2 className="text-2xl font-bold text-gray-700">
            Your cart is empty
          </h2>
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
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-blue-100 to-white py-2 font-['Arimo'] pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 w-full lg:w-2/3"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name *
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="2"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
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
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pincode *
                </label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="mt-6 text-black">
              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === "razorpay"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Online Payment (Credit/Debit Card, UPI, Net Banking)
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-700 mb-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-3" />
              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Delivery Charges</span>
                <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                  ₹{deliveryCharge}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{deliveryMessage}</p>
              <div className="flex justify-between text-sm text-gray-700">
                <span>GST (12%)</span>
                <span>₹{calculateGST(cartTotal + deliveryCharge)}</span>
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{calculateTotalWithGST(cartTotal, deliveryCharge)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Including GST</p>

              <div className="bg-gray-50 mt-4 p-3 rounded">
                <div className="flex items-center text-sm text-green-600 mb-1">
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
                <div className="flex items-center text-sm text-green-600">
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
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
