import { Button, Stack, FormControl,HStack, FormLabel, Input, Select, NumberInput, NumberInputField, UnorderedList, ListItem } from '@chakra-ui/react';
import { useState, useContext, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { difficulties } from '../../common/constants';
import { db } from "../../services/firebase";

const muscles = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'];

const CreateWorkout = ({ showForm, setShowForm, onAddWorkout }) => {
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [workout, setWorkout] = useState([]);
  const [workoutName, setWorkoutName] = useState('');
  const [relatedExercises, setRelatedExercises] = useState([]);
  const { userID, userDocID } = useContext(AuthContext);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    if (selectedMuscle !== '') {
      const fetchRelatedExercises = async () => {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`, {
          method: 'GET',
          headers: { 'X-Api-Key': 'AfAWwp+nw89/859EX9kTYA==FXcxQwZhBYqX3BIK' },
        });
        const data = await response.json();
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
      name: workoutName, 
      type: selectedExercise, 
      reps: reps, 
      weight: weight, 
      muscle: selectedMuscle, 
      difficulty: selectedDifficulty,
      exercises: workout // Added this line
    };
    await addDoc(collection(db, `users/${userDocID}/workouts`), workoutObj);
    setWorkout([]);
    setSelectedExercise('');
    setReps(0);
    setWeight(0);
    setSelectedMuscle('');
    setShowForm(false);
    onAddWorkout(workoutObj);
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
    setShowForm(true);
  }

  const handleCancel = ()=> {
    setSelectedMuscle("");
    setSelectedExercise("");
    setReps(0);
    setWeight(0);
    setWorkoutName("");
    setWorkout([])
    setShowForm(false);
  }

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
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
      ) : (
        <Button onClick={handleClick} colorScheme="blue">Create Workout</Button>
      )}
    </>
  );
}

export default CreateWorkout;