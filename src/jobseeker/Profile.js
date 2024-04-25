import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  TextField,
  IconButton,
  Typography,
  Grid,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    jobSeekerId: Yup.string().required("Jobseeker ID is required"),
    emailId: Yup.string().email("Invalid email").required("Email is required"),
    collegeName: Yup.string().required("College name is required"),
    skills: Yup.string().required("Skills are required"),
    experience: Yup.string().required("Experience is required"),
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      jobSeekerId: "",
      emailId: "",
      collegeName: "",
      skills: "",
      experience: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.put(
          `http://localhost:8080/updateProfile`,
          values
        );
        console.log("upadte successfiuull", response);
        setState({
          severity: "success",
          open: true,
          message: "Succesfully Updated profile",
        });
      } catch (error) {
        console.log("error while updating", error);
        setState({
          severity: "error",
          open: true,
          message: 'Error while updating profile',
        });
      }
    },
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getProfile?email=${localStorage.getItem(
            "email"
          )}`
        );
        console.log("response from backend", response);
        formik.setFieldValue("jobSeekerId", response.data.jobSeekerId);
        formik.setFieldValue("name", response.data.name);
        formik.setFieldValue("emailId", response.data.emailId);
        formik.setFieldValue("collegeName", response.data.collegeName);
        formik.setFieldValue("skills", response.data.skills);
        formik.setFieldValue("experience", response.data.experience);
      } catch (error) {
        console.log("error fetching profile", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    fetchProfile();
  }, []);
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
      <Paper
      elevation={3}
      style={{
        padding: "20px",
        margin: "auto",
        maxWidth: "600px",
        marginTop: "50px",
      }}
    >
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => {
          navigate("/jobseeker");
        }}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item>
          <Avatar alt="Profile Picture" src="/path/to/profile_pic.jpg" />
        </Grid> */}
        <Grid item xs>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5">
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="jobSeekerId"
                label="Jobseeker ID"
                variant="outlined"
                fullWidth
                value={formik.values.jobSeekerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
                error={
                  formik.touched.jobSeekerId &&
                  Boolean(formik.errors.jobSeekerId)
                }
                helperText={
                  formik.touched.jobSeekerId && formik.errors.jobSeekerId
                }
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="emailId"
                label="Email ID"
                variant="outlined"
                fullWidth
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.emailId && Boolean(formik.errors.emailId)
                }
                helperText={formik.touched.emailId && formik.errors.emailId}
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="collegeName"
                label="College Name"
                variant="outlined"
                fullWidth
                value={formik.values.collegeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.collegeName && Boolean(formik.errors.collegeName)}
                helperText={formik.touched.collegeName && formik.errors.collegeName}
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="skills"
                label="Skills"
                variant="outlined"
                fullWidth
                value={formik.values.skills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="experience"
                label="Experience"
                variant="outlined"
                fullWidth
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience && Boolean(formik.errors.experience)
                }
                helperText={
                  formik.touched.experience && formik.errors.experience
                }
              />
            </Typography>
            <br />
            {formik.dirty && (
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </Paper>
    </>
   
  );
};

export default Profile;
