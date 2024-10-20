"use client";

import React, { useState, useEffect } from 'react';




const SettingsOverview: React.FC = () => {
 

  return (
    <div className="bg-diet-dark rounded-xl shadow-lg p-6 w-full h-screen overflow-y-scroll">
      <h1 className="text-5xl text-white my-10 font-semibold my-5">FAQ</h1>

      <h2 className="text-2xl text-white mt-12 mb-4 font-semibold my-5"> Q: "How do I add a meal to my meal list?"</h2>
      <h3 className="text-xl text-white my-8 font-semibold my-5"> A: "You can add a meal to your meal list by clicking the 'start call' button on the dashboard page and asking our chatbot 'Add Burrito with 500 calories'</h3>

      <h2 className="text-2xl text-white mt-12 mb-4 font-semibold my-5"> Q: "I accidentally said the wrong meal. How do I delete a meal from my meal list?"</h2>
      <h3 className="text-xl text-white my-8 font-semibold my-5"> A: "You can delete a meal from your meal list by clicking the 'start call' button on the dashboard and asking our chatbot 'Remove my burrito' This will only remove the last meal that you added."</h3>

      <h2 className="text-2xl text-white mt-12 mb-4 font-semibold my-5"> Q: "How do I view the meals I have added?"</h2>
      <h3 className="text-xl text-white my-8 font-semibold my-5"> A: "Click the 'Meal History' tab, which is the Calendar icon,  on the left hand side to view your previous meals added." </h3>
      
        

          
          

          

      
    </div>
  );
};

export default SettingsOverview;