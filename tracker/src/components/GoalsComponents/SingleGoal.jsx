import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button,Text,VStack,Editable,EditablePreview,EditableInput,useEditableControls,EditableTextarea,Flex,ButtonGroup,IconButton,} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import PropTypes from 'prop-types';

/**
 * SingleGoal Component.
 *
 * This is a component that displays a modal for editing and managing a single goal.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isModalOpen - Flag indicating whether the modal is open or not.
 * @param {Function} props.closeModal - Callback function to close the modal.
 * @param {Object} props.selectedGoal - Selected goal object.
 * @param {string} props.selectedGoal.id - ID of the selected goal.
 * @param {string} props.selectedGoal.name - Name of the selected goal.
 * @param {string} props.selectedGoal.text - Text of the selected goal.
 * @param {string} props.selectedGoal.status - Status of the selected goal.
 * @param {string} props.selectedGoal.category - Category of the selected goal.
 * @param {string} props.selectedGoal.from - Starting date of the selected goal.
 * @param {string} props.selectedGoal.to - Ending date of the selected goal.
 * @param {Function} props.updateGoalTitle - Callback function to update the title of the selected goal.
 * @param {Function} props.updateGoalText - Callback function to update the text of the selected goal.
 * @param {Function} props.handleFinishGoal - Callback function to handle finishing the selected goal.
 * @param {Function} props.handleDeleteGoal - Callback function to handle deleting the selected goal.
 * @example
 * return (
 *   <SingleGoal {...props}/>
 * )
 */

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
            {selectedGoal.status !== "finished" && (
              <Button
                colorScheme="green"
                size="md"
                onClick={() => handleFinishGoal(selectedGoal)}
              >
                <Flex align="center">
                  <FaCheck />
                </Flex>
              </Button>
            )}
            <Button
              colorScheme="red"
              size="md"
              onClick={() => handleDeleteGoal(selectedGoal)}
            >
              <Flex align="center">
                <FaTrashAlt />
              </Flex>
            </Button>
            <Button colorScheme="linkedin" size="md" onClick={closeModal}>
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

SingleGoal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedGoal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    category: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  updateGoalTitle: PropTypes.func.isRequired,
  updateGoalText: PropTypes.func.isRequired,
  handleFinishGoal: PropTypes.func.isRequired,
  handleDeleteGoal: PropTypes.func.isRequired,
};

export default SingleGoal;
