import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Alert, Container,FormControlLabel,Grid,Paper, Select, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import axios from 'axios';
import { ArrowBack, Home } from '@mui/icons-material';
import { useFormik } from 'formik';
const JobCreationPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const validationSchema = Yup.object().shape({
    employeeType: Yup.string()
    .required('Employee type is required'),
    jobDescription: Yup.string()
    .required('Job description is required'),
    keySkills: Yup.string()
    .required('Key skills are required'),
    minimumWorkExperience: Yup.number()
      .required('Minimum work experience is required')
      .min(0, 'Minimum work experience must be a positive number'),
    maximumWorkExperience: Yup.number()
      .required('Maximum work experience is required')
      .min(Yup.ref('minimumWorkExperience'), 'Maximum work experience must be greater than minimum'),
    minimumSalary: Yup.number()
      .required('Minimum salary is required')
      .min(0, 'Minimum salary must be a positive number'),
    maximumSalary: Yup.number()
      .required('Maximum salary is required')
      .min(Yup.ref('minimumSalary'), 'Maximum salary must be greater than minimum'),
    location: Yup.string()
    .required('Location is required'),
    educationalQualification: Yup.string()
    .required('Educational qualification is required'),
    jobTitle: Yup.string()
    .required('Job title is required'),
    jobMode: Yup.string()
    .required('Job mode is required'),
  });
    const [formData, setFormData] = useState({
        employeeType: '',
        jobDescription: '',
        keySkills: '',
   
        minimumWorkExperience :'',
        maximumWorkExperience : "",
        minimumSalary : "",
        maximumSalary : '',
        location: '',
        educationalQualification: '',
        // companyName: '',
     
        jobTitle:'',
        jobMode : ''
        
      });
      const formik = useFormik({
        initialValues: {
          employeeType: '',
          jobDescription: '',
          keySkills: '',
          minimumWorkExperience: '',
          maximumWorkExperience: '',
          minimumSalary: '',
          maximumSalary: '',
          location: '',
          educationalQualification: '',
          // companyName: '',
          jobTitle: '',
          jobMode: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
          console.log(values);
          try {
            const response =await axios.post('http://localhost:8080/postjob', {postedBy : localStorage.getItem('email'),...values, companyName : JSON.parse(localStorage.getItem('user')).companyName});
            console.log(response.data); // Handle response data
            setState({
              severity: "success",
              open: true,
              message: "Sucesfully Posted",
            });
            
            navigate('/employeer')
        } catch (error) {
            console.error('Error:', error); 
            setState({
              severity: "error",
              open: true,
              message: error.code,
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
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(formData);
        try {
          const response =axios.post('http://localhost:8080/postjob', {postedBy : localStorage.getItem('email'),...formData});
          console.log(response.data); 
          setState({
            severity: "success",
            open: true,
            message: "Sucesfully Posted",
          });
          
          navigate('/employeer')
      } catch (error) {
          console.error('Error:', error); 
          setState({
            severity: "error",
            open: true,
            message: error.code,
          });
      }
        //  navigate('/employeer')
        
      }
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
      <Button onClick={()=>{navigate('/employeer')}}
      startIcon={<Home/>}
      variant='contained'
      >Home</Button>
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Paper elevation={5} sx={{p  :2, width : '80%', py : 4}}>
        <form onSubmit={formik.handleSubmit}>
         <TextField
        name="jobTitle"
        label="Job Title"
        fullWidth
      
        rows={4}
    
      
        margin="normal"
        value={formik.values.jobTitle}
        onChange={formik.handleChange}
        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
      />
     <TextField
        name="employeeType"
        select
        label="Employee Type"
        style={{ width: '50%' }}
        margin="normal"
        value={formik.values.employeeType}
        onChange={formik.handleChange}
        error={formik.touched.employeeType && Boolean(formik.errors.employeeType)}
        helperText={formik.touched.employeeType && formik.errors.employeeType}
      >
        <MenuItem value="Full-time">Full-time</MenuItem>
        <MenuItem value="Part-time">Part-time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
      </TextField>

      <TextField
        name="jobDescription"
        label="Job Description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={formik.values.jobDescription}
        onChange={formik.handleChange}
        error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
        helperText={formik.touched.jobDescription && formik.errors.jobDescription}
      />

      <TextField
        name="keySkills"
        label="Key Skills"
        fullWidth
        margin="normal"
        value={formik.values.keySkills}
        onChange={formik.handleChange}
        error={formik.touched.keySkills && Boolean(formik.errors.keySkills)}
        helperText={formik.touched.keySkills && formik.errors.keySkills}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="minimumWorkExperience"
            label="Minimum Experience (years)"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{
              min: 0,
              step:0.1
            }}
            value={formik.values.minimumWorkExperience}
            onChange={formik.handleChange}
            error={formik.touched.minimumWorkExperience && Boolean(formik.errors.minimumWorkExperience)}
            helperText={formik.touched.minimumWorkExperience && formik.errors.minimumWorkExperience}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="maximumWorkExperience"
            label="Maximum Experience (years)"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{
              min: 0,
              step:0.1
            }}
            value={formik.values.maximumWorkExperience}
            onChange={formik.handleChange}
            error={formik.touched.maximumWorkExperience && Boolean(formik.errors.maximumWorkExperience)}
            helperText={formik.touched.maximumWorkExperience && formik.errors.maximumWorkExperience}
          />
        </Grid>
      </Grid>

      <TextField
        name="location"
        label="Location"
        fullWidth
        margin="normal"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />
<TextField
        name="companyName"
        label="Company Name"
        disabled={true}
        fullWidth
        margin="normal"
        value={JSON.parse(localStorage.getItem('user')).companyName}

      />
      <Typography>Job Mode:</Typography>
      <Select
        name="jobMode"
        label="Job Mode"
        fullWidth
        margin="normal"
        value={formik.values.jobMode}
        onChange={formik.handleChange}
        error={formik.touched.jobMode && Boolean(formik.errors.jobMode)}
        helperText={formik.touched.jobMode && formik.errors.jobMode}
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
        <MenuItem value="Onsite">Onsite</MenuItem>
      </Select>

      <TextField
        name="educationalQualification"
        select
        label="Educational Qualification"
        fullWidth
        margin="normal"
        value={formik.values.educationalQualification}
        onChange={formik.handleChange}
        error={formik.touched.educationalQualification && Boolean(formik.errors.educationalQualification)}
        helperText={formik.touched.educationalQualification && formik.errors.educationalQualification}
      >
    
        <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
        <MenuItem value="Master's Degree">Master's Degree</MenuItem>
        <MenuItem value="PhD">PhD</MenuItem>
      </TextField>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="minimumSalary"
            label="Minimum Salary"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            value={formik.values.minimumSalary}
            onChange={formik.handleChange}
            error={formik.touched.minimumSalary && Boolean(formik.errors.minimumSalary)}
            helperText={formik.touched.minimumSalary && formik.errors.minimumSalary}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="maximumSalary"
            label="Maximum Salary"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            value={formik.values.maximumSalary}
            onChange={formik.handleChange}
            error={formik.touched.maximumSalary && Boolean(formik.errors.maximumSalary)}
            helperText={formik.touched.maximumSalary && formik.errors.maximumSalary}
          />
        </Grid>
                </Grid>
                <Box mt={2} >
                <Button variant='outlined'type="submit">Submit</Button>
        </Box>
    </form>
    </Paper>
    </Container>
    </div>
  )
}

export default JobCreationPage