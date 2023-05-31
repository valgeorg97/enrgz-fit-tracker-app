import { countryCodes } from "../../../../common/constants";
import { Flex, Box, Radio, RadioGroup, FormControl, FormLabel, Input, Stack,Text } from '@chakra-ui/react';
import { useState} from "react";
import FactBubble from '../../../../components/InterestingFacts/FactBubble';


const Form6 = ({handleGender,regGender,regYear,handleYear,validatePhone,phoneError}) => {
const [selectedDate, setSelectedDate] = useState(regYear);

  const handleGenderChange = (value) => {
    handleGender(value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    handleYear(event.target.value);
  };
  const handlePhoneChange = (value) => {
    validatePhone(value);
  };


    return (
      <>
        <Box h="400px" overflowY="auto">
          <FormControl isRequired>
            <FormLabel fontSize={16} fontWeight="normal">
              Please select which sex we should use to calculate your calorie
              needs:
            </FormLabel>
            <RadioGroup onChange={handleGenderChange} value={regGender}>
              <Stack spacing={2}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel fontSize={16} fontWeight="normal" >
              When were you born? (MM/DD/YYYY)
            </FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </FormControl>

<Box>
          <FormControl mt={4} isRequired>
            <FormLabel fontWeight="normal" fontSize={16}>Phone number</FormLabel>
            <Flex align="center">
              {/* <Select
                w="fit-content"
                placeholder="Country"
                onChange={(e) => handleCountryCode(e.target.value)}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.country} ({country.code})
                  </option>
                ))}
              </Select> */}
              <Input
                type="number"
                placeholder="Phone number"
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
            </Flex>
              {phoneError && <Text fontSize={12} color="red">{phoneError}</Text>}
          </FormControl>
          </Box>
          <FactBubble />
        </Box>
      </>
    );
  };

  export default Form6