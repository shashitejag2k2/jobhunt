import React from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  emailId: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const RegisterSeeker = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      emailId: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      alert(JSON.stringify(values, null, 2));
try {
  const response = await axios.post(`http://localhost:8080/jobSeekerRegister`,values)
  console.log("succesfully registered",response);
  alert("Succesfully registered")
} catch (error) {
  console.log('error while register', error)
}
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="emailId"
          label="Email"
          value={formik.values.emailId}
          onChange={formik.handleChange}
          error={formik.touched.emailId && Boolean(formik.errors.emailId)}
          helperText={formik.touched.emailId && formik.errors.emailId}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterSeeker;
