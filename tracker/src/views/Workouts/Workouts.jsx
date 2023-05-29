import { useState, useContext, useEffect } from "react";
import {Box,Heading,Divider,Button,Grid,Flex} from "@chakra-ui/react";
import {collection,getDocs,query,where,deleteDoc,doc,addDoc,getDoc,updateDoc,writeBatch} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../config/firebase";
import CreateWorkout from "./CreateWorkout";
import SingleWorkout from "./SingleWorkout";
import WorkoutCards from "./WorkoutCards";
import goalheader from "../../assets/goal.png"
import { WorkoutContext } from "../../context/WorkoutContext";


const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const [sharedWorkouts, setSharedWorkouts] = useState([]);
  const { userID, userDocID, workouts, setWorkouts, selectedWorkout, setSelectedWorkout } = useContext(AuthContext);
  const [selectedSharedWorkout, setSelectedSharedWorkout] = useState(null);


  const handleViewMoreClick = (workout) => {
    setSelectedWorkout(workout);
  };
  const handleViewMoreClickShared = (workout) => {
    setSelectedSharedWorkout(workout);
  };

  const difficultyColors = {
    easy: "green",
    medium: "orange",
    hard: "red",
  };

  const handleCreateWorkoutClick = () => {
    setShowForm(true);
  };
  const handleAddWorkout = (workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  };

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
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== id)
      );
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
      setSharedWorkouts((prevSharedWorkouts) => [
        ...prevSharedWorkouts,
        { id: workoutSnapshot.id, ...workoutData },
      ]);
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

  const handleSetActive = async (id) => {
    try {
      const workoutFolderRef = collection(db, `users/${userDocID}/workouts`);
      const docRef = doc(db, `users/${userDocID}/workouts/${id}`);
      const snapshot = await getDocs(workoutFolderRef);
      const batch = writeBatch(db);
  
      snapshot.forEach((doc) => {
        const workoutId = doc.id;
        if (workoutId.toString() === id.toString()) {
          batch.update(docRef, { isActive: true });
        } else {
          batch.update(doc.ref, { isActive: false });
        }
      });
      await batch.commit();
      toast.success("Workout set as active successfully!");
    } catch (error) {
      console.error("Error setting workout as active:", error);
    }
  };
  
  return (
    <Box maxW="1660px" mt="70px">
      <Box 
          rounded="md"
          borderColor="gray.50"
          h="180px"
          w="1500px"
          bgImage={goalheader}
          ml={10}>
      </Box>
      <Grid templateColumns="4fr 1fr" gap={6} m={10}>
        
        <Box mr="20px">
          <Heading as="h1" size="xl" mb={5}  textAlign="left">
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

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            ml="15px"
            mb={2}
          >
            <WorkoutCards
              difficultyColors={difficultyColors}
              handleDeleteWorkout={handleDeleteWorkout}
              handleShareWorkout={handleShareWorkout}
              handleViewMoreClick={handleViewMoreClick}
              handleSetActive={handleSetActive}
            />
          </Box>
        </Box>

        <Flex justifyContent="right" flexDirection="column">
          <Heading as="h1" ml={-4} size="xl" mb={5} textAlign="left">
            Shared Workouts
          </Heading>
          <Divider w="290px" ml={-4} mb={1} />
          <WorkoutCards
            workouts={sharedWorkouts}
            difficultyColors={difficultyColors}
            handleViewMoreClick={handleViewMoreClickShared}
            shared={true}
          />
        </Flex>

        {selectedWorkout && (
          <SingleWorkout
            selectedWorkout={selectedWorkout}
            userID={userID}
            updateWorkoutTitle={updateWorkoutTitle}
            handleDeleteWorkout={handleDeleteWorkout}
            setSelectedWorkout={setSelectedWorkout}
          />
        )}
        {selectedSharedWorkout && (
          <SingleWorkout
            shared={true}
            selectedWorkout={selectedSharedWorkout}
            userID={userID}
            updateWorkoutTitle={updateWorkoutTitle}
            handleDeleteWorkout={handleDeleteWorkout}
            setSelectedWorkout={setSelectedSharedWorkout}
          />
        )}

        <ToastContainer />
      </Grid>
    </Box>
  );
};

export default Workouts;
