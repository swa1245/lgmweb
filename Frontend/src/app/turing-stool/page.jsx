"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { toast } from 'react-hot-toast';

export default function TuringStool() {
  const [view, setView] = useState("grid");
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // selections shape: { [productId]: { color: string, size: string } }
  const [selections, setSelections] = useState({});

  const setSelection = (productId, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: { ...(prev[productId] || {}), [field]: value },
    }));
  };
  
  const product = {
    id: "turing-stool-3",
    name: "Turing Stool",
    description: "Premium quality turing stool designed for skaters and coaches. Perfect for training sessions and technique development with adjustable height and stable base.",
    price: 65000,
    image: "/assets/126- Turing Stool/AARMS Photography-162.jpg",
    images: ["/assets/126- Turing Stool/AARMS Photography-162.jpg"],
    countInStock: 10,
    features: [
      "Adjustable height for different training positions",
      "Stable base prevents tipping during use",
      "Padded seat for comfort during extended sessions",
      "Lightweight yet durable construction",
      "Non-slip feet for safety"
    ],
    specs: {
      material: "Aircraft-grade aluminum frame with padded seat",
      weight: "3.5kg",
      maxWeight: "150kg",
      dimensions: "45cm x 45cm x 60-90cm (adjustable)",
      color: "Black/Silver"
    }
  };

  const handleAddToCart = () => {
    const { color = "", size = "" } = selections[product.id] || {};
    addToCart({ ...product, selectedColor: color, selectedSize: size, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    const { color = "", size = "" } = selections[product.id] || {};
    addToCart({ ...product, selectedColor: color, selectedSize: size, quantity: 1 });
    router.push("/checkout");
  };

  const openImageModal = () => {
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

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="border-b border-gray-200 mb-8">
          <div className="mb-6">
            <Link href="/workout-gear" className="text-blue-600 hover:underline flex items-center gap-1">
              ← Back to Workout Gear
            </Link>
          </div>
          <div className="flex items-center justify-between pb-6">
            <h1 className="text-3xl font-bold font-['Arimo'] text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${
                  view === "grid" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {/* grid icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${
                  view === "list" ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {/* list icon */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Display */}
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 gap-8"
              : "grid-cols-1 gap-6"
          }`}
        >
          <div
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              view === "list" ? "flex" : "flex flex-col"
            }`}
          >
            {/* Image */}
            <div
              className={`relative group ${
                view === "grid" ? "h-70" : "w-1/3 h-56"
              }`}
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* ✅ Stock Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                  product.countInStock > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <button
                onClick={() => openImageModal()}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 
                  bg-white/95 rounded-full shadow-xl hover:bg-white cursor-pointer
                  transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View images"
              >
                {/* eye icon */}
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>

            {/* Details */}
            <div
              className={`flex flex-col ${
                view === "grid" ? "flex-1 p-6" : "w-2/3 p-6"
              }`}
            >
              <h3 className="text-2xl font-bold font-['Arimo'] text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="space-y-4">

                {/* Price + CTAs */}
                <div className="flex justify-between items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 hover:shadow-lg active:transform active:scale-95 cursor-pointer"
                    >
                      {/* cart icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a1 1 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 hover:shadow-lg active:transform active:scale-95 cursor-pointer"
                    >
                      {/* check icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Specifications */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-['Arimo'] font-bold text-gray-900 mb-2">
                    Specifications:
                  </h4>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key} className="flex justify-between items-center">
                        <span className="capitalize font-medium text-gray-700">
                          {key}:
                        </span>
                        <span className="text-gray-600">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-['Arimo'] font-bold text-gray-900 mb-2">
                    Features:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              aria-label="Close"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {selectedProduct.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 text-white hover:text-blue-400"
                aria-label="Previous image"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {selectedProduct.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 text-white hover:text-blue-400"
                aria-label="Next image"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.name}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
