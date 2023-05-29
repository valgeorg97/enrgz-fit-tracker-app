import { useEffect, useState,useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import {Text,Box,Heading,Card as ChakraCard,CardHeader,Badge} from "@chakra-ui/react";
import {useNavigate } from 'react-router-dom';


const ExpiringGoal = () => {
  const [goals, setGoals] = useState([]);
  const {userDocID,userID} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGoals = async () => {
      if (userDocID) {
        try {
          const q = query(collection(db, `users/${userDocID}/goals`), where("owner", "==", userID));
          const querySnapshot = await getDocs(q);
          const goalsData = [];
          querySnapshot.forEach((doc) => {
            const goal = { id: doc.id, ...doc.data() };
            goalsData.push(goal);
          });
          const sortedGoals = goalsData
            .filter((goal) => goal.status !== "finished")
            .sort((a, b) => {
              const dateA = new Date(a.to).getTime();
              const dateB = new Date(b.to).getTime();
              return dateA - dateB;
            })
            .slice(0, 3);
          setGoals(sortedGoals);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      }
    };

    fetchGoals();
  }, [userID, userDocID]);

  const difficultyColors = {
    finished: "green",
    active: "purple",
  };
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" m={3}>
      {goals.map((goal) => (
        <Box key={goal.id} >
          <ChakraCard
            background="linear-gradient(15deg, #13547a, #80d0c7)"
            boxShadow="dark-lg"
            _hover={{ background: "blue.400" , cursor: "pointer" }}
            onClick={()=>navigate('/goals')}
      >
        <CardHeader height="270px" w="200px">
        <Heading color="purple.700" size="auto" > Expiring soon! </Heading>
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
          <Text mt={3} fontSize="sm" >
            <strong>Category:</strong> {goal.category}
          </Text>
          <Text mt={6} fontSize="sm">
            <strong>From:</strong> {goal.from}
          </Text>
          <Text fontSize="sm">
            <strong>Expiring:</strong> {goal.to}
          </Text>
          <Text fontSize="sm" fontWeight='bold'>Status:{" "} 
                <Badge size="sm" colorScheme={difficultyColors[goal.status]}>
                {goal.status}
                </Badge>
          </Text>
        </CardHeader>
      </ChakraCard>
        </Box>
      ))}
    </Box>


  );
};

export default ExpiringGoal;