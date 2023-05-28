import { ChevronDownIcon } from "@chakra-ui/icons";
import {Menu,Button,Text,MenuButton,MenuList,MenuItem,Box,Heading,} from "@chakra-ui/react";

const GoalMenu = ({ mainGoals, updateCurrentGoal, currentGoal }) => {
  
  return (
    <Box display="flex" flexDirection="column">
      <Menu>
        <MenuButton
          as={Button}
          w="400px"
          bg="gray.100"
          borderRadius="md"
          p="50px"
          boxShadow="md"
          textAlign="center"
          _hover={{ bg: "gray.200" }}
          rightIcon={<ChevronDownIcon />}
        >
          <Text fontSize="sm" color="gray.500">
            This is your current main goal based on BMR
          </Text>
          <Heading size="md" mt={2}>
            {currentGoal ? currentGoal.name : "Choose Main Goal"}
          </Heading>
          <Text fontSize="md" mt={2}>
            Daily calory intake to reach goal:{" "}
            {currentGoal && currentGoal.calory.toFixed(0)} cal
          </Text>
        </MenuButton>

        <MenuList w="400px">
          {Object.keys(mainGoals).map((key) => {
            if (key !== "owner" && key !== "id" && key !== "maintain") {
              const goal = mainGoals[key];
              return (
                <MenuItem
                  key={key}
                  minH="60px"
                  onClick={() => updateCurrentGoal(goal)}
                  _hover={{ bg: "gray.200" }}
                >
                  <Box>
                    <Heading
                      size="md"
                      marginLeft="70px"
                      style={{ textTransform: "uppercase" }}
                    >
                      {goal.name}
                    </Heading>
                  </Box>
                </MenuItem>
              );
            } else return null;
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default GoalMenu;
