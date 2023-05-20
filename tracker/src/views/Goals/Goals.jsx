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
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
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
              <Card>
                <CardHeader>
                  <Heading
                    size="md"
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
                  <Button onClick={() => openModal(goal)}>View here</Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Box flex="1" marginLeft="auto" position="fixed" right="50px">
        <Stack spacing={2} width="200px" height="200px">
          <FormControl>
            <FormLabel>Goal Title</FormLabel>
            <Input
              type="text"
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

      {/* Modal */}
      {selectedGoal && (
        <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Editable
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
                defaultValue={selectedGoal.text}
                onSubmit={(newText) =>
                  updateGoalText(selectedGoal.id, newText)
                }
              >
                <EditablePreview />
                <EditableTextarea />
                <EditableControlsExample />
              </Editable>
              <Text>
              <strong>From:</strong> {selectedGoal?.from}
            </Text>
            <Text>
              <strong>To:</strong> {selectedGoal?.to}
            </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
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
