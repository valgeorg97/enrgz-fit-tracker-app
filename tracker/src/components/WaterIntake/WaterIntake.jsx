import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { Box, Input, Heading, Progress, Text, VStack } from "@chakra-ui/react";

const WaterCalculator = () => {
  const [weight, setWeight] = useState(null);
  const [consumedWater, setConsumedWater] = useState(0);
  const { userID, userDocID } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if(userDocID){
        const docRef = doc(db, 'users', userDocID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWeight(docSnap.data().weight);
        } else {
          console.log("No such document!");
        }
      }
    }

    fetchUserData();
  }, [userDocID]);

  const calculateWaterIntake = () => {
    if (!weight) {
      return 'Loading...';
    }

    let waterIntake = 0.03 * weight;
    return waterIntake;
  }

  const calculatePercentage = () => {
    let totalIntake = calculateWaterIntake();
    let percentage = (consumedWater / totalIntake) * 100;
    return Math.min(percentage, 100);  // cap it at 100%
  }

  return (
    <VStack spacing={5} width="sm">
      <Heading>Water Intake</Heading>
      <Box>
        <Text>Your weight: {weight ? weight + ' kg' : 'Loading...'}</Text>
      </Box>
      <Box>
        <Text>Your recommended water intake is: {calculateWaterIntake()} liters</Text>
      </Box>
      <Box>
        <Text>Water consumed today (in liters): </Text>
        <Input 
          type="number" 
          value={consumedWater}
          min="0"
          onChange={(e) => setConsumedWater(parseFloat(e.target.value))}
        />
      </Box>
      <Box>
        <Text>Progress:</Text>
        <Progress value={calculatePercentage()} max="100" />
        <Text>{calculatePercentage()}%</Text>
      </Box>
    </VStack>
  );
}

export default WaterCalculator;