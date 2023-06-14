import { Box,Radio, RadioGroup,Heading, Stack,Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Form3 = ({ handleGoal,regGoal,regName,regFamily }) => {

  const handleGoalChange = (value) => {
    handleGoal(value);
  };
    return (
      <>
        <Box h="320px" overflowY="auto">
          <Heading fontSize={25} w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Thanks <strong>{regName} {regFamily}</strong>! Now for your goals.
          </Heading>
          <Text mb={6} align={'center'} mt={6}>
            Select up the goal that you are looking for:
          </Text>
  
          <RadioGroup onChange={handleGoalChange} value={regGoal} >
            <Stack mb={8} spacing={5} direction={"column"} align={'start'}>
              <Radio value="Extreme weight gain">Extreme weight gain (gain 1 kg per week)</Radio>
              <Radio value="Extreme weight loss">Extreme weight loss (lose 1 kg per week)</Radio>
              <Radio value="Weight gain">Weight gain (gain 0.5 kg per week)</Radio>
              <Radio value="Weight loss">Weight loss (lose 0.5 kg per week)</Radio>
              <Radio value="Mild weight gain">Mild weight gain (gain 0.25 kg per week)</Radio>
              <Radio value="Mild weight loss">Mild weight loss (lose 0.25 kg per week)</Radio>
              <Radio value="Maintain weight">Maintain weight</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </>
    );
  };

  Form3.propTypes = {
    handleGoal: PropTypes.func.isRequired,
    regGoal: PropTypes.string.isRequired,
    regName: PropTypes.string.isRequired,
    regFamily: PropTypes.string.isRequired,
  };

export default Form3