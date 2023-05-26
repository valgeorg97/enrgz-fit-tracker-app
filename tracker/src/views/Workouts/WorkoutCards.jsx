import { Box, Heading, Button,Card as ChakraCard,CardHeader,CardFooter, Badge, Text, Flex } from "@chakra-ui/react";
import { RxEyeOpen } from "react-icons/rx";
import { FiShare2 } from "react-icons/fi";

const WorkoutCards = ({shared,workouts,handleViewMoreClick,handleShareWorkout,difficultyColors}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="flex-start" mt={5} ml={-4}>
      {workouts.map((workout, index) => {
        if (!workout.name) return null;
        return (
          <Box
          key={index}
          mr={4}
          mb={5}
          width="290px"
          height="250px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <ChakraCard
            background="linear-gradient(140deg, #0093E9, #80D0C7)"
            boxShadow="dark-lg"
            rounded="md"
            borderColor="gray.50"
            height="100%"
            p={4}
          >
            <CardHeader height="160px">
              <Heading as="h2" size="md" mb={3}>{workout.name}</Heading>
              <Text><strong>Muscle Group:</strong> {workout.muscle}</Text>
              <Text><strong>Number of Exercises:</strong>{" "}{workout.exercises ? workout.exercises.length : 0}</Text>
              <Text>
                <strong>Difficulty:</strong>{" "}
                <Badge colorScheme={difficultyColors[workout.difficulty]}>
                  {workout.difficulty}
                </Badge>
              </Text>
              {shared && (
                <Text><strong>Creator:</strong>{workout.ownerName + " " + workout.ownerFamily}</Text>
              )}
            </CardHeader>
            <CardFooter justifyContent="right">
              {!shared && (
                <Button mr="5px" float="right" size="sm" colorScheme="blue" onClick={() => handleShareWorkout(workout.id)}>
                  <Flex align="center"><FiShare2 /></Flex>
                </Button>
              )}
              <Button float="right" size="sm" colorScheme="green" onClick={() => {handleViewMoreClick(workout)}}>
                <Flex align="center"><RxEyeOpen /></Flex>
              </Button>
            </CardFooter>
          </ChakraCard>
        </Box>
      )
    })}
    </Flex>
  );
}
export default WorkoutCards