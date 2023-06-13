import { createContext } from "react";

export const WorkoutContext = createContext({
    workouts: "",
    setWorkouts: () => {},

    selectedWorkout: "",
    setSelectedWorkout: () => {},
    
    currentWorkout: "",
    setCurrentWorkout: () => {},

    sharedWorkouts: "", 
    setSharedWorkouts: () => {},

    finishedWorkouts: [],
    setFinishedWorkouts: () => {},
});
