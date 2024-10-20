import React from 'react';

interface MealCardProps {
  date: string;
  time: string;
  meal: string;
  calories: number;
  protein: number;
  sugar: number;
  sodium: number;
}

const MealCard: React.FC<MealCardProps> = ({ date, time, meal, calories, protein, sugar, sodium }) => {
  return (
    <div className="bg-orange-100 rounded-lg p-4 mb-4 shadow-sm">
      <div className="font-semibold mb-2">
        {date}, {time}, {meal}
      </div>
      <div className="text-sm">
        <p>Calories: {calories}</p>
        <p>Protein: {protein}g</p>
        <p>Sugar: {sugar}g</p>
        <p>Sodium: {sodium}mg</p>
      </div>
    </div>
  );
};

export default MealCard;
