import React from 'react'
import { useContext } from 'react'
import { EnergizeGameContext } from '../../context/EnergizeGameContext'
import { Box } from '@chakra-ui/react';

const EnergizeGame = () => {
    const { energizePoints, setEnergizePoints } = useContext(EnergizeGameContext)

    return (
        <Box 
            p={5} 
            maxWidth="600px" 
            color="black"
            backgroundColor="gray.100"
            borderRadius="md"
            margin="auto"
            textAlign="center"
        >
            <h1>Energize Conquest - Your Fitness Adventure!</h1>
            <p>
                Embark on a thrilling journey of self-improvement and healthy living with Energize Conquest. It's not just a fitness tracking app; it's a game, a challenge, and a global community, all rolled into one.
            </p>
            <p>
                Unlock Your Potential: Energize Conquest transforms your fitness goals into a fun, engaging game. By tracking your fitness activities, calorie and water intake, the game rewards you with Energize points. Every goal you meet, every milestone you achieve, adds to your points.
            </p>
            <p>
                Energize Community Leaderboard: Stand tall in the global community by topping the leaderboard. All users are ranked based on their Energize points. Check where you stand, compete with friends, and get inspired by the top achievers.
            </p>
            <p>
                Earning Points: Each activity you complete gets you closer to the top.
                - Meet your daily water intake goal: Earn 3 points
                - Reach your daily calorie intake goal: Earn 5 points
                - Finish a workout: Earn points based on difficulty (Easy - 3, Medium - 4, Hard - 5)
                - Achieve a fitness goal: Again, earn points based on difficulty (Easy - 3, Medium - 4, Hard - 5)
            </p>
            <p>
                Energize Conquest is more than a game - it's a lifestyle, an exciting journey towards a fitter, healthier you. Are you ready to conquer your goals and lead the conquest?
            </p>
        </Box>
    );
}

export default EnergizeGame;