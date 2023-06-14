import { useState, useContext, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc, updateDoc, writeBatch,setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { WorkoutContext } from "../../context/WorkoutContext";
import { EnergizeGameContext } from "../../context/EnergizeGameContext";


const WorkoutsLogic = () => {
  const { userID, userDocID } = useContext(AuthContext);
  const { workouts, setWorkouts, selectedWorkout, setSelectedWorkout, setSharedWorkouts, sharedWorkouts,finishedWorkouts,setFinishedWorkouts } = useContext(WorkoutContext);
  const [selectedSharedWorkout, setSelectedSharedWorkout] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);
  const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext);


  /**
 * Sets the active workout ID based on the workouts and sharedWorkouts arrays.
 */
  useEffect(() => {
    const activeWorkout = workouts.find((workout) => workout.isActive) || sharedWorkouts.find((workout) => workout.isActive);
    setActiveWorkoutId(activeWorkout ? activeWorkout.id : null);
  }, [workouts, sharedWorkouts]);

  /**
 * Handles the "View More" click for a workout.
 * @param {Object} workout - The workout object.
 */
  const handleViewMoreClick = (workout) => {
    setSelectedWorkout(workout);
  };
  
  /**
 * Handles the "View More" click for a shared workout.
 * @param {Object} workout - The shared workout object.
 */
  const handleViewMoreClickShared = (workout) => {
    setSelectedSharedWorkout(workout);
  };

  /**
 * Handles the deletion of a workout.
 * @param {string} id - The ID of the workout to delete.
 */
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

  /**
 * Handles the sharing of a workout.
 * @param {string} id - The ID of the workout to share.
 */
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

  /**
 * Updates the title of a workout.
 * @param {string} workoutId - The ID of the workout.
 * @param {string} newTitle - The new title value.
 */
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

  /**
 * Handles setting a workout as active.
 * @param {string} id - The ID of the workout to set as active.
 */
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

  /**
 * Handles finishing a workout.
 * @param {Object} workout - The finished workout object.
 */
  const handleFinishWorkout = async (workout) => {
    console.log(workout);
    try {
      const workoutRef = doc(db, `users/${userDocID}/workouts`, workout.id);
      await updateDoc(workoutRef, { status: "finished" });

      setWorkouts((prevWorkouts) => prevWorkouts.filter((g) => g.id !== workout.id));
      setFinishedWorkouts((prevFinishedWorkouts) => [
        ...prevFinishedWorkouts,
        { ...workout, status: "finished" },
      ]);

      const newEnergizePoints = energizePoints + 5;
      setEnergizePoints(newEnergizePoints);

      toast("Congratulations! You've earned 5 Energize Points for completing your workout!", {
        type: "success",
        autoClose: 9000,
        position: toast.POSITION.TOP_CENTER,
      });

      
      if (userDocID) {
        const docRef = doc(db, "users", userDocID);
        await setDoc(
          docRef,
          {
            energizePoints: newEnergizePoints,
          },
          { merge: true }
        ).catch((error) => {
          console.error("Error updating document: ", error);
        });
      }

    } catch (error) {
      console.error("Error finishing goal:", error);
    }
  };

  return {
    selectedWorkout,
    selectedSharedWorkout,
    activeWorkoutId,
    handleViewMoreClick,
    handleViewMoreClickShared,
    handleDeleteWorkout,
    handleShareWorkout,
    updateWorkoutTitle,
    handleSetActive,
    userID,
    setSelectedWorkout,
    setSelectedSharedWorkout,
    handleFinishWorkout,
    finishedWorkouts,
    workouts
  };
};

export default WorkoutsLogic;
