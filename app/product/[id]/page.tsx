// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { GrAmazon } from "react-icons/gr";
// import { Product } from "@/actions/product.actions";
// import { getProductInfo } from "@/actions/userproductAction";
// import { AddToCartButton } from "@/components/frontend/AddToCart";
// import Loading from "@/app/loding";
// import ReviewSection from "@/components/frontend/Review";
// import ShowAll from "@/components/frontend/Trust";
// import { leatherMobileStands } from "@/utils/data";

// function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true); // State to manage loading

//   const fetchProductInfo = async () => {
//     setLoading(true); // Start loading
//     const data = leatherMobileStands[id];
//     console.log(data);
//     // const data = await getProductInfo(String(id));
//     if (data) {
//       setProduct(data);
//     }
//     setLoading(false); // End loading
//   };

//   useEffect(() => {
//     fetchProductInfo();
//   }, []);

//   if (loading) {
//     return <Loading />; // Show loading animation while fetching data
//   }

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Oops! No Product Found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen mt-2 flex-col">
//       <div className="  h-auto flex flex-col md:grid md:grid-cols-2 gap-4 p-8 bg-slate ">
//         <div className="col-span-1">
//           <Image
//             src={product.imageUrl}
//             alt={product.name}
//             width={500}
//             height={500}
//             quality={100}
//             className="object-contain w-full lg:w-[500px] lg:h-[500px]"
//           />
//         </div>
//         <div className="col-span-1 flex flex-col">
//           <h2 className="text-sm md:text-base lg:text-lg font-bold">
//             {product.name}
//           </h2>
//           <p className="text-sm md:text-base lg:text-lg font-normal text-gray-500">
//             {product.description}
//           </p>
//           <p className="text-sm md:text-base lg:text-lg font-normal text-red-500">
//             ₹ <span className="text-gray-500">{product.price}</span>
//           </p>
//           <div className="flex gap-2">
//             {/* <AddToCartButton product={product} /> */}
//             <button className="mt-4 flex items-center justify-center bg-yellow-400 rounded-md h-8 px-2 hover:bg-yellow-500 transition-colors duration-200">
//               <span className="flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
//                 <GrAmazon className="shrink-0" />
//                 Get from Amazon
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <ShowAll />
//       <ReviewSection productId={String(id)} />
//     </div>
//   );
// }

// export default ProductPage;
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { push } = useRouter();
  useEffect(() => {
    push("/");
  }, []);
  return <div>page</div>;
}

export default page;
