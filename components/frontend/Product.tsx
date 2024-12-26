"use client";
import React from "react";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "./productcard"; // Import Client Component
// import { useProductContext } from "@/hooks/producthook";
import { leatherMobileStands } from "@/utils/data";

function Products() {
  // const { product } = useProductContext();

  return (
    <div className=" w-[100vw] p-6 bg-slate-50" id="products">
      <h2 className="text-center uppercase text-2xl font-extrabold">
        Products
      </h2>
      {/* <div className="flex items-center flex-col ">
        <div className="">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            Our Work.
            <span className="text-[#F80522] font-bold">Stand It Anyware</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <ul className="bg-[#F80522] rounded-lg px-2 text-white">
            <p>For Phones</p>
          </ul>
          <ul>
            <p></p>
          </ul>
        </div>
      </div> */}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ">
        {leatherMobileStands.map((each, index) => {
          console.log(each);
          return <ProductCard product={each} key={index} id={index} />;
        })}
      </div>
    </div>
  );
}

export default Products;
