import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

const TotalShared = () => {
  const { sharedWorkouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (sharedWorkouts) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sharedWorkouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="140px"
      h="120px"
      textAlign="center"
    >
      <Heading color="white" fontSize="14px">
        Shared Workouts
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {sharedWorkouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default TotalShared;
