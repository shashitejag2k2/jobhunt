import React, { useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    jobseeker_id: Yup.string().required("Jobseeker ID is required"),
    email_id: Yup.string().email("Invalid email").required("Email is required"),
    college: Yup.string().required("College name is required"),
    skills: Yup.string().required("Skills are required"),
    experience: Yup.string().required("Experience is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      jobseeker_id: "",
      email_id: "",
      college: "",
      skills: "",
      experience: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.put(
          `http://localhost:/8080/updateProfile`,
          values
        );
        console.log("upadte successfiuull", response);
      } catch (error) {
        console.log("error while updating", error);
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
        formik.setFieldValue("jobseeker_id", response.data.jobseeker_id);
        formik.setFieldValue("name", response.data.name);
        formik.setFieldValue("email_id", response.data.email_id);
        formik.setFieldValue("college", response.data.college);
        formik.setFieldValue("skills", response.data.skills);
        formik.setFieldValue("experience", response.data.experience);
      } catch (error) {
        console.log("error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);
  return (
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
                name="jobseeker_id"
                label="Jobseeker ID"
                variant="outlined"
                fullWidth
                value={formik.values.jobseeker_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.jobseeker_id &&
                  Boolean(formik.errors.jobseeker_id)
                }
                helperText={
                  formik.touched.jobseeker_id && formik.errors.jobseeker_id
                }
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="email_id"
                label="Email ID"
                variant="outlined"
                fullWidth
                value={formik.values.email_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email_id && Boolean(formik.errors.email_id)
                }
                helperText={formik.touched.email_id && formik.errors.email_id}
              />
            </Typography>
            <hr />
            <Typography>
              <TextField
                name="college"
                label="College Name"
                variant="outlined"
                fullWidth
                value={formik.values.college}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.college && Boolean(formik.errors.college)}
                helperText={formik.touched.college && formik.errors.college}
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
  );
};

export default Profile;
