import type { Metadata } from "next";
import "./globals.css";
// import { ProductProvider } from "@/hooks/producthook";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/frontend/Nav";
import CartSheet from "@/components/frontend/Checkout";
import { CartProvider } from "@/hooks/cart.hooks";
import { Toaster } from "@/components/ui/toaster";
import SecurityWrapper from "@/components/wappers/Secure";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico", // Correct path to the favicon
    apple: "/favicon.ico", // For Apple touch icon
  },
  title: "PixelCraft - Premium Leather Mobile Stands",
  description:
    "Discover premium handcrafted leather mobile stands for smartphones and tablets. Enhance your workspace with luxury leather phone holders designed for durability and elegance.",
  keywords: [
    "leather mobile stands",
    "premium phone holders",
    "luxury leather stands",
    "handcrafted leather desk accessories",
    "adjustable leather tablet stands",
    "stylish leather desk organizers",
  ],
  openGraph: {
    title: "PixelCraft - Premium Leather Mobile Stands",
    description:
      "PixelCraft offers high-quality leather mobile stands for smartphones and tablets. Designed with elegance and durability in mind.",
    url: "https://pixelCraftgears.com", // Replace with your website URL
    type: "website",
    images: [
      {
        url: "https://pixelCraftgears.com/assets/hero-image.jpg", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "PixelCraft - Premium Leather Mobile Stands",
      },
    ],
    siteName: "PixelCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelCraft - Premium Leather Mobile Stands",
    description:
      "Explore PixelCraft's collection of luxury handcrafted leather mobile stands, perfect for your workspace or home.",
    images: ["https://pixelCraftgears.com/assets/hero-image.jpg"], // Replace with your image URL
    site: "@PixelCraft", // Replace with your Twitter handle
  },
  other: {
    "whatsapp:title": "PixelCraft - Premium Leather Mobile Stands",
    "whatsapp:description":
      "Discover premium handcrafted leather mobile stands for smartphones and tablets. Enhance your workspace with luxury leather phone holders designed for durability and elegance.",
    "whatsapp:image": "https://pixelCraftgears.com/assets/hero-image.jpg", // Replace with your image URL
    "instagram:title": "PixelCraft - Premium Leather Mobile Stands",
    "instagram:description":
      "Discover premium handcrafted leather mobile stands for smartphones and tablets. Enhance your workspace with luxury leather phone holders designed for durability and elegance.",
    "instagram:image": "https://pixelCraftgears.com/assets/hero-image.jpg", // Replace with your image URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "PixelCraft",
              description:
                "Discover premium handcrafted leather mobile stands for smartphones and tablets.",
              url: "https://yourwebsite.com", // Replace with your website URL
              logo: "https://yourwebsite.com/assets/logo.png", // Replace with your logo URL
              sameAs: [
                "https://facebook.com/yourpage",
                "https://instagram.com/yourprofile",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://yourwebsite.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white">
        <CartProvider>
          <SecurityWrapper>
            {/* <ProductProvider> */}
            {/* <SessionProvider> */}
            {children}
            <p className="text-center text-sm bg-[#111827] text-white">
              Designed and Developed by
              <a
                href="https://themetadata.in"
                target="_blank"
                className="font-bold"
              >
                {" "}
                The Meta Data
              </a>
            </p>
            {/* </SessionProvider> */}
            {/* </ProductProvider> */}
          </SecurityWrapper>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
