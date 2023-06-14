import { Box, Heading, Text, Badge, Flex, Button, Card as ChakraCard, CardHeader, CardFooter, Spinner } from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * `CurrentWorkout` is a React Component used for displaying the current active workout to the user. 
 * It shows a loading state while it waits for the workout data and then shows the workout details.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.activeWorkout - The active workout object.
 * @param {string} props.activeWorkout.name - Name of the workout.
 * @param {string} props.activeWorkout.muscle - The targeted muscle group of the workout.
 * @param {string} props.activeWorkout.type - The type of the workout.
 * @param {number} props.activeWorkout.reps - The number of repetitions in the workout.
 * @param {number} props.activeWorkout.weight - The weight used in the workout.
 * @param {Array} props.activeWorkout.exercises - An array of exercises included in the workout.
 * @param {string} props.activeWorkout.difficulty - The difficulty level of the workout.
 *
 * @returns {JSX.Element} CurrentWorkout Component
 */

const CurrentWorkout = ({ activeWorkout }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  useEffect(() => {
    let timeoutId;
    
    if (activeWorkout) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeWorkout]);

  return (
    <Box h="340px" >
      <ChakraCard
        background="linear-gradient(to bottom, rgb(173, 83, 137), rgb(60, 16, 83))"
        boxShadow="lg"
        rounded="md"
        borderColor="gray.50"
        height="85%"
        p={1}
        _hover={{ background: "#5f1854" , cursor: "pointer" }}
        onClick={()=>navigate('/workouts')}
        
      >
        {loading ? (
          <Flex w="250px" align="center" justify="center" height="100%">
            <Spinner color="white" ml="90px" mb="30px" size="xl" />
          </Flex>
        ) : (
          <Box w="auto" >
            {!activeWorkout && (
              <Text ml="55px" w="250px" textAlign="center" mt="80px" fontSize="30px" color="white">
                Select the workout for the day
              </Text>
            )}
            {activeWorkout && (
              <Box mt={3}>
                <Heading textAlign="center" fontSize="xl" mb={2} color="white">Today's workout</Heading>
                <CardHeader ml="60px" color="white" height="160px">
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
                    <Badge fontSize="md" colorScheme={activeWorkout.difficulty}>
                      {activeWorkout.difficulty}
                    </Badge>
                  </Text>
                </CardHeader>
                <CardFooter justifyContent="right">
                  <Button float="right" size="md">
                    <Flex align="center">
                      <FaStopwatch />
                    </Flex>
                  </Button>
                </CardFooter>
              </Box>
            )}
          </Box>
        )}
      </ChakraCard>
    </Box>
  );
};

export default CurrentWorkout;

CurrentWorkout.propTypes = {
  activeWorkout: PropTypes.shape({
    name: PropTypes.string.isRequired,
    muscle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    exercises: PropTypes.array,
    difficulty: PropTypes.string.isRequired,
  }),
};
