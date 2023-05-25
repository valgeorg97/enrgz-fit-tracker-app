import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const Form8 = ({
  validateUsername,
  validateEmail,
  validatePassword,
  usernameError,
  emailError,
  passwordError,
}) => {
  const handleUsernameChange = (value) => {
    validateUsername(value);
  };
  const handleEmailChange = (value) => {
    validateEmail(value);
  };
  const handlePasswordChange = (value) => {
    validatePassword(value);
  };

  return (
    <>
      <Box h="300px" overflowY="auto" w="250px">
        <Box>
          <FormControl isRequired>
            <FormLabel fontWeight="normal">Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
          </FormControl>
          {usernameError && <Text fontSize={11}  color="red">{usernameError}</Text>}
        </Box>

        <Box mt={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="normal">Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </FormControl>
          {emailError && <Text fontSize={11}  color="red">{emailError}</Text>}
        </Box>

        <Box mt={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="normal">Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </FormControl>
          {passwordError && <Text fontSize={11}  color="red">{passwordError}</Text>}
        </Box>
      </Box>
    </>
  );
};

export default Form8;
