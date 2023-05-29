import { useState, useContext,useEffect } from "react";
import {Box,Heading,Divider,Button,Grid,Flex} from "@chakra-ui/react";
import {collection,getDocs,deleteDoc,doc,addDoc,getDoc,updateDoc,writeBatch,query,where} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../config/firebase";
import CreateWorkout from "./CreateWorkout";
import SingleWorkout from "./SingleWorkout";
import WorkoutCards from "./WorkoutCards";
import goalheader from "../../assets/goal.png"
import { WorkoutContext } from "../../context/WorkoutContext";
import SharedWorkouts from "./SharedWorkouts";


const Workouts = () => {
  const [showForm, setShowForm] = useState(false);
  const { userID, userDocID } = useContext(AuthContext);
  const {workouts, setWorkouts, selectedWorkout, setSelectedWorkout,setSharedWorkouts,sharedWorkouts } = useContext(WorkoutContext);
  const [selectedSharedWorkout, setSelectedSharedWorkout] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);

  useEffect(() => {
    const activeWorkout = workouts.find((workout) => workout.isActive) || sharedWorkouts.find((workout) => workout.isActive);
    setActiveWorkoutId(activeWorkout ? activeWorkout.id : null);
  }, [workouts,sharedWorkouts]);

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
      const sharedWorkoutDocRef = await addDoc(sharedWorkoutsCollectionRef, { ...workoutData, sharedRef: id });
      toast.success("Workout shared successfully");
      setSharedWorkouts((prevSharedWorkouts) => [
        ...prevSharedWorkouts,
        { id: sharedWorkoutDocRef.id, ...workoutData, sharedRef: sharedWorkoutDocRef },
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
  
      const sharedColl = collection(db, `sharedWorkouts`);
      const sharedSnapshot = await getDocs(sharedColl);
  
      const batch = writeBatch(db);
  
      snapshot.forEach((doc) => {
        const workoutId = doc.id;
        if (workoutId.toString() === id.toString()) {
          batch.update(docRef, { isActive: true });
        } else {
          batch.update(doc.ref, { isActive: false });
        }
      });
  
      sharedSnapshot.forEach((doc) => {
        const sharedRefValue = doc.data().sharedRef;
        const sharedDocRef = doc.ref;
        if (sharedRefValue === id.toString()) {
          batch.update(sharedDocRef, { isActive: true });
        } else {
          batch.update(sharedDocRef, { isActive: false });
        }
      });
  
      await batch.commit();

      const updatedWorkouts = workouts.map((workout) => {
        if (workout.id === id) {
          return { ...workout, isActive: true };
        }
        return { ...workout, isActive: false };
      });
      setWorkouts(updatedWorkouts);

      const updatedSharedWorkouts = sharedWorkouts.map((workout) => {
        if (workout.sharedRef === id) {
          return { ...workout, isActive: true };
        }
        return { ...workout, isActive: false };
      });
      setSharedWorkouts(updatedSharedWorkouts);
      setActiveWorkoutId(id);

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
          <SharedWorkouts
            handleSetActive={handleSetActive}
            difficultyColors={difficultyColors}
            handleViewMoreClick={handleViewMoreClickShared}
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
