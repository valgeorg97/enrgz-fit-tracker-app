import React, { useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { Box, Heading, Text, VStack} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';

const Dashboard = () => {
  
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
            <FoodCaloriesIntake />
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