import { useEffect, useState, useContext } from "react";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Input,
  Heading,
  Progress,
  Text,
  VStack,
  Button,
  Collapse,
  Flex,
} from "@chakra-ui/react";
import water2 from "../../assets/water2.png";
import { useColorMode } from "@chakra-ui/react";
import "./Water.css";

const WaterCalculator = () => {
  const [weight, setWeight] = useState(null);
  const [consumedWater, setConsumedWater] = useState(0);
  const [savedWater, setSavedWater] = useState(0);
  const { userDocID } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => setIsOpen(!isOpen);
  const waterBground = colorMode === "dark" ? "gray.800" : "white";

  useEffect(() => {
    const fetchUserData = async () => {
      if (userDocID) {
        const docRef = doc(db, "users", userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeight(docSnap.data().weight);

          const lastUpdate = docSnap.data().lastUpdate?.toDate();
          const today = new Date();
          today.setHours(0, 0, 0, 0); // remove time part

          if (!lastUpdate || lastUpdate.getTime() !== today.getTime()) {
            setSavedWater(0); // reset water consumed
          } else {
            setSavedWater(docSnap.data().consumedWater || 0);
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [userDocID]);

  const calculateWaterIntake = () => {
    if (!weight) {
      return 0;
    }

    let waterIntake = 0.03 * weight;
    return waterIntake;
  };

  const calculatePercentage = () => {
    let totalIntake = calculateWaterIntake();

    if (totalIntake === 0 || isNaN(savedWater)) {
      return 0;
    }

    let percentage = (savedWater / totalIntake) * 100;
    percentage = Math.min(percentage, 100);

    return Math.floor(percentage);
  };

  const saveWaterIntake = async () => {
    if (userDocID) {
      const userRef = doc(db, "users", userDocID);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await setDoc(
        userRef,
        { consumedWater: savedWater + consumedWater, lastUpdate: today },
        { merge: true }
      );
      setSavedWater(savedWater + consumedWater);
      setConsumedWater(0);
    }
  };

  return (
    <Box shadow="xl" bgImage={water2} p={4} borderRadius="md" w="400px">
      <VStack spacing={1} width="sm">
        <Heading size="md">Water Intake</Heading>

        {calculatePercentage() < 100 ? (
          <>
            <Box textAlign="center">
              <Text fontSize="sm">
                Your recommended water intake is: {calculateWaterIntake()}{" "}
                liters
              </Text>
              <Text fontSize="sm">
                Your water intake today: {savedWater} liters
              </Text>
            </Box>

            <Box>
              {/* <Text fontSize="sm">Progress:</Text>
              <Progress size="sm" value={calculatePercentage()} max="100" /> */}

              <Box>
                {calculatePercentage() < 50 ? (
                  <div className="circle-container">
                    <div className="circle"></div>
                    <div className="wave _0"></div>
                    <div className="wave _0"></div>
                    <div className="wave _0"></div>
                    <div className="wave-below _0"></div>
                    <div className="desc _0">
                      <h2>Today</h2>
                      <p>
                        <b>{calculatePercentage()}%</b>
                      </p>
                    </div>
                  </div>
                ) : calculatePercentage() > 50 ? (
                  <div className="circle-container">
                    <div className="circle"></div>
                    <div className="wave _50"></div>
                    <div className="wave _50"></div>
                    <div className="wave _50"></div>
                    <div className="wave-below _50"></div>
                    <div className="desc _50">
                      <h2>Today</h2>
                      <p>
                        <b>{calculatePercentage()}%</b>
                      </p>
                    </div>
                  </div>
                ) : calculatePercentage() < 100 ? (
                  <div className="circle-container">
                    <div className="circle"></div>
                    <div className="wave _100"></div>
                    <div className="wave _100"></div>
                    <div className="wave _100"></div>
                    <div className="wave-below _100"></div>
                    <div className="desc _100">
                      <h2>Today</h2>
                      <p>
                        <b>{calculatePercentage()}%</b>
                      </p>
                    </div>
                  </div>
                ) : null}
              </Box>

              {/* <Text fontSize="sm">{calculatePercentage()}%</Text> */}
            </Box>
          </>
        ) : (
          <Box>
            <Box>
              <Text fontSize="sm">
                Your recommended water intake is: {calculateWaterIntake()}{" "}
                liters
              </Text>
              <Text fontSize="sm">
                Your water intake today: {savedWater} liters
              </Text>
            </Box>
            <Text fontSize="sm" color="green.500" fontWeight="bold">
              You have reached your goal!
            </Text>
          </Box>
        )}

        <Button colorScheme="linkedin" size="sm" onClick={handleToggle}>
          {isOpen ? "Show Less" : "Show More"}
        </Button>

        <Collapse in={isOpen}>
          <Box bgColor="white" boxShadow="md" p={4} mb={1} borderRadius="md">
            <Text fontSize="sm">Add water consumed today (in liters): </Text>
            <Input
              size="sm"
              type="number"
              value={consumedWater}
              min="0"
              onChange={(e) => setConsumedWater(parseFloat(e.target.value))}
            />
          </Box>
          <Flex justifyContent="center">
            <Button colorScheme="linkedin" size="sm" onClick={saveWaterIntake}>
              Save
            </Button>
          </Flex>
        </Collapse>
      </VStack>
    </Box>
  );
};

export default WaterCalculator;
