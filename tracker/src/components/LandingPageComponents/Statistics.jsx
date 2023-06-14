import {Box,chakra,Flex,SimpleGrid,Stat,StatLabel,StatNumber,useColorModeValue,} from '@chakra-ui/react';
import { useState, useEffect,useContext } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { WorkoutContext } from "../../context/WorkoutContext";
import PropTypes from 'prop-types';

import { BsPerson } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import {GiStairsGoal} from 'react-icons/gi'

/**
 * Stats Card component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the stat card.
 * @param {number} props.stat - The value of the stat.
 * @param {node} props.icon - The icon to be displayed on the stat card.
 * @returns {JSX.Element} StatsCard component.
 */

function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

/**
 * Basic Statistics component.
 *
 * @component
 * @returns {JSX.Element} BasicStatistics component.
 */

export default function BasicStatistics() {
    const [userCount, setUserCount] = useState(0);
    const [goalsCount, setGoalsCount] = useState(0)
    const { sharedWorkouts } = useContext(WorkoutContext);

    useEffect(() => {
        const fetchUsers = async () => {
          const usersCollection = collection(db, 'users');
          const goalsCollection = collection(db, 'mainGoals')
          const userSnapshot = await getDocs(usersCollection);
          const mainGoalsSnapshot = await(getDocs(goalsCollection))
          setUserCount(userSnapshot.size);
          setGoalsCount(mainGoalsSnapshot.size)
        };
      
        fetchUsers();
      }, []);
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 10, sm: 12, md: 20 }} py={50}>
            <chakra.h1
                textAlign={'center'}
                fontSize={'4xl'}
                py={10}
                fontWeight={'bold'}>
                Our ENERGIZE Community is expanding, you could be a part of it!
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    title={'Users'}
                    stat={userCount}
                    icon={<BsPerson size={'3em'} />}
                />
                <StatsCard
                    title={'Workouts'}
                    stat={sharedWorkouts.length}
                    icon={<CgGym size={'3em'} />}
                />
                <StatsCard
                    title={'Goals'}
                    stat={goalsCount}
                    icon={<GiStairsGoal size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    stat: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
  };