import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div>
                            <Image
                            src={'/images/logo.png'}
                            height={50}
                            width={100}
                            alt='navImg'
                            />

                        </div>
                    </Link>
          </div>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            The AI-native career platform. Built for people who take their work seriously.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20">
              <LogoFacebook className="w-4 h-4 text-white" />
            </button>

            <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20">
              <LogoLinkedin className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Job discovery</li>
            <li className="hover:text-white cursor-pointer">Worker AI</li>
            <li className="hover:text-white cursor-pointer">Companies</li>
            <li className="hover:text-white cursor-pointer">Salary data</li>
          </ul>
        </div>

        {/* Navigations */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigations</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Help center</li>
            <li className="hover:text-white cursor-pointer">Career library</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Brand Guideline</li>
            <li className="hover:text-white cursor-pointer">Newsroom</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>Copyright 2024 – Programming Hero</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <span className="hover:text-white cursor-pointer">Terms & Policy</span>
          <span className="hover:text-white cursor-pointer">Privacy Guideline</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;