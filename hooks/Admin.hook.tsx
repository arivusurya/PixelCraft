"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getProductsAdmin,
  deleteProductAdmin,
} from "../actions/product.actions";
import { Product } from "@/actions/product.actions";

interface AdminProductsContextProps {
  products: Product[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  deleteProduct: (productId: string) => Promise<void>;
}

const AdminProductsContext = createContext<
  AdminProductsContextProps | undefined
>(undefined);

export const AdminProductsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProductsAdmin();
      if (response.error) {
        setError(response.error);
        setProducts([]);
      } else {
        setProducts(response.data);
      }
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await deleteProductAdmin({ id: productId });
      if (response.message === "Success") {
        setProducts((prevProducts) =>
          prevProducts ? prevProducts.filter((p) => p.id !== productId) : []
        );
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to delete product.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        refetch: fetchProducts,
        deleteProduct,
      }}
    >
      {children}
    </AdminProductsContext.Provider>
  );
};

export const useAdminProducts = (): AdminProductsContextProps => {
  const context = useContext(AdminProductsContext);
  if (!context) {
    throw new Error(
      "useAdminProducts must be used within an AdminProductsProvider"
    );
  }
  return context;
};
