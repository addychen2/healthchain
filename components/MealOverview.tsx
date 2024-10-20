"use client";

import React, { useState, useEffect } from 'react';
import MealCard from './ui/MealCard';
import { get_all_food_uid } from '../app/API';

interface FoodItem {
  calories: number;
  protein: number;
  date: string;
  food_name: string;
}

const MealOverview: React.FC = () => {
  const [meals, setMeals] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await get_all_food_uid();
        setMeals(response.all_food);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="bg-diet-green-dark rounded-xl shadow-lg p-6 w-full h-screen overflow-y-scroll">
      <h2 className="text-xl text-white font-semibold mb-4">All Meals</h2>
      {meals.map((meal, index) => (
        <MealCard
          meal={meal.food_name}
          key={index}
          date={meal.date}
          time="1" // You may need to add a time field to your FoodItem interface if available
          calories={meal.calories}
          protein={meal.protein} // Set to 0 or remove if not available in the API response
        />
      ))}
    </div>
  );
};

export default MealOverview;