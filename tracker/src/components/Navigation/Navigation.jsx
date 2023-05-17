import { useState, useContext } from 'react'
import { Flex, Text, IconButton, Divider, Avatar, Heading, Box, Image } from '@chakra-ui/react'
import { FiMenu, FiHome, FiCalendar, FiSettings, FiActivity } from 'react-icons/fi'
import { motion } from "framer-motion";
// import { IoPawOutline } from 'react-icons/io5'
import logo from '../../assets/logo.png'
import { FaUsers } from 'react-icons/fa'
import NavItem from './NavItem'
import { AuthContext } from "../../context/AuthContext"

const MotionBox = motion(Box);
const Navigation = () => {
    const { name, family, isAdmin } = useContext(AuthContext);

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
                    // Animation properties
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
                <NavItem link='/' navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem link='/exercises' navSize={navSize} icon={FiCalendar} title="Exercises" active />
                <NavItem link='/goals' navSize={navSize} icon={FiActivity} title="Goals" />
                <NavItem link='/users' navSize={navSize} icon={FaUsers} title="Users" />
                <NavItem link='/profile' navSize={navSize} icon={FiSettings} title="Profile" />
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
                        {/* <Heading as="h3" size="sm">{`${name} ${family}`}</Heading> */}
                        <Heading as="h3" size="sm">Pesho Burziq</Heading>
                        <Text color="gray">{isAdmin ? 'Admin' : 'User'}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navigation;