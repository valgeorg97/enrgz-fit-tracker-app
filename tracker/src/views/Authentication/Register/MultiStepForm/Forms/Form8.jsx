import React from 'react';
import { Box, FormControl, FormLabel, Input} from '@chakra-ui/react'

const Form8 = () => {
    return (
      <>
      <Box h="300px" overflowY="auto" w="250px">
        <FormControl>
          <FormLabel fontWeight="normal">Username</FormLabel>
          <Input type="text" placeholder="Username" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">Email</FormLabel>
          <Input type="email" placeholder="Email" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight="normal">Password</FormLabel>
          <Input type="password" placeholder="Password" />
        </FormControl>
        </Box>
      </>
    );
  };

  export default Form8;