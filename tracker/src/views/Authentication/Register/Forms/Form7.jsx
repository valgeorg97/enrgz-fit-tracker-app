import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import FactBubble from '../../../../components/InterestingFacts/FactBubble';


const Form7 = ({ handleHeight, handleWeight, handleGoalWeight, goal, currentWeight }) => {
  const [weightError, setWeightError] = useState(null);

  const validateGoalWeight = (goalWeight, currentWeight) => {
    const goalWeightNum = Number(goalWeight);
    const currentWeightNum = Number(currentWeight);
    if ((goal.includes('gain') && goalWeightNum <= currentWeightNum) ||
      (goal.includes('loss') && goalWeightNum >= currentWeightNum) ||
      (goal.includes('Maintain weight') && goalWeightNum !== currentWeightNum)) {
      setWeightError(`Your goal weight doesn't match your selected goal: ${goal}.`);
      return false;
    }
    setWeightError(null);
    return true;
  };

  const handleGoalWeightChange = (e) => {
    if (validateGoalWeight(e.target.value, currentWeight)) {
      handleGoalWeight(e.target.value);
    }
  };
  return (
    <>
      <Box h="400px" overflowY="auto" w="300px">
        <FormControl isRequired>
          <FormLabel fontSize={18} fontWeight="normal">How tall are you?</FormLabel>
          <Input type="number" placeholder="Height" onChange={(e) => handleHeight(e.target.value)} />
          {/* <RadioGroup mt={2}> 
              <Stack spacing={2}>
                <Radio value="inches">Inches</Radio>
                <Radio value="centimeters">Centimeters</Radio>
              </Stack>
            </RadioGroup> */}
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel fontSize={18} fontWeight="normal">How much do you weigh?</FormLabel>
          <Input type="number" placeholder="Current weight" onChange={(e) => handleWeight(e.target.value)} />
          {/* <Select mt={2} placeholder="Select unit">
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </Select> */}
        </FormControl>

        <FormControl mt={4} isRequired isInvalid={weightError}>
          <FormLabel fontSize={18} fontWeight="normal">What's your goal weight?</FormLabel>
          <Input type="number" placeholder="Goal weight" onChange={handleGoalWeightChange} />
          <FormErrorMessage>{weightError}</FormErrorMessage>
        </FormControl>
        <FactBubble />
      </Box>
    </>
  );
};

export default Form7