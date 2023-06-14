import { Box, Button, Text, Card as ChakraCard, CardHeader, Heading, CardFooter, Flex, Badge } from "@chakra-ui/react";
import { HiOutlinePencilAlt } from 'react-icons/hi';
import PropTypes from 'prop-types';

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
