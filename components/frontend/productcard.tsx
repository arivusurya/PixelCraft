"use client"; // Mark as a Client Component
import React from "react";
import Image from "next/image";
import { AddToCartButton } from "./AddToCart";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IndianRupee } from "lucide-react";

interface productProps {
  id: string;
  name: string;
  images: string[];
  descriptions: string;
  price: number;
}

function ProductCard({ product, id }: { product: any; id: number }) {
  console.log(product.images);
  const router = useRouter();
  const handleClick = () => {
    console.log("Product ID:", product.id);
  };

  return (
    <div className="bg-white  shadow-lg col-span-1 md:col-span-1  h-auto  flex flex-col rounded-lg p-4  transition-transform  mt-2">
      <div className="lg:h-[30vh]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="cursor-pointer w-full h-auto rounded-md object-contain "
          // onClick={() => router.push(`/product/${id}`)}
        />
      </div>
      <div>
        <h2
          // onClick={() => router.push(`/product/${id}`)}
          className=" cursor-pointer text-lg sm:text-base md:text-sm font-semibold mt-2 min-h-4"
        >
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-1 sm:line-clamp-2 md:line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center text-lg  sm:text-base md:text-sm font-bold text-red-500 mt-2">
          <IndianRupee size={20} />
          <p className="">{product.price}</p>
        </div>

        <div className="flex justify-end">
          <Button className="mt-4 text-sm bg-red-500 text-white hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 h-8 rounded-md transition-colors hover:scale-105">
            Coming Soon...
          </Button>
        </div>
        {/* <div className="w-full flex justify-evenly items-center">
          <Button className="mt-4 text-sm bg-red-500 text-white hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 w-[30%] h-8 rounded-md transition-colors hover:scale-105">
            View
          </Button>
          <AddToCartButton key={product.id} product={product} />
          <Button className="mt-4 text-sm bg-red-500 text-white hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 w-[30%] h-8 rounded-md transition-colors hover:scale-105">
            Buy
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default ProductCard;
