import { db } from "../../services/firebase";
import { getDocs, collection, query, where, deleteDoc,doc,updateDoc,getDoc } from "firebase/firestore";
import { useState, useEffect,useContext } from "react";
import { Box, Button,Text,Tooltip,Avatar, FormControl, FormLabel, Input, Select,Flex,Td,Th,Tbody,Thead,Table,Tr } from '@chakra-ui/react';
import goalheader from "../../assets/goal.png"
import {AiFillLock,AiFillUnlock} from "react-icons/ai";
import {CgUnblock} from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import {IoPersonAddOutline} from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import {MdDeleteForever} from "react-icons/md";
import {BsFillPersonCheckFill,BsFillPersonPlusFill} from "react-icons/bs";

const Community = () => {
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const {userDocID,name} = useContext(AuthContext);

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
  };

  const handleUnblockUser = async (userId) => {
    const data = { isBlocked: null };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
  };

  const handleFriendRequest = async (userId) => {
    const targetUserDocRef = doc(db, "users", userId);
    const targetDoc = await getDoc(targetUserDocRef);
    const target = targetDoc.data();
    const updatedFriends = target.requests || [];
  
    if (updatedFriends.some((friend) => friend.userDocID === userDocID)) {
      return;
    }
    updatedFriends.push({ userDocID, name });
    const updatedData = { requests: updatedFriends };
    await updateDoc(targetUserDocRef, updatedData);
  };
  

  return (
    <Box w="1660px" mt="70px">
      <Box
        rounded="md"
        borderColor="gray.50"
        h="180px"
        w="1500px"
        bgImage={goalheader}
        ml={10}
      ></Box>

      <Box
        w="1500px"
        ml={10}
        mt="40px"
        className="userscontainer"
        bg="#f2f2f2"
        rounded="md"
        borderColor="gray.100"
        p={4}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Box>
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
              bg="white"
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
              bg="white"
              borderRadius="sm"
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Community;