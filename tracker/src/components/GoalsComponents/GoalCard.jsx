import { Box, Button, Text, Card as ChakraCard, CardHeader, Heading, CardFooter, Flex, Badge } from "@chakra-ui/react";
import { HiOutlinePencilAlt } from 'react-icons/hi';
import PropTypes from 'prop-types';

/**
 * GoalCard Component.
 *
 * This is a functional component that takes in a goal object, a callback to open a modal, 
 * and a difficultyColors object, then displays the information in a card format.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.goal - Goal object that includes information about the goal.
 * @param {string} props.goal.id - Goal's unique identifier.
 * @param {string} props.goal.name - Name of the goal.
 * @param {string} props.goal.text - Additional text or description of the goal.
 * @param {string} props.goal.category - Category of the goal.
 * @param {string} props.goal.from - The starting date or time of the goal.
 * @param {string} props.goal.to - The ending date or time of the goal.
 * @param {string} props.goal.status - Status of the goal.
 * @param {Function} props.openModal - Callback function to open a modal.
 * @param {Object} props.difficultyColors - Object that maps statuses to color schemes.
 * @example
 * return (
 *   <GoalCard goal={goal} openModal={openModal} difficultyColors={difficultyColors}/>
 * )
 */

const GoalCard = ({ goal, openModal, difficultyColors }) => {
  return (
    <Box key={goal.id} mr={4} mb="50px" width="240px" height="250px">
      <ChakraCard
        background="linear-gradient(15deg, #13547a 0%, #80d0c7 100%)"
        boxShadow="dark-lg"
        rounded="md"
        borderColor="gray.50"
      >

        <CardHeader height="200px">
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
          <Text fontWeight='bold'>Status:{" "} 
                <Badge colorScheme={difficultyColors[goal.status]}>
                {goal.status}
                </Badge>
          </Text>
        </CardHeader>
        <CardFooter justifyContent="end">
          <Button
            colorScheme="linkedin"
            w="10px"
            size="md"
            onClick={() => openModal(goal)}
          >
            <Flex align="center">
              <HiOutlinePencilAlt />
            </Flex>
          </Button>
        </CardFooter>
      </ChakraCard>
    </Box>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
  difficultyColors: PropTypes.object.isRequired,
};

export default GoalCard;
