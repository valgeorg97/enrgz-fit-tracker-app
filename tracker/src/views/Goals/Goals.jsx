import { useState, useContext, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  ButtonGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useEditableControls } from "@chakra-ui/react";

const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalFrom, setGoalFrom] = useState("");
  const [goalTo, setGoalTo] = useState("");
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null); // Track the selected goal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal state

  const { userID, userDocID } = useContext(AuthContext);
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
  }, [user, userID, userDocID]);

  const createGoal = async () => {
    if (user) {
      try {
        const goalDocRef = await addDoc(
          collection(db, `users/${userDocID}/goals`),
          {
            name: goalName,
            text: goalNote,
            owner: userID,
            from: goalFrom,
            to: goalTo,
            createdAt: serverTimestamp(),
          }
        );
        setGoalName("");
        setGoalNote("");
        setGoalFrom("");
        setGoalTo("");
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
      <Flex >
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  return (
    <Box display="flex" flexDirection="row" ml={32}>
      <Box display="flex" flexDirection="column" mt={30}>
        <Text mb={4} ml={100} fontSize="2xl" fontWeight="bold">
          Goals
        </Text>
        <Box display="flex" flexWrap="wrap" justifyContent="left" mb={2}>
          {goals.map((goal, index) => (
            <Box key={index} mr={4} width="240px" height="250px">
              <Card boxShadow='dark-lg' rounded='md' borderColor='gray.50'>
                <CardHeader>
                  <Heading
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
                  <Text mt={6}>
                    <strong>From:</strong> {goal.from}
                  </Text>
                  <Text>
                    <strong>To:</strong> {goal.to}
                  </Text>
                </CardHeader>
                <CardFooter justifyContent="end">
                  <Button size="md" colorScheme="linkedin" onClick={() => openModal(goal)}>View</Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box flex="1" marginLeft="auto" position="fixed" right="50px">
        <Stack spacing={2} width="220px" height="460px" border='2px'boxShadow='dark-lg' p='6' rounded='md' borderColor='gray.50'>
          <FormControl>
            <FormLabel>Goal Title</FormLabel>
            <Input
              type="text"
              placeholder="Goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Note</FormLabel>
            <Textarea
              value={goalNote}
              placeholder="Note about the goal"
              size="sm"
              onChange={(e) => setGoalNote(e.target.value)}
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
            mb={1}
              type="date"
              value={goalTo}
              onChange={(e) => setGoalTo(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" size="lg" onClick={createGoal}>
            Create Goal
          </Button>
        </Stack>
      </Box>

      {selectedGoal && (
        <Modal isOpen={isModalOpen} autoFocus={false} onClose={closeModal} size="sm">
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
                onSubmit={(newText) =>
                  updateGoalText(selectedGoal.id, newText)
                }
              >
                <EditablePreview />
                <EditableTextarea />
                <EditableControlsExample />
              </Editable>
              <Text mt={5}>
              <strong>From:</strong> {selectedGoal?.from}
            </Text>
            <Text>
              <strong>To:</strong> {selectedGoal?.to}
            </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="linkedin"  onClick={closeModal}>
                Close
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
