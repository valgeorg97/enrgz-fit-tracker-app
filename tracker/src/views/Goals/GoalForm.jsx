import {Textarea,Button,FormControl,FormLabel,Input,Stack,Select} from "@chakra-ui/react";

const GoalForm = ({createGoal,goalName,setGoalName,goalNote,setGoalNote,goalFrom,setGoalFrom,goalTo,setGoalTo,goalCategory,setGoalCategory,}) => {
    return (
      <Stack
        spacing={2}
        width="260px"
        height="540px"
        border="2px"
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        borderColor="gray.50"
      >
        <FormControl>
          <FormLabel>Goal Title</FormLabel>
          <Input
            type="text"
            placeholder="Goal name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
        </FormControl>
  
        <FormControl>
          <FormLabel>Note</FormLabel>
          <Textarea
            value={goalNote}
            placeholder="Note about the goal"
            size="sm"
            onChange={(e) => setGoalNote(e.target.value)}
          />
        </FormControl>
  
        <FormControl>
          <FormLabel>Goal Category</FormLabel>
          <Select
            placeholder="Select category"
            value={goalCategory}
            onChange={(e) => setGoalCategory(e.target.value)}
          >
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
          </Select>
        </FormControl>
  
        <FormControl>
          <FormLabel>From</FormLabel>
          <Input
            type="date"
            value={goalFrom}
            onChange={(e) => setGoalFrom(e.target.value)}
          />
        </FormControl>
  
        <FormControl>
          <FormLabel>To</FormLabel>
          <Input
            mb={1}
            type="date"
            value={goalTo}
            onChange={(e) => setGoalTo(e.target.value)}
          />
        </FormControl>
  
        <Button colorScheme="teal" size="lg" onClick={createGoal}>
          Create Goal
        </Button>
      </Stack>
    );
  };

  export default GoalForm