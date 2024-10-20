import React from 'react';

interface CardProps {
  goalTitle: string;
  currentValue: number;
  goalValue: number;
  status: 'Below' | 'On Track' | 'Above';
}

const Card: React.FC<CardProps> = ({ goalTitle, currentValue, goalValue, status }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-64">
      {/* Icon Placeholder */}
      <div className="bg-orange-200 w-12 h-12 rounded-md mb-4"></div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold">{goalTitle}</h3>

      {/* Current value / goal */}
      <div className="text-4xl font-bold mt-2">{currentValue}</div>
      <div className="text-gray-500 text-sm">
        / {goalValue} calories
      </div>

      {/* Status label */}
      <div className={`mt-4 px-3 py-1 rounded-md text-sm font-semibold 
        ${status === 'Below' ? 'bg-orange-200 text-orange-800' : 
          status === 'On Track' ? 'bg-green-200 text-green-800' : 
          'bg-blue-200 text-blue-800'}`}>
        {status}
      </div>
    </div>
  );
};

export default Card;
