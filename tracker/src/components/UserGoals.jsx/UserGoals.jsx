import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoalContext } from "../../context/GoalContext";

const UserGoals = () => {
  const { goals } = useContext(GoalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (goals.length > 0) {
      setLoading(false);
    }
  }, [goals]);

  return (
    <Box
      ml={10}
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/goals")}
      background="radial-gradient(circle at 10% 20%, rgb(0, 52, 89) 0%, rgb(0, 168, 232) 90%)"
      boxShadow="lg"
      p="5"
      rounded="md"
      w="210px"
      h="190px"
      textAlign="center"
    >
      <Heading color="white" size="md">
        Goals Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text color="white" fontSize="80px">
            {goals.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserGoals;
