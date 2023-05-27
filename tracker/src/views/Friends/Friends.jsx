import {
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  ButtonGroup,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";

import { Tooltip,Avatar,Td,Th,Tbody,Thead,Table,Tr,Grid } from '@chakra-ui/react';
import goalheader from "../../assets/goal.png"



const Friends = () => {
  const { userDocID } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const initialFocusRef = useRef();


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (userDocID) {
          const userDocref = doc(db, "users", userDocID);
          const userDoc = await getDoc(userDocref);
          const userData = userDoc.data();
          const requestsData = userData?.requests || [];
          setRequests(requestsData);
        }
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [userDocID]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (userDocID) {
          const userDocref = doc(db, "users", userDocID);
          const userDoc = await getDoc(userDocref);
          const userData = userDoc.data();
          const friendsData = userData?.friends || [];
          const filteredFriends = [];

          for (const friend of friendsData) {
            const friendDocRef = doc(db, "users", friend.userDocID);
            const friendDoc = await getDoc(friendDocRef);
            const friendData = friendDoc.data();
            filteredFriends.push(friendData);
            }
          setFriends(filteredFriends);
        }
      } catch (error) {
        console.log("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [userDocID]);

  const handleAccept = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      let updatedFriends = [];
      if (userData.friends && Array.isArray(userData.friends)) {
        updatedFriends = [...userData.friends, request];
      } else {
        updatedFriends = [request];
      }

      const updatedRequests = requests.filter(
        (req) => req.userDocID !== request.userDocID
      );

      await updateDoc(userDocRef, {
        requests: updatedRequests,
        friends: updatedFriends,
      });

      const friendDocRef = doc(db, "users", request.userDocID);
      const friendDoc = await getDoc(friendDocRef);
      const friendData = friendDoc.data();

      let updatedFriendFriends = [];
      if (friendData.friends && Array.isArray(friendData.friends)) {
        updatedFriendFriends = [
          ...friendData.friends,
          {
            name: userData.name,
            userDocID: userDocID,
          },
        ];
      } else {
        updatedFriendFriends = [
          {
            name: userData.name,
            userDocID: userDocID,
          },
        ];
      }

      const updatedFriendData = {
        ...friendData,
        friends: updatedFriendFriends,
      };

      await updateDoc(friendDocRef, updatedFriendData);

      setRequests(updatedRequests);
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  };

  const handleDecline = async (request) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      await updateDoc(userDocRef, {
        requests: requests.filter((req) => req.userDocID !== request.userDocID),
      });
      setRequests(
        requests.filter((req) => req.userDocID !== request.userDocID)
      );
    } catch (error) {
      console.log("Error declining request:", error);
    }
  };


  return (
    <Box maxW="1660px">
        <Box 
          rounded="md"
          borderColor="gray.50"
          h="180px"
          w="1500px"
          bgImage={goalheader}
          ml={10}>
      </Box>
      <Grid templateColumns="4fr 1fr" gap={6} m={10}>

      <Box>
        <Heading>Friends</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {friends.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Flex align="center">
                    <Avatar
                      size="sm"
                      src={user.avatar}
                      _hover={{ cursor: "pointer" }}
                    />
                    <Text ml="2">
                      {user.name} {user.family}
                    </Text>
                  </Flex>
                </Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phoneNumber}</Td>

                <Td>
                  <Tooltip label="Delete User">
                    <Button
                      className="deleteuser"
                    //   onClick={() => handleDeleteUser(user.id)}
                      size="lg"
                      variant="ghost"
                      colorScheme="red"
                      p={1}
                    >
                      <Flex align="center">
                        {/* <MdDeleteForever /> */}
                      </Flex>
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

      </Box>

      <Flex justifyContent="right" flexDirection="column">
        <Heading>Friend requests</Heading>
        {requests.map((request) => (
          <Popover
            key={request.id}
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button>{request.name} want to be friends.</Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                {request.name}
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Hello, can we be friends ?</PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => handleAccept(request)}
                    ref={initialFocusRef}
                    colorScheme="whatsapp"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDecline(request)}
                    colorScheme="red"
                  >
                    Decline
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        ))}
      </Flex>
      </Grid>
    </Box>
  );
};

export default Friends;
