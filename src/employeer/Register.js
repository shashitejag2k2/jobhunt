import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  emailId: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  companyName: Yup.string().required('Company name is required'),
  employeeId: Yup.string().required('Employee ID is required'),
});

const Register = (props) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      emailId: '',
      password: '',
      companyName: '',
      employeeId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios.post(`http://localhost:8080/employeerRegister`,values)
        console.log("succesfully registered",response);
        setState({
          severity: "success",
          open: true,
          message: response.data,
        }); 
        props.setReg(false)
        // alert("Succesfully registered")
      } catch (error) {
        console.log('error while register', error)
        setState({
          severity: "error",
          open: true,
          message: error.response.data,
        }); 
      }
    },
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  return (
    <>
    <Snackbar open={state.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
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
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          error={formik.touched.companyName && Boolean(formik.errors.companyName)}
          helperText={formik.touched.companyName && formik.errors.companyName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="employeeId"
          name="employeeId"
          label="Employee ID"
          value={formik.values.employeeId}
          onChange={formik.handleChange}
          error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
          helperText={formik.touched.employeeId && formik.errors.employeeId}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Register
        </Button>
      </form>
    </Container>
    </>
   
  );
};

export default Register;
