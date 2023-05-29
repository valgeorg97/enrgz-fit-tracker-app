import { Box, VStack, HStack} from "@chakra-ui/react";
import WaterCalculator from "../../components/WaterIntake/WaterIntake";
import FoodCaloriesIntake from "../../components/FoodCaloriesIntake/FoodCaloriesIntake";
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import goalheader from "../../assets/goal.png";
import ExpiringGoal from "../../components/ExpiringGoal/ExpiringGoal";
import { useState,useContext,useEffect } from "react";
import CurrentWorkout from "../../components/CurrentWorkout/CurrentWorkout";
import { WorkoutContext } from "../../context/WorkoutContext";
import DashboardGif from "../../components/DashboardGif/DashboardGif";


const Dashboard = () => {
  const { workouts } = useContext(WorkoutContext);
  const [activeWorkout, setActiveWorkout] = useState(null);

  useEffect(() => {
    const newActiveWorkout = workouts.find((workout) => workout.isActive);
    setActiveWorkout(newActiveWorkout);
  }, [workouts]);

  return (
    <Box w="1660px" mt="70px">
      <Box rounded="md" borderColor="gray.50" h="140px" w="1500px" bgImage={goalheader} ml={10}></Box>

      <HStack ml={10} mt={4}>
        <Box mr={5} mb="20px">
          <WaterCalculator />
        </Box>
        <Box>
          <CurrentWorkout activeWorkout={activeWorkout} />
        </Box>
        <Box rounded="md" borderColor="gray.50">
          <UserGoals />
        </Box>
        <Box rounded="md" borderColor="gray.50">
          <UserWorkouts />
        </Box>
      </HStack>

      <HStack ml={10} mt={4}>
        <VStack mr={5}>
          <Box>
            <FoodCaloriesIntake />
          </Box>
        </VStack>

        <HStack >
          <DashboardGif />
          <Box w="646px" h="305px" boxShadow="lg" rounded="md">
            <ExpiringGoal />
          </Box>
        </HStack>

      </HStack>
    </Box>
  );
};

export default Dashboard;
