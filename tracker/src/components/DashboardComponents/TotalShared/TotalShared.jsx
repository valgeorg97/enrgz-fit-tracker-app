import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../../../context/WorkoutContext";

/**
 * `TotalShared` is a functional React component that uses Chakra UI for styling.
 * It displays the total number of shared workouts a user has in the application and offers a navigation option to the workouts page.
 * 
 * @component
 * @example
 * <TotalShared />
 * 
 * @returns {ReactElement} The UI DOM object for the `TotalShared` component.
 *
 * @property {Object} sharedWorkouts - An object from the WorkoutContext, which holds the list of shared workouts.
 * 
 * Hooks:
 * @see useContext (https://reactjs.org/docs/hooks-reference.html#usecontext) - Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context.
 * @see useState (https://reactjs.org/docs/hooks-state.html) - Allows adding React state to function components.
 * @see useEffect (https://reactjs.org/docs/hooks-effect.html) - Accepts a function that contains imperative, possibly effectful code.
 *
 * Contexts:
 * @see WorkoutContext - A context that provides the shared workouts data.
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

const TotalShared = () => {
  const { sharedWorkouts } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (sharedWorkouts) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sharedWorkouts]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/workouts")}
      background="linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading color="white" fontSize="14px">
        Shared Workouts
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {sharedWorkouts.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default TotalShared;
