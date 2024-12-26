"use client";
import { createContext, useContext, useState } from "react";
import { useToast } from "./use-toast";
import { Product } from "@/actions/product.actions";

interface CartProduct {
  product: Product;
  quantity: number;
  price: number;
}

type CartContextType = {
  cart: CartProduct[];
  addProduct: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  getTotalQuantity: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const { toast } = useToast();

  const addProduct = (product: Product) => {
    const existingProduct = cart.find((item) => item.product.id === product.id);

    if (existingProduct) {
      toast({
        title: "Product Updated",
        description: `${product.name} quantity increased to ${
          existingProduct.quantity + 1
        }.`,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      toast({
        title: "Product Added",
        description: `${product.name} has been added to your cart.`,
      });

      setCart((prevCart) => [
        ...prevCart,
        {
          product,
          quantity: 1,
          price: product.price,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeProduct = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateQuantity,
        removeProduct,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
