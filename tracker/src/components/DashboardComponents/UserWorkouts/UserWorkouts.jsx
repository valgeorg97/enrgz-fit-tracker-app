import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../../context/WorkoutContext";

/**
 * `UserWorkouts` is a functional React component that displays the total number of user-created workouts in the application.
 * It also provides a navigation option to the workouts page.
 * 
 * @component
 * @example
 * <UserWorkouts />
 * 
 * @returns {ReactElement} The UI DOM object for the `UserWorkouts` component.
 *
 * @property {Object} workouts - An object from the WorkoutContext, which holds the list of user's workouts.
 * 
 * Hooks:
 * @see useContext (https://reactjs.org/docs/hooks-reference.html#usecontext) - Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context.
 * @see useState (https://reactjs.org/docs/hooks-state.html) - Allows adding React state to function components.
 * @see useEffect (https://reactjs.org/docs/hooks-effect.html) - Accepts a function that contains imperative, possibly effectful code.
 *
 * Contexts:
 * @see WorkoutContext - A context that provides the workouts data.
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

const UserWorkouts = () => {
  const { workouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (workouts) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [workouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#fabc80", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="radial-gradient(circle at -3.1% -4.3%, rgb(57, 255, 186) 0%, rgb(21, 38, 82) 90%)"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading color="white" fontSize="14px">
        Workouts Created
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {workouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default UserWorkouts;
