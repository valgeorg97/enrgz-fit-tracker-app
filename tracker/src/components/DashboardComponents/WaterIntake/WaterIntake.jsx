import { useEffect, useState, useContext, useRef } from "react";
import { db } from "../../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { EnergizeGameContext } from "../../../context/EnergizeGameContext"
import { useToast } from "@chakra-ui/react";
import {Box,Input,Heading,Text,VStack,Button,Collapse,Flex,} from "@chakra-ui/react";
import water2 from "../../../assets/water2.png";
import "./Water.css";

/**
 * `WaterCalculator` is a functional React component that calculates and displays user's water intake.
 * This component uses firebase to retrieve and update user's data related to water consumption.
 * 
 * @component
 * @example
 * <WaterCalculator />
 * 
 * @returns {ReactElement} The UI DOM object for the `WaterCalculator` component.
 *
 * @property {Object} userDocID - Document ID of the current user in the Firestore database.
 * @property {Object} weight - Weight of the user to calculate recommended water intake.
 * @property {Number} consumedWater - The amount of water consumed by the user.
 * @property {Number} savedWater - The amount of water saved by the user.
 * @property {Object} energizePoints - The number of points earned by the user in the Energize Game.
 * @property {Boolean} awardedWaterPoints - A boolean indicating whether the user has been awarded points for water intake.
 * 
 * Hooks:
 * @see useContext (https://reactjs.org/docs/hooks-reference.html#usecontext) - Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context.
 * @see useState (https://reactjs.org/docs/hooks-state.html) - Allows adding React state to function components.
 * @see useEffect (https://reactjs.org/docs/hooks-effect.html) - Accepts a function that contains imperative, possibly effectful code.
 * @see useRef (https://reactjs.org/docs/hooks-reference.html#useref) - Returns a mutable ref object whose `.current` property is initialized to the passed argument (`null` in this case).
 *
 * Contexts:
 * @see AuthContext - A context that provides the user document ID from the authentication process.
 * @see EnergizeGameContext - A context that provides the number of points earned by the user in the Energize Game.
 *
 * Components:
 * @see Box - Chakra UI component that renders a `div` and is often used as a layout component.
 * @see Heading - Chakra UI component for rendering headings.
 * @see Text - Chakra UI component for rendering text.
 * @see VStack - Chakra UI component for vertically stacking child components.
 * @see Button - Chakra UI component for rendering a button.
 * @see Collapse - Chakra UI component for showing and hiding content with a sliding animation.
 * @see Flex - Chakra UI component for creating layouts using the CSS Flexbox model.
 * @see Input - Chakra UI component for inputting data.
 * 
 * Functions:
 * @see handleToggle - Toggles the isOpen state.
 * @see calculateWaterIntake - Calculates the user's recommended water intake based on their weight.
 * @see calculatePercentage - Calculates the percentage of the recommended water intake that the user has consumed.
 * @see saveWaterIntake - Saves the user's current water intake to Firestore and updates the number of Energize Game points.
 * @see resetConsumedWater - Resets the user's water consumption if a new day has started.
 */

