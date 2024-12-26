import { useCart } from "@/hooks/cart.hooks";
import CartStack from "./CartStack";

export default function CartList() {
  const { cart } = useCart();
  return (
    <div className="bg-slate-100 rounded-lg w-full px-3">
      <div className="flex justify-between px-2 py-2 border-b">
        <h2 className="w-1/4 text-left">Image</h2>
        <h2 className="w-1/4 text-left">Name</h2>
        <h2 className="w-1/4 text-center">Quantity</h2>
        <h2 className="w-1/4 text-right">Price</h2>
      </div>

      {cart.map((item) => (
        <CartStack
          product={item.product}
          key={item.product.id}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </div>
  );
}
