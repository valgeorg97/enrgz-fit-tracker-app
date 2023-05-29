import {Box,Heading,Text,Badge,Flex,Button,Card as ChakraCard,CardHeader,CardFooter,} from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";

const CurrentWorkout = ({activeWorkout}) => {
  
    if (!activeWorkout) {
      return <Text>No active workout</Text>;
    }

  return (
    <Box>
      <Heading as="h2" size="md" mb={3}>
        Current Workout
      </Heading>
      <ChakraCard
        background="linear-gradient(140deg, #0093E9, #80D0C7)"
        boxShadow="dark-lg"
        rounded="md"
        borderColor="gray.50"
        height="100%"
        p={4}
      >
        <CardHeader height="160px">
          <Heading as="h2" size="md" mb={3}>
            {activeWorkout.name}
          </Heading>
          <Text>
            <strong>Muscle Group:</strong> {activeWorkout.muscle}
          </Text>
          <Text>
            <strong>Number of Exercises:</strong>{" "}
            {activeWorkout.exercises ? activeWorkout.exercises.length : 0}
          </Text>
          <Text>
            <strong>Difficulty:</strong>{" "}
            <Badge colorScheme={activeWorkout.difficulty}>
              {activeWorkout.difficulty}
            </Badge>
          </Text>
        </CardHeader>
        <CardFooter justifyContent="right">
          <Button variant="ghost" float="right" size="md">
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
