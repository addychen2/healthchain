"use client"

import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

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

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <button
          className="text-white bg-gray-800 p-2 rounded-md sm:hidden"
          onClick={toggleSideNav}
        >
          {isOpen ? "Close" : "Open"} Menu
        </button>
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4">This is the main content area.</p>
      </div>
    </div>
  );
};

export default SideNav;
