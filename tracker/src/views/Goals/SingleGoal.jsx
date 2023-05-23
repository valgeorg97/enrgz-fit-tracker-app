
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button,Text,VStack,Editable,EditablePreview,EditableInput,useEditableControls,EditableTextarea,Flex,ButtonGroup,IconButton,} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";

const SingleGoal = ({isModalOpen,closeModal,selectedGoal,updateGoalTitle,updateGoalText,handleFinishGoal,handleDeleteGoal,}) => {

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

  return (
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
          onSubmit={(newTitle) => updateGoalTitle(selectedGoal.id, newTitle)}
        >
          <EditablePreview />
          <EditableInput w="300px" />
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
          <VStack spacing={2} float="right" alignItems="flex-end">
            <Button
              colorScheme="green"
              size="md"
              onClick={() => handleFinishGoal(selectedGoal)}
            >
              <Flex align="center">
                <FaCheck />
              </Flex>
            </Button>
            <Button
              colorScheme="red"
              size="md"
              onClick={() => handleDeleteGoal(selectedGoal)}
            >
              <Flex align="center">
                <FaTrashAlt />
              </Flex>
            </Button>
            <Button
              colorScheme="linkedin"
              size="md"
              onClick={closeModal}
            >
              <Flex align="center">
                <BsArrowReturnRight />
              </Flex>
            </Button>
          </VStack>
          <EditablePreview w="280px" />
          <EditableTextarea w="250px" />
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
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SingleGoal;
