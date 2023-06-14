import { Box, VStack, HStack, Grid, GridItem } from "@chakra-ui/react";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

import WaterCalculator from "../../components/DashboardComponents/WaterIntake/WaterIntake";
import FoodCaloriesIntake from "../../components/DashboardComponents/FoodCaloriesIntake/FoodCaloriesIntake";
import UserGoals from "../../components/DashboardComponents/UserGoals/UserGoals";
import UserWorkouts from "../../components/DashboardComponents/UserWorkouts/UserWorkouts";
import ExpiringGoal from "../../components/DashboardComponents/ExpiringGoal/ExpiringGoal";
import CurrentWorkout from "../../components/DashboardComponents/CurrentWorkout/CurrentWorkout";
import TotalShared from "../../components/DashboardComponents/TotalShared/TotalShared";
import Friends from "../../components/DashboardComponents/Friends/Friends";

import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";

const images = [img1, img2, img3, img4, img5];

/**
 * Renders the Dashboard component.
 */
const Dashboard = () => {
  const { workouts } = useContext(WorkoutContext);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const navigate = useNavigate();
  const [bgImageIndex, setBgImageIndex] = useState(0);


  useEffect(() => {
    const newActiveWorkout = workouts.find((workout) => workout.isActive);
    setActiveWorkout(newActiveWorkout);
  }, [workouts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box w="1560px" >
      <Grid h="600px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
  
        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1580px" bgImage={images[bgImageIndex]} />
  
        <GridItem rowSpan={2} colSpan={1}>
          <Box>
            <FoodCaloriesIntake />
          </Box>
        </GridItem>

        <GridItem colSpan={1} zIndex={"dropdown"}>
          <WaterCalculator />
        </GridItem>
        <GridItem colSpan={1}>
          <CurrentWorkout activeWorkout={activeWorkout} />
        </GridItem>

        <GridItem colSpan={1} >
          <VStack>
            <HStack>
              <UserGoals />
              <UserWorkouts />
            </HStack>
            <HStack>
              <Friends />
              <TotalShared />
            </HStack>
          </VStack>
          <GridItem colSpan={3}>
            <Box mt={"20px"} ml={"-395px"} bgColor="blue.800" w="750px" h="300px" boxShadow="lg" rounded="md" _hover={{ cursor: "pointer" }} onClick={()=>navigate('/goals')}>
              <ExpiringGoal />
            </Box>
          </GridItem>
        </GridItem>

      </Grid>
    </Box>
  );
};

export default Dashboard;