const WaterCalculator = () => {
  const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext)
  const [weight, setWeight] = useState(null);
  const [consumedWater, setConsumedWater] = useState(0);
  const [savedWater, setSavedWater] = useState(0);
  const { userDocID } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const waterRef = useRef(null);
  const toast = useToast();
  let [awardedWaterPoints, setWaterPoints] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userDocID) {
        const docRef = doc(db, "users", userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeight(docSnap.data().weight);
          setEnergizePoints(docSnap.data().energizePoints || 0);
          const lastUpdate = docSnap.data().lastUpdate?.toDate();
          const today = new Date();

          if (!lastUpdate || lastUpdate.getDate() !== today.getDate() || lastUpdate.getMonth() !== today.getMonth() || lastUpdate.getFullYear() !== today.getFullYear()) {
            setSavedWater(0);
            setWaterPoints(false);
          } else {
            setSavedWater(docSnap.data().consumedWater || 0);
            setWaterPoints(docSnap.data().awardedWaterPoints || false);
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
    resetConsumedWater()
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
      let newSavedWater = savedWater + consumedWater;

      const docSnap = await getDoc(userRef);

  
      if (docSnap.exists()) {
        const lastUpdate = docSnap.data().lastUpdate?.toDate();
        if (!lastUpdate || lastUpdate.getDate() !== today.getDate() || lastUpdate.getMonth() !== today.getMonth() || lastUpdate.getFullYear() !== today.getFullYear()) {
          awardedWaterPoints = false;
        } else {

          awardedWaterPoints = docSnap.data().awardedWaterPoints || false;
        }
      }

      let newEnergizePoints = energizePoints;
      if ((newSavedWater / calculateWaterIntake()) >= 1 && !awardedWaterPoints) {
        newEnergizePoints += 3;
        awardedWaterPoints = true;
        toast({
          title: "Congratulations!",
          description: "You've earned 3 Energize Points for reaching your Water intake goal!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top"
        });
      }

      await setDoc(
        userRef,
        {
          consumedWater: newSavedWater,
          lastUpdate: today,
          energizePoints: newEnergizePoints,
          awardedWaterPoints: awardedWaterPoints
        },
        { merge: true }
      );

      setSavedWater(savedWater + consumedWater);
      setEnergizePoints(newEnergizePoints);
      waterRef.current.value = null;
    }
  };
  const resetConsumedWater = async () => {
    if (userDocID) {
      const userRef = doc(db, "users", userDocID);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const lastWaterUpdate = docSnap.data().lastWaterUpdate?.toDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!lastWaterUpdate || lastWaterUpdate.setHours(0, 0, 0, 0) < today.getTime()) {
          await setDoc(
            userRef,
            { consumedWater: 0, lastWaterUpdate: today, awardedWaterPoints: false },
            { merge: true }
          );
        }
      }
    }
  };

  return (
    <Box shadow="xl" bgImage={water2} p={4} borderRadius="md" w="400px">
      <VStack spacing={1} width="sm">
        <Heading size="md">Water Intake</Heading>
        <Box textAlign="center">
          <Text fontSize="sm">
            Your recommended water intake is: {parseFloat(calculateWaterIntake().toFixed(1))} liters
          </Text>
          <Text mb="10px" fontSize="sm">
            Your water intake today: {parseFloat(savedWater.toFixed(1))} liters
          </Text>
          {calculatePercentage() === 100 && (
            <Text fontSize="sm" color="black" mb={5} fontWeight={"semibold"}>
              You've reached your daily water intake goal. Good job on staying hydrated!
            </Text>
          )}
        </Box>

        <Box color="#3b46d3" className="circle-container">
          <Box className="circle"></Box>
          {calculatePercentage() < 10 && (
            <>
              <Box className="wave _0"></Box>
              <Box className="wave _0"></Box>
              <Box className="wave _0"></Box>
              <Box className="wave-below _0"></Box>
              <Box className="desc _0">
                <h2>Today</h2>
                <p>
                  <b>{calculatePercentage()}%</b>
                </p>
              </Box>
            </>
          )}
          {calculatePercentage() >= 10 && calculatePercentage() < 37 && (
            <>
              <Box className="wave _25"></Box>
              <Box className="wave _25"></Box>
              <Box className="wave _25"></Box>
              <Box className="wave-below _25"></Box>
              <Box className="desc _25">
                <h2>Today</h2>
                <p>
                  <b>{calculatePercentage()}%</b>
                </p>
              </Box>
            </>
          )}
          {calculatePercentage() >= 37 && calculatePercentage() < 65 && (
            <>
              <Box className="wave _50"></Box>
              <Box className="wave _50"></Box>
              <Box className="wave _50"></Box>
              <Box className="wave-below _50"></Box>
              <Box color="white" className="desc _50">
                <h2>Today</h2>
                <p>
                  <b>{calculatePercentage()}%</b>
                </p>
              </Box>
            </>
          )}
          {calculatePercentage() >= 65 && calculatePercentage() < 100 && (
            <>
              <Box className="wave _75"></Box>
              <Box className="wave _75"></Box>
              <Box className="wave _75"></Box>
              <Box className="wave-below _75"></Box>
              <Box color="white" className="desc _75">
                <h2>Today</h2>
                <p>
                  <b>{calculatePercentage()}%</b>
                </p>
              </Box>
            </>
          )}
          {calculatePercentage() === 100 && (
            <>
              <Box className="wave _100"></Box>
              <Box className="wave _100"></Box>
              <Box className="wave _100"></Box>
              <Box className="wave-below _100"></Box>
              <Box color="white" className="desc _100">
                <h2>Today</h2>
                <p>
                  <b>{calculatePercentage()}%</b>
                </p>
              </Box>
            </>
          )}
        </Box>

        <Button colorScheme="linkedin" size="sm" onClick={handleToggle}>
          {isOpen ? "Show Less" : "Show More"}
        </Button>

        <Collapse in={isOpen}>
          <Box color="white" bgColor="rgba(0, 0, 0, 0.5)" boxShadow="md" p={2} mb={1} borderRadius="md">
            <Text fontSize="sm">Add water consumed today (liters): </Text>
            <Input
              textAlign="center"
              ml="85px"
              size="sm"
              w="60px"
              p={2}
              type="number"
              placeholder="0"
              ref={waterRef}
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
