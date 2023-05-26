import { Box, Heading, Grid, VStack, Flex, Button, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import { FaCalendar } from "react-icons/fa";

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
          <Box mt={-6}> 
            <Flex justifyContent="space-between" alignItems="center" >
              <Box></Box>
              <Button as={RouterLink} to="/schedule" leftIcon={<Icon as={FaCalendar} />} size="lg">
                Schedule
              </Button>
            </Flex>
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