import { useState,useContext } from 'react';
import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { db, auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-datepicker/dist/react-datepicker.css';
import Logo from "../../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';
import Form4 from './Forms/Form4';
import Form5 from './Forms/Form5';
import Form6 from './Forms/Form6';
import Form7 from './Forms/Form7';
import Form8 from './Forms/Form8';


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  let navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("");

  const [regName, setRegName] = useState()
  const [regFamily, setRegFamily] = useState("")
  const [regGoal, setRegGoal] = useState("")
  const [regActivityLevel, setRegActivityLevel] = useState("")
  const [regGender, setRegGender] = useState("")
  const [regYear, setRegYear] = useState("")
  const [regPhone, setRegPhone] = useState("")
  const [regHeight, setRegHeight] = useState("")
  const [regWeight, setRegWeight] = useState("")
  const [regGoalWeight, setRegGoalWeight] = useState("")
  const [regUsername, setRegUsername] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")

  const handleName = (event) => {
    setRegName(event);
  };
  
  const handleFamily = (event) => {
    setRegFamily(event);
  };
  
  const handleGoal = (value) => {
    setRegGoal(value);
  };
  
  const handleActivityLevel = (value) => {
    setRegActivityLevel(value);
  };
  
  const handleGender = (value) => {
    setRegGender(value);
  };
  
  const handleYear = (date) => {
    setRegYear(date);
  };
  
  const handlePhone = (event) => {
    setRegPhone(event);
  };
  
  const handleHeight = (event) => {
    setRegHeight(event);
  };
  
  const handleWeight = (event) => {
    setRegWeight(event);
  };
  
  const handleGoalWeight = (event) => {
    setRegGoalWeight(event);
  };
  
  const handleUsername = (event) => {
    setRegUsername(event);
  };
  
  const handleEmail = (event) => {
    setRegEmail(event);
  };
  
  const handlePassword = (event) => {
    setRegPassword(event);
  };

  const handleCountryCode =(value) => {
    setCountryCode(value)
  }

  const addUser = async () => {
  const usersCollection = collection(db, "users")

    const docRef = await addDoc(usersCollection, {
      name: regName, 
      family: regFamily, 
      username: regUsername, 
      email: regEmail, 
      password: regPassword, 
      phoneNumber: regPhone, 
      goal: regGoal,
      activityLvl: regActivityLevel,
      gender: regGender,
      age: regYear,
      height: regHeight,
      weight: regWeight,
      goalWeight: regGoalWeight,
      role: "user", 
      isBlocked: false, 
      id: auth.currentUser.uid
    });
    const docID = docRef.id;
    const dataWithDocID = { ...addUser, docID: docID };
    await updateDoc(docRef, dataWithDocID);
  }
  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${regName} ${regFamily}`
    })
  }

  const validateInputs = () => {
    if (regName.trim() === '') {
      toast.error('Please enter your first name!');
      return false;
    }
    if (regFamily.trim() === '') {
      toast.error('Please enter your last name!');
      return false;
    }
    if (regEmail.trim() === '') {
      toast.error('Please enter your email!');
      return false;
    }
    if (regPhone.trim() === '') {
      toast.error('Please enter a phone number!');
      return false;
    }
    if (regUsername.trim() === '') {
      toast.error('Please enter a username!');
      return false;
    }
    if (regPassword.trim() === '') {
      toast.error('Please enter a password!');
      return false;
    }
    if (regGoal.trim() === '') {
      toast.error('Please enter a goal!');
      return false;
    }
    if (regActivityLevel.trim() === '') {
      toast.error('Please enter an activity level!');
      return false;
    }
    if (regGender.trim() === '') {
      toast.error('Please enter your gender!');
      return false;
    }
    if (regHeight.trim() === '') {
      toast.error('Please enter your height!');
      return false;
    }
    if (regWeight.trim() === '') {
      toast.error('Please enter your weight!');
      return false;
    }
    if (regGoalWeight.trim() === '') {
      toast.error('Please enter your goal weight!');
      return false;
    }
    return true;
  };

  const signUp = (e) => {
    e.preventDefault()
    if (!validateInputs()) {
      return;
    }
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
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
            {step === 1 ? <Form1 /> 
            : step === 2 ? <Form2 handleName={handleName} handleFamily={handleFamily}/> 
            : step === 3 ? <Form3 handleGoal={handleGoal} regGoal={regGoal} regName={regName} regFamily={regFamily} /> 
            : step === 4 ? <Form4 /> 
            : step === 5 ? <Form5 handleActivityLevel={handleActivityLevel} regActivityLevel={regActivityLevel}/> 
            : step === 6 ? <Form6 handleGender={handleGender} regGender={regGender} regYear={regYear} handleYear={handleYear} handlePhone={handlePhone} handleCountryCode={handleCountryCode} /> 
            : step === 7 ? <Form7 handleHeight={handleHeight} handleWeight={handleWeight} handleGoalWeight={handleGoalWeight}  /> 
            : <Form8 handleUsername={handleUsername} handleEmail={handleEmail} handlePassword={handlePassword}/>}
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