import { Button,Flex } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButton = ({handleDeleteGoal}) => {
    return (
      <Button colorScheme="red" size="md"w="10px" onClick={handleDeleteGoal}>
        <Flex align="center">
          <FaTrashAlt />
        </Flex>
      </Button>
    );
  };

export default DeleteButton;