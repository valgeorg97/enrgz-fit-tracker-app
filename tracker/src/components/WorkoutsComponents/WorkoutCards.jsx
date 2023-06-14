import { Box, Heading, Button,Card as ChakraCard,CardHeader,CardFooter, Badge, Text, Flex } from "@chakra-ui/react";
import { RxEyeOpen } from "react-icons/rx";
import { FiShare2 } from "react-icons/fi";
import {FaPlay,FaStopwatch}from "react-icons/fa";
import { useEffect,useState,useContext } from "react";
import { WorkoutContext } from "../../context/WorkoutContext";
import PropTypes from 'prop-types';

/**
 * WorkoutCards component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.workout - Workout object.
 * @param {boolean} props.shared - Boolean indicating if the workout is shared.
 * @param {Function} props.handleViewMoreClick - Function to handle the "View More" click event.
 * @param {Function} props.handleShareWorkout - Function to handle sharing a workout.
 * @param {Object} props.difficultyColors - Object containing color schemes for different workout difficulties.
 * @param {Function} props.handleSetActive - Function to handle setting the active workout.
 * @returns {JSX.Element} WorkoutCards component.
 */

const WorkoutCards = ({workout,shared,handleViewMoreClick,handleShareWorkout,difficultyColors,handleSetActive}) => {

  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const {workouts,setWorkouts} = useContext(WorkoutContext);

  useEffect(() => {
    const activeWorkout = workouts.find((workout) => workout.isActive);
    setActiveWorkoutId(activeWorkout ? activeWorkout.id : null);
  }, [workouts]);

  const handleSetActiveAndUpdate = async (id) => {
    await handleSetActive(id);

    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === id) {
        return { ...workout, isActive: true };
      }
      return { ...workout, isActive: false };
    });

    setActiveWorkoutId(id);
    setWorkouts(updatedWorkouts);
  };

  return (
          <Box
            key={workout.id}
            mr={4}
            mb={5}
            width="290px"
            height="250px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
          <ChakraCard
            background="linear-gradient(15deg, #13547a 0%, #80d0c7 100%)"
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
                <Button variant="ghost" mr="5px" float="right" size="md"  onClick={() => handleShareWorkout(workout.id)}>
                  <Flex align="center"><FiShare2 /></Flex>
                </Button>
              )}

              <Button variant="ghost" float="right" size="md" onClick={() => {handleViewMoreClick(workout)}}>
                <Flex align="center"><RxEyeOpen /></Flex>
              </Button>

              {workout.status !== "finished" && (
                activeWorkoutId === workout.id ? (
                  <Button variant="ghost" float="right" size="md">
                    <Flex align="center">
                      <FaStopwatch />
                    </Flex>
                  </Button>
                ) : (
                  <Button variant="ghost" float="right" size="md" onClick={() => {handleSetActiveAndUpdate(workout.id)}}>
                    <Flex align="center">
                      <FaPlay />
                    </Flex>
                  </Button>
                )
              )}
            </CardFooter>
          </ChakraCard>
        </Box>
  );
}

WorkoutCards.propTypes = {
  workout: PropTypes.object.isRequired,
  shared: PropTypes.bool,
  handleViewMoreClick: PropTypes.func.isRequired,
  handleShareWorkout: PropTypes.func.isRequired,
  difficultyColors: PropTypes.object.isRequired,
  handleSetActive: PropTypes.func.isRequired,
};

export default WorkoutCards