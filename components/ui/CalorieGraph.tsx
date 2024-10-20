"use client"
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CalorieGraphCard = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Calories per Day",
                data: [],
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "Target",
                data: [],  // This will be updated with target data
                borderColor: "rgba(255,0,0,0.5)",
                borderDash: [10, 5],
                fill: false,
            },
        ],
    });

    const fetchData = async () => {
        const userId = Cookies.get("user_id");

        // Fetch weekly calories
        const response = await fetch(`http://localhost:8080/api/weekly_calories?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const weeklyData = await response.json();

        // Extract the dates and calories
        const labels = weeklyData.daily_calories.map(entry => entry.date).reverse();  // Reverse the labels
        const calories = weeklyData.daily_calories.map(entry => entry.total_calories).reverse();  // Reverse the data

        // Fetch target protein/calories
        const targetResponse = await fetch(`http://localhost:8080/api/get_target_calories?user_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const targetData = await targetResponse.json(); 
        const targetValue = targetData.cal_target;

        // Update the chartData state
        setChartData({
            labels,
            datasets: [
                {
                    label: "Calories per Day",
                    data: calories,
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-diet-green-darkest" style={{ width: "500px", margin: "auto", padding: "20px", boxShadow: "0 0 15px rgba(0,0,0,0.1)", fontFamily: "'Geist Sans', sans-serif", borderRadius: "15px" }}>
            <h3 style={{ color: "white" }}>Calorie Intake for the Last 7 Days</h3>
            <Line data={chartData} width={400} height={200} options={{ plugins: { legend: { labels: { color: 'white' } } }, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }} />
        </div>
    );
};

export default CalorieGraphCard;
