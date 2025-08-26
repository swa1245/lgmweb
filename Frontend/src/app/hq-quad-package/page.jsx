"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { FaTruck, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const HQQuadPackagePage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isInStock, setIsInStock] = useState(true);
  const [loading, setLoading] = useState(true);

  // Product details
  const product = {
    id: "hq-quad-package",
    name: "HQ Quad Package",
    price: 18000,
    description: "Premium quad skate package with high-quality components for advanced skaters",
    image: "/assets/quad-skates/hq-package.jpg", // Replace with actual image path
    features: [
      "Professional-grade quad skates for advanced performance",
      "CNC machined aluminum frame for maximum durability",
      "Premium leather boot with enhanced ankle support",
      "ABEC-9 precision bearings for superior speed and smoothness",
      "High-rebound polyurethane wheels for optimal grip and roll",
      "Adjustable toe stop for precise control",
      "Includes deluxe protective gear set and carrying bag"
    ],
    specifications: {
      "Boot Material": "Genuine leather with memory foam padding",
      "Frame": "CNC machined aluminum alloy",
      "Wheels": "62mm/92A hardness high-rebound polyurethane",
      "Bearings": "ABEC-9 precision",
      "Closure": "Laces with ankle strap and metal buckle",
      "Weight": "Approximately 1.4kg per skate",
      "Recommended For": "Intermediate to advanced skaters",
      "Package Includes": "Pair of premium quad skates, deluxe protective gear set, carrying bag"
    }
  };

  useEffect(() => {
    // Check if product is in stock (from localStorage or could be from API)
    const stockStatus = JSON.parse(localStorage.getItem("lgmStockStatus") || "{}");
    setIsInStock(stockStatus[product.id] !== false);
    setLoading(false);
  }, []);

  const handleAddToCart = () => {
    if (!isInStock) return;
    
    addToCart({
      ...product,
      quantity: 1,
    });
    
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push("/quad-skates")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Quad Skates</span>
        </button>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="relative w-full h-[400px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  style={!isInStock ? { opacity: 0.5 } : {}}
                />
                {!isInStock && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-2 flex items-center">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                <span className="ml-2 text-sm text-gray-500">Including GST</span>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                <ul className="mt-2 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-8 rounded-lg text-white font-semibold transition-all ${
                    isInStock
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FiShoppingCart size={20} />
                  {isInStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              {/* Shipping and Warranty */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaTruck className="text-purple-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Delivery in 3-5 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaShieldAlt className="text-purple-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">2 Year Warranty</h4>
                    <p className="text-sm text-gray-600">Full coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 px-8 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium text-gray-900 w-40">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HQQuadPackagePage;
