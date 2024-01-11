import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type IFormInputs = {
  name: string;
  age: number;
};

const HookForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = values => {
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
        <Input
          type="text"
          id="name"
          placeholder="name"
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.age}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input
          type="number"
          id="age"
          placeholder="age"
          {...register('age', {
            required: 'This is required',
            min: { value: 18, message: 'Minimum age is 18' },
            max: { value: 99, message: 'Maximum age is 99' },
          })}
        />
        <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default HookForm;
