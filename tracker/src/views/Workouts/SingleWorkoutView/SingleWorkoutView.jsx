import { Box, Heading, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { AuthContext } from "../../../context/AuthContext";

const SingleWorkoutView = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const { userID, userDocID } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutDoc = await getDoc(doc(db, `users/${userDocID}/workouts/${id}`));
        if (workoutDoc.exists()) {
          setWorkout({ id: workoutDoc.id, ...workoutDoc.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchWorkout();
  }, [id, userDocID]);

  if (!workout) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box padding="5" borderWidth={1} borderRadius="md" boxShadow="lg">
      <Flex>
        <Button 
          variant="link"
          color="black"
          size="sm"
          onClick={() => navigate(-1)} 
          leftIcon={<ArrowBackIcon />}
        >
          Back to workouts
        </Button>
        <Spacer />
      </Flex>
      <Heading marginBottom="5">{workout.name}</Heading>
      <Text>Muscle Group: {workout.muscle}</Text>
      <Text>Number of Exercises: {workout.exercises ? workout.exercises.length : 0}</Text>
      <Text>Difficulty: {workout.difficulty}</Text>
    </Box>
  );
};

export default SingleWorkoutView;

