"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Card from "./ui/Card";
import { daily_protein, get_target_protein} from '../app/API'; // Assuming these API functions exist

const ProteinCard: React.FC = () => {
  const [proteinData, setProteinData] = useState({
    currentValue: 0,
    goalValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStatus = (current: number, goal: number): 'Below' | 'On Track' | 'Above' => {
    const percentage = (current / goal) * 100;
    if (percentage < 90) return 'Below';
    if (percentage <= 110) return 'On Track';
    return 'Above';
  };

  const fetchProteinData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetching protein data...');

      // Fetch current protein data
      const responseProtein = await daily_protein();
      console.log('Fetched protein data:', responseProtein);
      
      if (responseProtein && typeof responseProtein.total_protein === 'number') {
        const totalProtein = responseProtein.total_protein;
        console.log('Setting total protein:', totalProtein);
        
        // Fetch target protein data
        const responseTarget = await get_target_protein();
        console.log('Fetched target protein data:', responseTarget);

        let targetProtein = 50; // Default value if targetProtein API fails

        if (responseTarget && typeof responseTarget.protein_target === 'number') {
          targetProtein = responseTarget.protein_target;
        } else {
          console.error('Unexpected target protein data structure:', responseTarget);
          setError('Failed to fetch target protein');
        }

        // Update state with current and target protein
        setProteinData({
          currentValue: totalProtein,
          goalValue: targetProtein,
        });
        setError(null);
      } else {
        console.error('Unexpected protein data structure:', responseProtein);
        setError('Unexpected protein data structure');
      }
    } catch (error) {
      console.error('Error fetching protein data:', error);
      setError('Failed to fetch protein data: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProteinData();

    // Set up event listener for foodChange event
    const handleFoodChange = () => {
      console.log('Food change event received, refreshing protein data');
      fetchProteinData();
    };
    window.addEventListener('foodChange', handleFoodChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('foodChange', handleFoodChange);
    };
  }, [fetchProteinData]);

  console.log('Rendering ProteinCard:', { proteinData, isLoading, error });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card
      goalTitle="Protein"
      currentValue={proteinData.currentValue}
      goalValue={proteinData.goalValue}
      status={calculateStatus(proteinData.currentValue, proteinData.goalValue)}
    />
  );
};

export default ProteinCard;