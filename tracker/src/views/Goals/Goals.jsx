import { useState, useContext, useEffect } from "react";
import {collection,addDoc,serverTimestamp,getDocs,query,where,updateDoc,deleteDoc,doc,} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {Box,Button,Text,Card,CardHeader,Heading,CardFooter,Modal,ModalOverlay,Menu,MenuButton,MenuList,MenuItem,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Editable,EditablePreview,EditableInput,EditableTextarea,ButtonGroup,IconButton,Flex,useEditableControls} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { CheckIcon, CloseIcon, EditIcon,ChevronDownIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import GoalForm from "./GoalForm";


const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goals, setGoals] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [goalCategory, setGoalCategory] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null)
  const [docRef, setDocRef] = useState(null);

  const { userID, userDocID,userGoal } = useContext(AuthContext);
  const user = auth.currentUser;

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

  useEffect(() => {
    const fetchMainGoals = async () => {
      
      if (userDocID) {
        try {
          const qu = query(
            collection(db, "mainGoals"), 
            where("owner", "==", userID)
          );
          
          const querySnapshot = await getDocs(qu);
          const mainGoalsData = [];
          querySnapshot.forEach((doc) => {
            mainGoalsData.push({ id: doc.id, ...doc.data() });
          });
          setMainGoals(mainGoalsData[0]);
          if (mainGoalsData[0]) {
            const mainGoalsDocRef = doc(db, "mainGoals", mainGoalsData[0].id);
            setDocRef(mainGoalsDocRef);
            setCurrentGoal(mainGoalsData[0].currentGoal)
          }
        } catch (error) {
          console.error("Error fetching main goals:", error);
        }
      }
    };
    fetchMainGoals();
  }, [userID,userDocID]);


  const createGoal = async () => {
    if (user) {
      try {
        const goalDocRef = await addDoc(collection(db, `users/${userDocID}/goals`),
          {
            name: goalName,
            text: goalNote,
            owner: userID,
            from: goalFrom,
            to: goalTo,
            category: goalCategory,
            // progress: goalProgress,
            createdAt: serverTimestamp(),
          }
        );
        setGoalName("");
        setGoalNote("");
        setGoalFrom("");
        setGoalTo("");
        setGoalCategory("");
        toast.success("Goal created successfully!");
      } catch (error) {
        toast.error("Error creating goal:", error);
      }
    }
  };

  const openModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGoal(null);
    setIsModalOpen(false);
  };

  const updateGoalTitle = async (goalId, newTitle) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
      await updateDoc(goalRef, { name: newTitle });
      toast.success("Goal updated successfully!");
    } catch (error) {
      toast.error("Error updating goal:", error);
    }
  };

  const updateGoalText = async (goalId, newText) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
      await updateDoc(goalRef, { text: newText });
      toast.success("Goal updated successfully!");
    } catch (error) {
      toast.error("Error updating goal:", error);
    }
  };

  const handleDeleteGoal = async (goal) => {
    try {
      const goalRef = doc(db, `users/${userDocID}/goals`, goal.id);
      await deleteDoc(goalRef);
      closeModal();
      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error("Error deleting goal:", error);
    }
  };

  const EditableControlsExample = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton mt={1} icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton mt={1} icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  const updateCurrentGoal = async (goal) => {
    setCurrentGoal(goal);
    const dataWithDocID = { currentGoal: goal };
    await updateDoc(docRef, dataWithDocID);
  };
  

  return (
    <Box display="flex" justifyContent="center" w="1500px">
      <Box display="flex" px={20} flexDirection="column" mt={30}>
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.100"
            borderRadius="md"
            p={12}
            boxShadow="md"
            textAlign="center"
            _hover={{ bg: "gray.200" }}
            rightIcon={<ChevronDownIcon />}
          >
            <Text fontSize="sm" color="gray.500">
              This is your current main goal based on BMR
            </Text>
            <Heading size="md" mt={2}>
              {currentGoal ? currentGoal.name : "Choose Main Goal"}
            </Heading>
            <Text fontSize="lg" fontWeight="bold" mt={2}>
              {currentGoal && currentGoal.calory}
            </Text>
          </MenuButton>

          <MenuList>
            {Object.keys(mainGoals).map((key) => {
              if (key !== "owner" && key !== "id" && key !== "maintain") {
                const goal = mainGoals[key];
                return (
                  <MenuItem
                    key={key}
                    minH="70px"
                    onClick={() => updateCurrentGoal(goal)}

                  >
                    <Box>
                      <Heading>{goal.name}</Heading>
                    </Box>
                  </MenuItem>
                );
              } else return null;
            })}
          </MenuList>
        </Menu>
      </Box>

      <Box display="flex" flexDirection="column" mt={30}>
        <Text mb={4} ml={100} fontSize="2xl" fontWeight="bold">
          Personal Goals
        </Text>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="left"
          ml="100px"
          mb={2}
        >
          {goals.map((goal, index) => (
            <Box key={index} mr={4} mb="70px" width="240px" height="250px">
              <Card
                background="linear-gradient(20deg, #DECBA4, #3E5151)"
                boxShadow="dark-lg"
                rounded="md"
                borderColor="gray.50"
              >
                <CardHeader>
                  <Heading
                    color="white"
                    size="md"
                    p="1px"
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
                  <Text mt={2}>
                    <strong>Category:</strong> {goal.category}
                  </Text>
                  <Text mt={6}>
                    <strong>From:</strong> {goal.from}
                  </Text>
                  <Text>
                    <strong>To:</strong> {goal.to}
                  </Text>
                </CardHeader>

                <CardFooter justifyContent="end">
                  <Button
                    size="md"
                    colorScheme="linkedin"
                    onClick={() => openModal(goal)}
                  >
                    View
                  </Button>
                  <Button
                    colorScheme="red"
                    size="md"
                    w="10px"
                    onClick={() => handleDeleteGoal(goal)}
                  >
                    <Flex align="center">
                      <FaTrashAlt />
                    </Flex>
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box mr="10px" position="relative" mt="82px">
        <GoalForm
          createGoal={createGoal}
          goalName={goalName}
          setGoalName={setGoalName}
          goalNote={goalNote}
          setGoalNote={setGoalNote}
          goalFrom={goalFrom}
          setGoalFrom={setGoalFrom}
          goalTo={goalTo}
          setGoalTo={setGoalTo}
          goalCategory={goalCategory}
          setGoalCategory={setGoalCategory}
        />
      </Box>

      {selectedGoal && (
        <Modal
          isOpen={isModalOpen}
          autoFocus={false}
          onClose={closeModal}
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Editable
                overflowWrap="break-word"
                wordBreak="break-word"
                defaultValue={selectedGoal.name}
                onSubmit={(newTitle) =>
                  updateGoalTitle(selectedGoal.id, newTitle)
                }
              >
                <EditablePreview />
                <EditableInput />
                <EditableControlsExample />
              </Editable>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Editable
                overflowWrap="break-word"
                wordBreak="break-word"
                defaultValue={selectedGoal.text}
                onSubmit={(newText) => updateGoalText(selectedGoal.id, newText)}
              >
                <EditablePreview />
                <EditableTextarea />
                <EditableControlsExample />
              </Editable>
              <Text mt={5}>
                <strong>Category:</strong> {selectedGoal?.category}
              </Text>
              <Text mt={5}>
                <strong>From:</strong> {selectedGoal?.from}
              </Text>
              <Text>
                <strong>To:</strong> {selectedGoal?.to}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="linkedin" onClick={closeModal}>
                Close
              </Button>
              <Button
                colorScheme="red"
                size="md"
                w="10px"
                onClick={() => handleDeleteGoal(selectedGoal)}
              >
                <Flex align="center">
                  <FaTrashAlt />
                </Flex>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Goals;



// return (
//   <Box display="flex" flexDirection="row" ml={32}>
//     <Box display="flex" flexDirection="column" mt={30}>
//       {/* ... (existing code) */}
//       <Box display="flex" flexWrap="wrap" justifyContent="left" mb={2}>
//         {goals.map((goal, index) => (
//           <Box key={index} mr={4} width="240px" height="250px">
//             {/* ... (existing code) */}
//             <CardFooter justifyContent="end">
//               <Button
//                 size="md"
//                 colorScheme="linkedin"
//                 onClick={() => openModal(goal)}
//               >
//                 View
//               </Button>
//               <Text mt={2}>
//                 <strong>Progress:</strong> {goal.progress}%
//               </Text>
//               {/* Progress update */}
//               <Input
//                 type="number"
//                 min={0}
//                 max={100}
//                 value={goal.progress}
//                 onChange={(e) =>
//                   updateGoalProgress(goal.id, parseInt(e.target.value, 10))
//                 }
//               />
//             </CardFooter>
//           </Box>

// const updateMainGoalProgress = async (mainGoalId, newProgress) => {
//   try {
//     const mainGoalRef = doc(db, `users/${userDocID}/mainGoals`, mainGoalId);
//     await updateDoc(mainGoalRef, { progress: newProgress });
//     toast.success("Main goal progress updated successfully!");
//   } catch (error) {
//     toast.error("Error updating main goal progress:", error);
//   }
// };

  // const updateGoalProgress = async (goalId, newProgress) => {
  //   try {
  //     const goalRef = doc(db, `users/${userDocID}/goals`, goalId);
  //     await updateDoc(goalRef, { progress: newProgress });
  //     toast.success("Progress updated successfully!");
  //   } catch (error) {
  //     toast.error("Error updating progress:", error);
  //   }
  // };

  // const [goalProgress, setGoalProgress] = useState(0);



          {/* <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="left"
          ml="100px"
          mb={2}
        >
          {Object.keys(mainGoals).map((key) => {
            if (key !== "owner" && key !== "id" && key !== "maintain") {
              const goal = mainGoals[key];
              return (
                <Box key={key} mr={4} mb="70px" width="240px" height="250px">
                  <Card
                    background="linear-gradient(20deg, #DECBA4, #3E5151)"
                    boxShadow="dark-lg"
                    rounded="md"
                    borderColor="gray.50"
                  >
                    <CardHeader>
                      <Heading
                        color="white"
                        size="md"
                        p="1px"
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
                      <Text textAlign="center">
                        You must consume {goal.calory} a day
                      </Text>
                    </CardHeader>
                    <CardFooter justifyContent="end"></CardFooter>
                  </Card>
                </Box>
              );
            } else return null;
          })}
        </Box> */}


        // if (mainGoalsData[0] && !mainGoalsData[0].currentGoal) {
        //   if (userGoal === "Extreme weight gain") {
        //     setCurrentGoal(mainGoalsData[0].extremeGain);
        //   } else if (userGoal === "Extreme weight loss") {
        //     setCurrentGoal(mainGoalsData[0].extremeLoss);
        //   } else if (userGoal === "Mild weight gain") {
        //     setCurrentGoal(mainGoalsData[0].mildGain);
        //   } else if (userGoal === "Mild weight loss") {
        //     setCurrentGoal(mainGoalsData[0].mildLoss);
        //   } else if (userGoal === "Weight gain") {
        //     setCurrentGoal(mainGoalsData[0].gain);
        //   } else if (userGoal === "Weight loss") {
        //     setCurrentGoal(mainGoalsData[0].loss);
        //   } else if (userGoal === "Maintain weight") {
        //     setCurrentGoal(mainGoalsData[0].maintain);
        //   }
        //   console.log(currentGoal);
        // }