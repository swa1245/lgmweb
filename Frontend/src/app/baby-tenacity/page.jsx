"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";

// Baby Skates Images
const babySkate2 = "/assets/1-Baby-Skate/AARMS-Photography-185.jpg";
const babySkate3 = "/assets/1-Baby-Skate/AARMS-Photography-186.jpg";

export default function BabyTenacitySkates() {
  const { addToCart } = useCart();

  const [view, setView] = useState("grid");
  const [productsWithStockStatus, setProductsWithStockStatus] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productsBase = [
    {
      id: "baby-skate-1",
      name: "Baby Skate",
      image: babySkate2,
      images: [babySkate2, babySkate3],
      price: 1200,
      description: "Durable and reliable skates for growing children",
      specs: {
        usage: "Skating",
        wheels: "4 Wheel",
        material: "Stainless Steel",
        size: "Tenacity Size",
      },
      // default countInStock; overridden by localStorage if present
      countInStock: 15,
    },
    // you can add more products here...
  ];

  // Add to cart handler (reads lgmStockStatus from localStorage)
  const handleAddToCart = (product) => {
    try {
      const stockStatusData = JSON.parse(
        localStorage.getItem("lgmStockStatus") || "{}"
      );
      const isOutOfStock =
        stockStatusData[product.id] === false || product.countInStock <= 0;

      if (isOutOfStock) {
        toast.error(`${product.name} is currently out of stock`);
        return;
      }

      addToCart({
        id: product.id,
        type: "bag",
        name: product.name,
        price: product.price,
        quantity: 1,
      });

      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error in handleAddToCart:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Open modal (image viewer)
  const openImageModal = (product, index = 0) => {
    setSelectedProduct(product);
    setCurrentImageIndex(index);
    // prevent body scroll (optional)
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "";
  };

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


  const checkStockStatus = () => {
    try {
      const stockStatusData = JSON.parse(
        localStorage.getItem("lgmStockStatus") || "{}"
      );

      const updated = productsBase.map((p) => {
        const isOutOfStock = stockStatusData[p.id] === false;
        return {
          ...p,
          countInStock: isOutOfStock ? 0 : p.countInStock ?? 15,
        };
      });
      setProductsWithStockStatus(updated);
    } catch (err) {
      console.error("checkStockStatus error:", err);
      setProductsWithStockStatus(productsBase);
    }
  };

  useEffect(() => {
    // initial check
    checkStockStatus();

    // storage event listener (fires in other tabs/windows)
    const handleStorage = (e) => {
      if (e.key === "lgmStockStatus" || e.key === null) {
        checkStockStatus();
      }
    };
    window.addEventListener("storage", handleStorage);

    // poll every 3 seconds (covers same-tab updates)
    const interval = setInterval(checkStockStatus, 3000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // choose which list to show
  const productsToRender =
    productsWithStockStatus.length > 0 ? productsWithStockStatus : productsBase;

  return (
    <div className="min-h-screen bg-gray-50 font-['Arimo']">

      {typeof SubNav !== "undefined" && <SubNav />}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="border-b border-gray-200 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Skating Bags
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Professional storage solutions for your skating equipment
          </p>

          <div className="flex items-center justify-between pb-6">
            <p className="text-gray-600">{productsToRender.length} products</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${
                  view === "grid" ? "text-gray-900" : "text-gray-400"
                }`}
                aria-label="Grid view"
              >
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
                aria-label="List view"
              >
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

        {/* Product Grid/List */}
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid-cols-1 gap-6"
          }`}
        >
          {productsToRender.map((product) => (
            <article
              key={product.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                view === "list" ? "flex" : "flex flex-col"
              }`}
            >
              {/* Image container */}
              <div
                className={`relative group ${
                  view === "grid" ? "h-70" : "w-1/3 h-56"
                }`}
              >
                {/* Use first image as thumbnail */}
                <button
                  onClick={() => openImageModal(product, 0)}
                  aria-label={`Open ${product.name} images`}
                  className="absolute inset-0 z-10"
                />
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={1200}
                    height={900}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Stock badge */}
                <div className="absolute top-2 right-2 z-20">
                  {product.countInStock <= 0 ? (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      In Stock
                    </span>
                  )}
                </div>

                {/* Center eye button (appears on hover) */}
                <button
                  onClick={() => openImageModal(product, 0)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white/95 rounded-full shadow-xl hover:bg-white opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 z-30"
                >
                  {/* Eye icon (SVG) */}
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

                {/* small carousel dots (hover) */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {product.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full ${
                          currentImageIndex === idx ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div
                className={`flex flex-col ${
                  view === "grid" ? "flex-1 p-6" : "w-2/3 p-6"
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.countInStock <= 0}
                        className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 hover:shadow-lg ${
                          product.countInStock > 0
                            ? "bg-blue-600 text-white hover:bg-blue-700 active:transform active:scale-95 cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {/* cart icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>

                        {product.countInStock <= 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Specifications:
                      </h4>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <li
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <span className="capitalize font-medium text-gray-700">
                              {key}:
                            </span>
                            <span className="text-gray-600">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Image Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeImageModal}
          >
            <div
              className="relative max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
                aria-label="Close preview"
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

              <div className="relative bg-white rounded-lg overflow-hidden">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={selectedProduct.images[currentImageIndex]}
                    alt={`${selectedProduct.name} - ${currentImageIndex + 1}`}
                    width={2000}
                    height={1400}
                    className="w-full h-[80vh] object-contain"
                    priority
                  />
                </div>

                {/* Prev / Next */}
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
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
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
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
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {selectedProduct.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full ${
                        currentImageIndex === idx
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Concluding Section */}
        <div className="max-w-4xl mx-auto mt-16 mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose LGM Skating Bags?
          </h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              LGM skating bags LGM skating bags are designed with the needs of
              both recreational and professional skaters in mind. Our bags
              feature durable materials, thoughtful compartmentalization, and
              ergonomic designs to protect your valuable skating equipment while
              making transportation effortless.
            </p>
            <p>
              From compact bags for casual skaters to professional-grade storage
              solutions for competitive athletes, each LGM bag is crafted with
              attention to detail and built to last. Experience the perfect
              blend of functionality, style, and durability with LGM skating
              bags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
