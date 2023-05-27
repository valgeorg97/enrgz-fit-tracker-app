import { useState,useEffect } from 'react'
import { Flex,IconButton,Box, Image} from '@chakra-ui/react'
import { FiMenu, FiHome } from 'react-icons/fi'
import { motion } from "framer-motion";
import { GiRayGun, GiStairsGoal, GiWeightLiftingUp } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { useColorModeValue,useColorMode } from "@chakra-ui/react";
import logo from '../../assets/logo.png'
import NavItem from './NavItem'

const MotionBox = motion(Box);

const Navigation = ({colorMode}) => {
    const location = useLocation();
    const navigate = useNavigate()
    const [navSize, changeNavSize] = useState("large")

    const bg = (colorMode) === "dark" ? "gray.600" : "white";


    return (
        <Flex
            pos="sticky"
            width="100%"
            left="5"
            h="67vh"
            marginTop="3.5vh"
            boxShadow="0 10px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            bgColor={bg}
        >
            <Flex
                p="5px"
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
                    cursor="pointer"
                    onClick={() => navigate('/dashboard')}
                />
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: "gray.200" }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem link='/dashboard' navSize={navSize} icon={FiHome} title="Dashboard" active={location.pathname === '/dashboard'} />
                <NavItem link='/workouts' navSize={navSize} icon={GiWeightLiftingUp} title="Workouts" active={location.pathname === '/workouts'} />
                <NavItem link='/goals' navSize={navSize} icon={GiStairsGoal} title="Goals" active={location.pathname === '/goals'} />
                <NavItem link='/community' navSize={navSize} icon={FaUsers} title="Community" active={location.pathname === '/community'} />
                <NavItem link='/about' navSize={navSize} icon={AiOutlineInfoCircle} title="About" active={location.pathname === '/about'} />
                <NavItem link='/profile' navSize={navSize} icon={CgProfile} title="Profile" active={location.pathname === '/profile'} />
                
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
            </Flex>
        </Flex>
    )
}

export default Navigation;