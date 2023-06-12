import { Box, Divider, Grid, GridItem, Text,Spinner } from "@chakra-ui/react";
import { DIFFICULTY_COLORS } from "../../common/constants";
import { ToastContainer } from "react-toastify";
import { useState,useEffect } from "react";
import CreateWorkout from "../../components/WorkoutsComponents/CreateWorkout";
import WorkoutCards from "../../components/WorkoutsComponents/WorkoutCards";
import SharedWorkouts from "../../components/WorkoutsComponents/SharedWorkouts";
import SingleWorkout from "../../components/WorkoutsComponents/SingleWorkout";
import goalheader from "../../assets/goal.png";
import WorkoutsLogic from "../../logic/WorkoutsLogic/WorkoutsLogic";

const Workouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    selectedWorkout,
    selectedSharedWorkout,
    handleViewMoreClick,
    handleViewMoreClickShared,
    handleDeleteWorkout,
    handleShareWorkout,
    updateWorkoutTitle,
    handleSetActive,
    userID,
    setSelectedWorkout,
    setSelectedSharedWorkout
  } = WorkoutsLogic();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box w="1560px">
      <Grid gap={4} templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" h="600px">

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
              {isLoading ? (
            <Box ml="700px" mt="280px" display="flex" justifyContent="center" alignItems="center" height="70%">
            <Spinner size="xl" />
          </Box>
          ) : (
            <WorkoutCards
                difficultyColors={DIFFICULTY_COLORS}
                handleDeleteWorkout={handleDeleteWorkout}
                handleShareWorkout={handleShareWorkout}
                handleViewMoreClick={handleViewMoreClick}
                handleSetActive={handleSetActive}
              />
          )}
              
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
