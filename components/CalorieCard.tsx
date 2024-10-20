"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Card from "./ui/Card";
import { daily_calories, get_target_calories } from '../app/API'; // Import get_target_calories

const CalorieCard: React.FC = () => {
  const [calorieData, setCalorieData] = useState({
    currentValue: 0,
    goalValue: 0, // Initialize goalValue to 0 or a default value
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

      // Fetch current calorie data
      const responseCalories = await daily_calories();
      console.log('Fetched calorie data:', responseCalories);
      
      if (responseCalories && typeof responseCalories.total_calories === 'number') {
        const totalCalories = responseCalories.total_calories;  // Access total_calories from the API response
        console.log('Setting total calories:', totalCalories);
        
        // Fetch target calorie data
        const responseTarget = await get_target_calories();
        console.log('Fetched target calorie data:', responseTarget);

        let targetCalories = 2800; // Default value if targetCalories API fails

        if (responseTarget && typeof responseTarget.cal_target === 'number') {
          targetCalories = responseTarget.cal_target; // Set goalValue from the API response
        } else {
          console.error('Unexpected target calories data structure:', responseTarget);
          setError('Failed to fetch target calories');
        }

        // Update state with current and target calories
        setCalorieData({
          currentValue: totalCalories,
          goalValue: targetCalories,
        });
        setError(null);
      } else {
        console.error('Unexpected calorie data structure:', responseCalories);
        setError('Unexpected calorie data structure');
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

    // Set up event listener for foodChange event
    const handleFoodChange = () => {
      console.log('Food change event received, refreshing calorie data');
      fetchCalorieData();
    };
    window.addEventListener('foodChange', handleFoodChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('foodChange', handleFoodChange);
    };
  }, [fetchCalorieData]);

  console.log('Rendering CalorieCard:', { calorieData, isLoading, error });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card
      goalTitle="Calories"
      currentValue={calorieData.currentValue}
      goalValue={calorieData.goalValue} // Use the fetched target calories as goalValue
      status={calculateStatus(calorieData.currentValue, calorieData.goalValue)}
    />
  );
};

export default CalorieCard;