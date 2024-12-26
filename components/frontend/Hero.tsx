"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero: React.FC = () => {
  const images = [
    "/Website Home 1.png",
    "/Website Home 2.png",
    // "/Website Home 3.png",
    "/Website Home 4.png",
  ];

  return (
    <div className="relative w-full h-[30vh] md:h-[75vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              className="object-contain md:object-cover object-center w-full h-full"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Dim Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div> */}
      {/* Adjust opacity as needed */}
    </div>
  );
};

export default Hero;
