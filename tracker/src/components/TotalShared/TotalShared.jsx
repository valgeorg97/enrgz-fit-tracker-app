import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

const TotalShared = () => {
  const { sharedWorkouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sharedWorkouts.length > 0) {
      setLoading(false);
    }
  }, [sharedWorkouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))"
      boxShadow="lg"
      p="5"
      rounded="md"
      w="210px"
      h="190px"
      textAlign="center"
    >
      <Heading color="white" size="md">
        Shared Workouts
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text color="white" fontSize="80px">
            {sharedWorkouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default TotalShared;
