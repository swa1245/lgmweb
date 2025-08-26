"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import { FaTruck, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

// Placeholder image URL
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBDb21pbmcgU29vbjwvdGV4dD4KPC9zdmc+";

const QuadShoesPage = () => {
  const [view, setView] = useState("grid");
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // selections shape: { [productId]: { color: string, size: string } }
  const [selections, setSelections] = useState({});

  const setSelection = (productId, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { ...(prev[productId] || {}), [field]: value },
    }));
  };

  const handleAddToCart = (product) => {
    const { color = "", size = "" } = selections[product.id] || {};
    addToCart({ ...product, selectedColor: color, selectedSize: size });
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleBuyNow = (product) => {
    const { color = "", size = "" } = selections[product.id] || {};
    addToCart({ ...product, selectedColor: color, selectedSize: size });
    router.push("/checkout");
  };

  const openImageModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };
  
  const closeImageModal = () => setSelectedProduct(null);

  const nextImage = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProduct) return;
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeImageModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  // Product details
  const products = [
    {
      id: "A0035-baby-tenacity-shoes",
      name: "Baby/Tenacity Shoes",
      price: 1008,
      image: placeholderImage,
      images: [placeholderImage, placeholderImage],
      countInStock: 15,
      description:
        "Durable Baby/Tenacity shoes designed for beginner skaters with comfort and stability.",
      specs: {
        brand: "Tenacity",
        wheelSetup: "Quad",
        frame: "Plastic",
      },
    },
    
    {
      id: "A0036-quad-shoes",
      name: "Quad Shoes",
      price: 2016,
      image: placeholderImage,
      images: [placeholderImage, placeholderImage],
      countInStock: 15,
      description:
        "Classic quad shoes offering reliable performance for recreational skating.",
      specs: {
        brand: "Generic",
        wheelSetup: "Quad",
        frame: "Aluminium",
      },
    },
    
    {
      id: "A0037-hq-quad-shoes",
      name: "HQ Quad Shoes",
      price: 2464,
      image: placeholderImage,
      images: [placeholderImage, placeholderImage],
      countInStock: 15,
      description:
        "High-quality HQ quad shoes designed for comfort and durability on all surfaces.",
      specs: {
        brand: "HQ",
        wheelSetup: "Quad",
        frame: "Aluminium",
      },
    },
    
    {
      id: "A0038-nivia-safari-shoes",
      name: "NIVIA Safari Shoes",
      price: 3024,
      image: img1,
      images: [img1, img2],
      countInStock: 15,
      description:
        "NIVIA Safari shoes built for style, endurance, and smooth quad skating experience.",
      specs: {
        brand: "NIVIA",
        wheelSetup: "Quad",
        frame: "Aluminium",
      },
    },
    
    {
      id: "A0039-carban-quad-shoes",
      name: "Carban Quad Shoes",
      price: 7280,
      image: placeholderImage,
      images: [placeholderImage, placeholderImage],
      countInStock: 15,
      description:
        "Premium Carban quad shoes offering excellent grip, stability, and long-lasting performance.",
      specs: {
        brand: "Carban",
        wheelSetup: "Quad",
        frame: "Aluminium",
      },
    },
    
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Arimo']">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push("/quad-skates")}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-6 transition-colors"
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
                      <span className="text-pink-500 mr-2">✓</span>
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
                      ? "bg-pink-600 hover:bg-pink-700"
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
                  <FaTruck className="text-pink-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Delivery in 3-5 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <FaShieldAlt className="text-pink-500 text-xl" />
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
      </div>
    </div>
  );
};

export default QuadShoesPage;
