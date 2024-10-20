import React from 'react';

interface MealCardProps {
  date: string;
  time: string;
  meal: string;
  calories: number;
  protein: number;
}

const MealCard: React.FC<MealCardProps> = ({ date, time, meal, calories, protein }) => {
  return (

    <div className="bg-diet-green-darkest rounded-lg p-4 mb-4 shadow-sm">
      <div className="text-white font-semibold mb-2">
        {meal}, {date}, {time}

      </div>
      <div className="text-white text-sm">
        <p>Calories: {calories}</p>
        <p>Protein: {protein}g</p>
      </div>
    </div>
  );
};

export default MealCard;
