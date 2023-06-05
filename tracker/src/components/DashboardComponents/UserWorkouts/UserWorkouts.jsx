import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../../context/WorkoutContext";

const UserWorkouts = () => {
  const { workouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (workouts) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [workouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#fabc80", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="radial-gradient(circle at -3.1% -4.3%, rgb(57, 255, 186) 0%, rgb(21, 38, 82) 90%)"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading color="white" fontSize="14px">
        Workouts Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {workouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserWorkouts;
