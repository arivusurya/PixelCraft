"use server";

import { prisma } from "@/utils/prisma";
import { Product } from "./product.actions";
export const getproductforusers = async () => {
  try {
    const data = await prisma.product.findMany();
    console.log(data);
    return { data: data };
  } catch (error) {
    console.log(error);
  }
};

export const getProductInfo = async (id: string) => {
  const data = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });
  return data;
};
