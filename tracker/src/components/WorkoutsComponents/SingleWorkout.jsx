import {Box,Heading,Button,Badge,Text,VStack,Flex,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,Editable,EditablePreview,EditableInput,ButtonGroup,IconButton,useEditableControls,} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaTrashAlt,FaCheck } from "react-icons/fa";
import { DIFFICULTY_COLORS } from "../../common/constants";

const SingleWorkout = ({ selectedWorkout, userID, updateWorkoutTitle, handleDeleteWorkout,setSelectedWorkout,shared,handleFinishWorkout}) => {
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
      <IconButton ml={3} size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    );
  };


  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };

  const handleDeleteAndCloseModal = (workoutId) => {
    handleDeleteWorkout(workoutId);
    handleCloseModal();
  };

  const handleFinishWorkoutAndCloseModal = (workoutId) => {
    handleFinishWorkout(workoutId);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        setSelectedWorkout(null);
      }}
      autoFocus={false}
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedWorkout.owner === userID && !shared ? (
            <Editable
              overflowWrap="break-word"
              wordBreak="break-word"
              defaultValue={selectedWorkout.name}
              onSubmit={(newTitle) =>
                updateWorkoutTitle(selectedWorkout.id, newTitle)
              }
            >
              <EditablePreview />
              <EditableInput w="300px" />
              <EditableControlsExample />
            </Editable>
          ) : (
            <Heading as="h2" size="md">
              {selectedWorkout.name}
            </Heading>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt={4}>
            <Text>
              <strong>Muscle:</strong> {selectedWorkout.muscle}
            </Text>
            <Text>
              <strong>Type:</strong> {selectedWorkout.type}
            </Text>
            <Text>
              <strong>Reps:</strong> {selectedWorkout.reps}
            </Text>
            <Text>
              <strong>Weight:</strong> {selectedWorkout.weight}
            </Text>
            
            <Text>
              <strong>Difficulty:</strong>{" "}
              <Badge
                colorScheme={DIFFICULTY_COLORS[selectedWorkout.difficulty]}
              >
                {selectedWorkout.difficulty}
              </Badge>
            </Text>

            <VStack mt={-9} spacing={1} float="right" alignItems="flex-end">
              {selectedWorkout.status !== "finished" && (
                <Button
                  colorScheme="green"
                  float="right"
                  size="md"
                  onClick={() => handleFinishWorkoutAndCloseModal(selectedWorkout)}
                >
                  <Flex align="center">
                    <FaCheck />
                  </Flex>
                </Button>
              )}
              {selectedWorkout.owner === userID && !shared && (
                <Button
                  float="right"
                  size="md"
                  colorScheme="red"
                  onClick={() => handleDeleteAndCloseModal(selectedWorkout.id)}
                >
                  <Flex align="center">
                    <FaTrashAlt />
                  </Flex>
                </Button>
              )}
            </VStack>

          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SingleWorkout;
