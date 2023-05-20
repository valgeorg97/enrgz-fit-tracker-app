import { useState, useContext, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text,Card,CardHeader,Heading,CardBody,CardFooter } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goals, setGoals] = useState([]);

  const { userID, userDocID } = useContext(AuthContext);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchGoals = async () => {
      if (userDocID) {
        try {
          const q = query(collection(db, `users/${userDocID}/goals`), where("owner", "==", userID));
          const querySnapshot = await getDocs(q);
          const goalsData = [];
          querySnapshot.forEach((doc) => {
            goalsData.push({ id: doc.id, ...doc.data() });
          });
          setGoals(goalsData);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      }
    };

    fetchGoals();
  }, [user, userID, userDocID]);

  const createGoal = async () => {
    if (user) {
      try {
        const goalDocRef = await addDoc(collection(db, `users/${userDocID}/goals`), {
          name: goalName,
          owner: userID,
          from: goalFrom,
          to: goalTo,
          createdAt: serverTimestamp(),
        });
        setGoalName("");
        setGoalFrom("");
        setGoalTo("");
        toast.success("Goal created successfully!");
      } catch (error) {
        toast.error("Error creating goal:", error);
      }
    }
  };

  return (
<Box display="flex" flexDirection="row" ml={32}>
  <Box display="flex" flexDirection="column" mt={30}>
    <Text mb={4} ml={100} fontSize="2xl" fontWeight="bold">
      Goals
    </Text>
    <Box display="flex" flexWrap="wrap" justifyContent="left" mb={3}>
      {goals.map((goal, index) => (
        <Box key={index} mr={4} width="240px" height="250px">
          <Card>
            <CardHeader>
              <Heading
                size="md"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {goal.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                <strong>From:</strong> {goal.from}
              </Text>
              <Text>
                <strong>To:</strong> {goal.to}
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        </Box>
      ))}
    </Box>
  </Box>

  <Box flex="1" marginLeft="auto" mt={430} mr={50}>
    <Stack spacing={2} width="200px" height="200px">
      <FormControl>
        <FormLabel>Goal Name</FormLabel>
        <Input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>From</FormLabel>
        <Input
          type="date"
          value={goalFrom}
          onChange={(e) => setGoalFrom(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>To</FormLabel>
        <Input
          type="date"
          value={goalTo}
          onChange={(e) => setGoalTo(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={createGoal}>
        Create Goal
      </Button>
    </Stack>
  </Box>
  <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
</Box>



  );
};

export default Goals;
