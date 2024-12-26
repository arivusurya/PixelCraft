import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/frontend/Nav";
import { CartProvider } from "@/hooks/cart.hooks";
import { ProductProvider } from "@/hooks/producthook";
import Footer from "@/components/frontend/Footer";

export const metadata: Metadata = {
  title: "ProductPage",
  description: "Get the best quality product at best price at your region",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <CartProvider>
        <ProductProvider>
          {children}
          <Footer />
          <Toaster />
        </ProductProvider>
      </CartProvider>
    </>
  );
}
