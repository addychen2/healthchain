"use client";

import React, { useState, useEffect } from 'react';
import MealCard from './ui/MealCard';
import { get_all_food } from '../app/API';

interface FoodItem {
  calories: number;
  date: string;
  food_name: string;
}

const MealOverview: React.FC = () => {
  const [meals, setMeals] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await get_all_food();
        setMeals(response.all_food);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md h-96 overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">Last Week's Meals</h2>
      {meals.map((meal, index) => (
        <MealCard
          key={index}
          date={meal.date}
          time="" // You may need to add a time field to your FoodItem interface if available
          meal={meal.food_name}
          calories={meal.calories}
          protein={0} // Set to 0 or remove if not available in the API response
          sugar={0} // Set to 0 or remove if not available in the API response
          sodium={0} // Set to 0 or remove if not available in the API response
        />
      ))}
    </div>
  );
};

export default MealOverview;