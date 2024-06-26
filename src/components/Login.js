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
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Register from "../employeer/Register";
import RegisterSeeker from "../jobseeker/RegisterSeeker";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";

const validationSchema = Yup.object().shape({
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [reg, setReg] = useState(false);
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const roles = {
    0: "Employeer",
    1: "Job Seeker",
    2: "Admin",
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      JSON.stringify({ ...values, role: roles[value] }, null, 2);
      console.log(roles[value]);
      if (roles[value] === "Job Seeker") {
        const email = values.emailId;
        try {
          const response = await axios.post(`http://localhost:8080/jobSeekerLogin`, values)
          console.log("setting email",values.emailId);
          localStorage.setItem("email",values.emailId);
          localStorage.setItem("role","jobseeker");
          console.log("response",response.data)
          localStorage.setItem("user",JSON.stringify(response.data))
          navigate("/jobseeker", { state: { email } });
        } catch (error) {
          console.log('error login', error)
          // alert("error",error)
          if(error.response.status == 401){
            setState({
              severity: "error",
              open: true,
              message: error.response.data,
            }); 
          }else {
            setState({
              severity: "error",
              open: true,
              message: error.code,
            });
          }
      
        }


      } else if (roles[value] === "Employeer") {
        try {
          const response = await axios.post(`http://localhost:8080/employeerLogin`, values)
          console.log("setting email",values.emailId);
          localStorage.setItem("email",values.emailId)
          localStorage.setItem("role","employer");
          localStorage.setItem("user",JSON.stringify(response.data))
          navigate("/employeer");
          console.log("response",response.data)
        } catch (error) {
          console.log('error login', error)
          // alert("error",error)
          if(error.response.status == 401){
            setState({
              severity: "error",
              open: true,
              message: "You are not authorised",
            }); 
          }
         else if(error.response.status == 400){
            setState({
              severity: "error",
              open: true,
              message: "Invalid credentials",
            }); 
          }
          else {
            setState({
              severity: "error",
              open: true,
              message: error.code,
            });
          }
        }
      }
      else if (roles[value] === "Admin") {
        try {
          const response = await axios.post(`http://localhost:8080/adminLogin`, values)
          console.log("setting email",values.emailId);
          localStorage.setItem("email",values.emailId)
          localStorage.setItem("role","admin");
          localStorage.setItem("user",JSON.stringify(response.data))
          navigate("/admin");
          console.log("response",response.data)
        } catch (error) {
          console.log('error login', error)
          // alert("error",error)
          if(error.response.status == 401){
            setState({
              severity: "error",
              open: true,
              message: error.response.data,
            }); 
          }else {
            setState({
              severity: "error",
              open: true,
              message: error.code,
            });
          }
        }
      }
    },
  });

  return (
    <div>
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
                name="emailId"
                label="Email"
                type="email"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
          {reg && value === 0 && <Register setReg={setReg} />}
          {/* ////////////////////////////////// Job seeker register /////////////////////////// */}
          {reg && value === 1 && <RegisterSeeker setReg={setReg} />}
          {reg && value === 2 && (
            <>
              <Typography align="center" variant="h6" color={'grey'}>No Registration for Admin</Typography>
            </>
          )}
        </Paper>
      </Box>
    </Container>
    </div>
 
  );
};

export default Login;
