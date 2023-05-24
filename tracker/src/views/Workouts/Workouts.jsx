import { useState, useContext, useEffect } from "react";
import {
  Box,
  Heading,
  Divider,
  Button,
  Grid
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../services/firebase";
import CreateWorkout from "./CreateWorkout";
import SingleWorkout from "./SingleWorkout";
import WorkoutCards from "./WorkoutCards";

const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutsCollection, setWorkoutsCollection] = useState(null);
  const [sharedWorkouts, setSharedWorkouts] = useState([]);
  const { userID, userDocID } = useContext(AuthContext);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleViewMoreClick = (workout) => {
    setSelectedWorkout(workout);
  };
  

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

  const handleAddWorkout = (workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
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

  useEffect(() => {
    const fetchSharedWorkouts = async () => {
      try {
        const sharedWorkoutsCollectionRef = collection(db, "sharedWorkouts");
        const querySnapshot = await getDocs(sharedWorkoutsCollectionRef);
        const sharedWorkoutsData = [];
        querySnapshot.forEach((doc) => {
          sharedWorkoutsData.push({ id: doc.id, ...doc.data() });
        });
        setSharedWorkouts(sharedWorkoutsData);
      } catch (error) {
        console.error("Error fetching shared workouts:", error);
      }
    };
    fetchSharedWorkouts();
  }, []);

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${userDocID}/workouts/${id}`));
      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleShareWorkout = async (id) => {
    try {
      const workoutRef = doc(db, `users/${userDocID}/workouts/${id}`);
      const workoutSnapshot = await getDoc(workoutRef);
      const workoutData = workoutSnapshot.data();
      const sharedWorkoutsCollectionRef = collection(db, "sharedWorkouts");
      await addDoc(sharedWorkoutsCollectionRef, { ...workoutData });
      toast.success("Workout shared successfully");
      setSharedWorkouts((prevSharedWorkouts) => [...prevSharedWorkouts, { id: workoutSnapshot.id, ...workoutData }]);
    } catch (error) {
      console.error("Error sharing workout:", error);
    }
  };

  const updateWorkoutTitle = async (workoutId, newTitle) => {
    try {
      const workoutRef = doc(db, `users/${userDocID}/workouts/${workoutId}`);
      await updateDoc(workoutRef, { name: newTitle });
      toast.success("Workout title updated successfully!");

      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) => {
          if (workout.id === workoutId) {
            return { ...workout, name: newTitle };
          }
          return workout;
        })
      );
    } catch (error) {
      toast.error("Error updating workout title:", error);
    }
  };

  return (
    <Grid templateColumns="1fr 1fr" gap={6} m={5}>
      <Box>
        <Heading as="h1" size="xl" mb={5} textAlign="left">
          Workouts
        </Heading>
        <Divider mb={5} />
        {showForm ? (
          <CreateWorkout
            showForm={showForm}
            setShowForm={setShowForm}
            onAddWorkout={handleAddWorkout}
          />
        ) : (
          <Button colorScheme="linkedin" onClick={handleCreateWorkoutClick}>
            Create Workout!
          </Button>
        )}
         <WorkoutCards
          workouts={workouts}
          difficultyColors={difficultyColors}
          handleDeleteWorkout={handleDeleteWorkout}
          handleShareWorkout={handleShareWorkout}
          handleViewMoreClick={handleViewMoreClick}
        />
      </Box>

      <Box id="shared">
        <Heading as="h1" size="xl" mb={5} textAlign="left">
          Shared Workouts
        </Heading>
        <Divider mb={5} />
        <WorkoutCards
          shared={true}
          workouts={sharedWorkouts}
          difficultyColors={difficultyColors}
          handleViewMoreClick={handleViewMoreClick}
        />

        {selectedWorkout && (
           <SingleWorkout
           selectedWorkout={selectedWorkout}
           userID={userID}
           updateWorkoutTitle={updateWorkoutTitle}
           handleDeleteWorkout={handleDeleteWorkout}
           setSelectedWorkout ={setSelectedWorkout}
         />
        )}
      </Box>
      <ToastContainer />
    </Grid>
  );
};

export default Workouts;
