import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoalContext } from "../../context/GoalContext";

const UserGoals = () => {
  const { goals } = useContext(GoalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (goals) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [goals]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/goals")}
      background="radial-gradient(circle at 10% 20%, rgb(0, 52, 89) 0%, rgb(0, 168, 232) 90%)"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading color="white"fontSize="14px">
        Goals Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {goals.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserGoals;
