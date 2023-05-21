// import { useState } from 'react';
// import { Box, Heading, Text, Tooltip } from '@chakra-ui/react';

// const Exercise = ({ exercise }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <Text>{exercise.type}</Text>
//       <Text>{exercise.muscle}</Text>
//       <Text>{exercise.reps} reps</Text>
//       <Text>{exercise.weight} kg</Text>
//       {isHovered && (
//         <Tooltip label={exercise.instructions} bg="white" color="black" placement="right-start">
//           <Text>Hover for instructions</Text>
//         </Tooltip>
//       )}
//     </Box>
//   );
// };

// const SingleWorkoutView = ({ workout }) => {
//  return (
//     <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} mb={5}>
//       <Heading as="h3" size="lg" mb={3}>
//         {workout.name}
//       </Heading>
//       <Text fontSize="md" mb={2}>Type: {workout.type}</Text>
//       <Text fontSize="md" mb={2}>Muscle: {workout.muscle}</Text>
//       <Text fontSize="md" mb={2}>Equipment: {workout.equipment}</Text>
//       <Text fontSize="md" mb={2}>Difficulty: {workout.difficulty}</Text>
//       <Text fontSize="md" mb={2}>Instructions: {workout.instructions}</Text>
//     </Box>
//   );
// };

// export default SingleWorkoutView;