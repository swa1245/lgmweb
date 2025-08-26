"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { FaTruck, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const BasicFullSetPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isInStock, setIsInStock] = useState(true);
  const [loading, setLoading] = useState(true);

  // Product details
  const product = {
    id: "basic-full-set",
    name: "Basic Full Set Package",
    price: 12000,
    description: "Complete quad skate package for beginners with all essentials",
    image: "/assets/quad-skates/basic-set.jpg", // Replace with actual image path
    features: [
      "High-quality entry-level quad skates",
      "Durable aluminum frame",
      "Comfortable padded boot",
      "ABEC-7 bearings for smooth rolling",
      "Includes protective gear set (knee pads, elbow pads, wrist guards)",
      "Suitable for beginners and recreational skaters"
    ],
    specifications: {
      "Boot Material": "Synthetic leather with padding",
      "Frame": "Aluminum alloy",
      "Wheels": "58mm/85A hardness",
      "Bearings": "ABEC-7",
      "Closure": "Laces and ankle strap",
      "Weight": "Approximately 1.2kg per skate",
      "Recommended For": "Beginners and recreational skaters",
      "Package Includes": "Pair of quad skates, protective gear set"
    }
  };

  // Additional product options
  const additionalProducts = [
    {
      id: "A0015",
      name: "Rubber Wheel Package + Bag",
      price: 5040,
      description: "Premium rubber wheels with carrying bag for quad skates",
      image: "/assets/quad-skates/rubber-wheel-package.jpg", // Replace with actual image path
      features: [
        "High-quality rubber wheels for smooth rolling",
        "Durable carrying bag included",
        "Perfect for indoor and outdoor skating",
        "Easy to install"
      ]
    },
    {
      id: "A0016",
      name: "Tyro Wheel Package + Bag",
      price: 6160,
      description: "Professional-grade wheels for beginners with storage bag",
      image: "/assets/quad-skates/tyro-wheel-package.jpg", // Replace with actual image path
      features: [
        "Beginner-friendly wheel hardness",
        "Enhanced grip for better control",
        "Stylish storage bag included",
        "Compatible with all standard quad frames"
      ]
    },
    {
      id: "A0017",
      name: "Hyper Rollo Package + Bag",
      price: 7280,
      description: "High-performance wheels with premium carrying case",
      image: "/assets/quad-skates/hyper-rollo-package.jpg", // Replace with actual image path
      features: [
        "Competition-grade wheels for advanced skaters",
        "Precision-engineered for speed and control",
        "Deluxe carrying case with compartments",
        "Includes installation tool kit"
      ]
    }
  ];

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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push("/quad-skates")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Quad Skates</span>
        </button>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
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
                      <span className="text-green-500 mr-2">✓</span>
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
                      ? "bg-blue-600 hover:bg-blue-700"
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
                  <FaTruck className="text-blue-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Delivery in 3-5 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaShieldAlt className="text-blue-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">1 Year Warranty</h4>
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

        {/* Additional Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Add-ons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-contain"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <span className="font-bold text-blue-600">₹{item.price}</span>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => {
                      addToCart({
                        ...item,
                        quantity: 1,
                      });
                      toast.success(`${item.name} added to cart!`, {
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#fff',
                        },
                      });
                    }}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicFullSetPage;
