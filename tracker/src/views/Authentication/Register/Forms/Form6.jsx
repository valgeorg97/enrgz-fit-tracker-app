import { countryCodes } from "../../../../common/constants";
import { Flex, Box, Progress, Image, Radio, RadioGroup, FormControl, FormLabel, Input, InputGroup, Button, Heading, Stack, useColorModeValue, Link, ButtonGroup, SimpleGrid, InputRightElement, FormHelperText, Select, InputLeftAddon, Textarea, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';


const Form6 = ({handleGender,regGender,regYear,handleYear,handlePhone, handleCountryCode}) => {

  const handleGenderChange = (value) => {
    handleGender(value);
  };
  const handleDateChange = (value) => {
    handleYear(value);
  };


    return (
      <>
        <Box h="400px" overflowY="auto">
          <FormControl>
            <FormLabel fontWeight="normal">
              Please select which sex we should use to calculate your calorie
              needs:
            </FormLabel>
            <RadioGroup
              onChange={handleGenderChange}
              value={regGender}
            >
              <Stack spacing={2}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
  
          <FormControl mt={4}>
            <FormLabel fontWeight="normal">
              When were you born? (MM/DD/YYYY)
            </FormLabel>
            <DatePicker
              dateFormat="MM/dd/yyyy"
              selected={regYear}
              onChange={handleDateChange}
              placeholderText="MM/DD/YYYY"
              yearRange="1900:2023"
            />
          </FormControl>
  
          <FormControl mt={4}>
            <FormLabel fontWeight="normal">Phone number</FormLabel>
            <Flex align="center">
              <Select
                w="fit-content"
                placeholder="Country"
                onChange={(e) => handleCountryCode(e.target.value)}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country} ({country.code})
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                placeholder="Phone number"
                ml={2}
                onChange={(e) => handlePhone(e.target.value)}
              />
            </Flex>
          </FormControl>
        </Box>
      </>
    );
  };

  export default Form6