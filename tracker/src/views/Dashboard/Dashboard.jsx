import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Heading, Text, VStack, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; // adjust the import path according to your file structure

const Dashboard = () => {
  // const { isLoggedIn } = useContext(AuthContext);
  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isLoggedIn, navigate]);

  // replace with actual values
  const consumedCalories = 1500;
  const totalCalories = 2000;
  const calorieProgress = (consumedCalories / totalCalories) * 100;

  return (
    <>
      <VStack spacing={3}>
        <Box>
          <Heading size="md">Today:</Heading>
        </Box>
        <Box>
          <Text fontSize="sm">Base Goal Calories: {totalCalories} kcal</Text>
          <Text fontSize="sm">Calories Remaining: {totalCalories - consumedCalories} kcal</Text>
          <CircularProgress value={calorieProgress} color="green.400">
            <CircularProgressLabel>{`${calorieProgress.toFixed(0)}%`}</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box>
          <WaterCalculator />
        </Box>
        <Box>
          <Text fontSize="sm">Workouts: --</Text> {/* Replace -- with appropriate state value */}
        </Box>
      </VStack>
    </>
  );
}

export default Dashboard;