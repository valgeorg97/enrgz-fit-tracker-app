import { Box, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel fontSize={18} fontWeight="normal">How much do you weigh?</FormLabel>
          <Input type="number" placeholder="Current weight" onChange={(e) => handleWeight(e.target.value)} />
        </FormControl>

        <FormControl mt={4} isRequired isInvalid={weightError}>
          <FormLabel fontSize={18} fontWeight="normal">What's your goal weight?</FormLabel>
          <Input type="number" placeholder="Goal weight" onChange={handleGoalWeightChange} />
          <FormErrorMessage>{weightError}</FormErrorMessage>
        </FormControl>
        
      </Box>
    </>
  );
};

Form7.propTypes = {
  handleHeight: PropTypes.func.isRequired,
  handleWeight: PropTypes.func.isRequired,
  handleGoalWeight: PropTypes.func.isRequired,
  goal: PropTypes.string.isRequired,
  currentWeight: PropTypes.string.isRequired,
};

export default Form7