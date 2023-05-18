import { useState, useContext } from 'react'
import { Flex, Text, IconButton, Divider, Avatar, Heading, Box, Image } from '@chakra-ui/react'
import { FiMenu, FiHome } from 'react-icons/fi'
import { motion } from "framer-motion";
import { GiStairsGoal, GiWeightLiftingUp } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'
import { AuthContext } from "../../context/AuthContext"
import { useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png'
import NavItem from './NavItem'

const MotionBox = motion(Box);
const Navigation = () => {
    const { name, isAdmin } = useContext(AuthContext);
    const location = useLocation();

    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <MotionBox
                    as={Image}
                    src={logo}
                    alt="Logo"
                    w="150px"
                    h="auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem link='/dashboard' navSize={navSize} icon={FiHome} title="Dashboard" active={location.pathname === '/dashboard'} />
                <NavItem link='/exercises' navSize={navSize} icon={GiWeightLiftingUp} title="Exercises" active={location.pathname === '/exercises'} />
                <NavItem link='/goals' navSize={navSize} icon={GiStairsGoal} title="Goals" active={location.pathname === '/goals'} />
                <NavItem link='/community' navSize={navSize} icon={FaUsers} title="Community" active={location.pathname === '/community'} />
                <NavItem link='/profile' navSize={navSize} icon={CgProfile} title="Profile" active={location.pathname === '/profile'} />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{name}</Heading>
                        <Text color="gray">{isAdmin ? 'Admin' : 'User'}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navigation;