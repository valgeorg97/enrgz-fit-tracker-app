import {Box,Heading,Button,Badge,Text,Flex,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,Editable,EditablePreview,EditableInput,ButtonGroup,IconButton,useEditableControls,} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaTrashAlt } from "react-icons/fa";

const SingleWorkout = ({ selectedWorkout, userID, updateWorkoutTitle, handleDeleteWorkout,setSelectedWorkout,shared}) => {
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
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    );
  };

  const difficultyColors = {
    easy: "green",
    medium: "orange",
    hard: "red",
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };

  const handleDeleteAndCloseModal = (workoutId) => {
    handleDeleteWorkout(workoutId);
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
              <strong>Reps:</strong> {selectedWorkout.reps}
            </Text>
            <Text>
              <strong>Weight:</strong> {selectedWorkout.weight}
            </Text>
            <Text>
              <strong>Type:</strong> {selectedWorkout.type}
            </Text>
            <Text>
              <strong>Difficulty:</strong>{" "}
              <Badge
                colorScheme={difficultyColors[selectedWorkout.difficulty]}
              >
                {selectedWorkout.difficulty}
              </Badge>
            </Text>
            {selectedWorkout.owner === userID && !shared && (
              <Button
                float="right"
                size="xs"
                mb="10px"
                colorScheme="red"
                onClick={() => handleDeleteAndCloseModal(selectedWorkout.id)}
              >
                <Flex align="center">
                  <FaTrashAlt />
                </Flex>
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SingleWorkout;
