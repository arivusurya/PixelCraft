"use client";
import Footer from "@/components/frontend/Footer";
import Nav from "@/components/frontend/Nav";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      <Nav />

      {/* Hero Section */}
      <div className="w-full py-20 text-center">
        <h1 className="text-4xl font-bold text-red-500">About Us</h1>
        <p className="text-lg mt-4 max-w-xl mx-auto text-gray-700">
          At PixelCraft, we craft innovative and functional products to enhance
          your everyday life.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="py-16 text-center px-6">
        <h2 className="text-3xl font-semibold text-red-500">Our Story</h2>
        <p className="text-gray-700 text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
          PixelCraft began with a simple mission: to design products that are
          both beautiful and functional. With a passion for creativity and
          precision, we aim to redefine your everyday experiences. From
          accessories that complement your lifestyle to solutions that inspire,
          our journey is built on trust, innovation, and your unwavering
          support.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-semibold text-red-500">
          Join Our Journey
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Be part of our story as we continue to create products that bring
          value and joy to your life. Explore our range and discover what makes
          PixelCraft special.
        </p>
        <button
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={() => router.push("/#products")}
        >
          Explore Products
        </button>
      </div>

      <Footer />
    </div>
  );
}
