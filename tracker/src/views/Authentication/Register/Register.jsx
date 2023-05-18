import {Flex,Box,FormControl,FormLabel,Input,InputGroup,HStack,InputRightElement,Stack,Button,Heading,Text,useColorModeValue,Link} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { db, auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore'
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { email, setEmail, password, setPassword, name, setName, family, setFamily } = useContext(AuthContext);
    let navigate = useNavigate();
    const usersCollection = collection(db, "users")

    const addUser = async () => {
        await addDoc(usersCollection, { name: name, family: family, role: "user", isBlocked: false, email: email, password: password, id: auth.currentUser.uid });
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
      .then(navigate("/"))
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
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => setFamily(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
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
                <RouterLink to="/login">
                  <Link color={'blue.400'}> Login</Link>
                </RouterLink>
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