import { useContext, useState, useEffect } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FriendsContext } from "../../../context/FriendsContext";

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
      onClick={() => navigate("/workouts")}
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
