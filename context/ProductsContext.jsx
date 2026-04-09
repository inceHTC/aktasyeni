"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getDocs(collection(db, "products")).then((snap) => {
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoaded(true);
    });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loaded }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
