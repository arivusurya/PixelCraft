"use client";
import { HomeIcon, ShoppingCartIcon } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartWrapper from "../wappers/cart";
import { useCart } from "@/hooks/cart.hooks";
import { GrCircleInformation } from "react-icons/gr";
import Image from "next/image";

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart();
  const [showmenu, setshowmenu] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const links = [
    {
      name: "home",
      path: "/",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Products",
      path: "/#products",
      icon: <ShoppingCartIcon className="w-5 h-5" />,
    },
    {
      name: "About",
      path: "/aboutus",
      icon: <GrCircleInformation className="w-5 h-5" />,
    },
  ];

  const handlemenuChage = () => {
    setshowmenu((prev) => !prev);
  };

  // Function to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string) => {
    // For home page, check if pathname is exactly '/'
    if (path === "/") return pathname === "/";

    // For other routes, check if pathname includes the path
    // This helps with both exact matches and hash links
    return pathname.includes(path.replace("/#", ""));
  };

  return (
    <nav
      className={`w-full bg-white text-black transition-all duration-300 ${
        isScrolled ? "fixed top-0 shadow-md z-50" : "relative"
      }`}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div
          className="flex-1 flex  cursor-pointer px-4"
          onClick={() => router.push("/")}
        >
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="pixelcraft"
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-evenly gap-4">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-2 transition capitalize ${
                isActive(item.path)
                  ? "underline decoration-[#F10412]"
                  : "hover:text-gray-500"
              }`}
            >
              {item.icon} <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Cart Icon */}
        {/* <div className="flex-1 flex justify-center">
          <CartWrapper />
        </div> */}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 relative">
        {/* Logo */}
        <Image
          src="/logo.png"
          width={70}
          height={70}
          alt="pixelcraft"
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />

        <div className="flex items-center gap-2">
          {/* <CartWrapper /> */}
          {/* Hamburger Menu */}
          <button onClick={handlemenuChage}>
            {!showmenu ? (
              <RxHamburgerMenu className="w-6 h-6" />
            ) : (
              <ImCross className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showmenu && (
        <div className="md:hidden flex flex-col gap-2 px-4 py-2 bg-white fixed w-full z-10 ">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center capitalize gap-2 py-2 rounded transition ${
                isActive(item.path)
                  ? "bg-red-100 text-red-500 font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon} <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Nav;
