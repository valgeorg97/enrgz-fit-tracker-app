import React, { useState, useContext, } from 'react';
import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthContext } from "../../../context/AuthContext";
import { db, auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Logo from "../../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";


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

  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    // Add more country codes as needed
  ];
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

  const Form1 = () => {
    return (
      <>
      <Box h="200px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Welcome! Let’s customize ENERGIZE for your goals.
        </Heading>
        </Box>
      </>
    );
  };

  const Form2 = () => {
    return (
      <>
      <Box h="300px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          What’s your first name and last name? We’re happy you’re here.
        </Heading>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight={'normal'}>
              First name
            </FormLabel>
            <Input id="first-name" placeholder="First name" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last-name" fontWeight={'normal'}>
              Last name
            </FormLabel>
            <Input id="last-name" placeholder="Last name" />
          </FormControl>
        </Flex>
        <Text align={'center'} mt={4}>
          Let’s get to know a little about you.
        </Text>
        </Box>
      </>
    );
  };

  const Form3 = () => {
    const [value, setValue] = useState('1'); // set default value for radio group

    return (
      <>
      <Box h="320px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Thanks {name} {family}! Now for your goals.
        </Heading>
        <Text align={'center'} mt={4}>
          Select up the goal that you are looking for:
        </Text>

        <RadioGroup onChange={setValue} value={value}>
          <Stack spacing={5} direction={"column"} align={'start'}>
            <Radio value="1">Lose Weight</Radio>
            <Radio value="2">Maintain Weight</Radio>
            <Radio value="3">Gain Weight</Radio>
            <Radio value="4">Increase step count</Radio>
          </Stack>
        </RadioGroup>
        </Box>
      </>
    );
  };

  const Form4 = () => {
    return (
      <>
      <Box h="320px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Great! You’ve just taken a big step on your journey.
        </Heading>
        <Text align={'center'} mt={4}>
          Did you know that tracking your food is a scientifically proven method to being successful? It’s called “self-monitoring” and the more consistent you are, the more likely you are to hit your goals.
        </Text>
        <Text align={'center'} mt={4}>
          Now, let’s talk about your goal to gain weight.
        </Text>
        </Box>
      </>
    );
  };

  const Form5 = () => {
    return (
      <>
      <Box h="400px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          What is your baseline activity level? Not including workouts–we count that separately.
        </Heading>
        <FormControl>
          <FormLabel fontWeight={'normal'}>Choose your activity level:</FormLabel>
          <Stack direction="column">
            <RadioGroup>
              <Stack spacing={2}>
                <Radio value="not-very-active">Not very Active - Spend most of the day sitting (e.g., desk job)</Radio>
                <Radio value="lightly-active">Lightly Active - Spend a good part of the day on your feet (e.g., teacher, salesperson)</Radio>
                <Radio value="active">Active - Spend most of the day doing some physical activity (e.g., food server, postal carrier)</Radio>
                <Radio value="very-active">Very Active - Spend a good part of the day doing heavy physical activity (e.g., bike messenger, builder)</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </FormControl>
        </Box>
      </>
    );
  };

  const Form6 = () => {
    return (
      <>
      <Box h="400px" overflowY="auto">
        <FormControl>
          <FormLabel fontWeight="normal">Please select which sex we should use to calculate your calorie needs:</FormLabel>
          <RadioGroup>
            <Stack spacing={2}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mt={4}>
  <FormLabel fontWeight="normal">When were you born? (MM/DD/YYYY)</FormLabel>
  <DatePicker
    dateFormat="MM/dd/yyyy"
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    placeholderText="MM/DD/YYYY"
    yearRange="1900:2023"
  />
</FormControl>

<FormControl mt={4}>
  <FormLabel fontWeight="normal">Phone number</FormLabel>
  <Flex align="center">
    <Select
      w="fit-content"
      placeholder="Country"
      onChange={(e) => handleCountryCodeChange(e.target.value)}
    >
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.country} ({country.code})
        </option>
      ))}
    </Select>
    <Input type="text" placeholder="Phone number" ml={2} />
  </Flex>
</FormControl>
</Box>
      </>
    );
  };



  const Form7 = () => {
    return (
      <>
      <Box h="400px" overflowY="auto" w="300px">
        <FormControl>
          <FormLabel fontWeight="normal">How tall are you?</FormLabel>
          <Input type="number" placeholder="Height" />
          <RadioGroup mt={2}>
            <Stack spacing={2}>
              <Radio value="inches">Inches</Radio>
              <Radio value="centimeters">Centimeters</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">How much do you weigh?</FormLabel>
          <Input type="number" placeholder="Current weight" />
          <Select mt={2} placeholder="Select unit">
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">What's your goal weight?</FormLabel>
          <Input type="number" placeholder="Goal weight" />
        </FormControl>
        </Box>
      </>
    );
  };

  const Form8 = () => {
    return (
      <>
      <Box h="300px" overflowY="auto" w="250px">
        <FormControl>
          <FormLabel fontWeight="normal">Username</FormLabel>
          <Input type="text" placeholder="Username" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">Email</FormLabel>
          <Input type="email" placeholder="Email" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">Password</FormLabel>
          <Input type="password" placeholder="Password" />
        </FormControl>
        </Box>
      </>
    );
  };

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
            {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : step === 4 ? <Form4 /> : step === 5 ? <Form5 /> : step === 6 ? <Form6 /> : step === 7 ? <Form7 /> : <Form8 />}
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