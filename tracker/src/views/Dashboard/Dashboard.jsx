import { Box, Heading, Text, Grid,VStack,Flex} from "@chakra-ui/react";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";


const Dashboard = () => {
  return (
    <Box h="700px" w="1800px">
      <Grid templateColumns="4fr 2fr" gap={6} m={10}>

        <Flex justifyContent="left" flexDirection="column">
          <Heading size="lg">Today:</Heading>
          <Box>
            <FoodCaloriesIntake />
          </Box>
          <Box>
            <WaterCalculator />
          </Box>
          </Flex>

        <Flex justifyContent="right" flexDirection="column">
        <VStack >
          <Box>
            <UserGoals />
          </Box>
          <Box>
            <UserWorkouts />
          </Box>
        </VStack>
        </Flex>

      </Grid>
    </Box>
  );
};

export default Dashboard;