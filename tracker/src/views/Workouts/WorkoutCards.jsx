import { Box, Heading, Button, VStack, Badge, Text, Flex } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { FiShare2 } from "react-icons/fi";

const WorkoutCards = ({
  shared,
  workouts,
  handleDeleteWorkout,
  handleViewMoreClick,
  handleShareWorkout,
  difficultyColors
}) => {
  return (
    <VStack spacing={4} mt={5}>
      {workouts.map((workout, index) => (
        <Box
          key={index}
          p={5}
          boxShadow="md"
          borderWidth="1px"
          borderRadius="lg"
          backgroundColor="white"
        >
          <Flex justify="space-between">
            <Heading as="h2" size="md" mb={3}>
              {workout.name}
            </Heading>

            {!shared && (
                <Button
              size="xs"
              colorScheme="red"
              onClick={() => handleDeleteWorkout(workout.id)}
            >
              <Flex align="center">
                <FaTrashAlt />
              </Flex>
            </Button>
            )}
          </Flex>

          <Box>
            <Text>
              <strong>Muscle Group:</strong> {workout.muscle}
            </Text>
            <Text>
              <strong>Number of Exercises:</strong>{" "}
              {workout.exercises ? workout.exercises.length : 0}
            </Text>
            <Text>
              <strong>Difficulty:</strong>{" "}
              <Badge colorScheme={difficultyColors[workout.difficulty]}>
                {workout.difficulty}
              </Badge>
            </Text>
            <Button
              float="right"
              size="sm"
              colorScheme="green"
              onClick={() => {
                handleViewMoreClick(workout);
              }}
            >
              <Flex align="center">
                <RxEyeOpen />
              </Flex>
            </Button>
            {!shared && (
                <Button
                float="right"
                size="sm"
                colorScheme="blue"
                onClick={() => handleShareWorkout(workout.id)}
              >
                <Flex align="center">
                  <FiShare2 />
                </Flex>
              </Button>
            )}
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default WorkoutCards;
