import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    useColorModeValue
} from '@chakra-ui/react';
import PropTypes from 'prop-types';


import Blob from '../../components/LandingPageComponents/Blob';
import image from "../../assets/runnin.jpg";

/**
 * CallToActionWithVideo component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {function} props.onGetStartedClick - The function to be called when the "Get started" button is clicked.
 * @returns {JSX.Element} CallToActionWithVideo component.
 */

const CallToActionWithVideo = ({ onGetStartedClick }) => {
    return (
        <Container maxW={'7xl'} mb={-15}>
            <Flex
                width="100%"
                justify="space-between"
                direction={{ base: 'column', md: 'row' }}
            >
            </Flex>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 10, md: 20 }}
                mt={50}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'orange.400',
                                zIndex: -1,
                            }}>
                            Get Fit,
                        </Text>
                        <br />
                        <Text as={'span'} color={'orange.400'}>
                            Stay Energized!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        ENERGIZE is a comprehensive fitness tracker app that allows you to monitor your workouts, categorize your fitness activities, and even sync your progress in the cloud for access anywhere. Elevate your fitness journey for free with Energize!
                    </Text>
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={{ base: 'column', sm: 'row' }}>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}
                            onClick={onGetStartedClick}
                        >
                            Get started
                        </Button>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Blob
                        w={'150%'}
                        h={'150%'}
                        position={'absolute'}
                        top={'-20%'}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue('red.50', 'orange.400')}
                    />
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}
                    >
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={image}
                        />
                    </Box>
                </Flex>
            </Stack>
        </Container>
    );
}

CallToActionWithVideo.propTypes = {
    onGetStartedClick: PropTypes.func.isRequired,
  };

export default CallToActionWithVideo;