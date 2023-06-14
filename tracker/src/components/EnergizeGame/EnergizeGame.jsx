import { Box, Text, Heading, Link } from '@chakra-ui/react';

/**
 * EnergizeGame Component.
 * 
 * This is a functional component that provides the user with an overview of the Energize Conquest game, 
 * how to earn points, leaderboard information, and more.
 * 
 * @component
 * @example
 * return (
 *   <EnergizeGame />
 * )
 */

const EnergizeGame = () => {

    return (
        <Box
            p={5}
            maxWidth="600px"
            color="black"
            backgroundColor="gray.100"
            borderRadius="md"
            margin="auto"
            textAlign="center"
            mt={"10"}
        >
            <Heading as="h1" mb="4">Energize Conquest - Your Fitness Adventure!</Heading>
            <Text mb="4">
                Embark on a thrilling journey of self-improvement and healthy living with Energize Conquest. It's not just a fitness tracking app; it's a game, a challenge, and a global community, all rolled into one.
            </Text>
            <Text mb="4" fontWeight="bold">
                Unlock Your Potential:
            </Text>
            <Text mb="4">
                Energize Conquest transforms your fitness goals into a fun, engaging game. By tracking your fitness activities, calorie and water intake, the game rewards you with Energize points. Every goal you meet, every milestone you achieve, adds to your points.
            </Text>
            <Text mb="4" fontWeight="bold">
                Energize Community Leaderboard:
            </Text>
            <Text mb="4">
                Stand tall in the global <Link color="blue.500" href="/community">community</Link> by topping the leaderboard. All users are ranked based on their Energize points. Check where you stand, compete with friends, and get inspired by the top achievers.
            </Text>
            <Text mb="4" fontWeight="bold">
                Earning Points:
            </Text>
            <Box mb="4">
                <Box mb="3">
                Each activity you complete gets you closer to the top:
                </Box>
                <Box as="div">
                    - Meet your daily water intake goal: Earn 3 points
                </Box>
                <Box as="div">
                    - Reach your calorie intake goal: Earn 5 points! Note, these points are awarded when you reach your calorie goal and continue up to 200 calories above it. Beyond that, well, it's time to hit the treadmill!
                </Box>
                <Box as="div">
                    - Finish a workout: Earn 5 points
                </Box>
                <Box as="div">
                    - Achieve a fitness goal: Earn 5 points
                </Box>
            </Box>
            <Text fontWeight={"bold"}>
                Energize Conquest is more than a game - it's a lifestyle, an exciting journey towards a fitter, healthier you. Are you ready to conquer your goals and lead the conquest?
            </Text>
        </Box>
    );
}

export default EnergizeGame;