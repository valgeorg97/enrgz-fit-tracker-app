import { db } from "../../services/firebase";
import { getDocs, collection, query, where, deleteDoc,doc,updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
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
      setUserList(userList.filter(user => user.id !== userId));
    }
  

    const handleBlockUser = async (userId) => {
      const data = {isBlocked: true}
      const docRef = doc(db,"users",userId)
      await updateDoc(docRef, data);
    //   refreshPage()
    }
  

    const handleUnblockUser = async (userId) => {
      const data = {isBlocked: null}
      const docRef = doc(db,"users",userId)
      await updateDoc(docRef, data);
    //   refreshPage()
    }
  
  
  
    return (
      

<Box className="userscontainer" bg="gray.100" p={4} borderRadius="md">
  <form>
    <FormControl mb={4}>
      <FormLabel htmlFor="searchType" fontWeight="bold" fontSize="sm" mb={2}>
        Search by:
      </FormLabel>
      <Select id="searchType" value={searchType} onChange={handleSearchTypeChange} bg="white">
        <option value="name">Name</option>
        <option value="username">Username</option>
        <option value="email">Email</option>
      </Select>
    </FormControl>
    <FormControl>
      <FormLabel htmlFor="searchTerm" fontWeight="bold" fontSize="sm" mb={2}>
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
  {userList.map((user) => (
    <Box
      className="singlepost"
      key={user.id}
      boxShadow="md"
      p={4}
      mb={4}
      bg="white"
      borderRadius="md"
    >
      <h2 fontSize="lg" fontWeight="bold" mb={2}>
        {user.name}
      </h2>
      <p fontSize="sm" color="gray.600" mb={2}>
        {user.username}
      </p>
      <p fontSize="sm" color="gray.600" mb={2}>
        {user.email}
      </p>
      <Button
        className="deleteuser"
        onClick={() => handleDeleteUser(user.id)}
        colorScheme="red"
        size="sm"
        mt={2}
      >
        Delete
      </Button>
      {user.isBlocked ? (
        <Button
          className="unblockuser"
          onClick={() => handleUnblockUser(user.id)}
          colorScheme="green"
          size="sm"
          mt={2}
          ml={2}
        >
          Unblock
        </Button>
      ) : (
        <Button
          className="blockuser"
          onClick={() => handleBlockUser(user.id)}
          colorScheme="red"
          size="sm"
          mt={2}
          ml={2}
        >
          Block
        </Button>
      )}
    </Box>
  ))}
</Box>

    )
  }

export default Community;