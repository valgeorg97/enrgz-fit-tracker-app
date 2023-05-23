import { useState, useContext, useEffect } from "react";
import { Box, Heading, Divider, Button, VStack, Badge, Text, Flex} from "@chakra-ui/react";
import CreateWorkout from "./CreateWorkout";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

import { db } from "../../services/firebase";

const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsCollection, setWorkoutsCollection] = useState(null);
  const { userID, userDocID } = useContext(AuthContext);

  const difficultyColors = {
    easy: "green",
    medium: "orange",
    hard: "red",
  };

  useEffect(() => {
    if (userDocID) {
      setWorkoutsCollection(collection(db, `users/${userDocID}/workouts`));
    }
  }, [userDocID]);

  const handleCreateWorkoutClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userDocID && workoutsCollection) {
        try {
          const q = query(
            collection(db, `users/${userDocID}/workouts`),
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(q);
          const workoutData = [];
          querySnapshot.forEach((doc) => {
            workoutData.push({ id: doc.id, ...doc.data() });
          });
          setWorkouts(workoutData);
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      }
    };
    fetchWorkouts();
  }, [userDocID, userID, workoutsCollection]);

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${userDocID}/workouts/${id}`));
      setWorkouts(workouts.filter((workout) => workout.id !== id));  // Remove workout from state
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <Box m={5}>
      <Heading as="h1" size="xl" mb={5} textAlign="left">Workouts</Heading>
      <Divider mb={5} />
      {showForm ? (
        <CreateWorkout showForm={showForm} setShowForm={setShowForm}/>
      ) : (
        <Button colorScheme="teal" onClick={handleCreateWorkoutClick}>Create Workout!</Button>
      )}
      <VStack spacing={4} mt={5}>
        {workouts.map((workout, index) => (
          <Box key={index} p={5} boxShadow="md" borderWidth="1px" borderRadius="lg" backgroundColor="white">
            <Flex justify="space-between">
              <Heading as="h2" size="md" mb={3}>
                {workout.name}
              </Heading>
              <Button size="xs" colorScheme="red" onClick={() => handleDeleteWorkout(workout.id)}>X</Button>
            </Flex>
            <Box>
              <Text><strong>Muscle Group:</strong> {workout.muscle}</Text>
              <Text><strong>Number of Exercises:</strong> {workout.exercises ? workout.exercises.length : 0}</Text>
              <Text><strong>Difficulty:</strong> <Badge colorScheme={difficultyColors[workout.difficulty]}>{workout.difficulty}</Badge></Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Workouts;
