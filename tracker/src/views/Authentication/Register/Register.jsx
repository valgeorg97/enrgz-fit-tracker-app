import React, { useState, useContext, } from 'react';
import { Flex, Box, Progress, Image, Button, Stack, useColorModeValue, ButtonGroup } from '@chakra-ui/react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthContext } from "../../../context/AuthContext";
import { db, auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";
import Form1 from './MultiStepForm/Forms/Form1';
import Form2 from './MultiStepForm/Forms/Form2';
import Form3 from './MultiStepForm/Forms/Form3';
import Form4 from './MultiStepForm/Forms/Form4';
import Form5 from './MultiStepForm/Forms/Form5';
import Form6 from './MultiStepForm/Forms/Form6';
import Form7 from './MultiStepForm/Forms/Form7';
import Form8 from './MultiStepForm/Forms/Form8';


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { email, setEmail, password, setPassword, name, setName, family, setFamily, phoneNumber, setPhoneNumber, username, setUsername } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  let navigate = useNavigate();
  const usersCollection = collection(db, "users")
  const [selectedDate, setSelectedDate] = useState(null);

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
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Image src={Logo} alt="Energize Logo" w={64} />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              mx="5%"
              isAnimated
            ></Progress>
            {step === 1 && <Form1 />}
            {step === 2 && <Form2 />}
            {step === 3 && <Form3 />}
            {step === 4 && <Form4 />}
            {step === 5 && <Form5 />}
            {step === 6 && <Form6 />}
            {step === 7 && <Form7 />}
            {step === 8 && <Form8 />}
            <ButtonGroup mt="5%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex>
                  <Button
                    onClick={() => {
                      if (step === 1) {
                        navigate("/login");
                      } else {
                        setStep(step - 1);
                        setProgress(progress - 14.29);
                      }
                    }}
                    colorScheme="teal"
                    variant="solid"
                    w="7rem"
                    mr="5%"
                  >
                    Back
                  </Button>
                  <Button
                    w="7rem"
                    onClick={step === 8 ? signUp : () => {
                      setStep(step + 1);
                      setProgress(progress + 14.29);
                    }}
                    colorScheme="teal"
                    variant="outline"
                  >
                    {step === 8 ? "Sign up" : "Next"}
                  </Button>
                </Flex>
              </Flex>
            </ButtonGroup>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer />
    </Flex>
  );
};

export default Register;