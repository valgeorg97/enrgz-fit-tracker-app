import React, { useState,useContext } from "react";
import {getDocs,collection,where,query,addDoc,serverTimestamp,} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import {Box,Button,FormControl,FormLabel,Input,Stack,Text,} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Goals = () => {
   const [goalName, setGoalName] = useState("");
   const [goalFrom, setGoalFrom] = useState("");
   const [goalTo, setGoalTo] = useState("");
   const { userID,userDocID } = useContext(AuthContext);
   const user = auth.currentUser

   const createGoal = async () => {
     if (user) {
       try {
         const goalDocRef = await addDoc(collection(db, `users/${userDocID}/goals`), {
           name: goalName,
           owner: userID,
           from: goalFrom,
           to: goalTo,
           createdAt: serverTimestamp(),
         });
         setGoalName("");
         setGoalFrom("");
         setGoalTo("");
         console.log("Goal created successfully!");
       } catch (error) {
         console.error("Error creating goal:", error);
       }
     } else {
       console.error("User not logged in.");
     }
   };

  return (
    <Box>
      <Text mb={4} fontSize="xl" fontWeight="bold">
        Exercises
      </Text>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Goal Name</FormLabel>
          <Input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>From</FormLabel>
          <Input
            type="date"
            value={goalFrom}
            onChange={(e) => setGoalFrom(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>To</FormLabel>
          <Input
            type="date"
            value={goalTo}
            onChange={(e) => setGoalTo(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={createGoal}>
          Create Goal
        </Button>
      </Stack>
      <ToastContainer position="top-center" style={{ zIndex: 2001, top: 30 }} />
    </Box>
  );
};

export default Goals;
import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isAdmin: false,
  setAdmin: () => {},
  signOut: () => {},
  isBlocked: "",
  setIsBlocked: () => {},
  userID: "",
  setUserID: () => {},
  name: "",
  setName: () => {},
  family: "",
  setFamily: () => {},
  username: "",
  setUsername: () => {},
  email: "",
  setEmail: () => {},
  photoURL: "",
  setPhotoURL: () => {},
  password: "",
  setPassword: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  userDocID: "",
  setUserDocID: () => {},
});


import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { db, auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection,updateDoc } from 'firebase/firestore'
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { email, setEmail, password, setPassword, name, setName, family, setFamily, phoneNumber, setPhoneNumber, username, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();
  const usersCollection = collection(db, "users")

  const addUser = async () => {
    const docRef = await addDoc(usersCollection, { name: name, family: family, role: "user", username: username, isBlocked: false, email: email, password: password, phoneNumber: phoneNumber, id: auth.currentUser.uid });
    const docID = docRef.id;
  
    // Add the docID to the addUser data
    const dataWithDocID = { ...addUser, docID: docID };
  
    // Update the document with the docID
    await updateDoc(docRef, dataWithDocID);
  }
  

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${name} ${family}`
    })
  }

  const validateInputs = () => {
    if (name.trim() === '') {
      toast.error('Please enter your first name!');
      return false;
    }

    if (family.trim() === '') {
      toast.error('Please enter your last name!');
      return false;
    }

    if (email.trim() === '') {
      toast.error('Please enter your email!');
      return false;
    }

    if (phoneNumber.trim() === '') {
      toast.error('Please enter your phone number!');
      return false;
    }

    return true;
  };

  const signUp = (e) => {
    e.preventDefault()
    if (!validateInputs()) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateName();
      })
      .then(() => addUser())
      .then(navigate("/login"))
      .catch((error) => console.log(error))
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(e) => setName(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => setFamily(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="username" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={signUp}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?
                <ChakraLink as={RouterLink} to="/login" style={{ color: '#3182CE' }}>
                  {" "}Login
                </ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer
        position="top-center"
        toastStyle={{
          position: 'relative',
          top: '40%',
          left: '30%',
          marginTop: '-10px',
        }}
      />
    </Flex>
  );
}

export default Register;
