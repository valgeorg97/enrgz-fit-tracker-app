import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Avatar } from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://example.com/avatar.jpg',
  });

  const handleChangeName = (event) => {
    setUser((prevUser) => ({ ...prevUser, name: event.target.value }));
  };

  const handleChangeEmail = (event) => {
    setUser((prevUser) => ({ ...prevUser, email: event.target.value }));
  };

  const handleChangeAvatar = (event) => {
    setUser((prevUser) => ({ ...prevUser, avatar: event.target.value }));
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Heading size="md">Profile</Heading>

        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={user.name} onChange={handleChangeName} />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={user.email} onChange={handleChangeEmail} />
        </FormControl>

        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input type="text" value={user.avatar} onChange={handleChangeAvatar} />
        </FormControl>

        <Avatar size="xl" name={user.name} src={user.avatar} />

        <Button colorScheme="blue">Save Changes</Button>
      </VStack>
    </Box>
  );
};

export default Profile;
