import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';


const Form4 = () => {
    return (
      <>
        <Box h="320px" overflowY="auto">
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Great! You’ve just taken a big step on your journey.
          </Heading>
          <Text align={'center'} mt={4}>
            Did you know that tracking your food is a scientifically proven method to being successful? It’s called “self-monitoring” and the more consistent you are, the more likely you are to hit your goals.
          </Text>
          <Text align={'center'} mt={4}>
            Now, let’s talk about your goal to gain weight.
          </Text>
        </Box>
      </>
    );
  };
export default Form4