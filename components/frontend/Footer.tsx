import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image
              src="/footerlogo.png"
              width={100}
              height={100}
              alt="pixelcraft"
              className="object-contain"
            />
            <p className="text-sm text-gray-400">
              Premium quality leather mobile stands and accessories crafted with
              precision.
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors">
                <Mail size={18} />
                <a href="mailto:support@pixelcraftgears.com">
                  support@pixelcraftgears.com
                </a>
              </div>
              {/* <div className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors">
                <Phone size={18} />
                <a href="tel:+919998887777">+91 999-888-7777</a>
              </div> */}
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <p>Chennai, Tamil Nadu, India</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock size={18} />
                <p>Available round the clock</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#products"
                  className="hover:text-red-500 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="hover:text-red-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              {/* <li>
                <a
                  href="#support"
                  className="hover:text-red-500 transition-colors"
                >
                  Support
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#bulk-orders"
                  className="hover:text-red-500 transition-colors"
                >
                  Bulk Orders
                </a>
              </li> */}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-blue-500 hover:bg-gray-700 transition duration-300"
              >
                <Facebook size={20} />
              </a>
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-sky-400 hover:bg-gray-700 transition duration-300"
              >
                <Twitter size={20} />
              </a> */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-pink-500 hover:bg-gray-700 transition duration-300"
              >
                <Instagram size={20} />
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-blue-600 hover:bg-gray-700 transition duration-300"
              >
                <Linkedin size={20} />
              </a> */}
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Follow us for updates and exclusive offers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
