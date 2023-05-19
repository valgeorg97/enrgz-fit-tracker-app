import { useState,useContext } from "react";
import {collection,addDoc,serverTimestamp,} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {Box,Button,FormControl,FormLabel,Input,Stack,Text,} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Goals = () => {
   const [goalName, setGoalName] = useState("");
   const [goalFrom, setGoalFrom] = useState("");
   const [goalTo, setGoalTo] = useState("");
   const { userID,userDocID } = useContext(AuthContext);
   const user = auth.currentUser

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
    <Box>
      <Text mb={4} fontSize="xl" fontWeight="bold">Exercises</Text>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Goal Name</FormLabel>
          <Input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>From</FormLabel>
          <Input type="date" value={goalFrom} onChange={(e) => setGoalFrom(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>To</FormLabel>
          <Input type="date" value={goalTo} onChange={(e) => setGoalTo(e.target.value)}/>
        </FormControl>
        <Button colorScheme="teal" onClick={createGoal}>Create Goal</Button>
      </Stack>
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </Box>
  );
};

export default Goals;
