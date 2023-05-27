import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'


const UserMenu = () => {
  const { name,family, isAdmin, signOut,photoURL } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  }

  useEffect(() => {
    if (name && family && isAdmin !== undefined && photoURL) {
    setLoading(false);
    }
    }, [name, family, isAdmin, photoURL]);

  if (loading) {
    return <Spinner  position="fixed" top={4} mr={12} right={6} size="lg" />;
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
