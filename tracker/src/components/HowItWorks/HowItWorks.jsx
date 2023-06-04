import React, { useState } from "react";
import { Box, Button, VStack, Divider, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import profileIcon from "../../assets/fitnessIcon.png"
import goalIcon from "../../assets/goalIcon.png"
import progressIcon from "../../assets/pace.png"
import profileGirlIcon from "../../assets/177687.png"
import leadboard from "../../assets/leadboard.png"

const steps = [
    {
        title: "Create Profile",
        content: "In our fitness tracker app, set up your unique profile by providing key details such as name, age, height, weight, gender, and fitness goals. Based on this information, our sophisticated algorithm calculates your daily caloric needs, aligning them with your fitness objectives for a targeted and efficient approach.",
        bgImage: "image/path/here",
        icon: profileIcon,
        icon2: profileGirlIcon
    },
    {
        title: "Create Workouts and Goals",
        content: "Harness the power of our fitness tracker app to effortlessly create, manage, and track your unique fitness goals and workout routines. With the added feature of exploring and learning from the workout regimes of others, enhance your fitness journey and find new inspiration within our vibrant user community.",
        bgImage: "image/path/here",
        icon: goalIcon,
    },
    {
        title: "Participate in Energize Conquest",
        content: "As you work towards achieving your fitness goals, earn points and climb the ranks in our Energize community through the Energize Conquest game. Each completed goal translates into points, pushing you higher in our leaderboard. Challenge yourself, make progress, and have fun as you become a fitness conqueror.",
        bgImage: "image/path/here",
        icon: leadboard,
    },
    {
        title: "Embrace Your Journey, At Your Own Speed",
        content: "With Energize, our fitness tracker app, you can seamlessly log activities - from hydration to meals to workouts. These records allow you to track progress towards your fitness goals. Remember, this journey is uniquely yours; progress at your own pace, with no imposed constraints.",
        bgImage: "image/path/here",
        icon: progressIcon,
    },
];

const HowItWorks = ({ onGetStartedClick }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep !== steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep !== 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    return (
        <Box w="100%" maxWidth="70%" m="auto" borderWidth="2px" borderColor="grey.200" boxShadow="lg" borderRadius={40} h={400}>
            <VStack spacing={8} align="center" mt={6}>
                <Heading size="lg" textAlign="center" borderBottom={"4px"} borderBottomColor={"orange"}>
                    How It Works?
                </Heading>
                <Divider orientation="horizontal" />
                <Flex direction="column" justify="space-between" w="100%" h="100%">
                    <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        flexWrap="wrap"
                        flexGrow={1}
                        flexBasis={0}
                    >
                        {activeStep !== 0 && (
                            <Button
                                aria-label="left-arrow"
                                variant="ghost"
                                position="left"
                                transform={"translate(0%, -50%)"}
                                zIndex={2}
                                onClick={handleBack}
                            >
                                <BiLeftArrowAlt size="25px" />
                            </Button>
                        )}
                        <Flex
                            direction="row"
                            maxW={"container.xl"}
                            w="100%"
                            h="130px"
                            justify="center"
                            alignItems="center"
                            mt={10}
                            flexGrow={1}
                            flexBasis={0}
                        >
                            <Box bgImage={`url(${steps[activeStep].bgImage})`} bgSize="cover" bgPos="center" p={3} w="60%">
                                <Flex
                                    direction="column"
                                    h="100%"
                                    justify="space-between"
                                    bg="whiteAlpha.700"
                                    p={1}
                                    width="100%"
                                    overflow="auto"
                                    minH="100px"
                                    maxH={"-moz-fit-content"}
                                    maxW={"80%"}
                                    ml={20}
                                >
                                    <VStack spacing={2} align="start">
                                        <Heading size="md">{`Step ${activeStep + 1}: ${steps[activeStep].title}`}</Heading>
                                        <Text>{steps[activeStep].content}</Text>
                                    </VStack>
                                </Flex>
                            </Box>
                            <Box w="40%">
                                <Flex direction="row" ml={"10"}>
                                    <Image src={steps[activeStep].icon} boxSize="45%" objectFit="contain" ml={0} />
                                    {steps[activeStep].icon2 && (
                                        <Image src={steps[activeStep].icon2} boxSize="45%" objectFit="contain" ml={-10} />
                                    )}
                                </Flex>
                            </Box>
                        </Flex>
                        {activeStep !== steps.length - 1 && (
                            <Button
                                aria-label="right-arrow"
                                variant="ghost"
                                position="right"
                                transform={"translate(0%, -50%)"}
                                zIndex={2}
                                onClick={handleNext}
                            >
                                <BiRightArrowAlt size="25px" />
                            </Button>
                        )}
                    </Flex>
                    {activeStep === steps.length - 1 && (
                        <Button
                            onClick={onGetStartedClick}
                            alignSelf="center"
                            h={10}
                            w={36}
                            colorScheme={"orange"}
                            bg={"orange.400"}
                            _hover={{ bg: "orange.500" }}
                            top={10}
                            // mr={5}
                            // right={4}
                            mt={2}
                        >
                            Get Started
                        </Button>
                    )}
                </Flex>
            </VStack>
        </Box>
    );
};

export default HowItWorks;