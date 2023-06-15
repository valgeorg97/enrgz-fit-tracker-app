import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Box, Heading, Text, Flex, Icon, Tooltip, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { EnergizeGameContext } from '../../context/EnergizeGameContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import { MdFlashOn } from 'react-icons/md';
import ThemeButton from "../ThemeButton/ColorModeButton";
import { useColorMode } from "@chakra-ui/react";



/**
 * UserMenu component.
 *
 * @component
 * @returns {JSX.Element} UserMenu component.
 */

const UserMenu = () => {
  const { name, family, isAdmin, signOut, photoURL } = useContext(AuthContext);
  const { energizePoints } = useContext(EnergizeGameContext)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const bg = (colorMode) === "dark" ? "gray.800" : "white";


  const handleSignOut = () => {
    signOut();
  }

  useEffect(() => {
    if (name && family && isAdmin !== undefined && photoURL) {
      setLoading(false);
    }
  }, [name, family, isAdmin, photoURL]);

  if (loading) {
    return <Spinner position="fixed" top={4} mr={12} right={6} size="lg" />;
  }

  return (
    <Flex position="fixed" right={0} backgroundColor={bg} w={"1675px"} zIndex={"sticky"} borderRadius={"md"} h={"70px"}>
      <Box ml="1430px" paddingTop={"2"}>
        <Heading as="h3" size="sm">{`${name} ${family}`}</Heading>
        <Flex color="gray" alignItems="center">
          <Tooltip hasArrow arrowSize={10} bg="orange.500" borderRadius={10} label="Energize points! You can earn Energize points by completing your goals. Click to learn more." fontSize="md">
            <Button display="flex" flexDirection="row" variant="unstyled" onClick={() => navigate('/energizeConquest')}>
              <Icon as={MdFlashOn} boxSize="4" color="orange.500" />
              <Text ml={1}>{energizePoints}</Text>
            </Button>
          </Tooltip>
          <Text textAlign="right">{isAdmin ? '| Admin' : '| User'}</Text>
        </Flex>
        <ThemeButton />
      </Box>
      <Menu>
        <MenuButton ml={"2"} mt={1} as={Avatar} size="md" src={photoURL} _hover={{ cursor: 'pointer' }}>
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