import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

enum GenderEnum {
  male = 'Male',
  female = 'Female',
  other = 'Other',
}

const formInputsSchema = yup
  .object({
    firstName: yup.string().required('First Name is required.'),
    lastName: yup.string().notRequired(),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18, 'Age must be at least 18')
      .max(99, 'Age must be less than 99')
      .transform(value => (isNaN(value) ? undefined : value)) // convert empty string to undefined
      .required('Age is required.'),
    gender: yup
      .mixed<GenderEnum>()
      .oneOf(Object.values(GenderEnum))
      .transform(value => (value === '' ? undefined : value)) // convert empty string to undefined
      .required('Gender is required.'),
    email: yup.string().email('Invalid email address.').required('Email is required.'),
    isDeveloper: yup.boolean().required('Please select one.'),
  })
  .required();

type FormInputs = yup.InferType<typeof formInputsSchema>;

const HookForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(formInputsSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = values => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  };

  return (
    <Box w={600} p={4} m="20px auto" bg="gray.100" borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" placeholder="First Name" {...register('firstName')} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" placeholder="Last Name" {...register('lastName')} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.age}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <Input id="age" placeholder="age" {...register('age')} />
          <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select placeholder="Select" {...register('gender')}>
            {Object.values(GenderEnum).map(gender => (
              <option key={gender}>{gender}</option>
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
