import React from 'react';

interface ProteinCardProps {
  goalTitle: string;
  currentValue: number;
  goalValue: number;
  status: 'Below' | 'On Track' | 'Above';
}

const ProteinCard: React.FC<ProteinCardProps> = ({ goalTitle, currentValue, goalValue, status }) => {
  return (
    <div className="bg-diet-green-darkest rounded-xl shadow-md p-6 w-64">
      {/* Icon Placeholder */}
      <img src="/protein.svg" className="justify-center inset-0"/>
      
      {/* Title */}
      <h3 className="text-white text-lg font-semibold">{goalTitle}</h3>

      {/* Current value / goal */}
      <div className="text-4xl text-white font-bold mt-2">{currentValue}</div>
      <div className="text-white text-sm">
        / {goalValue} grams
      </div>

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

export default ProteinCard;