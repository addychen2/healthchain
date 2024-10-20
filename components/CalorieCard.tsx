"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Card from "./ui/Card";
import { all_food_calories } from '../app/API';

const CalorieCard: React.FC = () => {
  const [calorieData, setCalorieData] = useState({
    currentValue: 0,
    goalValue: 2800,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStatus = (current: number, goal: number): 'Below' | 'On Track' | 'Above' => {
    const percentage = (current / goal) * 100;
    if (percentage < 90) return 'Below';
    if (percentage <= 110) return 'On Track';
    return 'Above';
  };

  const fetchCalorieData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetching calorie data...');
      const response = await all_food_calories();
      console.log('Fetched calorie data:', response);
      
      if (response && response.all_food_calories && typeof response.all_food_calories === 'number') {
        const totalCalories = response.all_food_calories;
        console.log('Setting total calories:', totalCalories);
        setCalorieData(prevData => ({
          ...prevData,
          currentValue: totalCalories,
        }));
        setError(null);
      } else {
        console.error('Unexpected data structure:', response);
        setError('Unexpected data structure');
      }
    } catch (error) {
      console.error('Error fetching calorie data:', error);
      setError('Failed to fetch calorie data: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalorieData();

    // Set up event listener for foodAdded event
    const handleFoodAdded = () => {
      console.log('Food added event received, refreshing calorie data');
      fetchCalorieData();
    };
    window.addEventListener('foodAdded', handleFoodAdded);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('foodAdded', handleFoodAdded);
    };
  }, [fetchCalorieData]);

  console.log('Rendering CalorieCard:', { calorieData, isLoading, error });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card
      goalTitle="Calories"
      currentValue={calorieData.currentValue}
      goalValue={calorieData.goalValue}
      status={calculateStatus(calorieData.currentValue, calorieData.goalValue)}
    />
  );
};

export default CalorieCard;