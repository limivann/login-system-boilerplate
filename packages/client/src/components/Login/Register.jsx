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
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const registrationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username too short')
      .max(28, 'Username too long')
      .required('Username required'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password too short')
      .max(28, 'Password too long'),
    email: Yup.string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '' },
    validationSchema: registrationSchema,
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
      <Heading>Register</Heading>
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
      <FormControl isInvalid={formik.errors.email && formik.touched.email}>
        <FormLabel fontSize="md" letterSpacing="wider">
          Email
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
          Register
        </Button>
        <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
          Back
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default Register;
