import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FriendsContext } from "../../../context/FriendsContext";

/**
 * `Friends` is a functional React component that uses Chakra UI for styling.
 * It displays the number of friends a user has in the application and offers a navigation option to the friends page.
 * 
 * @component
 * @example
 * <Friends />
 * 
 * @returns {ReactElement} The UI DOM object for the `Friends` component.
 *
 * @property {Object} friends - An object from the FriendsContext, which holds the list of friends.
 * 
 * Hooks:
 * @see useContext (https://reactjs.org/docs/hooks-reference.html#usecontext) - Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context. 
 * @see useState (https://reactjs.org/docs/hooks-state.html) - Allows adding React state to function components.
 * @see useEffect (https://reactjs.org/docs/hooks-effect.html) - Accepts a function that contains imperative, possibly effectful code.
 *
 * Contexts:
 * @see FriendsContext - A context that provides the friends data.
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

const Friends = () => {
  const { friends } = useContext(FriendsContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    if (friends) {
      setLoading(false);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [friends]);

  return (
    <Box
      _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }}
      onClick={() => navigate("/friends")}
      background="linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))"
      boxShadow="lg"
      p="2"
      rounded="md"
      w="160px"
      h="140px"
      textAlign="center"
    >
      <Heading  color="white" fontSize="14px">
        Friends
      </Heading>
      {loading ? (
        <Spinner mt="37px" color="white" size="xl" />
      ) : (
        <>
          <Text mt={2} color="white" fontSize="40px">
            {friends.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default Friends;
