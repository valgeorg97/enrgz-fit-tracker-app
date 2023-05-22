import React from 'react';
import {Box, Heading, RadioGroup, Stack, Radio, Text} from '@chakra-ui/react'
import { useState } from 'react';


const Form3 = () => {
    const [value, setValue] = useState('1'); // set default value for radio group

    return (
      <>
      <Box h="320px" overflowY="auto">
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Thanks ! Now for your goals.
        </Heading>
        <Text align={'center'} mt={4}>
          Select up the goal that you are looking for:
        </Text>

        <RadioGroup onChange={setValue} value={value}>
          <Stack spacing={5} direction={"column"} align={'start'}>
            <Radio value="1">Lose Weight</Radio>
            <Radio value="2">Maintain Weight</Radio>
            <Radio value="3">Gain Weight</Radio>
            <Radio value="4">Increase step count</Radio>
          </Stack>
        </RadioGroup>
        </Box>
      </>
    );
  };

  export default Form3