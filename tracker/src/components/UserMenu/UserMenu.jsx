import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex, Image } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { EnergizeGameContext } from '../../context/EnergizeGameContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import lightning from '../../assets/light.png'


const UserMenu = () => {
  const { name,family, isAdmin, signOut,photoURL } = useContext(AuthContext);
  const {energizePoints} = useContext(EnergizeGameContext)
  const [loading, setLoading] = useState(true);
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
        <Flex color="gray" alignItems="center">
          <Image src={lightning} boxSize="20px" alt="Lightning" mr={1} />
          <Text mr={2}>{energizePoints}</Text>
          <Text textAlign="right">{isAdmin ? '| Admin' : '| User'}</Text>
        </Flex>
      </Box>
      <Menu>
        <MenuButton mt={1} as={Avatar} size="md" src={photoURL} _hover={{cursor: 'pointer'}}>
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