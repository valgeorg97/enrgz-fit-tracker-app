import { Box, Heading, Grid, VStack, Flex, Button, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import { FaCalendar } from "react-icons/fa";
import goalheader from "../../assets/goal.png"

const Dashboard = () => {
  return (
    <Box w="1660px" mt="70px">
      <Box 
          rounded="md"
          borderColor="gray.50"
          h="180px"
          w="1500px"
          bgImage={goalheader}
          ml={10}>
      </Box>
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