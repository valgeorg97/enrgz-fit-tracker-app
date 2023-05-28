import { Box, VStack, HStack, Text, Heading,Image } from "@chakra-ui/react";
import WaterCalculator from "../../components/WaterIntake/WaterIntake";
import FoodCaloriesIntake from "../../components/FoodCaloriesIntake/FoodCaloriesIntake";
import UserGoals from "../../components/UserGoals.jsx/UserGoals";
import UserWorkouts from "../../components/UserWorkouts/UserWorkouts";
import goalheader from "../../assets/goal.png";
// import Calendar from "../../components/Calendar";
import ExpiringGoal from "../../components/ExpiringGoal/ExpiringGoal";
import gif1 from "../../assets/gif/gif1.gif";
import gif2 from "../../assets/gif/gif2.gif";
import gif3 from "../../assets/gif/gif3.gif";
import gif4 from "../../assets/gif/gif4.gif";
import gif5 from "../../assets/gif/gif5.gif";
import { useState } from "react";

const Dashboard = () => {
  const [currentGif, setCurrentGif] = useState(gif1);
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    if (currentGif === gif1) setCurrentGif(gif2);
    else if (currentGif === gif2) setCurrentGif(gif3);
    else if (currentGif === gif3) setCurrentGif(gif4);
    else if (currentGif === gif4) setCurrentGif(gif5);
    else if (currentGif === gif5) {
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
      setCurrentGif(gif1)
      }, 4000);
    } else setCurrentGif(gif1);
  };

  return (
    <Box w="1660px" mt="70px">
      <Box rounded="md" borderColor="gray.50" h="140px" w="1500px" bgImage={goalheader} ml={10}></Box>

      <HStack ml={10} mt={4}>
        <Box mr={5} mb="20px">
          <WaterCalculator />
        </Box>

        <Box textAlign="center" w="600px" h="200px" boxShadow="dark-lg" rounded="md">
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
        <VStack mr={5}>
          <Box>
            <FoodCaloriesIntake />
          </Box>
        </VStack>

        <HStack justifyItems="top">

        {showText ? (
            <Box
              display="flex"
              alignItems="center"
              rounded="lg"
              boxShadow="lg"
              w="410px"
              h="300px"
              bgColor="white"
              color="black"
              textAlign="center"
            >
              <Text p={10} fontSize="xl" fontWeight="bold">
                Stop clicking the gif and go do some PUSH UPS 😡
              </Text>
            </Box>
          ) : (
            <Box
              rounded="lg"
              w="410px"
              h="300px"
              mr={3}
              boxShadow="lg"
              onClick={handleClick}
              cursor="pointer"
              bgColor="white"
            >
              <Image src={currentGif} alt="GIF" ml={2} style={{ width: "390px", height: "290px" }} />
            </Box>
          )}

          <Box w="646px" h="305px" boxShadow="lg" rounded="md">
            <ExpiringGoal />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Dashboard;
