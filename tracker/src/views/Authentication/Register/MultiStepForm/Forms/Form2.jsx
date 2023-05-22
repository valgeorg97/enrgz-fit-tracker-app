import React from 'react';
import { Box, Heading, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Form2 = () => {
  return (
    <Box h="300px" overflowY="auto">
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        What’s your first name and last name? We’re happy you’re here.
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="Last name" />
        </FormControl>
      </Flex>
      {/* Rest of the form */}
    </Box>
  );
};

export default Form2;
