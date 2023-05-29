import { createContext } from "react";

export const GoalContext = createContext({
  userGoal: "",
  setUserGoal: () => {},

  currentGoal:"",
  setCurrentGoal: () => {},

  mainGoals: [],
  setMainGoals: () => {},

  goalDocRef: null,
  setGoalDocRef: () => {},

  goals: [],
  setGoals: () => {},
  
  finishedGoals: [],
  setFinishedGoals: () => {},
});

