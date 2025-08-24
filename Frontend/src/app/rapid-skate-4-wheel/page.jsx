
"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { FaLock } from "react-icons/fa";

const IMG_BASE = '/Rapid Skate ( 4 wheel )-20250620T042233Z-1-001/Rapid Skate ( 4 wheel )/';
const imageNames = [
  'Rapid Skate .jpg',
  'Rapid Skate.jpg',
  'Rapid Skate (2).jpg',
  'Rapid Skate (3).jpg'
];
const images = imageNames.map(n => IMG_BASE + n);

const RapidSkate4Wheel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();

  const product = {
    id: 'rapid-skate-4-wheel',
    name: 'Rapid Skate 4 Wheel',
    price: 1,
    images,
    image: images[0],
    countInStock: 15,
    description: 'Performance inline skate featuring a nimble 4-wheel configuration for higher speeds and maneuverability.',
    specs: {
      brand: 'Rapid',
      wheelSetup: '4 Wheel',
      frame: 'Aluminium'
    }
  };

  const handleAdd = () => {
    if (product.countInStock <= 0) {
      toast.error('Out of stock');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
    setTimeout(() => {
      router.push('/cart');
    }, 1500); // Allow time for toast to show before navigating
  };

  const handleBuyNow = () => {
  if (product.countInStock <= 0) {
    toast.error('Out of stock');
    return;
  }

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;

  if (!user) {
    toast("Please login to continue", {
      icon: <FaLock className="text-orange-500" />
    });
    router.push("/user-login");
    return;
  }

  addToCart(product);
  toast.success('Redirecting to checkout...');
  setTimeout(() => {
    router.push('/checkout');
  }, 1500);
};

  return (
    <div className="min-h-screen bg-gray-50 font-['Arimo']">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="flex-1">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-[60vh] object-contain"
            />
            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`w-16 h-16 object-contain cursor-pointer border ${currentImage === idx ? 'border-blue-600' : 'border-transparent'}`}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-6 mt-10">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl text-blue-600 font-semibold">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-gray-600">{product.description}</p>

            <div>
              <h4 className="font-semibold mb- text-black">Specifications</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {Object.entries(product.specs).map(([k, v]) => (
                  <li key={k} className="flex justify-between">
                    <span className="capitalize">{k}:</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidSkate4Wheel;



