import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../context/WorkoutContext";

const UserWorkouts = () => {
  const { workouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workouts.length > 0) {
      setLoading(false);
    }
  }, [workouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#fabc80", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="radial-gradient(circle at -3.1% -4.3%, rgb(57, 255, 186) 0%, rgb(21, 38, 82) 90%)"
      boxShadow="lg"
      p="5"
      rounded="md"
      w="210px"
      h="190px"
      textAlign="center"
    >
      <Heading color="white" size="md">
        Workouts Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text color="white" fontSize="80px">
            {workouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserWorkouts;
