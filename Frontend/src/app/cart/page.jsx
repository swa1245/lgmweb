"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
    cartUpdated,
    setCartUpdated,
    clearCart,
  } = useCart();

  const router = useRouter();
  const cartTotal = getCartTotal();

  useEffect(() => {
    if (cartUpdated) {
      setCartUpdated(false);
    }
  }, [cartUpdated, setCartUpdated]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 md:py-12 font-['Arimo'] flex flex-col">
        <div className="container mx-auto px-4 flex-grow flex items-center justify-center">
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 text-center border border-white/60 transform transition-all duration-300 hover:shadow-xl">
              <div className="w-40 h-40 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20 animate-pulse"></div>
                <svg className="w-full h-full text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16Z" />
                  <path d="M6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23Z" />
                  <path d="M18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H17V11H7V13Z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center max-w-md mx-auto ">
                Your Cart is Empty
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Explore our products and find something you'll love!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/inline-skates"
                  className="inline-flex items-center justify-center bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Start Shopping
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-white border border-gray-300  px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-medium hover:bg-gray-50 hover:text-orange-500 transition-all duration-300 gap-2"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                 <span className="text-blue-500">Back to Home</span>
                </Link>
              </div>
              <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-500">
                <p>Need help with your order? <a href="/Contact" className="text-orange-500 hover:underline">Contact our support team</a></p>
              </div>
            </div>
            <div className="mt-8 bg-orange-50 rounded-xl p-4 border border-orange-100">
              <h3 className="font-medium text-orange-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Recommended for you
              </h3>
              <p className="text-sm text-orange-700">Check out our latest products or explore special offers in our featured collection.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 sm:py-8 md:py-12 font-['Arimo'] flex flex-col justify-between">
      <div className="container mx-auto px-3 sm:px-4 flex-grow">
        <div className="max-w-6xl mx-auto backdrop-blur-sm bg-white/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/40">
          <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 border-b border-gray-200/60">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <span className="mr-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-orange-600/30 after:to-orange-400/30">Shopping Cart</span>
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md">{cart.length}</span>
            </h1>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-500 transition-all duration-300 text-sm md:text-base flex items-center gap-2 group shadow-sm hover:shadow"
            >
              <svg className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear Cart
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="flex-grow space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.type}`}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 border border-gray-100 relative group hover:border-orange-200 animate-fadeIn hover:-translate-y-1"
                >
                  <div className="absolute -top-2 -left-2 bg-gradient-to-br from-orange-500 to-orange-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110 duration-300 animate-pulse">
                    {item.quantity}
                  </div>

                  <div className="flex-grow relative animate-slide-in text-center sm:text-left">
                    <h3 className="text-sm md:text-base font-semibold tracking-tight text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col xs:flex-row sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end mt-3 sm:mt-0">
                    <div className="flex items-center bg-gradient-to-r from-gray-50 to-white rounded-full overflow-hidden shadow-sm border border-gray-200 group-hover:border-orange-200 transition-colors duration-300">
                      <button
                        onClick={() => decrementQuantity(item.id, item.type)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-2 md:px-3 py-1 min-w-[32px] md:min-w-[40px] text-center text-sm md:text-base font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item.id, item.type)}
                        disabled={item.quantity >= item.countInStock}
                        className={`w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                          item.quantity >= item.countInStock
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-red-500 hover:text-white hover:bg-red-500 border border-red-400 hover:border-red-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow transform hover:scale-105 active:scale-90"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 mt-6 lg:mt-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 sticky top-24 border border-gray-100 hover:border-orange-200 animate-scale-in">
                <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-6 flex items-center tracking-tight">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  Order Summary
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-100/50 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm md:text-base text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Subtotal ({cart.length} items)
                      </span>
                      <span className="w-8 text-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.9-.5l3-5A1 1 0 0016 3H4a1 1 0 00-1 1z" />
                        </svg>
                        Shipping
                      </span>
                      <span className="text-green-600 font-medium bg-green-50/80 px-2 py-0.5 rounded-full text-sm shadow-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Free
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6 relative before:absolute before:left-0 before:right-0 before:h-px before:-top-px before:bg-gradient-to-r before:from-transparent before:via-orange-200 before:to-transparent">
                  <div className="flex justify-between font-bold text-gray-900 text-base md:text-lg">
                    <span>Total</span>
                    <div className="text-right">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 font-bold">₹{cartTotal}</span>
                      <p className="text-xs text-gray-500 mt-1">Including GST</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const user = localStorage.getItem("user");
                    if (user) {
                      router.push("/checkout");
                    } else {
                      router.push("/user-login");
                    }
                  }}
                  className="w-full bg-orange-500 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                
                <div className="mt-4 flex items-center justify-center text-xs text-gray-500 animate-bounce-slow">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
