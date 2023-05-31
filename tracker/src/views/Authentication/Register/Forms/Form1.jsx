import { Box, Heading, Text } from '@chakra-ui/react';
import FactBubble from '../../../../components/InterestingFacts/FactBubble';

const Form1 = () => {
    return (
        <>
            <Box h="200px" overflowY="auto">
                <Heading size="xl" w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Welcome!
                </Heading>
                <Text mt="10" fontSize="21px">
                    Let’s customize <strong>ENERGIZE</strong> for your goals.
                </Text>
                <FactBubble/>
            </Box>
        </>
    );
};

export default Form1
