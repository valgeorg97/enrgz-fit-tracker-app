import { Box, VStack, HStack, Grid, GridItem } from "@chakra-ui/react";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

import WaterCalculator from "../../components/WaterIntake/WaterIntake";
import FoodCaloriesIntake from "../../components/FoodCaloriesIntake/FoodCaloriesIntake";
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import ExpiringGoal from "../../components/ExpiringGoal/ExpiringGoal";
import CurrentWorkout from "../../components/CurrentWorkout/CurrentWorkout";
import DashboardGif from "../../components/DashboardGif/DashboardGif";
import TotalShared from "../../components/TotalShared/TotalShared";
import Friends from "../../components/Friends/Friends";
import goalheader from "../../assets/goal.png";


const Dashboard = () => {
  const { workouts } = useContext(WorkoutContext);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const newActiveWorkout = workouts.find((workout) => workout.isActive);
    setActiveWorkout(newActiveWorkout);
  }, [workouts]);

  return (
    <Box w="1660px" ml="54px" >
      <Grid h="600px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>

        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader}/>

        <GridItem rowSpan={2} colSpan={1}>
          <Box>
            <WaterCalculator />
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <CurrentWorkout activeWorkout={activeWorkout} />
        </GridItem>

        <GridItem colSpan={3}>
          <Box bgColor="blue.800" w="770px" h="340px" boxShadow="lg" rounded="md" _hover={{ cursor: "pointer" }} onClick={()=>navigate('/goals')}>
            <ExpiringGoal />
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <FoodCaloriesIntake />
        </GridItem>

        <GridItem w="410px" mr={-3} colSpan={1}>
          <DashboardGif />
        </GridItem>

        <GridItem colSpan={1}>
          <VStack mr={10}>
            <HStack>
              <UserGoals />
              <UserWorkouts />
            </HStack>
            <HStack>
              <Friends />
              <TotalShared />
            </HStack>
          </VStack>
        </GridItem>

      </Grid>
    </Box>
  );
};

export default Dashboard;
