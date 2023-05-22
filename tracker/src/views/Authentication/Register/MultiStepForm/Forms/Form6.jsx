import React from 'react';
import {Box, FormControl, Input, RadioGroup, Stack, Radio, Flex, FormLabel, Select} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

const Form6 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    // Add more country codes as needed
  ];
    return (
      <>
      <Box h="400px" overflowY="auto">
        <FormControl>
          <FormLabel fontWeight="normal">Please select which sex we should use to calculate your calorie needs:</FormLabel>
          <RadioGroup>
            <Stack spacing={2}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl mt={4}>
  <FormLabel fontWeight="normal">When were you born? (MM/DD/YYYY)</FormLabel>
  <DatePicker
    dateFormat="MM/dd/yyyy"
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
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
      onChange={(e) => handleCountryCodeChange(e.target.value)}
    >
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.country} ({country.code})
        </option>
      ))}
    </Select>
    <Input type="text" placeholder="Phone number" ml={2} />
  </Flex>
</FormControl>
</Box>
      </>
    );
  };

  export default Form6;