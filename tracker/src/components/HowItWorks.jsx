import React, { useState } from "react";
import { Box, Button, VStack, HStack, Divider, Heading, Text } from "@chakra-ui/react";

const steps = [
    {
        title: "Create Profile",
        content: "When you create a profile, add your name, age, height, weight, gender, and fitness goal. We'll create the daily calories that you need to take to accomplish your goal.",
    },
    {
        title: "Create Workouts and Goals",
        content: "You can create workouts and goals or check workouts from different users.",
    },
    {
        title: "Move at Your Own Pace",
        content: "Every time you go on a walk, have a glass of water, or just get a good night's rest - just log it in and see how you progress towards your goals. You have all the power to move at your own pace. No rush from us.",
    },
];

const HowItWorks = ({ onGetStartedClick }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <VStack spacing={8} align="stretch" mt={20}>
            <Heading size="2xl" textAlign="center">How It Works</Heading>
            <Divider orientation="horizontal" />
            <HStack spacing={5}>
                <Box flex="1">
                    <Heading size="lg">{`Step ${activeStep + 1}`}</Heading>
                </Box>
                <VStack flex="3" spacing={4}>
                    <Heading size="md">{steps[activeStep].title}</Heading>
                    <Text>{steps[activeStep].content}</Text>
                    <HStack justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        <Button onClick={activeStep === steps.length - 1 ? onGetStartedClick : handleNext}>
                            {activeStep === steps.length - 1 ? "Get Started" : "Continue"}
                        </Button>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default HowItWorks;