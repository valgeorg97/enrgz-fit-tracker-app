import React, { useState } from "react";
import { Box, Button, VStack, Divider, Heading, Text, Image, Flex} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import profileIcon from "../assets/fitnessIcon.png"
import goalIcon from "../assets/goalIcon.png"
import progressIcon from "../assets/pace.png"

const steps = [
    {
        title: "Create Profile",
        content: "When you create a profile you will add your name, age, height, weight, gender and fitness goal. We'll then calculate the daily calories you need to consume in order to accomplish your fitness goal.",
        bgImage: "image/path/here",
        icon: profileIcon,
    },
    {
        title: "Create Workouts and Goals",
        content: "You can create workouts and goals or check workouts from different users.",
        bgImage: "image/path/here",
        icon: goalIcon,
    },
    {
        title: "Move at Your Own Pace",
        content: "Every time you have a glass of water, eat food, or engage in any activity, you can log it in to Energize and track your progress towards your fitness goals. You have the freedom to move at your own pace, without any pressure from us.",
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
        <Box w="50%" maxWidth={"50%"} m="auto" borderWidth="2px" borderColor="grey.200" boxShadow="lg" borderRadius={40} h={400}>
            <VStack spacing={8} align="center" mt={6}>
                <Heading size="lg" textAlign="center" borderBottom={"4px"} borderBottomColor={"orange"}>How It Works?</Heading>
                <Divider orientation="horizontal" />
                <Flex w="100%" justify="space-between" align="center">
                    
                    <Button
                        aria-label="left-arrow"
                        variant="ghost"
                        position="left"
                        transform={'translate(0%, -50%)'}
                        zIndex={2}
                        onClick={handleBack}
                        isHidden={activeStep === 0}
                    >
                        <BiLeftArrowAlt size="25px" />
                    </Button>
                    <Flex direction="row" maxW={"fit-content"} w="60%" h="130px" justify="space-between" align="center" mt={10}>
                        <Box bgImage={`url(${steps[activeStep].bgImage})`} bgSize="cover" bgPos="center" p={3}>
                            <Flex direction="column" h="100%" justify="space-between" bg="whiteAlpha.700" p={2}>
                                <VStack spacing={2} align="start">
                                    <Heading size="md">{`Step ${activeStep + 1}: ${steps[activeStep].title}`}</Heading>
                                    <Text>{steps[activeStep].content}</Text>
                                </VStack>
                                {activeStep === steps.length - 1 &&
                                    <Button onClick={onGetStartedClick} alignSelf="flex-end" h={10} w={36} colorScheme={'orange'}
                                    bg={'orange.400'}
                                    _hover={{ bg: 'orange.500' }}>
                                        Get Started
                                    </Button>
                                }
                            </Flex>
                        </Box>
                        <Image src={steps[activeStep].icon} boxSize="150px"/>
                    </Flex>
                    <Button
                        aria-label="right-arrow"
                        variant="ghost"
                        position="right"
                        transform={'translate(0%, -50%)'}
                        zIndex={2}
                        onClick={handleNext}
                        isHidden={activeStep === steps.length - 1}
                    >
                        <BiRightArrowAlt size="25px" />
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};

export default HowItWorks;