import { Box, VStack,HStack,Text } from "@chakra-ui/react";
import WaterCalculator from '../../components/WaterIntake/WaterIntake'; 
import FoodCaloriesIntake from '../../components/FoodCaloriesIntake/FoodCaloriesIntake';
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import goalheader from "../../assets/goal.png"
// import { useColorMode } from "@chakra-ui/react";

const Dashboard = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const boxSomethingBgColor = colorMode === "dark" ? "gray.800" : "white";
//   const boxScheduleBgColor = colorMode === "dark" ? "gray.800" : "white";


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

      <HStack ml={10} mt={4}>
        <Box mr={5} mb="20px">
              <WaterCalculator />
        </Box>

        <Box textAlign="center" w="600px" h="200px" borderWidth={5} rounded="md" borderColor="black">
            <Text>Some graph</Text>
        </Box> 

        <Box rounded="md" borderColor="gray.50">
            <UserGoals />
        </Box>

        <Box rounded="md" borderColor="gray.50">
            <UserWorkouts />
        </Box>

      </HStack>

        <HStack ml={10} mt={4}>
          
            <VStack mr={5} >
            <Box >
                <FoodCaloriesIntake />
            </Box>
            </VStack>

            <HStack justifyItems="top">
            <Box textAlign="center" w="560px" h="330px" borderWidth={5} rounded="md" borderColor="black" >
                <Text>Something</Text>
            </Box>
            <Box textAlign="center" w="560px" h="330px" borderWidth={5} rounded="md" borderColor="black" >
                <Text>Schedule</Text>
            </Box>
            </HStack>

        </HStack>
    </Box>
  );
};

export default Dashboard;