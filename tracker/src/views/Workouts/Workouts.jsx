import { useState, useEffect } from "react";
import { Box, Heading, Divider, Button } from "@chakra-ui/react";
import CreateWorkout from "./CreateWorkout";

const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateWorkoutClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://api.api-ninjas.com/v1/exercises?muscle=biceps",
        {
          method: "GET",
          headers: {
            "X-Api-Key": "AfAWwp+nw89/859EX9kTYA==FXcxQwZhBYqX3BIK",
          },
        }
      );
      const data = await response.json();
      setExercises(data);
      setIsLoading(false);
    };

    fetchExercises();
  }, []);

  return (
    <Box m={5}>
      <Heading as="h1" size="xl" mb={5} textAlign="center">
        Workouts
      </Heading>
      <Divider mb={5} />
      {showForm ? (
        <CreateWorkout
          exercises={exercises}
          addWorkout={(workout) => setWorkouts([...workouts, workout])}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : (
        <Button colorScheme="teal" onClick={handleCreateWorkoutClick}>
          Create Workout!
        </Button>
      )}
      <Box mt={5}>
        {workouts.map((workout, index) => (
          <Box key={index} p={5} boxShadow="md" borderWidth="1px">
            <Heading as="h2" size="md" mb={3}>
              {workout.name}
            </Heading>
            {workout.exercises.map((exercise, i) => (
              <p key={i}>
                {exercise.name}: {exercise.reps} reps
              </p>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Workouts;
