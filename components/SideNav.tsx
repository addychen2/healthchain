"use client"

import React, { useState } from "react";

const SideNav = () => {
  const [isOpen] = useState(false);


  return (
    <div className="flex max-h-full justify-stretch">
      {/* SideNav */}
      <div
        className={`flex top-0 left-0 w-50 bg-navbar-white text-black transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">APP NAME</h2>
          <nav className="mt-10">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
              Dashboard
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
              Calendar
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
              Chat History
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
              Settings
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white">
              Logout
            </a>
          </nav>
        </div>
      </div>
    
    </div>
  );
};

export default SideNav;
