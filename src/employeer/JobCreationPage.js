import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container,Grid,Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
const JobCreationPage = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeType: '',
        jobDescription: '',
        keySkills: '',
        workExperience: '',
        location: '',
        educationalQualification: '',
        companyName: '',
        salary: '',
        jobTitle:''
        
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(formData);
        try {
          const response =axios.post('http://localhost:8080/postjob', formData);
          console.log(response.data); // Handle response data
      } catch (error) {
          console.error('Error:', error); // Handle error
      }
        //  navigate('/employeer')
        
      }
  return (
    <div>
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
                            name="minExperience"
                            label="Minimum Experience (years)"
                            type="number"
                            fullWidth
                            InputProps={{ inputProps: { min: 0, max: formData.maxExperience ? formData.maxExperience : 5 } }}
                            value={formData.minExperience}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="maxExperience"
                            label="Maximum Experience (years)"
                            type="number"
                            fullWidth
                            InputProps={{ inputProps: { min: formData.minExperience ? formData.minExperience : 0 } }}
                            value={formData.maxExperience}
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
                            name="minSalary"
                            label="Minimum Salary"
                            type="number"
                            fullWidth
                            InputProps={{ inputProps: { min: 5.5, max: formData.maxSalary ? formData.maxSalary : 10 } }}
                            value={formData.minSalary}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="maxSalary"
                            label="Maximum Salary"
                            type="number"
                            fullWidth
                            InputProps={{ inputProps: { min: formData.minSalary ? formData.minSalary : 5.5, max: 10 } }}
                            value={formData.maxSalary}
                            onChange={handleInputChange}
                            margin="normal"
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