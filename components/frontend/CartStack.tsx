import { Product } from "@/actions/product.actions";
import Image from "next/image";
import React from "react";

interface CartStackProps {
  product: Product;
  quantity: number;
  price: number;
}

export default function CartStack({
  product,
  quantity,
  price,
}: CartStackProps) {
  return (
    <div className="flex items-center justify-between px-2 py-2 hover:bg-gray-50">
      <Image
        src={product.images[0]}
        width={75}
        height={70}
        alt={product.name}
        className="rounded-md object-cover w-16"
      />

      <h1 className="text-sm font-medium truncate w-1/4">{product.name}</h1>

      <div className="text-sm text-center w-1/4">{quantity}</div>

      <h2 className="font-semibold text-right w-1/4">${price.toFixed(2)}</h2>
    </div>
  );
}
