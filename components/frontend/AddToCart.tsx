import { useCart } from "@/hooks/cart.hooks";

export function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; price: number };
}) {
  const { addProduct } = useCart();

  const handleAddToCart = () => {
    // addProduct({ ...product, quantity: 1 });
  };

  return (
    <button
      className="mt-4 text-sm bg-red-500 text-white hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 w-[30%] h-8 rounded-md transition-colors hover:scale-105"
      onClick={handleAddToCart}
    >
      Add
    </button>
  );
}
