import { db } from "../../services/firebase";
import { getDocs, collection, query, where, deleteDoc,doc,updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select,Flex } from '@chakra-ui/react';
// import {refreshPage} from "../../services/Services"


const Community = () =>{
  const usersCollection = collection(db, "users");
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

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
    //   refreshPage()
  };

  const handleUnblockUser = async (userId) => {
    const data = { isBlocked: null };
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, data);
    //   refreshPage()
  };

  return (
    <Box className="userscontainer" bg="gray.100" p={4} borderRadius="md">
      <form>
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
      </form>
      <Box className="userlist" as="ul" listStyleType="none" p={0}>
        <Box as="li" fontWeight="bold" fontSize="sm" mb={2}>
          <Flex height={10} alignItems={"center"}>
            <Box ml={2}>User Name</Box>
            <Box ml={135}>User Family</Box>
            <Box ml={130}>Username</Box>
            <Box ml={173}>Email</Box>
            <Box ml={147}>Role</Box>
            <Box ml={196}>Phone</Box>
            <Box ml={176}>Status</Box>
          </Flex>
        </Box>
        {userList.map((user) => (
          <Box
            className="singlepost"
            key={user.id}
            boxShadow="md"
            p={4}
            mb={4}
            bg="white"
            borderRadius="md"
            as="li"
            width={1600}
          >
            <Flex>
              <Box flexBasis="50%" fontSize="lg" fontWeight="bold" mb={2}>
                {user.name}
              </Box>
              <Box flexBasis="50%" fontSize="lg" fontWeight="bold" mb={2}>
                {user.family}
              </Box>
              <Box flexBasis="50%" fontSize="sm" color="gray.600" mb={2}>
                {user.username}
              </Box>
              <Box flexBasis="50%" fontSize="sm" color="gray.600" mb={2}>
                {user.email}
              </Box>
              <Box flexBasis="50%" fontSize="sm" color="gray.600" mb={2} ml={3}>
                {user.role}
              </Box>
              <Box flexBasis="50%" fontSize="sm" color="gray.600" mb={2} ml={3}>
                {user.phoneNumber}
              </Box>
              <Box flexBasis="50%" fontSize="sm" color="gray.600" mb={2} ml={3}>
                {user.isBlocked ? "Blocked" : "Not Blocked"}
              </Box>
              <Button
                className="deleteuser"
                onClick={() => handleDeleteUser(user.id)}
                colorScheme="red"
                size="md"
                p={5}
              >
                Delete
              </Button>

              {user.isBlocked ? (
                <Button
                  className="unblockuser"
                  onClick={() => handleUnblockUser(user.id)}
                  colorScheme="green"
                  size="md"
                  ml={2}
                  p={5}
                >
                  Unblock
                </Button>
              ) : (
                <Button
                  className="blockuser"
                  onClick={() => handleBlockUser(user.id)}
                  colorScheme="red"
                  size="md"
                  ml={2}
                  p={5}
                >
                  Block
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Community;