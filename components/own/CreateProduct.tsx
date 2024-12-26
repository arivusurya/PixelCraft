"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProduct, Product, updateProduct } from "@/actions/product.actions";
import { useToast } from "@/hooks/use-toast";
import { useAdminProducts } from "@/hooks/Admin.hook";

export function DialogDemo({
  open,
  change,
  product,
}: {
  open: boolean;
  change: (isopen?: boolean) => void;
  product?: Product;
}) {
  const { toast } = useToast();
  const { refetch } = useAdminProducts();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (open) {
      if (product) {
        setPreviewImages(product.images || []);
      }
      setImageFiles([]);
    } else {
      setPreviewImages([]);
      setImageFiles([]);
    }
  }, [open, product]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).slice(0, 4 - previewImages.length);
    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result as string);
        newFiles.push(file);

        if (newPreviews.length === newImages.length) {
          setPreviewImages((prev) => [...prev, ...newPreviews]);
          setImageFiles((prev) => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      console.log(formData.get("description"));
      const bodyData = {
        name: formData.get("name")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        price: Number(formData.get("price")),
        images: imageFiles,
      };
      console.log(bodyData);

      const response = product
        ? await updateProduct(product.id, bodyData)
        : await addProduct(bodyData);

      if (response.data) {
        toast({
          title: product ? "Product Updated" : "Product Created",
          description: `The product was successfully ${
            product ? "updated" : "created"
          }.`,
        });
        refetch();
        change(false);
      } else if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Edit product details below. Images can be added or removed."
              : "Fill in the product details below. You can add up to 4 images."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name || ""}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product?.description || ""}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={product?.price || ""}
                required
              />
            </div>
            <div>
              <Label htmlFor="images">Images {previewImages.length}/4</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={previewImages.length >= 4}
              />
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 
                               opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={
                isSubmitting || (product ? false : previewImages.length === 0)
              }
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
