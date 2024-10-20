"use client"

import React, { useState } from "react";
import Link from "next/link";
import NextImage from 'next/image'

const SideNav = () => {
  const [isOpen] = useState(false);


  return (
    <div className="flex h-dvh justify-stretch">
      {/* SideNav */}
      <div
        className={`flex top-0 left-0 w-50 bg-diet-green text-black  justify-center  transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 justify-center ">
          <NextImage
            src="/logo.png"
            width={150}
            height={150}
            className="justify-center"
            alt="Startup Logo"
          />
        
          
          <nav className="mt-10 flex flex-col justify-center ">
            <a href="/" className="block justify-center content-center inset-0 py-2.5 px-6 mx-4 rounded transition duration-200 hover:bg-diet-green-darker">
              <img src="/dashboard.svg" className="justify-center inset-0"/>
          
            </a>
            <Link href="/meal-history" className="block py-2.5 px-6 mx-4 justify-center content-center rounded transition duration-200 hover:bg-diet-green-darker">
              
              <img src="/calendar.svg" className="justify-center content-center" />
            </Link>
            <a href="/settings" className="block py-4 px-6 mx-4 justify-center content-center rounded transition duration-200 hover:bg-diet-green-darker">
              
              <img src="/settings.svg" className=" justify-center content-center"/>
            </a>
            <a href="/help" className="block  justify-center mx-4  py-2.5 px-6 rounded transition duration-200 hover:bg-diet-green-darker">
              
              <img src="/question.svg" className="justify-center "/>
            </a>
            <a href="/register" className="block  justify-center mx-4  py-2.5 px-6 rounded transition duration-200 hover:bg-diet-green-darker">
              
              <img src="/logout.svg" className="justify-center "/>
            </a>
          </nav>
        </div>
      </div>
    
    </div>
  );
};

export default SideNav;
