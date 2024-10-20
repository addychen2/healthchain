"use client";

import React, { useState, useEffect } from 'react';




const SettingsOverview: React.FC = () => {
 

  return (
    <div className="bg-diet-green-dark rounded-xl shadow-lg p-6 w-full h-screen overflow-y-scroll">
      <h1 className="text-5xl text-white font-semibold my-5">Settings</h1>
        <div className='divide-y divide-solid'>
          <div className='divide-y divide-dashed'>
            <label htmlFor="email" className=" text-sm block text-white font-bold  py-4">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="shadow appearance-none 
              bg-diet-green-darkest
              border  
              rounded w-full py-2 px-3 
              text-gray-500 leading-tight focus:outline-none 
              focus:shadow-outline 
              border-gray-900"
              placeholder="stevie@goat.com"
            />

            <label htmlFor="password" className="text-sm block text-white font-bold py-4">
              PASSWORD
            </label>
            <input
              type="password"
              name="email"
              id=""
              className="shadow appearance-none 
              bg-diet-green-darkest
              border  
              rounded w-full py-2 px-3 
              text-gray-500 leading-tight focus:outline-none 
              focus:shadow-outline 
              border-gray-900"
              placeholder="Enter your password"
            />
            
          </div>

          <div>
            <h1 className="text-3xl text-white font-semibold my-10">
              AI Personality Prompt
            </h1>

            <input
              type="Prompt"
              name="email"
              id=""
              className="shadow appearance-none 
              bg-diet-green-darkest
              border  
              rounded w-full py-2 px-3 my-10
              text-gray-500 leading-tight focus:outline-none 
              focus:shadow-outline 
              border-gray-900"
              placeholder="placeholder prompt"
            />
            
          </div>
          

          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded f="
              type="button"
            >
              Save
            </button>
          

        </div>
    </div>
  );
};

export default SettingsOverview;