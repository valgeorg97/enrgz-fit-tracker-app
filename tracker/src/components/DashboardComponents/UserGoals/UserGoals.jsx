import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoalContext } from "../../../context/GoalContext";

/**
 * `UserGoals` is a functional React component that uses Chakra UI for styling.
 * It displays the total number of user-created goals in the application and offers a navigation option to the goals page.
 * 
 * @component
 * @example
 * <UserGoals />
 * 
 * @returns {ReactElement} The UI DOM object for the `UserGoals` component.
 *
 * @property {Object} goals - An object from the GoalContext, which holds the list of user's goals.
 * 
 * Hooks:
 * @see useContext (https://reactjs.org/docs/hooks-reference.html#usecontext) - Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context.
 * @see useState (https://reactjs.org/docs/hooks-state.html) - Allows adding React state to function components.
 * @see useEffect (https://reactjs.org/docs/hooks-effect.html) - Accepts a function that contains imperative, possibly effectful code.
 *
 * Contexts:
 * @see GoalContext - A context that provides the goals data.
 *
 * Navigation:
 * @see useNavigate (https://reactrouter.com/native/api/useNavigate) - Hook from React Router that provides navigation functionality.
 *
 * Components:
 * @see Box - Chakra UI component that renders a `div` and is often used as a layout component.
 * @see Heading - Chakra UI component for rendering headings.
 * @see Text - Chakra UI component for rendering text.
 * @see Spinner - Chakra UI component for rendering a spinner.
 */

const UserGoals = () => {
  const { goals } = useContext(GoalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (goals) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [goals]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/goals")}
      background="radial-gradient(circle at 10% 20%, rgb(0, 52, 89) 0%, rgb(0, 168, 232) 90%)"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading color="white"fontSize="14px">
        Goals Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {goals.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserGoals;
