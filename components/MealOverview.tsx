import React from 'react';
import MealCard from './ui/MealCard';

const MealOverview: React.FC = () => {
  // Example meal data
  const meals = [
    { date: '10/13/2024', time: '8:00 AM', meal: 'Breakfast', calories: 500, protein: 20, sugar: 10, sodium: 300 },
    { date: '10/13/2024', time: '1:00 PM', meal: 'Lunch', calories: 600, protein: 30, sugar: 15, sodium: 400 },
    { date: '10/13/2024', time: '7:00 PM', meal: 'Dinner', calories: 700, protein: 40, sugar: 20, sodium: 500 },
    // Add more meal entries as needed
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md h-96 overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">Last's Week Meals</h2>
      {meals.map((meal, index) => (
        <MealCard
          key={index}
          date={meal.date}
          time={meal.time}
          meal={meal.meal}
          calories={meal.calories}
          protein={meal.protein}
          sugar={meal.sugar}
          sodium={meal.sodium}
        />
      ))}
    </div>
  );
};

export default MealOverview;
