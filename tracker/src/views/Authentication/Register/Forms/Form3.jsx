import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';

const Form3 = ({ handleGoal,regGoal,regName,regFamily }) => {

  const handleGoalChange = (value) => {
    handleGoal(value);
  };
    return (
      <>
        <Box h="320px" overflowY="auto">
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Thanks {regName} {regFamily}! Now for your goals.
          </Heading>
          <Text align={'center'} mt={4}>
            Select up the goal that you are looking for:
          </Text>
  
          <RadioGroup onChange={handleGoalChange} value={regGoal}>
            <Stack spacing={5} direction={"column"} align={'start'}>
              <Radio value="Extreme weight gain">Extreme weight gain</Radio>
              <Radio value="Extreme weight loss">Extreme weight loss</Radio>
              <Radio value="Mild weight gain">Mild weight gain</Radio>
              <Radio value="Mild weight loss">Mild weight loss</Radio>
              <Radio value="Weight gain">Weight gain</Radio>
              <Radio value="Weight loss">Weight loss</Radio>
              <Radio value="Maintain weight">Maintain weight</Radio>

            </Stack>
          </RadioGroup>
        </Box>
      </>
    );
  };

export default Form3