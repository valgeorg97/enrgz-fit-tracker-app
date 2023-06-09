import { Box, Text, Button, ButtonGroup, Flex, Heading, } from "@chakra-ui/react";
import { useContext } from "react";
import { Popover, Tooltip, Avatar, Td, Th, Tbody, Thead, Table, Tr, Grid, PopoverTrigger, PopoverContent, GridItem, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter } from "@chakra-ui/react";
import goalheader from "../../assets/goal.png"
import { BsFillPersonXFill, } from "react-icons/bs";
import { FriendsContext } from "../../context/FriendsContext";
import "./Friends.css"
import user2 from "../../assets/user2.png"
import FriendsLogic from "../../logic/FriendsLogic/FriendsLogic";

const Friends = () => {
  const { requests, friends } = useContext(FriendsContext)
  const {
    handleAccept,
    handleRemoveFriend,
    initialFocusRef,
    handleDecline
  } = FriendsLogic();



  return (
    <Box w="1560px">
      <Grid gap={4} templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" h="600px">

        <GridItem colSpan={5} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8} />

        <GridItem colSpan={4}>
          <Text ml={2} mb={4} fontSize="2xl" fontWeight="bold">Friends</Text>
          <Table key={friends.userDocID} variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
              </Tr>
            </Thead>
            {friends.length > 0 ? (
              <Tbody>
                {friends.map((user) => (
                  <Tr key={user.docID}>
                    <Td>
                      <Flex align="center">
                        <Avatar
                          size="sm"
                          src={user.avatar ? user.avatar : user2}
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
            ) : (
              <Tbody>
                <Tr>
                  <Td colSpan={5}>
                    <Heading as="div" mt={10}>
                      Your friend list is empty.
                    </Heading>
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
        </GridItem>

        <GridItem colSpan={1}>
          <Text ml={2} mb={4} fontSize="2xl" fontWeight="bold">Friend requests</Text>
          {requests.map((request) => (
            <Popover
              key={request.userDocID}
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button bgColor="blue.500" mt={3} className="reqbutton">{request.name} wants to be friends.</Button>
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
