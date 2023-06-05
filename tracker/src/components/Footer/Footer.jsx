import {Box,Container,Text,Image,Flex,} from '@chakra-ui/react';
import logo from "../../assets/logo.png"

const Logo = (props) => {
return (
  <Box {...props}>
    <Image src={logo} alt="logo" />
  </Box>
);
};

export default function SmallWithLogoLeft() {
return (
  <Box>
    <Container
      maxW={'6xl'}
      py={4}
      direction={{ base: 'column', md: 'row' }}
      spacing={8}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
      mt={300}
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