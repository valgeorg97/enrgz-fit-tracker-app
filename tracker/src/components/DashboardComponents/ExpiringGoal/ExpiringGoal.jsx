import { useEffect, useState, useContext } from "react";
import {Text,Box,Heading,Card as ChakraCard,CardHeader,Badge,Spinner,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoalContext } from "../../../context/GoalContext";

/**
 * `ExpiringGoal` is a React Component that displays up to three goals sorted by their expiration date. 
 * The component fetches goals from the GoalContext and filters out the finished ones. The remaining goals are sorted by the expiration date,
 * and the top three are displayed. Goals can be clicked to navigate to the goals page.
 * While the component is fetching and sorting the goals, it displays a loading spinner. 
 * If no goals are found, it displays a message prompting the user to add goals.
 *
 * @component
 * @returns {JSX.Element} The ExpiringGoal component.
 */

const ExpiringGoal = () => {
  const [expiringGoals, setExpiringGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { goals } = useContext(GoalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const sortedGoals = goals
      .filter((goal) => goal.status !== "finished")
      .sort((a, b) => {
        const dateA = new Date(a.to).getTime();
        const dateB = new Date(b.to).getTime();
        return dateA - dateB;
      })
      .slice(0, 3);

      setExpiringGoals(sortedGoals);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }, [goals]);

  const difficultyColors = {
    finished: "green",
    active: "purple",
  };

  return (
<Box display="flex" flexWrap="wrap" justifyContent="space-between" p={3} >
      {isLoading ? (
        <Spinner color="white" ml="330px" mt="120px" size="xl" />
      ) : (
        <>
          {expiringGoals.length<1 && (
            <Text ml="225px" w="250px" textAlign="center" mt="110px" fontSize="31px" color="white">
              Click to add goals
            </Text>
          )}
          {expiringGoals.map((goal) => (
            <Box key={goal.id} height="270px" w="236px" >
              <ChakraCard
                background="linear-gradient(15deg, #13547a, #80d0c7)"
                boxShadow="dark-lg"
                _hover={{ background: "blue.400", cursor: "pointer" }}
                onClick={() => navigate("/goals")}
              >
                <CardHeader h="275px">
                  <Heading color="purple.700" size="auto">
                    Expiring soon!
                  </Heading>
                  <Heading
                    color="white"
                    size="auto"
                    mb={2}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {goal.name}
                  </Heading>
                  <Text
                    fontSize="sm"
                    noOfLines={2}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    style={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {goal.text}
                  </Text>
                  <Text mt={3} fontSize="sm">
                    <strong>Category:</strong> {goal.category}
                  </Text>
                  <Text mt={6} fontSize="sm">
                    <strong>From:</strong> {goal.from}
                  </Text>
                  <Text fontSize="sm">
                    <strong>Expiring:</strong> {goal.to}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    Status:{" "}
                    <Badge size="sm" colorScheme={difficultyColors[goal.status]}>
                      {goal.status}
                    </Badge>
                  </Text>
                </CardHeader>
              </ChakraCard>
            </Box>
          ))}
        </>
      )}
    </Box>
  )
};

export default ExpiringGoal;
