"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/hooks/cart.hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import CartList from "./CartList";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function CartSheet({
  isOpen,
  toggleSheet,
}: {
  isOpen: boolean;
  toggleSheet: () => void;
}) {
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState("cart");
  const { data: session } = useSession();
  const router = useRouter();

  const handlesignredirect = () => {
    redirect("/auth/signin");
    toggleSheet();
  };

  const handleNextTab = () => {
    switch (activeTab) {
      case "cart":
        if (session) {
          setActiveTab("shipping");
        } else {
          signIn();
        }
        break;
      case "shipping":
        if (session) {
          setActiveTab("payment");
        } else {
          signIn();
        }
        break;
      case "payment":
        // Handle final step (e.g., submit order, close sheet)
        toggleSheet();
        break;
    }
  };

  const handlePreviousTab = () => {
    switch (activeTab) {
      case "shipping":
        setActiveTab("cart");
        break;
      case "payment":
        setActiveTab("shipping");
        break;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleSheet}>
      <SheetContent side="right" className="w-[95%] md:w-[75%] lg:max-w-[50%]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-2">
          <TabsList className="w-full flex justify-evenly">
            <TabsTrigger value="cart">Current Cart</TabsTrigger>
            <TabsTrigger value="shipping" disabled={!session}>
              Shipping
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={!session}>
              Payment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            {cart.length > 0 ? <CartList /> : <div>Empty</div>}
          </TabsContent>
          <TabsContent value="shipping">
            {session ? (
              <Shipping />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <p>Please sign in to proceed to shipping</p>
                <Button onClick={() => signIn()}>Sign In</Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="payment">
            {session ? (
              <Payment />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <p>Please sign in to proceed to payment</p>
                <Button onClick={() => signIn()}>Sign In</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-between">
          {activeTab !== "cart" && (
            <Button variant="outline" onClick={handlePreviousTab}>
              Previous
            </Button>
          )}
          {!session ? (
            <Button
              className="ml-auto bg-red-500 text-white hover:text-red-500 hover:bg-white"
              onClick={handlesignredirect}
            >
              signIn
            </Button>
          ) : (
            <Button
              className="ml-auto bg-red-500 text-white hover:text-red-500 hover:bg-white"
              onClick={handleNextTab}
              disabled={activeTab === "payment" && cart.length === 0}
            >
              {activeTab === "payment" ? "Complete Order" : "Next"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
