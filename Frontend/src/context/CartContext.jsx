// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartUpdated, setCartUpdated] = useState(false);

//   // Load from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     if (stored) {
//       // Force price to ₹1 when loading
//       const parsed = JSON.parse(stored).map(item => ({ ...item, price: 1 }));
//       setCartItems(parsed);
//     }
//   }, []);

//   // Save to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const productWithTestPrice = { ...product, price: 1 }; // force price to ₹1
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === productWithTestPrice.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === productWithTestPrice.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...productWithTestPrice, quantity: 1 }];
//       }
//     });
//     setCartUpdated(true);
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//     setCartUpdated(true);
//   };

//   const incrementQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//     setCartUpdated(true);
//   };

//   const decrementQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//     setCartUpdated(true);
//   };

//   const getCartTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const clearCart = () => {
//     setCartItems([]);
//     setCartUpdated(true);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart: cartItems,
//         addToCart,
//         removeFromCart,
//         incrementQuantity,
//         decrementQuantity,
//         getCartTotal,
//         clearCart,
//         cartUpdated,
//         setCartUpdated,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);







"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check login status
  const checkLoginStatus = () => {
    const admin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    setIsLoggedIn(!!admin || !!token);
    
    // Set user ID for cart storage
    if (admin) {
      const adminData = JSON.parse(admin);
      setUserId(`admin_${adminData.email || 'admin'}`);
    } else if (token && user) {
      const userData = JSON.parse(user);
      setUserId(`user_${userData.email || 'user'}`);
    } else {
      setUserId(null);
    }
  };

  // Check login status on mount and when login status changes
  useEffect(() => {
    checkLoginStatus();
    
    // Listen for login/logout events
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Load appropriate cart when user ID changes
  useEffect(() => {
    if (userId) {
      // User is logged in, load their specific cart
      const userCart = localStorage.getItem(`cart_${userId}`);
      if (userCart) {
        setCartItems(JSON.parse(userCart));
      } else {
        // New user with no saved cart
        setCartItems([]);
      }
    } else {
      // User is logged out, use anonymous cart or clear it
      const anonymousCart = localStorage.getItem("cart");
      if (anonymousCart) {
        setCartItems(JSON.parse(anonymousCart));
      } else {
        setCartItems([]);
      }
    }
  }, [userId]);

  // Save cart to appropriate storage location
  useEffect(() => {
    if (userId) {
      // Save to user-specific cart
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
    // Always save to general cart for backward compatibility
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, userId]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }]; // ✅ keep product.price
      }
    });
    setCartUpdated(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setCartUpdated(true);
  };

  const incrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setCartUpdated(true);
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    setCartUpdated(true);
  };

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
    setCartUpdated(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        getCartTotal,
        clearCart,
        cartUpdated,
        setCartUpdated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
