import { Box,Heading,Text } from '@chakra-ui/react';

const Form4 = () => {
    return (
      <>
        <Box h="320px" overflowY="auto">
          <Heading w="100%" fontSize={26} textAlign={'center'} fontWeight="normal" mb="2%">
            Great! You’ve just taken a big step on your journey.
          </Heading>
          <Text align={'center'} mt={8}>
            Did you know that tracking your food is a scientifically proven method to being successful? It’s called “self-monitoring” and the more consistent you are, the more likely you are to hit your goals.
          </Text>
          <Text align={'center'} mt={10}>
            Now, let’s talk about your goal.
          </Text>
        </Box>
      </>
    );
  };
export default Form4