'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const CartPage = () => {
  return (
    <>
      <main className="flex flex-col justify-between min-h-[100dvh] bg-gray-50 ">
        {/* Cart Content */}
        <div className="px-4 py-10 md:px-20 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

          <div className="flex flex-col items-center justify-center text-center space-y-4 bg-white py-12 px-4 rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Your cart is currently empty</h2>
            <p className="text-gray-500">Looks like you haven’t added anything to your cart yet.</p>
            <Link href="/">
              <button className="bg-orange-400 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

              {/* Footer */}
              <footer className="text-black  py-6  ">
                <Footer />
              </footer>
      </main>
    </>
  );
};

export default CartPage;
