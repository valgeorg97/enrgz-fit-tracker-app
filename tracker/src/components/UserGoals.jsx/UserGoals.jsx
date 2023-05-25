import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box,Heading,Text } from "@chakra-ui/react";
import {collection,getDocs,query,where} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const UserGoals = () => {
  const [goals, setGoals] = useState([]);
  const { userID, userDocID } = useContext(AuthContext);
  const navigate = useNavigate()


    useEffect(() => {
        const fetchGoals = async () => {
          if (userDocID) {
            try {
              const q = query(
                collection(db, `users/${userDocID}/goals`),
                where("owner", "==", userID)
              );
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
      }, [userID, userDocID]);


    return (
        <Box _hover={{ backgroundColor: "#3a9690" }} onClick={() => navigate('/goals')} bgColor="#3a9679" boxShadow="lg" p="5" rounded="md" w="210px" h="190px" textAlign="center">
            <Heading color="white" size="md"> Goals Created </Heading>
            <Text color="white" fontSize="80px">{goals.length}</Text>
        </Box>
    )
}

export default UserGoals