import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const UserMenu = () => {
  const { name,family, isAdmin, signOut,photoURL } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  }

  return (
    <Flex position="fixed" top={4} mr={12} right={6}>
      <Box mr={3}>
        <Heading as="h3" size="sm">{`${name} ${family}`}</Heading>
        <Text textAlign="right" color="gray">{isAdmin ? 'Admin' : 'User'}</Text>
      </Box>
      <Menu>
        <MenuButton mt={1} as={Avatar} size="sm" src={photoURL} _hover={{cursor: 'pointer'}}>
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default UserMenu;
