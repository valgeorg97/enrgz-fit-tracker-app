import { useState, useContext, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc, updateDoc, writeBatch } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { WorkoutContext } from "../../context/WorkoutContext";

const WorkoutsLogic = () => {
  const { userID, userDocID } = useContext(AuthContext);
  const { workouts, setWorkouts, selectedWorkout, setSelectedWorkout, setSharedWorkouts, sharedWorkouts } = useContext(WorkoutContext);
  const [selectedSharedWorkout, setSelectedSharedWorkout] = useState(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState(null);

  useEffect(() => {
    const activeWorkout = workouts.find((workout) => workout.isActive) || sharedWorkouts.find((workout) => workout.isActive);
    setActiveWorkoutId(activeWorkout ? activeWorkout.id : null);
  }, [workouts, sharedWorkouts]);

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
    setSelectedSharedWorkout
  };
};

export default WorkoutsLogic;
