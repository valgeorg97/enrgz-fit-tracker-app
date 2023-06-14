import { useState} from 'react';
import { Flex, Box, Progress, Image, Button, Stack, useColorModeValue, ButtonGroup } from '@chakra-ui/react';
import { db, auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png"
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';
import Form4 from './Forms/Form4';
import Form5 from './Forms/Form5';
import Form6 from './Forms/Form6';
import Form7 from './Forms/Form7';
import Form8 from './Forms/Form8';
import Loading from '../../../components/Loading/Loading';
import { FITNESS_CALC_API_KEY } from '../../../common/constants';
import calculateCalories from '../../../services/fitnessCalculatorService';
import { toast } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const [regName, setRegName] = useState("")
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

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [familyError, setFamilyError] = useState('');

  const usersCollectionRef = collection(db, 'users');
  const usersQuery = query(usersCollectionRef);

  /**
 * Validates the username.
 * @param {string} username - The username to be validated.
 * @returns {Promise<void>}
 */
  const validateUsername = async (username) => {
    if (username.length < 2 || username.length > 20) {
      setUsernameError("Username must be between 2 and 20 characters");
    } else {
      const querySnapshot = await getDocs(usersQuery);
      const existingUser = querySnapshot.docs.find(
        (doc) => doc.data().username === username
      );
      if (existingUser) {
        setUsernameError("Username already exists");
      } else {
        setUsernameError("");
        setRegUsername(username)
      }
    }
  };

  /**
 * Validates the email address.
 * @param {string} email - The email address to be validated.
 * @returns {Promise<void>}
 */
  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("email", "==", email))
      );
      if (!querySnapshot.empty) {
        setEmailError("Email already exists");
      } else {
        setEmailError("");
        setRegEmail(email);
      }
    }
  };

  /**
 * Validates the password.
 * @param {string} password - The password to be validated.
 * @returns {Promise<void>}
 */
  const validatePassword = async (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
      setRegPassword(password);
    }
  }

  /**
 * Validates the phone number.
 * @param {string} phone - The phone number to be validated.
 * @returns {Promise<void>}
 */
  const validatePhone = async (phone) => {
    if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 characters');
    } else {
      const querySnapshot = await getDocs(query(usersCollectionRef, where("phoneNumber", "==", phone)));
      if (!querySnapshot.empty) {
        setPhoneError("Phone number already exists");
      } else {
        setPhoneError('');
        setRegPhone(phone);
      }
    }
  };

  /**
 * Validates the name.
 * @param {string} name - The name to be validated.
 * @returns {Promise<void>}
 */
  const validateName = async (name) => {
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters');
    } else {
      setNameError('');
      setRegName(name);
    }
  }

  /**
 * Validates the family.
 * @param {string} family - The family name to be validated.
 * @returns {Promise<void>}
 */
  const validateFamily = async (family) => {
    if (family.length < 3) {
      setFamilyError('Family must be at least 3 characters');
    } else {
      setFamilyError('');
      setRegFamily(family);
    }
  }

  /**
 * Calculates the age based on the birthdate.
 * @param {Date} birthdate - The birthdate to calculate the age from.
 * @returns {number} - The calculated age.
 */
  const calculateAge = (birthdate) => {
    const diffMs = Date.now() - birthdate.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

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

  const handleHeight = (event) => {
    setRegHeight(event);
  };

  const handleWeight = (event) => {
    setRegWeight(event);
  };

  const handleGoalWeight = (event) => {
    setRegGoalWeight(event);
  };

  /**
 * Adds a user to the database.
 * @param {number} bmr - The Basal Metabolic Rate (BMR) of the user.
 * @param {object} goals - The user's goals object.
 * @returns {Promise<void>}
 */
  const addUser = async (bmr, goals) => {
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
      id: auth.currentUser.uid,
      energizePoints: 0
    });

    const docID = docRef.id;
    const dataWithDocID = { ...addUser, docID: docID };
    await updateDoc(docRef, dataWithDocID);

    const userBmrUpdate = { ...addUser, bmr: bmr };
    await updateDoc(docRef, userBmrUpdate);

    const mainGoalsCollection = collection(db, "mainGoals")
    const userMainGoals = {
      owner: auth.currentUser.uid,
      extremeGain: { ...goals["Extreme weight gain"], name: "Extreme weight gain" },
      extremeLoss: { ...goals["Extreme weight loss"], name: "Extreme weight loss" },
      mildGain: { ...goals["Mild weight gain"], name: "Mild weight gain" },
      mildLoss: { ...goals["Mild weight loss"], name: "Mild weight loss" },
      gain: { ...goals["Weight gain"], name: "Weight gain" },
      loss: { ...goals["Weight loss"], name: "Weight loss" },
      maintain: { ...goals["maintain weight"], name: "Maintain weight" }
    }
    await addDoc(mainGoalsCollection, userMainGoals);
  }

  /**
 * Updates the name of the current user's profile.
 * @returns {void}
 */
  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: `${regName} ${regFamily}`
    })
  }

  /**
 * Sign up a new user.
 * @param {Event} e - The event object from the form submission.
 * @returns {void}
 */
  const signUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(() => {
        updateName();
        return calculateCalories(calculateAge(new Date(regYear)), regGender, regHeight, regWeight, regActivityLevel, FITNESS_CALC_API_KEY);
      })
      .then((caloriesData) => {
        if (caloriesData && caloriesData.bmr) {
          return addUser(caloriesData.bmr, caloriesData.goals);
        } else {
          throw new Error('Failed to calculate calories due to inconsistent choices in the register form');
        }
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/dashboard")
      });
  };

  const checkFormValidity = () => {
    switch (step) {
      case 2:
        return !regName || !regFamily;
      case 3:
        return !regGoal;
      case 5:
        return !regActivityLevel;
      case 6:
        return !regGender || !regYear || !regPhone
      case 7:
        return !regHeight || !regWeight || !regGoalWeight;
      case 8:
        return !regUsername || !regEmail || !regPassword;
      default:
        return false;
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image src={Logo} alt="Energize Logo" w={64} />
          {isLoading && <Loading size="xl" color="teal.500" />}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
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

            {step === 1 ? (
              <Form1 />
            ) : step === 2 ? (
              <Form2
                validateName={validateName}
                validateFamily={validateFamily}
                nameError={nameError}
                familyError={familyError} />
            ) : step === 3 ? (
              <Form3
                handleGoal={handleGoal}
                regGoal={regGoal}
                regName={regName}
                regFamily={regFamily}
              />
            ) : step === 4 ? (
              <Form4 />
            ) : step === 5 ? (
              <Form5
                handleActivityLevel={handleActivityLevel}
                regActivityLevel={regActivityLevel}
              />
            ) : step === 6 ? (
              <Form6
                handleGender={handleGender}
                regGender={regGender}
                regYear={regYear}
                handleYear={handleYear}
                validatePhone={validatePhone}
                phoneError={phoneError}
              />
            ) : step === 7 ? (
              <Form7
                handleHeight={handleHeight}
                handleWeight={handleWeight}
                handleGoalWeight={handleGoalWeight}
                goal={regGoal}
                currentWeight={regWeight}
              />
            ) : step === 8 ? (
              <Form8
                validateUsername={validateUsername}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                usernameError={usernameError}
                emailError={emailError}
                passwordError={passwordError}
              />
            ) : null}
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
                    onClick={
                      step === 8
                        ? signUp
                        : () => {
                          setStep(step + 1);
                          setProgress(progress + 14.29);
                        }
                    }
                    colorScheme="teal"
                    variant="outline"
                    isDisabled={checkFormValidity()}
                  >
                    {step === 8 ? "Sign up" : "Next"}
                  </Button>
                </Flex>
              </Flex>
            </ButtonGroup>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;