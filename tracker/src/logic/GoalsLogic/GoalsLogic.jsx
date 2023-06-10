import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoalContext } from "../../context/GoalContext";
import { EnergizeGameContext } from "../../context/EnergizeGameContext";

const GoalsLogic = () => {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext);


  const { userID, userDocID } = useContext(AuthContext);
  const { goalDocRef, goals, setGoals, currentGoal, finishedGoals, setFinishedGoals, setCurrentGoal, mainGoals } = useContext(GoalContext);
  const user = auth.currentUser;

  const updateCurrentGoal = async (goal) => {
    setCurrentGoal(goal);
    const dataWithDocID = { currentGoal: goal };
    await updateDoc(goalDocRef, dataWithDocID);
  };

  const createGoal = async () => {
    if (user) {
      try {
        const updateGoal = await addDoc(collection(db, `users/${userDocID}/goals`), {
          name: goalName,
          text: goalNote,
          owner: userID,
          from: goalFrom,
          to: goalTo,
          category: goalCategory,
          status: "active",
          createdAt: serverTimestamp(),
        });

        const createdGoal = {
          id: updateGoal.id,
          name: goalName,
          text: goalNote,
          owner: userID,
          from: goalFrom,
          to: goalTo,
          category: goalCategory,
          status: "active",
          createdAt: new Date().toISOString(),
        };
        setGoals((prevGoals) => [...prevGoals, createdGoal]);

        setGoalName("");
        setGoalNote("");
        setGoalFrom("");
        setGoalTo("");
        setGoalCategory("");
        toast.success("Goal created successfully!");
      } catch (error) {
        console.error("Error creating goal:", error);
      }
    }
  };

  const openModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGoal(null);
    setIsModalOpen(false);
  };

  const updateGoalTitle = async (goalId, newTitle) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
      await updateDoc(goalRef, { name: newTitle });
      toast.success("Goal updated successfully!");
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id === goalId) {
            return { ...goal, name: newTitle };
          }
          return goal;
        })
      );
    } catch (error) {
      toast.error("Error updating goal:", error);
    }
  };

  const updateGoalText = async (goalId, newText) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
      await updateDoc(goalRef, { text: newText });
      toast.success("Goal updated successfully!");
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id === goalId) {
            return { ...goal, text: newText };
          }
          return goal;
        })
      );
    } catch (error) {
      toast.error("Error updating goal:", error);
    }
  };

  const handleDeleteGoal = async (goal) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goal.id);
      await deleteDoc(goalRef);
      closeModal();
      toast.success("Goal deleted successfully!");
      setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
    } catch (error) {
      toast.error("Error deleting goal:", error);
    }
  };

  const handleFinishGoal = async (goal) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goal.id);
      await updateDoc(goalRef, { status: "finished" });
      closeModal();

      setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
      setFinishedGoals((prevFinishedGoals) => [
        ...prevFinishedGoals,
        { ...goal, status: "finished" },
      ]);

      const newEnergizePoints = energizePoints + 5;
     
      setEnergizePoints(newEnergizePoints);

      toast("Congratulations! You've earned 5 Energize Points for completing your goal!", {
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
    goalName,
    setGoalName,
    goalNote,
    setGoalNote,
    goalFrom,
    setGoalFrom,
    goalTo,
    setGoalTo,
    goalCategory,
    setGoalCategory,
    selectedGoal,
    setSelectedGoal,
    isModalOpen,
    setIsModalOpen,
    userID,
    userDocID,
    goalDocRef,
    goals,
    setGoals,
    currentGoal,
    finishedGoals,
    setFinishedGoals,
    setCurrentGoal,
    mainGoals,
    user,
    updateCurrentGoal,
    createGoal,
    openModal,
    closeModal,
    updateGoalTitle,
    updateGoalText,
    handleDeleteGoal,
    handleFinishGoal,
    difficultyColors: {
      finished: "green",
      active: "purple",
    },
  };
};

export default GoalsLogic;
