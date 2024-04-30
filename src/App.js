import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import JobseekerMainPage from "./jobseeker/JobseekerMainPage";

import JobCreationPage from "./employeer/JobCreationPage";
// import { Tabs, Tab, TextField, Button, Typography, Box, Container, Paper } from '@mui/material';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
// });
import EmployeerMainPage from "./employeer/EmployeerMainPage";
import EmployerTable from "./Admin/EmployerTable";
import Layout from "./components/Layout";
import Profile from "./jobseeker/Profile";
import ViewAll from "./jobseeker/ViewAll";
import TrackApplications from "./jobseeker/TrackApplications";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="jobseeker" element={<JobseekerMainPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="viewAll" element={<ViewAll />} />
            <Route path="trackApplications" element={<TrackApplications />} />
            
            <Route path="employeer" element={<EmployeerMainPage />} />
            <Route path="jobcreate" element={<JobCreationPage />} />
            <Route path="admin" element={<EmployerTable />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );

  //   const [value, setValue] = useState(0);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };
  //   const roles = {
  //     0:'Employeer',
  //     1:'Job Seeker',
  //     2:'Admin'
  //   }
  //   const formik = useFormik({
  //     initialValues: {
  //       email: '',
  //       password: '',
  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: values => {
  //      alert(JSON.stringify({...values, 'role':roles[value]},null,2));
  //     },
  //   });

  //   return (
  //     <Container maxWidth="sm" sx={{p : 4}}>
  //       <Tabs
  //         value={value}
  //         onChange={handleChange}
  //         indicatorColor="primary"
  //         textColor="primary"
  //         variant="fullWidth"
  //         aria-label="login tabs"
  //       >
  //         <Tab label="Employer" />
  //         <Tab label="Job Seeker" />
  //         <Tab label="Admin" />
  //       </Tabs>
  //       <Box mt={3} sx={{display : "flex", alignItems : 'center', justifyContent : 'center'}}  >
  //         <Paper elevation={5} sx={{p  :2, width : '80%', py : 4}}>
  //           <form onSubmit={formik.handleSubmit}>
  //           <TextField
  //             fullWidth
  //             id="email"
  //             name="email"
  //             label="Email"
  //             type="email"
  //             // value={formik.values.email}
  //             onChange={formik.handleChange}
  //             // onBlur={formik.handleBlur}
  //             error={formik.touched.email && Boolean(formik.errors.email)}
  //             helperText={formik.touched.email && formik.errors.email}
  //             margin="normal"
  //           />
  //           <TextField
  //             fullWidth
  //             id="password"
  //             name="password"
  //             label="Password"
  //             type="password"
  //             value={formik.values.password}
  //             onChange={formik.handleChange}
  //             onBlur={formik.handleBlur}
  //             error={formik.touched.password && Boolean(formik.errors.password)}
  //             helperText={formik.touched.password && formik.errors.password}
  //             margin="normal"
  //           />
  //           <Button color="primary" variant="contained" fullWidth type="submit">
  //             Submit
  //           </Button>
  //         </form>

  //         </Paper>

  //       </Box>
  //     </Container>
  //   );
};

export default App;
