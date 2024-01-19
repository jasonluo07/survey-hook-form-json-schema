import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const formDataSchema = yup
  .object({
    firstName: yup.string().required('First Name is required.'),
    lastName: yup.string().nullable(),
    age: yup
      .number()
      .positive()
      .integer('Age must be an integer.')
      .min(18, 'Age must be at least 18')
      .max(99, 'Age must be less than 99')
      .transform(value => (isNaN(value) ? undefined : value)) // convert empty string to undefined
      .required('Age is required.'),
    gender: yup
      .mixed<GenderEnum>()
      .transform(value => (value === '' ? undefined : value)) // convert empty string to undefined
      .required('Gender is required.'),
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    isDeveloper: yup.boolean().required('Please select one.'),
  })
  .required();

type FormData = yup.InferType<typeof formDataSchema>;

const HookForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formDataSchema),
  });

  const onSubmit = handleSubmit(data => {
    console.log('data', data);
    return new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2));
        resolve();
      }, 1000);
    });
  });

  return (
    <Box w={600} px={8} py={4} m="20px auto" bg="gray.100" borderRadius="md">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Chakra Hook Form
      </Heading>
      <Box as="p" textAlign="center" mb={4}>
        Chakra UI + React Hook Form + Yup +TypeScript + JSON Schema
      </Box>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" placeholder="Enter Your First Name" {...register('firstName')} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" placeholder="Enter Your Last Name" {...register('lastName')} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.age}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <NumberInput min={18} max={99}>
            <NumberInputField id="age" placeholder="Enter Your Age" {...register('age')} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select id="gender" placeholder="Select" {...register('gender')}>
            {Object.values(GenderEnum).map(value => (
              <option key={value} value={value}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" placeholder="email" {...register('email')} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.isDeveloper}>
          <FormLabel htmlFor="isDeveloper">Are you a developer?</FormLabel>
          <RadioGroup>
            <Stack direction="row">
              <Radio {...register('isDeveloper')} value="true">
                Yes
              </Radio>
              <Radio {...register('isDeveloper')} value="false">
                No
              </Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{errors.isDeveloper && errors.isDeveloper.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default HookForm;
