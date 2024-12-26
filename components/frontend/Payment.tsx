"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

interface SwipePayButtonProps {
  isSliding: boolean;
  onSwipe: () => void;
}

const SwipePayButton: React.FC<SwipePayButtonProps> = ({
  isSliding,
  onSwipe,
}) => {
  return (
    <div
      className={`relative w-full h-16 bg-green-500 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isSliding ? "bg-green-600" : ""
      }`}
      onMouseDown={onSwipe}
      onTouchStart={onSwipe}
    >
      <div
        className={`absolute inset-y-0 left-0 bg-green-600 w-[25%] transition-all duration-300 ${
          isSliding ? "w-full" : ""
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
        {isSliding ? "Swiping..." : "Slide to Pay $255"}
      </div>
    </div>
  );
};

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "swipe">("card");
  const [isSliding, setIsSliding] = useState(false);

  const formatCardNumber = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, "");

    // Add spacing every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted.slice(0, 19); // Limit to 16 digits
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, "");

    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    return cleaned;
  };

  const handleSwipe = () => {
    setIsSliding(true);
    // Simulate card swipe process
    console.log("Card Swiped");
    // Add your swipe logic here
    setIsSliding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          variant={paymentMethod === "card" ? "default" : "outline"}
          onClick={() => setPaymentMethod("card")}
        >
          <CreditCard className="mr-2" /> Enter Card Details
        </Button>
        <Button
          variant={paymentMethod === "swipe" ? "default" : "outline"}
          onClick={() => setPaymentMethod("swipe")}
        >
          <CreditCard className="mr-2" /> Swipe to Pay
        </Button>
      </div>

      {paymentMethod === "card" && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Card details form */}
          </CardContent>
        </Card>
      )}

      {paymentMethod === "swipe" && (
        <div className="text-center space-y-6 p-6 bg-gray-100 rounded-lg">
          <SwipePayButton isSliding={isSliding} onSwipe={handleSwipe} />

          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Lock size={24} />
            <span>Secure Payment</span>
          </div>

          <p className="text-sm text-gray-600">
            Please ensure your card is ready for swiping
          </p>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500 mt-4">
        <Lock className="mr-2" />
        Payments are secure and encrypted
      </div>
    </div>
  );
}
