import React from 'react';
import {Button,useDisclosure,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogBody,AlertDialogFooter,} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * DeleteUserDialog component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleDeleteUser - The function to handle user deletion.
 * @returns {JSX.Element} DeleteUserDialog component.
 */

function DeleteUserDialog({ handleDeleteUser }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    const handleDelete = () => {
      handleDeleteUser();
      onClose();
    }

    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Delete User
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete User
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red'onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  DeleteUserDialog.propTypes = {
    handleDeleteUser: PropTypes.func.isRequired,
  };

  export default DeleteUserDialog