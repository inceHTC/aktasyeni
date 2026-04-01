"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // LocalStorage'dan yükle
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aktas-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("aktas-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (item.isCampaign ? item.newPrice : item.price) * item.quantity,
    0
  );

  const calculateShipping = (items) => {
    const totalWeight = items.reduce(
      (sum, item) => sum + (item.weight ?? 1) * item.quantity,
      0
    );
    if (totalWeight <= 3) return 150;
    if (totalWeight <= 5) return 160;
    if (totalWeight <= 10) return 230;
    if (totalWeight <= 15) return 380;
    if (totalWeight <= 20) return 445;
    if (totalWeight <= 25) return 550;
    if (totalWeight <= 30) return 570;
    return 920;
  };

  const shippingFee = cart.length > 0 ? calculateShipping(cart) : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        shippingFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
