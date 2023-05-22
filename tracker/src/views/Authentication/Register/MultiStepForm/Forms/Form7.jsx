import React from 'react';
import {Box, FormControl, FormLabel, Input, RadioGroup, Stack, Radio, Select} from '@chakra-ui/react'

const Form7 = () => {
    return (
      <>
      <Box h="400px" overflowY="auto" w="300px">
        <FormControl>
          <FormLabel fontWeight="normal">How tall are you?</FormLabel>
          <Input type="number" placeholder="Height" />
          <RadioGroup mt={2}>
            <Stack spacing={2}>
              <Radio value="inches">Inches</Radio>
              <Radio value="centimeters">Centimeters</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">How much do you weigh?</FormLabel>
          <Input type="number" placeholder="Current weight" />
          <Select mt={2} placeholder="Select unit">
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">What's your goal weight?</FormLabel>
          <Input type="number" placeholder="Goal weight" />
        </FormControl>
        </Box>
      </>
    );
  };

  export default Form7;