import React, { useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { Box, Heading, Text, VStack} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';

const Dashboard = () => {
  const [totalCalories, setTotalCalories] = useState(2000);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [foodCalories, setFoodCalories] = useState(0); // Define foodCalories and setFoodCalories here
  
  useEffect(() => {
    setConsumedCalories(prevCalories => prevCalories + foodCalories); 
  }, [foodCalories]);

  const calorieProgress = (consumedCalories / totalCalories) * 100;

  // const { isLoggedIn } = useContext(AuthContext);
  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      <VStack spacing={3}>
        <Box>
          <Heading size="md">Today:</Heading>
        </Box>
          <Box>
            <FoodCaloriesIntake setFoodCalories={setFoodCalories} />
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