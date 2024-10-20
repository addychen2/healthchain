import React from 'react';

interface CardGramsProps {
  goalTitle: string;
  currentValue: number;
  goalValue: number;
  status: 'Below' | 'On Track' | 'Above';
  iconSrc: string; // Added this to the props to allow dynamic icon rendering
}

const CardGrams: React.FC<CardGramsProps> = ({ goalTitle, currentValue, goalValue, status, iconSrc }) => {
  return (
    <div className="bg-diet-green-darkest rounded-xl shadow-md p-6 w-64">
      {/* Icon */}
      <img src={iconSrc} alt={`${goalTitle} icon`} className="justify-center inset-0 mb-4" />
      
      {/* Title */}
      <h3 className="text-white text-lg font-semibold">{goalTitle}</h3>

      {/* Current value / goal */}
      <div className="text-4xl text-white font-bold mt-2">{currentValue}</div>
      <div className="text-white text-sm">/{goalValue} grams</div>

      {/* Status label */}
      <div className={`mt-4 px-3 py-1 rounded-md text-white text-sm font-semibold 
        ${status === 'Below' ? 'bg-diet-green-light text-white-800' : 
          status === 'On Track' ? 'bg-diet-green text-white' : 
          'bg-diet-green-darker text-white'}`}>
        {status}
      </div>
    </div>
  );
};

export default CardGrams;
