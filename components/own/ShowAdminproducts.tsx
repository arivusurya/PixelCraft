import React, { useState } from "react";
import { useAdminProducts } from "@/hooks/Admin.hook";
import Loading from "@/app/admin/loding";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { DialogDemo } from "@/components/own/CreateProduct"; // Import DialogDemo
import { Product } from "@/actions/product.actions";

interface Props {
  onEditProduct: (product: Product) => void;
}
function ShowAdminProducts({ onEditProduct }: Props) {
  const { products, isLoading, error, deleteProduct } = useAdminProducts();
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true); // Open the dialog for editing
  };

  return (
    <div className="w-[100%] grid grid-cols-3 gap-4">
      {products?.map((item) => (
        <Card
          key={item.id}
          className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative "
        >
          <CardHeader>
            <CardTitle className="font-bold text-xl text-gray-800 line-clamp-2">
              {item.name}
            </CardTitle>
            <div className="absolute top-0 right-2">
              <Trash2Icon
                className="w-4 cursor-pointer text-black hover:text-red-500"
                onClick={() => deleteProduct(String(item.id))}
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {item?.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {item.images.map((src, index) => (
                  <div key={index} className="relative w-full">
                    <Image
                      objectFit="contain"
                      className="w-full h-auto rounded-lg"
                      src={String(src)}
                      width={250}
                      height={250}
                      alt={item.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-500">₹ {item.price}</p>
            <Button onClick={() => handleEditClick(item)}>Edit</Button>
          </CardFooter>
        </Card>
      ))}
      <DialogDemo
        open={open}
        change={() => setOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

export default ShowAdminProducts;
