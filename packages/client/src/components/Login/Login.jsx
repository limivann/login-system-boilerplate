import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import {
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  FormErrorMessage,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SignupFormSchema } from '@login-system-boilerplate/common';
import { AccountContext } from '../UserContext';

const Login = () => {
  const validationSchema = SignupFormSchema;
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [errors, setErrors] = useState('');
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      try {
        const res = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vals),
        });
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        const data = await res.json();
        setUser({ ...data });
        if (data.status) {
          setErrors(data.status);
        } else if (data.loggedIn) {
          navigate('/home');
        }
      } catch (err) {
        console.error(err.message);
      }
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
      height="80vh"
    >
      <Heading>Log In</Heading>
      <Text as="p" color="red.300" fontSize="md">
        {errors}
      </Text>
      <FormControl isInvalid={formik.errors.email && formik.touched.email}>
        <FormLabel fontSize="md" letterSpacing="wider">
          email
        </FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="off"
          size="lg"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></Input>
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
