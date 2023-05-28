import {Box,Text,Button,ButtonGroup,Heading,Flex,} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import {doc,updateDoc,getDoc,} from "firebase/firestore";
import { db } from "../../services/firebase";
import {Popover, Tooltip,Avatar,Td,Th,Tbody,Thead,Table,Tr,Grid,PopoverTrigger,PopoverContent,PopoverHeader,PopoverArrow,PopoverCloseButton,PopoverBody,PopoverFooter} from "@chakra-ui/react";
import goalheader from "../../assets/goal.png"
import {BsFillPersonXFill,} from "react-icons/bs";
// import RequestButton from "../../components/RequestButton/RequestButton";
import "./Friends.css"

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
  }, [[userDocID, requests, friends]]);

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
  
      // Update the local state immediately
      setRequests(updatedRequests);
      setFriends([...friends, request]);
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
  
      // Update the local state immediately
      setRequests(requests.filter((req) => req.userDocID !== request.userDocID));
    } catch (error) {
      console.log("Error declining request:", error);
    }
  };
  
  const handleRemoveFriend = async (friendId) => {
    try {
      const userDocRef = doc(db, "users", userDocID);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
  
      const updatedFriends = userData.friends.filter(
        (friend) => friend.userDocID !== friendId
      );
  
      await updateDoc(userDocRef, { friends: updatedFriends });
  
      const friendDocRef = doc(db, "users", friendId);
      const friendDoc = await getDoc(friendDocRef);
      const friendData = friendDoc.data();
  
      const updatedFriendFriends = friendData.friends.filter(
        (friend) => friend.userDocID !== userDocID
      );
  
      await updateDoc(friendDocRef, { friends: updatedFriendFriends });
  
      // Update the local state immediately
      setFriends(updatedFriends);
    } catch (error) {
      console.log("Error removing friend:", error);
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
          ml={10}
          mt="-80px">
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
              <Tr key={user.docID}>
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
                  <Tooltip label="Remove from friends">
                    <Button
                      className="deleteuser"
                      onClick={() => handleRemoveFriend(user.docID)}
                      size="lg"
                      variant="ghost"
                      colorScheme="red"
                      p={1}
                    >
                      <Flex align="center">
                        <BsFillPersonXFill />
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
        <Heading ml={3} mb={2}>Friend requests</Heading>
        {requests.map((request) => (
          <Popover
            key={request.id}
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
            
          >
            <PopoverTrigger>
              <Button bgColor="#59a985" color="white" mt={3} className="reqbutton">{request.name} wants to be friends.</Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                {request.name} {request.family}
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
