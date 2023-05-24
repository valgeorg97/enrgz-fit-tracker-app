import React, { useState } from 'react';
import { Box, Input, Button, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const FoodCaloriesIntake = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [totalCalories, setTotalCalories] = useState(2000);
    const [consumedCalories, setConsumedCalories] = useState(0);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    const handleAddFood = async () => {
        if (query !== '') {
            try {
                const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
                    method: 'GET',
                    headers: { 'X-Api-Key': 'AfAWwp+nw89/859EX9kTYA==FXcxQwZhBYqX3BIK' },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    if (Array.isArray(data) && data.length) {
                        setNutritionData(data[0]);
                        setConsumedCalories(prevCalories => prevCalories + data[0].calories);
                    } else {
                        console.log('No data found');
                    }
                } else {
                    console.log("Response was not ok");
                }
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        setQuery('');
    }

    const calorieProgress = (consumedCalories / totalCalories) * 100;

    return (
        <Box boxShadow="lg" p="6" rounded="md" bg="white">
            <Text fontSize="sm">Base Goal Calories: {totalCalories} kcal</Text>
            <Text fontSize="sm">Calories Remaining: {totalCalories - consumedCalories} kcal</Text>
            <CircularProgress value={calorieProgress} color="green.400">
                <CircularProgressLabel>{`${calorieProgress.toFixed(0)}%`}</CircularProgressLabel>
            </CircularProgress>
            <Input value={query} onChange={handleQueryChange} placeholder="Enter food item" />
            <Button onClick={handleAddFood}>Add Food</Button>
        </Box>
    );
}

export default FoodCaloriesIntake;