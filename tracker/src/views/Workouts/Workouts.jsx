import { useState, useContext, useEffect } from "react";
import { Box, Heading, Divider, Button } from "@chakra-ui/react";
import CreateWorkout from "./CreateWorkout";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase";

const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { userID, userDocID } = useContext(AuthContext);

  let workoutsCollection;

  if (userDocID) {
    workoutsCollection = collection(db, `users/${userDocID}/workouts`);
  }

  const handleCreateWorkoutClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (workoutsCollection) {
      const unsubscribe = onSnapshot(workoutsCollection, (snapshot) => {
        let workouts = [];
        snapshot.forEach((doc) => workouts.push({ ...doc.data(), id: doc.id }));
        setWorkouts(workouts); 
      });
  
      return () => unsubscribe();
    }
  }, [workoutsCollection]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userDocID) {
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
  }, [userDocID, userID]);

  return (
    <Box m={5}>
      <Heading as="h1" size="xl" mb={5} textAlign="left">
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
