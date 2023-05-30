import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import valentinImage from "../../assets/pic.png";
import samiImage from "../../assets/sami.jpg";
import logo from "../../assets/logo.png";

/**
 * About Component
 *
 * This component displays information about the development team.
 * It includes individual sections for each team member with a profile picture, name, role, description, email, and a contact button.
 * The images used in this component are imported at the beginning and then used in the JSX.
 *
 * @returns {JSX.Element} About component
 */

const About = () => (
  <Box textAlign="center" mb={"32"}>
    <Image src={logo} alt="Team Image" maxW="230px" mx="auto" my={4} borderRadius="md" />
    <Heading as="h2" fontSize="2xl" my={4}>
      Creators of ENERGIZE App
    </Heading>
    <Flex justify="center">
      <Box maxW="300px" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={samiImage} alt="Samuil" objectFit="cover" h="300px" borderRadius="md" />
        <Heading as="h3" fontSize="xl" my={2}>Samuil Yoshkov</Heading>
        <Text fontWeight="bold" mb={4}>
          Junior JavaScript developer passionate about nature, hiking, and coding.
        </Text>
        <Text fontSize="sm" mb={2}>samuilmnt@gmail.com</Text>
        <Button colorScheme="blue">Contact</Button>
      </Box>
      <Box maxW="300px" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={valentinImage} alt="Valentin" objectFit="cover" h="300px" borderRadius="md" />
        <Heading as="h3" fontSize="xl" my={2}>Valentin Georgiev</Heading>
        <Text fontWeight="bold" mb={4}>
          Junior JavaScript developer with a passion for fitness and sports.
        </Text>
        <Text fontSize="sm" mb={2}>valentingg1997@gmail.com</Text>
        <Button colorScheme="blue">Contact</Button>
      </Box>
    </Flex>
  </Box>
);

export default About;