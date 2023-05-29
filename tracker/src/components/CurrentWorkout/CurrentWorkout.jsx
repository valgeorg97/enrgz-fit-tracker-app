import {Box,Heading,Text,Badge,Flex,Button,Card as ChakraCard,CardHeader,CardFooter,} from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";

const CurrentWorkout = ({activeWorkout}) => {
  
    if (!activeWorkout) {
      return <Text>No active workout</Text>;
    }

  return (
    <Box h="340px">
      <ChakraCard
        background="linear-gradient(to bottom, rgb(173, 83, 137), rgb(60, 16, 83))"
        boxShadow="dark-lg"
        rounded="md"
        borderColor="gray.50"
        height="100%"
        p={4}
      >
        <Heading textAlign="center" fontSize="xl" mb={6} color="white">Current workout</Heading>
        <CardHeader color="white" height="160px">
          <Heading as="h2" color="white" size="md" mb={3}>
            {activeWorkout.name}
          </Heading>
          <Text>
            <strong>Muscle Group:</strong> {activeWorkout.muscle}
          </Text>
          <Text>
            <strong>Type:</strong> {activeWorkout.type}
          </Text>
          <Text>
            <strong>Reps:</strong> {activeWorkout.reps}
          </Text>
          <Text>
            <strong>Weight:</strong> {activeWorkout.weight}
          </Text>
          <Text>
            <strong>Number of Exercises:</strong>{" "}
            {activeWorkout.exercises ? activeWorkout.exercises.length : 0}
          </Text>
          <Text>
            <strong>Difficulty:</strong>{" "}
            <Badge fontSize="lg" colorScheme={activeWorkout.difficulty}>
              {activeWorkout.difficulty}
            </Badge>
          </Text>
        </CardHeader>
        <CardFooter justifyContent="right">
          <Button mt={6} float="right" size="md">
            <Flex align="center">
              <FaStopwatch />
            </Flex>
          </Button>
        </CardFooter>
      </ChakraCard>
    </Box>
  );
};

export default CurrentWorkout;
