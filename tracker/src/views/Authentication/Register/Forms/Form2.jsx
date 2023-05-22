import React from 'react';
import { Box, FormControl, FormLabel, Input, Flex, Heading, Text } from '@chakra-ui/react';

const Form2 = ({ handleName, handleFamily }) => {
  return (
    <Box h="300px" overflowY="auto">
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        What’s your first name and last name? We’re happy you’re here.
      </Heading>
      <Flex>
        <FormControl mr="5%" id="firstName">
          <FormLabel fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input type="text" placeholder="First name" onChange={(e) => handleName(e.target.value)} />
        </FormControl>

        <FormControl id="last-name">
          <FormLabel fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input type="text" placeholder="Last name" onChange={(e) => handleFamily(e.target.value)} />
        </FormControl>
      </Flex>
      <Text align={'center'} mt={4}>
        Let’s get to know a little about you.
      </Text>
    </Box>
  );
};

export default Form2;
