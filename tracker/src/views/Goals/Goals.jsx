import { useState, useContext } from "react";
import {collection,addDoc,serverTimestamp,updateDoc,deleteDoc,doc} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import {Box,Text,Grid,Flex,GridItem} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import GoalForm from "./GoalForm";
import SingleGoal from "./SingleGoal";
import GoalMenu from "./GoalMenu";
import GoalCard from "./GoalCard";
import "react-toastify/dist/ReactToastify.css";
import goalheader from "../../assets/goal.png"
import { GoalContext } from "../../context/GoalContext";


const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const { userID, userDocID } = useContext(AuthContext);
  const {goalDocRef,goals,setGoals, currentGoal,finishedGoals,setFinishedGoals, setCurrentGoal, mainGoals } = useContext(GoalContext);
  const user = auth.currentUser;

  const updateCurrentGoal = async (goal) => {
    setCurrentGoal(goal);
    const dataWithDocID = { currentGoal: goal };
    await updateDoc(goalDocRef, dataWithDocID);
  };

  const createGoal = async () => {
    if (user) {
      try {
        const updateGoal = await addDoc(collection(db, `users/${userDocID}/goals`),
          {
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
      toast.success("Goal finished successfully!");

      setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goal.id));
      setFinishedGoals((prevFinishedGoals) => [
        ...prevFinishedGoals,
        { ...goal, status: "finished" },
      ]);
    } catch (error) {
      console.error("Error finishing goal:", error);
    }
  };
  

  const difficultyColors = {
    finished: "green",
    active: "purple",
  };

  return (
    <Box w="1660px" ml="54px">
      <Grid gap={4} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)"  h="600px">

        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8}>
          <GoalMenu 
            mainGoals={mainGoals}
            updateCurrentGoal={updateCurrentGoal}
            currentGoal={currentGoal}
          />
        </GridItem>

        <GridItem colSpan={4}>
          <Box display="flex" flexDirection="column" mt={30}>
            <Text mb={4} fontSize="2xl" fontWeight="bold">{" "}Personal Goals{" "}</Text>
            <Box display="flex" flexWrap="wrap" justifyContent="left" mb={2}>
              {goals.map((goal, index) => (
                <GoalCard
                  key={index}
                  goal={goal}
                  openModal={openModal}
                  difficultyColors={difficultyColors}
                />
              ))}
            </Box>
          </Box>

          {finishedGoals.length > 0 && (
            <Box display="flex" flexDirection="column" mt={30}>
              <Text mb={4} fontSize="2xl" fontWeight="bold">
                Finished Goals
              </Text>
              <Box display="flex" flexWrap="wrap" justifyContent="left" mb={2}>
                {finishedGoals.map((goal, index) => (
                  <GoalCard
                    key={index}
                    goal={goal}
                    openModal={openModal}
                    difficultyColors={difficultyColors}
                  />
                ))}
              </Box>
            </Box>
          )}
        </GridItem>

        <GridItem mr="60px" mt="80px" colSpan={1}>
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
        </GridItem>

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