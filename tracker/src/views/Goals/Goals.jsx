import { useState, useContext, useEffect } from "react";
import {collection,addDoc,serverTimestamp,getDocs,query,where,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {Box,Text,Grid,Flex} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import GoalForm from "./GoalForm";
import SingleGoal from "./SingleGoal";
import GoalMenu from "./GoalMenu";
import GoalCard from "./GoalCard";
import "react-toastify/dist/ReactToastify.css";


const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goals, setGoals] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [goalCategory, setGoalCategory] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null)
  const [docRef, setDocRef] = useState(null);

  const { userID, userDocID,userGoal } = useContext(AuthContext);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchGoals = async () => {
      if (userDocID) {
        try {
          const q = query(
            collection(db, `users/${userDocID}/goals`),
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(q);
          const goalsData = [];
          querySnapshot.forEach((doc) => {
            goalsData.push({ id: doc.id, ...doc.data() });
          });
          setGoals(goalsData);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      }
    };
    fetchGoals();
  }, [userID, userDocID]);

  useEffect(() => {
    const fetchMainGoals = async () => {
      if (userDocID) {
        try {
          const qu = query(
            collection(db, "mainGoals"), 
            where("owner", "==", userID)
          );
          const querySnapshot = await getDocs(qu);
          const mainGoalsData = [];
          querySnapshot.forEach((doc) => {
            mainGoalsData.push({ id: doc.id, ...doc.data() });
          });
          setMainGoals(mainGoalsData[0]);
          if (mainGoalsData[0]) {
            const mainGoalsDocRef = doc(db, "mainGoals", mainGoalsData[0].id);
            setDocRef(mainGoalsDocRef);

            if (!mainGoalsData[0].currentGoal) {
              if (userGoal === "Extreme weight gain") {
                updateCurrentGoal(mainGoalsData[0].extremeGain);
              } else if (userGoal === "Extreme weight loss") {
                updateCurrentGoal(mainGoalsData[0].extremeLoss)
              } else if (userGoal === "Mild weight gain") {
                updateCurrentGoal(mainGoalsData[0].mildGain);
              } else if (userGoal === "Mild weight loss") {
                updateCurrentGoal(mainGoalsData[0].mildLoss);
              } else if (userGoal === "Weight gain") {
                updateCurrentGoal(mainGoalsData[0].gain);
              } else if (userGoal === "Weight loss") {
                updateCurrentGoal(mainGoalsData[0].loss);
              } else if (userGoal === "Maintain weight") {
                updateCurrentGoal(mainGoalsData[0].maintain);
              }
            } else {
              setCurrentGoal(mainGoalsData[0].currentGoal)
            }
          }
        } catch (error) {
          console.error("Error fetching main goals:", error);
        }
      }
    };
    console.log('yes');
    fetchMainGoals();
  }, [userID,userDocID,userGoal]);

  const updateCurrentGoal = async (goal) => {
    setCurrentGoal(goal);
    const dataWithDocID = { currentGoal: goal };
    await updateDoc(docRef, dataWithDocID);
  };

  const createGoal = async () => {
    if (user) {
      try {
        const goalDocRef = await addDoc(collection(db, `users/${userDocID}/goals`),
          {
            name: goalName,
            text: goalNote,
            owner: userID,
            from: goalFrom,
            to: goalTo,
            category: goalCategory,
            // progress: goalProgress,
            createdAt: serverTimestamp(),
          });

        const createdGoal = {
          id: goalDocRef.id,
          name: goalName,
          text: goalNote,
          owner: userID,
          from: goalFrom,
          to: goalTo,
          category: goalCategory,
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
        toast.error("Error creating goal:", error);
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
      await updateDoc(goalRef, { finished: true });
      closeModal();
      toast.success("Goal finished successfully!");
    } catch (error) {
      toast.error("Error finishing goal:", error);
    }
  };

  return (
    <Box mt="40px" width="1800px">
      <Grid templateColumns="4fr 1fr" gap={6} m={10}>

      <Box>
        <GoalMenu mainGoals={mainGoals} updateCurrentGoal={updateCurrentGoal} currentGoal={currentGoal} />
        <Box display="flex" flexDirection="column" mt={30}>
          <Text mb={4} fontSize="2xl" fontWeight="bold"> Personal Goals </Text>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="left"
            mb={2}
          >
            {goals.map((goal, index) => (
              <GoalCard key={index} goal={goal} openModal={openModal} />
            ))}
          </Box>
        </Box>
      </Box>

      <Flex mt="182px" justifyContent="right" flexDirection="column">
        <GoalForm
          createGoal={createGoal}
          goalName={goalName}
          setGoalName={setGoalName}
          goalNote={goalNote}
          setGoalNote={setGoalNote}
          goalFrom={goalFrom}
          setGoalFrom={setGoalFrom}
          goalTo={goalTo}
          setGoalTo={setGoalTo}
          goalCategory={goalCategory}
          setGoalCategory={setGoalCategory}
        />
      </Flex>

      {selectedGoal && (
        <SingleGoal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedGoal={selectedGoal}
        updateGoalTitle={updateGoalTitle}
        updateGoalText={updateGoalText}
        handleFinishGoal={handleFinishGoal}
        handleDeleteGoal={handleDeleteGoal}
      />
      )}
      <ToastContainer />
      </Grid>
    </Box>
  );
};

export default Goals;



// return (
//   <Box display="flex" flexDirection="row" ml={32}>
//     <Box display="flex" flexDirection="column" mt={30}>
//       {/* ... (existing code) */}
//       <Box display="flex" flexWrap="wrap" justifyContent="left" mb={2}>
//         {goals.map((goal, index) => (
//           <Box key={index} mr={4} width="240px" height="250px">
//             {/* ... (existing code) */}
//             <CardFooter justifyContent="end">
//               <Button
//                 size="md"
//                 colorScheme="linkedin"
//                 onClick={() => openModal(goal)}
//               >
//                 View
//               </Button>
//               <Text mt={2}>
//                 <strong>Progress:</strong> {goal.progress}%
//               </Text>
//               {/* Progress update */}
//               <Input
//                 type="number"
//                 min={0}
//                 max={100}
//                 value={goal.progress}
//                 onChange={(e) =>
//                   updateGoalProgress(goal.id, parseInt(e.target.value, 10))
//                 }
//               />
//             </CardFooter>
//           </Box>

// const updateMainGoalProgress = async (mainGoalId, newProgress) => {
//   try {
//     const mainGoalRef = doc(db, `users/${userDocID}/mainGoals`, mainGoalId);
//     await updateDoc(mainGoalRef, { progress: newProgress });
//     toast.success("Main goal progress updated successfully!");
//   } catch (error) {
//     toast.error("Error updating main goal progress:", error);
//   }
// };

  // const updateGoalProgress = async (goalId, newProgress) => {
  //   try {
  //     const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
  //     await updateDoc(goalRef, { progress: newProgress });
  //     toast.success("Progress updated successfully!");
  //   } catch (error) {
  //     toast.error("Error updating progress:", error);
  //   }
  // };

  // const [goalProgress, setGoalProgress] = useState(0);