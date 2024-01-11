import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const formInputsSchema = yup
  .object({
    name: yup.string().required('Name is required.'),
    age: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value)) // convert empty string to undefined
      .positive()
      .integer()
      .min(18, 'Age must be at least 18')
      .max(99, 'Age must be less than 99')
      .required('Age is required.'),
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
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" placeholder="name" {...register('name')} />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.age}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input id="age" placeholder="age" {...register('age')} />
        <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default HookForm;
