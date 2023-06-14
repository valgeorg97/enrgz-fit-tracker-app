import { Box, Text, Grid, GridItem,Spinner } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import GoalForm from "../../components/GoalsComponents/GoalForm";
import SingleGoal from "../../components/GoalsComponents/SingleGoal";
import GoalMenu from "../../components/GoalsComponents/GoalMenu";
import GoalCard from "../../components/GoalsComponents/GoalCard";
import goalheader from "../../assets/goal.png";
import GoalsLogic from "../../logic/GoalsLogic/GoalsLogic";
import { useEffect,useState } from "react";

/**
 * Renders the Goals component.
 */
const Goals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
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
    isModalOpen,
    goals,
    currentGoal,
    finishedGoals,
    mainGoals,
    updateCurrentGoal,
    createGoal,
    openModal,
    closeModal,
    updateGoalTitle,
    updateGoalText,
    handleDeleteGoal,
    handleFinishGoal,
    difficultyColors,
  } = GoalsLogic();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box w="1560px">
      <Grid
        gap={4}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        h="600px"
      >
        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8}>
          <GoalMenu
            mainGoals={mainGoals}
            updateCurrentGoal={updateCurrentGoal}
            currentGoal={currentGoal}
          />
        </GridItem>

        <GridItem colSpan={4}>
        {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Spinner size="xl" />
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" mt={30}>
              <Text mb={4} fontSize="2xl" fontWeight="bold">
                Personal Goals
              </Text>
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
          )}

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
