import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';


const Form8 = ({handleUsername,handleEmail,handlePassword}) => {
    return (
      <>
        <Box h="300px" overflowY="auto" w="250px">
          <FormControl>
            <FormLabel fontWeight="normal">Username</FormLabel>
            <Input type="text" placeholder="Username" onChange={(e) => handleUsername(e.target.value)} />
          </FormControl>
  
          <FormControl mt={4}>
            <FormLabel fontWeight="normal">Email</FormLabel>
            <Input type="email" placeholder="Email" onChange={(e) => handleEmail(e.target.value)} />
          </FormControl>
  
          <FormControl mt={4}>
            <FormLabel fontWeight="normal">Password</FormLabel>
            <Input type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} />
          </FormControl>
        </Box>
      </>
    );
  };

export default Form8