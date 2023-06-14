import { Box, Heading, Image, Text, Flex, Icon, Link } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import valentinImage from "../../assets/pic.png";
import samiImage from "../../assets/sami.jpeg";
import logo from "../../assets/logo.png";

/**
 * Renders the About component.
 */
const About = () => (
  <Box maxWidth="960px" mx="auto" p={6} bg="white" >
    <Box textAlign="center" mb={"32"}>
      <Image src={logo} alt="Team Image" maxW="230px" mx="auto" my={4} borderRadius="md" />
      <Box fontSize="sm" textAlign="center" maxW="600px" mx="auto">
        <Text fontSize="md">
          Meet us, two Junior JavaScript developers with a shared passion for fitness. Energize isn't just a fitness tracker; it's a platform that helps you manage workouts, track your goals, and even rewards your progress. Our vision? To make Energize your reliable fitness buddy, inspiring and supporting you through every step of your wellness journey. Don't just dream it, achieve it. Unleash your potential. Get Energized!
        </Text>
      </Box>
      <Heading as="h2" fontSize="2xl" my={4}>
        Creators of ENERGIZE App
      </Heading>
      <Flex justify="center" mb={4}>
        <Box maxW="300px" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={samiImage} alt="Samuil" objectFit="cover" h="300px" borderRadius="md" />
          <Heading as="h3" fontSize="xl" my={2}>Samuil Yoshkov</Heading>
          <Text fontWeight="bold" mb={4}>
            Junior JavaScript developer passionate about nature, hiking, and coding.
          </Text>
          <Heading as="h4" fontSize="md" my={2}>Contacts:</Heading>
          <Flex alignItems="center" ml={"24"} mt={5}>
            <Link href="mailto:samuilmnt@gmail.com" isExternal>
              <Icon as={FaEnvelope} boxSize={6} mr={2} />

            </Link>
            <Link href="https://www.linkedin.com/in/samuil-yoshkov-35a269278" isExternal ml={4}>
              <Icon as={FaLinkedin} boxSize={6} mr={2} />

            </Link>
          </Flex>
        </Box>
        <Box maxW="300px" mx={4} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={valentinImage} alt="Valentin" objectFit="cover" h="300px" borderRadius="md" />
          <Heading as="h3" fontSize="xl" my={2}>Valentin Georgiev</Heading>
          <Text fontWeight="bold" mb={4}>
            Junior JavaScript developer with a passion for fitness, football and traveling.
          </Text>
          <Heading as="h4" fontSize="md" my={2}>Contacts:</Heading>
          <Flex alignItems="center" ml={"24"} mt={5}>
            <Link href="mailto:valentingg1997@gmail.com" isExternal>
              <Icon as={FaEnvelope} boxSize={6} mr={2} />

            </Link>
            <Link href="https://www.linkedin.com/in/valentin-georgiev-414950160/" isExternal ml={4}>
              <Icon as={FaLinkedin} boxSize={6} mr={2} />

            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);

export default About;