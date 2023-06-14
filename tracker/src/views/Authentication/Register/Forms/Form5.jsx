import { Box,Radio, RadioGroup, FormControl, FormLabel, Heading, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Form5 = ({handleActivityLevel,regActivityLevel }) => {

  const handleActivityChange = (value) => {
    handleActivityLevel(value);
  };
    return (
      <>
        <Box h="400px" overflowY="auto">
          <Heading fontSize={28} w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            What is your baseline activity level? 
          </Heading>
          <FormControl>
            <FormLabel fontWeight={'normal'}>Choose your activity level:</FormLabel>
            <Stack direction="column">
              <RadioGroup onChange={handleActivityChange} value={regActivityLevel}>
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

  Form5.propTypes = {
    handleActivityLevel: PropTypes.func.isRequired,
    regActivityLevel: PropTypes.string.isRequired,
  };

  export default Form5