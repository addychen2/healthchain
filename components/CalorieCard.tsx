"use client";

import React, { useState, useEffect } from 'react';
import Card from "./ui/Card";
import { all_food_calories } from '../app/API';

const CalorieCard: React.FC = () => {
  const [calorieData, setCalorieData] = useState({
    currentValue: 0,
    goalValue: 2800, // Assuming the goal is static. If it's dynamic, you might want to fetch this as well.
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalorieData = async () => {
      try {
        setIsLoading(true);
        const response = await all_food_calories();
        const totalCalories = response.all_food_calories;
        setCalorieData(prevData => ({
          ...prevData,
          currentValue: totalCalories,
        }));
        setError(null);
      } catch (error) {
        console.error('Error fetching calorie data:', error);
        setError('Failed to fetch calorie data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalorieData();
  }, []); // Add refreshTrigger to the dependency array

  const status = calorieData.currentValue > calorieData.goalValue ? "Above" : "Below";

  if (isLoading) {
    return <div>Loading calorie data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <Card
        goalTitle="Calorie Goal"
        currentValue={calorieData.currentValue}
        goalValue={calorieData.goalValue}
        status={status}
      />
  );
};

export default CalorieCard;
