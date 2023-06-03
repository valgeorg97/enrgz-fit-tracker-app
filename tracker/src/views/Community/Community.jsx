import { db } from "../../config/firebase";
import { getDocs, collection, query, where, deleteDoc, doc, updateDoc, getDoc, } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { Box, Button, Text, Tooltip, Avatar, FormControl, FormLabel, Input, Select, Flex, Td, Th, Tbody, Thead, Table, Tr, Grid, GridItem } from "@chakra-ui/react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsFillPersonBadgeFill, } from "react-icons/bs";
import { EnergizeGameContext } from "../../context/EnergizeGameContext"
import { useColorMode } from "@chakra-ui/react";
import goalheader from "../../assets/goal.png";
import { Icon } from "@chakra-ui/react";
import { MdFlashOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Community = () => {
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const { userDocID, name, family, isAdmin } = useContext(AuthContext);
  const { energizePoints } = useContext(EnergizeGameContext)
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "gray.800" : "white";

  const navigate = useNavigate()

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  useEffect(() => {
    const getUsers = async () => {
      let q;
      if (searchTerm.trim() !== "") {
        if (searchType === "name") {
          q = query(usersCollection, where("name", "==", searchTerm));
        } else if (searchType === "email") {
          q = query(usersCollection, where("email", "==", searchTerm));
        } else if (searchType === "username") {
          q = query(usersCollection, where("username", "==", searchTerm));
        }
      } else {
        q = query(usersCollection);
      }
      const data = await getDocs(q);
      setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [searchTerm, searchType]);

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(usersCollection, userId));
    setUserList(userList.filter((user) => user.id !== userId));
  };

  const handleBlockUser = async (userId) => {
    const data = { isBlocked: true };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    setUserList((prevUserList) =>
      prevUserList.map((user) => (user.id === userId ? { ...user, isBlocked: true } : user)))
  };

  const handleUnblockUser = async (userId) => {
    const data = { isBlocked: null };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    setUserList((prevUserList) =>
      prevUserList.map((user) => (user.id === userId ? { ...user, isBlocked: null } : user))
    );
  };

  const handleFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();
    const updatedFriends = target.requests || [];

    if (updatedFriends.some((friend) => friend.userDocID === userDocID)) {
      return;
    }
    updatedFriends.push({ userDocID, name, family });
    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
    setUserList((prevUserList) =>
      prevUserList.map((user) => (user.id === userId ? { ...user, requests: updatedFriends } : user))
    );
  };

  const handleCancelFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();

    if (!target || !target.requests) {
      return;
    }

    const updatedFriends = target.requests.filter(
      (friend) => friend.userDocID !== userDocID
    );

    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
    setUserList((prevUserList) =>
      prevUserList.map((user) => (user.id === userId ? { ...user, requests: updatedFriends } : user))
    );
  };

  return (
    <Box w="1560px">
      <Grid templateColumns="repeat(1, 1fr)" h="600px">

        <GridItem colSpan={1} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8} />

        <GridItem colSpan={1} bgColor={bg}>
          <FormControl mb={4}>
            <FormLabel
              htmlFor="searchType"
              fontWeight="bold"
              fontSize="sm"
              mb={2}
            >
              Search by:
            </FormLabel>
            <Select
              id="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
              bg="bg"
            >
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="searchTerm"
              fontWeight="bold"
              fontSize="sm"
              mb={2}
            >
              Search term:
            </FormLabel>
            <Input
              className="inputt"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={handleSearchTermChange}
              bg={bg}
              borderRadius="sm"
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Energize Points</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList.map((user) => (
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
                  <Td>
                    <Flex align="center">
                      <Tooltip
                        hasArrow
                        arrowSize={10}
                        bg="orange.500"
                        borderRadius={10}
                        label="Energize points! You can earn Energize points by completing your goals. Click to learn more."
                        fontSize="md"
                      >
                        <Button display="flex" flexDirection="row" variant="unstyled" onClick={() => navigate('/energizeConquest')}>
                          <Icon as={MdFlashOn} boxSize="4" color="orange.500" />
                          <Text ml={1}>{user.energizePoints}</Text>
                        </Button>
                      </Tooltip>
                    </Flex>
                  </Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td>{user.isBlocked ? "Blocked" : "Not Blocked"}</Td>

                  <Td>
                    {user.friends &&
                      user.friends.find(
                        (friend) => friend.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Friend">
                        <Button
                          className="friends"
                          size="md"
                          variant="ghost"
                          colorScheme="green"
                        >
                          <Flex align="center">
                            <BsFillPersonCheckFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : user.requests &&
                      user.requests.find(
                        (request) => request.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Cancel Friend Request">
                        <Button
                          className="cancelrequest"
                          onClick={() => handleCancelFriendRequest(user.id)}
                          size="md"
                          variant="ghost"
                          colorScheme="red"
                        >
                          <Flex align="center">
                            <BsFillPersonXFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : user.docID === userDocID ? (
                      <Tooltip label="Red Dot Button">
                        <Button
                          className="reddotbutton"
                          size="md"
                          variant="ghost"
                          colorScheme="orange"
                        >
                          <Flex align="center">
                            <BsFillPersonBadgeFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip label="Send Friend Request">
                        <Button
                          className="friendrequest"
                          onClick={() => handleFriendRequest(user.id)}
                          size="md"
                          variant="ghost"
                          colorScheme="linkedin"
                        >
                          <Flex align="center">
                            <BsFillPersonPlusFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    )}
                  </Td>
                  {isAdmin && (<>
                    <Td>
                      <Tooltip label="Delete User">
                        <Button
                          className="deleteuser"
                          onClick={() => handleDeleteUser(user.id)}
                          size="lg"
                          variant="ghost"
                          colorScheme="red"
                          p={1}
                        >
                          <Flex align="center">
                            <MdDeleteForever />
                          </Flex>
                        </Button>
                      </Tooltip>
                    </Td>
                    <Td>
                      {user.isBlocked ? (
                        <Tooltip label="Unblock User">
                          <Button
                            className="unblockuser"
                            onClick={() => handleUnblockUser(user.id)}
                            size="md"
                            variant="ghost"
                            colorScheme="red"
                          >
                            <Flex align="center">
                              <AiFillLock />
                            </Flex>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip label="Block User">
                          <Button
                            className="blockuser"
                            onClick={() => handleBlockUser(user.id)}
                            size="md"
                            variant="ghost"
                            colorScheme="green"
                          >
                            <Flex align="center">
                              <AiFillUnlock />
                            </Flex>
                          </Button>
                        </Tooltip>
                      )}
                    </Td>
                  </>
                  )}

                </Tr>
              ))}
            </Tbody>
          </Table>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Community;
