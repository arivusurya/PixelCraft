"use server";
import { uploadImage } from "@/utils/upload";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface ProductInput {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: File[];
}

interface ProductResponse {
  data?: Product;
  error?: string;
}

interface ProductsResponse {
  data: Product[];
  error?: string;
}

export async function addProduct({
  name,
  description,
  price,
  images,
}: ProductInput): Promise<ProductResponse> {
  try {
    // Validation checks
    if (!name || !description || typeof price !== "number" || price <= 0) {
      return { error: "Invalid product data. Please check all fields." };
    }

    // Upload images and get URLs
    const imageUrls: string[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File) {
          const uploadedImage = await uploadImage(image);
          if (uploadedImage?.url) {
            imageUrls.push(uploadedImage.url);
          } else {
            console.warn("Failed to upload image:", image);
          }
        }
      }
    }

    const data = {
      name: name,
      description: description,
      price: price,
      images: imageUrls,
    };
    console.log(data);
    // Create product with converted image URLs
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images: imageUrls, // Ensure this matches Prisma schema type
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
      },
    });

    revalidatePath("/admin/products");
    return { data: product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { error: "Failed to create product. Please try again." };
  }
}

export async function getProductsAdmin(): Promise<ProductsResponse> {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true, // Fixed: 'descriptions' to 'description'
        images: true,
      },
    });

    return { data: data || [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], error: "Failed to fetch products. Please try again." };
  }
}

export async function deleteProductAdmin({
  id,
}: {
  id: string;
}): Promise<{ message: string }> {
  try {
    const product = await prisma.product.delete({ where: { id } });
    if (product) return { message: "Success" };
    return { message: "Product not found." };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { message: "Oops! Something went wrong." };
  }
}

export async function updateProduct(
  id: string,
  data: Partial<ProductInput>
): Promise<ProductResponse> {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        // Handle image updates similar to addProduct
        ...(data.images && {
          images: await Promise.all(
            data.images.map(async (image) => {
              const uploadedImage = await uploadImage(image);
              return uploadedImage?.url || "";
            })
          ),
        }),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
      },
    });

    revalidatePath("/admin/products");
    return { data: product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: "Failed to update product. Please try again." };
  }
}
