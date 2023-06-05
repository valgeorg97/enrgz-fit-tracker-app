import { useState, useContext,useEffect } from "react";
import {Box,Heading,Divider,Grid,Flex,GridItem,Text} from "@chakra-ui/react";
import {collection,getDocs,deleteDoc,doc,addDoc,getDoc,updateDoc,writeBatch} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { WorkoutContext } from "../../context/WorkoutContext";

import CreateWorkout from "./CreateWorkout";
import SingleWorkout from "./SingleWorkout";
import WorkoutCards from "./WorkoutCards";
import goalheader from "../../assets/goal.png"
import SharedWorkouts from "./SharedWorkouts";
import { DIFFICULTY_COLORS } from "../../common/constants";


const Workouts = () => {
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
      const querySnapshot = await getDocs(sharedWorkoutsCollectionRef);
      const sharedWorkoutExists = querySnapshot.docs.some(doc => doc.data().sharedRef === id);
      
      if (sharedWorkoutExists) {
        toast.error("Workout already shared");
        return;
      }
      
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
    <Box w="1660px" ml="54px">
      <Grid gap={4} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)"  h="600px">

        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8} />
        
        <GridItem colSpan={4}>
          <Box display="flex" flexDirection="column" mt={30}>
            <Text mb={4} fontSize="2xl" fontWeight="bold">{" "}Workouts{" "}<CreateWorkout/></Text>      
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="left"
              ml="15px"
              mb={2}
            >
              <WorkoutCards
                difficultyColors={DIFFICULTY_COLORS}
                handleDeleteWorkout={handleDeleteWorkout}
                handleShareWorkout={handleShareWorkout}
                handleViewMoreClick={handleViewMoreClick}
                handleSetActive={handleSetActive}
              />
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
        <Text ml={6} mt={8} mb={4} fontSize="2xl" fontWeight="bold">{" "}Shared workouts{" "}</Text>
          <Divider w="290px" ml={-4} mb={1} />
          <SharedWorkouts
            handleSetActive={handleSetActive}
            difficultyColors={DIFFICULTY_COLORS}
            handleViewMoreClick={handleViewMoreClickShared}
          />
        </GridItem>

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
