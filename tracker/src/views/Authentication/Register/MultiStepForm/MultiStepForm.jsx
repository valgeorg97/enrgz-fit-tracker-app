import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do form submission task here
    console.log(formData);
  };

  const Step1 = () => (
    <Box>
      <FormLabel>First and Last Name</FormLabel>
      <Input
        placeholder="Your name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Button mt={4} onClick={nextStep}>
        Next
      </Button>
    </Box>
  );

  const Step2 = () => (
    <Box>
      <FormLabel>Email</FormLabel>
      <Input
        placeholder="Your email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Button mt={4} onClick={prevStep}>
        Back
      </Button>
      <Button mt={4} onClick={nextStep}>
        Next
      </Button>
    </Box>
  );

  const Step3 = () => (
    <Box as="form" onSubmit={handleSubmit}>
      <FormLabel>Password</FormLabel>
      <Input
        placeholder="Your password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button mt={4} onClick={prevStep}>
        Back
      </Button>
      <Button mt={4} type="submit">
        Submit
      </Button>
    </Box>
  );

  const steps = [Step1, Step2, Step3];

  return (
    <Stack spacing={6}>
      {React.createElement(steps[step - 1])}
    </Stack>
  );
}

export default MultiStepForm;