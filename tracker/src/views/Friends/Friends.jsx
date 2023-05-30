import {Box,Text,Button,ButtonGroup,Heading,Flex,} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useContext,useRef } from "react";
import {doc,updateDoc,getDoc,} from "firebase/firestore";
import { db } from "../../config/firebase";
import {Popover, Tooltip,Avatar,Td,Th,Tbody,Thead,Table,Tr,Grid,PopoverTrigger,PopoverContent,GridItem,PopoverHeader,PopoverArrow,PopoverCloseButton,PopoverBody,PopoverFooter} from "@chakra-ui/react";
import goalheader from "../../assets/goal.png"
import {BsFillPersonXFill,} from "react-icons/bs";
import { FriendsContext } from "../../context/FriendsContext";
import "./Friends.css"

const Friends = () => {
  const { userDocID } = useContext(AuthContext);
  const {requests, setRequests, friends, setFriends} = useContext(FriendsContext)
  const initialFocusRef = useRef();


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
    <Box w="1660px" ml="54px">
      <Grid gap={4} templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)"  h="600px">

      <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8}/>

      <GridItem colSpan={4}>
      <Text ml={2} mb={4} fontSize="2xl" fontWeight="bold">Friends</Text>
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
      </GridItem>

      <GridItem colSpan={1}>
        <Text ml={2} mb={4} fontSize="2xl" fontWeight="bold">Friend requests</Text>
        {requests.map((request) => (
          <Popover
            key={request.id}
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
            
          >
            <PopoverTrigger>
              <Button bgColor="#e84a5f" mt={3} className="reqbutton">{request.name} wants to be friends.</Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                {request.name} {request.family}
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Hello, can we be friends ?</PopoverBody>

              <PopoverFooter border="0" display="flex" alignItems="center" justifyContent="space-between" pb={4}>
                <ButtonGroup size="sm">
                  <Button onClick={() => handleAccept(request)} ref={initialFocusRef} colorScheme="whatsapp">
                    Accept
                  </Button>
                  <Button onClick={() => handleDecline(request)} colorScheme="red">
                    Decline
                  </Button>
                </ButtonGroup>
              </PopoverFooter>

            </PopoverContent>
          </Popover>
        ))}
      </GridItem>

      </Grid>
    </Box>
  );
};

export default Friends;
