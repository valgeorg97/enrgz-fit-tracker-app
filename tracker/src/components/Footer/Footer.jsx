import {Box,Container,Text,Image,Flex,} from '@chakra-ui/react';
import logo from "../../assets/logo.png"

/**
 * Logo Component.
 * 
 * This is a functional component that displays the application's logo image.
 * 
 * @component
 * @param {object} props - Component props
 * @example
 * return (
 *   <Logo boxSize="100px" mt={10}/>
 * )
 */

const Logo = (props) => {
return (
  <Box {...props}>
    <Image src={logo} alt="logo" />
  </Box>
);
};

/**
 * SmallWithLogoLeft Component.
 * 
 * This is a functional component that displays a small footer with the logo aligned to the left.
 * 
 * @component
 * @example
 * return (
 *   <SmallWithLogoLeft />
 * )
 */

export default function SmallWithLogoLeft() {
return (
  <Box>
    <Container
      mt={"300px"}
      mb={-80}
      >
      <Flex align="center" justify="center">
        <Logo boxSize="100px" mt={10}/>
        <Text ml={4}>© 2023 ENERGIZE. All rights reserved</Text>
      </Flex>
    </Container>
  </Box>
);
}