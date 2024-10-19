"use client"

import React, { useState } from "react";

const SideNav = () => {
  const [isOpen] = useState(false);


  return (
    <div className="flex">
      {/* SideNav */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">APP NAME</h2>
          <nav className="mt-10">
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Dashboard
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Calendar
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Chat History
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Settings
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Logout
            </a>
          </nav>
        </div>
      </div>
    
    </div>
  );
};

export default SideNav;
