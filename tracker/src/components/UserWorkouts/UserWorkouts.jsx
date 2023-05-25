import { useState, useContext, useEffect } from "react";
import {collection,getDocs,query,where} from "firebase/firestore";
import {Box,Heading,Text} from "@chakra-ui/react"
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { userID, userDocID } = useContext(AuthContext);
  const navigate = useNavigate()

    useEffect(() => {
        const fetchWorkouts = async () => {
          if (userDocID) {
            try {
              const q = query(
                collection(db, `users/${userDocID}/workouts`),
                where("owner", "==", userID)
              );
              const querySnapshot = await getDocs(q);
              const workoutData = [];
              querySnapshot.forEach((doc) => {
                workoutData.push({ id: doc.id, ...doc.data() });
              });
              setWorkouts(workoutData);
            } catch (error) {
              console.error("Error fetching workouts:", error);
            }
          }
        };
        fetchWorkouts();
      }, [userDocID, userID]);

      return (
        <Box _hover={{ backgroundColor: "#fabc80" }} onClick={() => navigate('/workouts')} bgColor="#fabc60" boxShadow="lg" p="5" rounded="md" w="210px" h="190px" textAlign="center">
            <Heading color="white" size="md"> Workouts Created </Heading>
            <Text color="white" fontSize="80px">{workouts.length}</Text>
        </Box>
    )
}
export default UserWorkouts