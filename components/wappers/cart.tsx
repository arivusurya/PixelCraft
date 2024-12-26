"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CartSheetContent from "@/components/frontend/Checkout";
import { ShoppingBagIcon } from "lucide-react";
import { useCart } from "@/hooks/cart.hooks";

export default function CartWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const toggleSheet = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className={`relative cursor-pointer `} onClick={toggleSheet}>
        <p
          className={`${
            cart.length === 0 && "hidden"
          } text-white bg-red-400 rounded-full w-4 h-4 flex justify-center items-center font-bold absolute top-0 right-0 `}
        >
          {cart.length > 0 && cart.length}
        </p>

        <ShoppingBagIcon className="w-6 h-6"></ShoppingBagIcon>
      </div>
      {isOpen && (
        <div className="lg:w-[70%]">
          <CartSheetContent isOpen={isOpen} toggleSheet={toggleSheet} />
        </div>
      )}
    </>
  );
}
