"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BearingPullerCombo() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  
  const product = {
    id: "bearing-puller-combo-2",
    name: "Bearing Puller Combo",
    description: "Professional bearing puller combo for easy removal and installation of bearings in your skates. Essential tool for skate maintenance and customization.",
    price: 3000,
    image: "/assets/124- Bearing Puller Combo/AARMS Photography-147.jpg",
    features: [
      "Precision engineered for easy bearing removal",
      "Works with all standard skate bearings",
      "Ergonomic grip for comfortable use",
      "Durable steel construction",
      "Includes bearing press tool"
    ],
    specifications: {
      material: "Hardened steel with rubber grip",
      weight: "350g",
      dimensions: "18cm x 5cm x 3cm",
      compatibility: "All standard 608, 688, and 627 bearings"
    }
  };

  const handleAddToCart = () => {
    // Get existing cart or initialize empty array
    const cart = JSON.parse(localStorage.getItem('lgmCart') || '[]');
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    // Save updated cart
    localStorage.setItem('lgmCart', JSON.stringify(cart));
    
    // Show success message
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/workout-gear" className="text-blue-600 hover:underline flex items-center gap-1">
          ← Back to Workout Gear
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-semibold text-gray-800 mb-4">₹{product.price}</div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l"
              >
                -
              </button>
              <span className="bg-gray-100 px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Features and Specifications */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Specifications</h2>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2">
                <span className="text-gray-600 capitalize">{key}:</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
