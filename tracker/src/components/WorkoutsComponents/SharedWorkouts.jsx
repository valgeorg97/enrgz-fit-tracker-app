import { Box, Heading, Button,Card as ChakraCard,CardHeader,CardFooter, Badge, Text, Flex } from "@chakra-ui/react";
import { RxEyeOpen } from "react-icons/rx";
import {FaPlay,FaStopwatch}from "react-icons/fa";
import { useEffect,useState,useContext } from "react";
import { WorkoutContext } from "../../context/WorkoutContext";
import PropTypes from 'prop-types';

/**
 * SharedWorkouts component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.handleSetActive - Function to handle setting the active workout.
 * @param {Object} props.difficultyColors - Object containing color schemes for different workout difficulties.
 * @param {Function} props.handleViewMoreClick - Function to handle the "View More" click event.
 * @returns {JSX.Element} SharedWorkouts component.
 */

const SharedWorkouts = ({handleSetActive,difficultyColors,handleViewMoreClick}) => {

  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const {sharedWorkouts,setSharedWorkouts} = useContext(WorkoutContext);

  useEffect(() => {
    const activeWorkout = sharedWorkouts.find((workout) => workout.isActive);
    setActiveWorkoutId(activeWorkout ? activeWorkout.id : null);
  }, [sharedWorkouts]);

const handleSetActiveAndUpdate = (workoutRef) => {
  handleSetActive(workoutRef);
  const updatedWorkouts = sharedWorkouts.map((workout) => {
    if (workout.sharedRef === workoutRef) {
      return { ...workout, isActive: true };
    }
    return { ...workout, isActive: false };
  });
  setActiveWorkoutId(workoutRef);
  setSharedWorkouts(updatedWorkouts);
};


  return (
    <Flex flexWrap="wrap" justifyContent="flex-start" mt={5} ml={-4}>
      {sharedWorkouts.map((workout, index) => {
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
            background="linear-gradient(178deg, rgba(201, 234, 252, 0.51) 14.9%, rgba(139, 192, 216, 0.73) 80%)"
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
                <Text><strong>Creator:</strong>{workout.ownerName + " " + workout.ownerFamily}</Text>

            </CardHeader>
            <CardFooter justifyContent="right">

              <Button variant="ghost" float="right" size="md" onClick={() => {handleViewMoreClick(workout)}}>
                <Flex align="center"><RxEyeOpen /></Flex>
              </Button>


              {activeWorkoutId === workout.id ? (
                <Button variant="ghost" float="right" size="md"  ><Flex align="center"><FaStopwatch /></Flex></Button>
              ) : (<Button variant="ghost" float="right" size="md" onClick={() => {handleSetActiveAndUpdate(workout.sharedRef)}}><Flex align="center"><FaPlay /></Flex></Button>)}

              
            </CardFooter>
          </ChakraCard>
        </Box>
      )
    })}
    </Flex>
  );
}

SharedWorkouts.propTypes = {
  handleSetActive: PropTypes.func.isRequired,
  difficultyColors: PropTypes.object.isRequired,
  handleViewMoreClick: PropTypes.func.isRequired,
};

export default SharedWorkouts