import { Box, Heading, Text, Badge, Flex, Button, Card as ChakraCard, CardHeader, CardFooter, Spinner } from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';


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
    <Box h="340px">
      <ChakraCard
        background="linear-gradient(to bottom, rgb(173, 83, 137), rgb(60, 16, 83))"
        boxShadow="dark-lg"
        rounded="md"
        borderColor="gray.50"
        height="100%"
        p={4}
        _hover={{ background: "purple.600" , cursor: "pointer" }}
        onClick={()=>navigate('/workouts')}
      >
        {loading ? (
          <Flex w="250px" align="center" justify="center" height="100%">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <Box>
            {!activeWorkout && (
              <Text w="250px" textAlign="center" mt="80px" fontSize="30px" justify="center" color="white">
                Select the workout for the day
              </Text>
            )}
            {activeWorkout && (
              <Box w="250px">
                <Heading textAlign="center" fontSize="xl" mb={6} color="white">Today's workout</Heading>
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
                    <Badge fontSize="md" colorScheme={activeWorkout.difficulty}>
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
              </Box>
            )}
          </Box>
        )}
      </ChakraCard>
    </Box>
  );
};

export default CurrentWorkout;
