import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Icon,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Register from "../employeer/Register";
import RegisterSeeker from "../jobseeker/RegisterSeeker";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [reg, setReg] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const roles = {
    0: "Employeer",
    1: "Job Seeker",
    2: "Admin",
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      JSON.stringify({ ...values, role: roles[value] }, null, 2);
      console.log(roles[value]);
      if (roles[value] === "Job Seeker") {
        const email = values.email;

        console.log(values.email);
        navigate("/jobseeker", { state: { email } });
      } else if (roles[value] === "Employeer") {
        navigate("/employeer");
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="login tabs"
      >
        <Tab label="Employer" />
        <Tab label="Job Seeker" />
        <Tab label="Admin" />
      </Tabs>
      <Box
        mt={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper elevation={5} sx={{ p: 2, width: "80%", py: 4 }}>
          {!reg && (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
          {reg && (
            <Typography
              onClick={() => {
                setReg(false);
              }}
              color={"primary"}
              fontWeight={600}
              variant="h6"
              component={Link}
            >
              <Icon>
                <ArrowBack />
              </Icon>{" "}
              Login here{" "}
            </Typography>
          )}
          {/* //////////////////////// Employers registrer //////////////////////// */}
          {!reg && (
            <Typography
              onClick={() => {
                setReg(true);
              }}
              color={"primary"}
              fontWeight={600}
              variant="h6"
              component={Link}
            >
              Register here{" "}
              <Icon>
                <ArrowForward />
              </Icon>
            </Typography>
          )}
          {reg && value === 0 && <Register />}
          {/* ////////////////////////////////// Job seeker register /////////////////////////// */}
          {reg && value === 1 && <RegisterSeeker />}
          {reg && value === 2 && (
            <>
              <Typography align="center" variant="h6" color={'grey'}>No Registration for Admin</Typography>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
