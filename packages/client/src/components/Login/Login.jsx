import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  FormErrorMessage,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username too short')
      .max(28, 'Username too long')
      .required('Username required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password too short')
      .max(28, 'Password too long'),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      const vals = { ...values };
      console.log(vals);
      actions.resetForm();
    },
  });
  return (
    <VStack
      as="form"
      w={{ base: '90%', md: '500px' }}
      m="auto"
      justify="center"
      spacing="1rem"
      onSubmit={formik.handleSubmit}
      height="90vh"
    >
      <Heading>Log In</Heading>
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}
      >
        <FormLabel fontSize="md" letterSpacing="wider">
          Username
        </FormLabel>
        <Input
          name="username"
          type="text"
          placeholder="Enter username"
          autoComplete="off"
          size="lg"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Input>
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <FormLabel fontSize="md" letterSpacing="wider">
          Password
        </FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          size="lg"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Input>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <ButtonGroup pt="1rem" spacing="1rem">
        <Button type="submit" colorScheme="linkedin">
          Log In
        </Button>
        <Button onClick={() => navigate('/register')}>Register</Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Login;
