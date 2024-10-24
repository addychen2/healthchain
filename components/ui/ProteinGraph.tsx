"use client"
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define interfaces for the API responses
interface DailyProteinEntry {
    date: string;            // The date should be a string in 'YYYY-MM-DD' format
    total_protein: number;  // Total protein consumed on that date
}

interface WeeklyProteinData {
    daily_protein: DailyProteinEntry[]; // Array of daily protein entries
}

interface TargetProteinData {
    pro_target: number;     // The target protein intake
}

const ProteinGraphCard: React.FC = () => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            fill: boolean;
            borderDash?: number[];
        }[];
    }>({
        labels: [],
        datasets: [
            {
                label: "Protein per Day",
                data: [],
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Target",
                data: [],
                borderColor: "rgba(255,0,0,0.5)",
                borderDash: [10, 5],
                fill: false,
            },
        ],
    });

    const fetchData = async () => {
        const userId = Cookies.get("user_id");

        // Fetch weekly protein data
        try {
            const response = await fetch(`https://addisonchen.pythonanywhere.com/api/weekly_protein?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching weekly protein: ${response.statusText}`);
            }

            const weeklyData: WeeklyProteinData = await response.json();
            console.log("Weekly Protein Data:", weeklyData);

            // Check if daily_protein is defined and is an array
            if (!weeklyData.daily_protein || !Array.isArray(weeklyData.daily_protein)) {
                console.error('Unexpected response structure:', weeklyData);
                return;
            }

            // Extract the dates and protein data
            const labels = weeklyData.daily_protein.map((entry: DailyProteinEntry) => entry.date).reverse();  // Reverse the labels
            const protein = weeklyData.daily_protein.map((entry: DailyProteinEntry) => entry.total_protein).reverse();  // Reverse the data

            // Fetch target protein
            const targetResponse = await fetch(`https://addisonchen.pythonanywhere.com/api/get_target_protein?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!targetResponse.ok) {
                throw new Error(`Error fetching target protein: ${targetResponse.statusText}`);
            }

            const targetData: TargetProteinData = await targetResponse.json();
            const targetValue = targetData.pro_target;

            // Update the chartData state
            setChartData({
                labels,
                datasets: [
                    {
                        label: "Protein per Day",
                        data: protein,
                        borderColor: "rgba(75,192,192,1)",
                        fill: false,
                    },
                    {
                        label: "Target",
                        data: Array(7).fill(targetValue),  // Create a straight line across the graph
                        borderColor: "rgba(255,0,0,0.5)",
                        borderDash: [10, 5],
                        fill: false,
                    },
                ],
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-diet-green-darkest" style={{ width: "500px", margin: "auto", padding: "20px", boxShadow: "0 0 15px rgba(0,0,0,0.1)", fontFamily: "'Geist Sans', sans-serif", borderRadius: "15px" }}>
            <h3 style={{ color: "white" }}>Protein Intake for the Last 7 Days</h3>
            <Line data={chartData} width={400} height={200} options={{ plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }} />
        </div>
    );
};

export default ProteinGraphCard;
