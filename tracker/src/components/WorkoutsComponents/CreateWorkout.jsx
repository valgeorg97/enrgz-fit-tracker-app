import { useState, useContext, useEffect } from "react";
import {Button,FormControl,FormLabel,HStack,Input,ListItem,Modal,ModalBody,ModalContent,ModalHeader,ModalOverlay,NumberInput,NumberInputField,Select,Stack,UnorderedList,} from '@chakra-ui/react';
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { difficulties } from '../../common/constants';
import { db } from "../../config/firebase";
import { muscles } from '../../common/constants';
import { WorkoutContext } from "../../context/WorkoutContext";
import { API_KEY } from "../../common/constants";
import getWorkoutExercises from "../../services/workoutsService"

/**
 * CreateWorkout component.
 *
 * @component
 * @returns {JSX.Element} CreateWorkout component.
 */

const CreateWorkout = () => {
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [workout, setWorkout] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [relatedExercises, setRelatedExercises] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { userID, userDocID, name,family } = useContext(AuthContext);
  const {setWorkouts} = useContext(WorkoutContext);

  useEffect(() => {
    if (selectedMuscle !== '') {
      const fetchRelatedExercises = async () => {
        const data = await getWorkoutExercises(selectedMuscle, API_KEY);
        setRelatedExercises(data);
      };
      fetchRelatedExercises();
    }
  }, [selectedMuscle]);

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const workoutObj = {
      owner: userID,
      ownerName: name,
      ownerFamily: family,
      name: workoutName, 
      type: selectedExercise, 
      reps: reps, 
      weight: weight, 
      muscle: selectedMuscle, 
      difficulty: selectedDifficulty,
      exercises: workout
    };
    await addDoc(collection(db, `users/${userDocID}/workouts`), workoutObj);
    setWorkouts((prevWorkouts) => [...prevWorkouts, workoutObj]);
    setWorkout([]);
    setWorkoutName("");
    setSelectedExercise('');
    setReps(0);
    setWeight(0);
    setSelectedMuscle('');
    setShowModal(false);
  } catch (e) {
    console.error("Error adding workout: ", e);
  }
};

  const handleMuscleChange = (e) => {
    setSelectedMuscle(e.target.value);
  }
  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
  }
  const handleRepsChange = (valueString, valueNumber) => {
    setReps(valueNumber);
  }
  const handleWeightChange = (valueString, valueNumber) => {
    setWeight(valueNumber);
  }
  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  }

  const handleAddExercise = (e) => {
    e.preventDefault();
    setWorkout([...workout, { type: selectedExercise, reps, weight, muscle: selectedMuscle }]);
  }

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCancel = ()=> {
    setSelectedMuscle("");
    setSelectedExercise("");
    setReps(0);
    setWeight(0);
    setWorkoutName("");
    setWorkout([])
    setShowModal(false)
  }

return (
  <>
    <Button onClick={handleClick} colorScheme="blue">
      Create Workout
    </Button>

    <Modal isOpen={showModal} onClose={handleClose} size="sm">
      <ModalOverlay />
      <ModalContent width="347px">
        <ModalHeader>Create Workout</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
          <Stack w="300px" spacing={1}>
            <FormControl id="workout-name">
              <FormLabel>Workout Name</FormLabel>
              <Input value={workoutName} onChange={handleWorkoutNameChange} />
            </FormControl>

            <FormControl id="muscle">
              <FormLabel>Select a muscle group</FormLabel>
              <Select placeholder="Select a muscle group" value={selectedMuscle} onChange={handleMuscleChange}>
                {muscles.map((muscle, i) => (
                  <option key={i} value={muscle}>{muscle}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="exercise">
              <FormLabel>Select an exercise</FormLabel>
              <Select placeholder="Select an exercise" value={selectedExercise} onChange={handleExerciseChange}>
                {relatedExercises.map((exercise, i) => (
                  <option key={i} value={exercise.name}>{exercise.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="reps">
              <FormLabel>Reps</FormLabel>
              <NumberInput defaultValue={""} min={1} max={20} onChange={handleRepsChange} >
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl id="weight">
              <FormLabel>Weight (kg)</FormLabel>
              <NumberInput defaultValue={""} min={1} max={20} onChange={handleWeightChange}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            
            <FormControl id="difficulty">
              <FormLabel>Select workout difficulty level</FormLabel>
              <Select placeholder="Select a difficulty level" value={selectedDifficulty} onChange={handleDifficultyChange}>
                {difficulties.map((difficulty, i) => (
                  <option key={i} value={difficulty.value} style={{ color: difficulty.color }}>{difficulty.label}</option>
                ))}
              </Select>
            </FormControl>

            <UnorderedList>
              {workout.map((exercise, i) => (
                <ListItem ml="20px" mt="7px" key={i}>{i + 1}. {exercise.type}: {exercise.muscle} muscle, {exercise.reps} reps, {exercise.weight} kg</ListItem>
              ))}
            </UnorderedList>

            <HStack justifyContent="center">
              <Button width="400px" colorScheme='whatsapp' onClick={handleAddExercise}>Add Exercise</Button>
            </HStack>

            <HStack justifyContent="center">
              <Button type="submit" colorScheme="linkedin">Submit Workout</Button>
              <Button colorScheme="red" onClick={handleCancel}>Cancel</Button>
            </HStack>

          </Stack>
        </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
);
};

export default CreateWorkout;