import { Box,FormControl, FormLabel, Input} from '@chakra-ui/react';


const Form7 = ({handleHeight,handleWeight,handleGoalWeight}) => {
    return (
      <>
        <Box h="400px" overflowY="auto" w="300px">
          <FormControl isRequired>
            <FormLabel fontSize={18} fontWeight="normal">How tall are you?</FormLabel>
            <Input type="number" placeholder="Height" onChange={(e) => handleHeight(e.target.value)} />
            {/* <RadioGroup mt={2}> 
              <Stack spacing={2}>
                <Radio value="inches">Inches</Radio>
                <Radio value="centimeters">Centimeters</Radio>
              </Stack>
            </RadioGroup> */}
          </FormControl>
  
          <FormControl mt={4} isRequired>
            <FormLabel fontSize={18} fontWeight="normal">How much do you weigh?</FormLabel>
            <Input type="number" placeholder="Current weight" onChange={(e) => handleWeight(e.target.value)} />
            {/* <Select mt={2} placeholder="Select unit">
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </Select> */}
          </FormControl>
  
          <FormControl mt={4} isRequired>
            <FormLabel fontSize={18} fontWeight="normal">What's your goal weight?</FormLabel>
            <Input type="number" placeholder="Goal weight" onChange={(e) => handleGoalWeight(e.target.value)} />
          </FormControl>
        </Box>
      </>
    );
  };

  export default Form7