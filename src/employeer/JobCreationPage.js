import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Alert, Container,Grid,Paper, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import { ArrowBack, Home } from '@mui/icons-material';
const JobCreationPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
    const [formData, setFormData] = useState({
        employeeType: '',
        jobDescription: '',
        keySkills: '',
        workExperience: '',
        minimumWorkExperience :'',
        maximumWorkExperience : "",
        minimumSalary : "",
        maximumSalary : '',
        location: '',
        educationalQualification: '',
        companyName: '',
        salary: '',
        jobTitle:'',
        jobMode : ''
        
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
          console.log(response.data); // Handle response data
          setState({
            severity: "success",
            open: true,
            message: "Sucesfully Posted",
          });
          
          navigate('/employeer')
      } catch (error) {
          console.error('Error:', error); // Handle error
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
         <form onSubmit={handleSubmit}>
         <TextField
        name="jobTitle"
        label="Job Title"
        fullWidth
      
        rows={4}
        value={formData.jobTitle}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="employeeType"
        label="Employee Type"
        select
       
        style={{ width: '50%' }}
        value={formData.employeeType}
        onChange={handleInputChange}
        margin="normal"
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
        value={formData.jobDescription}
        onChange={handleInputChange}
        margin="normal"
      />

      <TextField
        name="keySkills"
        label="Key Skills"
        fullWidth
        value={formData.keySkills}
        onChange={handleInputChange}
        margin="normal"
      />

<Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="minimumWorkExperience"
                            label="Minimum Experience (years)"
                            type="number"
                            fullWidth
                            inputProps={{
                              min: 0,
                            }}
                            value={formData.minimumWorkExperience}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="maximumWorkExperience"
                            label="Maximum Experience (years)"
                            type="number"
                            fullWidth
                            inputProps={{
                              min: 0,
                            }}
                            value={formData.maximumWorkExperience}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                </Grid>

      <TextField
        name="location"
        label="Location"
        fullWidth
        value={formData.location}
        onChange={handleInputChange}
        margin="normal"
      />
 <TextField
        name="jobMode"
        label="Job Mode"
        fullWidth
        value={formData.jobMode}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="educationalQualification"
        label="Educational Qualification"
        select
        fullWidth
        value={formData.educationalQualification}
        onChange={handleInputChange}
        margin="normal"
      >
        <MenuItem value="High School">High School</MenuItem>
        <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
        <MenuItem value="Master's Degree">Master's Degree</MenuItem>
        <MenuItem value="PhD">PhD</MenuItem>
      </TextField>

      <TextField
        name="companyName"
        label="Company Name"
        fullWidth
        value={formData.companyName}
        onChange={handleInputChange}
        margin="normal"
      />

<Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="minimumSalary"
                            label="Minimum Salary"
                            type="number"
                            fullWidth

                            value={formData.minimumSalary}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{
                              min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="maximumSalary"
                            label="Maximum Salary"
                            type="number"
                            fullWidth

                            value={formData.maximumSalary}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{
                              min: 0,
                            }}
                        />
                    </Grid>
                </Grid>
                <Box mt={2} >
          <Button variant="contained" color="primary" type='submit'>
            POST
          </Button>
        </Box>
    </form>
    </Paper>
    </Container>
    </div>
  )
}

export default JobCreationPage