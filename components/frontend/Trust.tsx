"use client";

import React from "react";
import { motion } from "framer-motion";

function ShowAll() {
  return (
    <div className="flex h-full w-full max-w-[1200px] flex-wrap justify-center mx-auto items-start my-10 sm:my-12">
      {/* Smooth scrolling animation for mobile */}
      <div className="overflow-hidden w-full sm:hidden">
        <motion.div
          className="flex space-x-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 15, // Adjust duration for scroll speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col mx-2 my-2 items-center justify-center flex-shrink-0"
            >
              <img
                src={item.image}
                className="w-16 h-16 sm:w-20 sm:h-20 p-2 ring-4 ring-[#F37C5C] rounded-full"
                alt={item.alt}
                loading="lazy"
              />
              <p className="text-xs mt-2 w-[100px] sm:w-[120px] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Static grid for desktop */}
      <div className="hidden sm:flex flex-wrap justify-center">
        {data.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col mx-8 my-2 items-center justify-center"
          >
            <img
              src={item.image}
              className="w-20 h-20 p-2 ring-4 ring-[#F37C5C] rounded-full"
              alt={item.alt}
              loading="lazy"
            />
            <p className="text-xs mt-2 w-[100px] sm:w-[120px] text-center">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    image: "https://cdn-icons-png.flaticon.com/512/17627/17627470.png",
    alt: "Fast Delivery",
    text: "Fast Delivery",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3428/3428087.png",
    alt: "Eco Friendly",
    text: "Eco Friendly",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/726/726488.png",
    alt: "Secure Payment",
    text: "Secure Payment",
  },
  {
    image:
      "https://res.cloudinary.com/dd0nu3k5p/image/upload/v1691349568/badge_uoqx0j.svg",
    alt: "Finest Quality",
    text: "Finest Quality",
  },
  {
    image:
      "https://res.cloudinary.com/dd0nu3k5p/image/upload/v1691349568/india_gi68ic.svg",
    alt: "Shipment All Over India",
    text: "Shipment All Over India",
  },
];

export default ShowAll;
