import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Icon,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Stack,
} from "@mui/material";
import {
  ArrowBack,
  Business,
  Close,
  Grid3x3,
  PlayArrow,
  Refresh,
  Search,
  SkipNext,
  SkipPrevious,
  SkipPreviousOutlined,
  TrackChanges,
  WorkOutline,
} from "@mui/icons-material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blue, indigo } from "@mui/material/colors";
import axios from "axios";

const ViewAll = () => {
  const navigate = useNavigate();
  const [fetchedJobs, setFetchedJobs] = useState([
    {
      title: "Software Engineer",
      experience: "0yrs-5yrs",
      description: "Developing software applications",
      jobId: 1,
      jobTitle: "Software Engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription: "Developing software applications",
      keySkills: "Java, Spring Boot, Hibernate",
      minimumWorkExperience: 0,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "On-site",
      educationalQualification: "Bachelor's degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 6.5,
      maximumSalary: 7.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 2,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-Site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Example Company",
      minimumSalary: 25,
      maximumSalary: 30,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 3,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 20,
      maximumSalary: 35,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Java Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 4,
      jobTitle: "Java Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 35,
      maximumSalary: 40,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "AI Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 5,
      jobTitle: "AI Developer",
      jobPositioning: "Normal",
      employeeType: "Internship",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 50,
      maximumSalary: 55,
      postedBy: "shashitejjag2k2@gmail.com",
      jobApplicationStatus: null,
    },
    {
      title: "Frontend Developer",
      experience: "2yrs-5yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 6,
      jobTitle: "Frontend Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 2,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 7.5,
      maximumSalary: 8.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Systems Engineer ",
      experience: "0yrs-0yrs",
      description: "Role",
      jobId: 7,
      jobTitle: "Systems Engineer ",
      jobPositioning: null,
      employeeType: "Internship",
      jobDescription: "Role",
      keySkills: "Linux, Networking",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "HYDERABAD",
      jobMode: "Hybrid",
      educationalQualification: "Bachelor's Degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Network engineer",
      experience: "0yrs-0yrs",
      description:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      jobId: 9,
      jobTitle: "Network engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      keySkills: "linux",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "Vizag",
      jobMode: "Hybrid",
      educationalQualification: "PhD",
      companyName: "hitachi ds",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: null,
      jobApplicationStatus: null,
    },
  ]);
  const [fetchedHighJobs, setFetchedHighJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };
  const [jobDetails, setJobDetails] = React.useState({});
  const [experienceFrom, setExperienceFrom] = useState("");
  const [experienceTo, setExperienceTo] = useState("");
  const [employeeType, setEmployeeType] = useState([]);
  const [keySkills, setKeySkills] = useState([]);
  const [location, setLocation] = useState([]);
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [uniqLocations, setUniqLocations] = useState([]);
  const [uniqueSkills, setUniqSkills] = useState([])
  const skillsArray = []
  const locationJobs = []
  const temp = [
    {
      title: "Software Engineer",
      experience: "0yrs-5yrs",
      description: "Developing software applications",
      jobId: 1,
      jobTitle: "Software Engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription: "Developing software applications",
      keySkills: "Java, Spring Boot, Hibernate",
      minimumWorkExperience: 0,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "On-site",
      educationalQualification: "Bachelor's degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 6.5,
      maximumSalary: 7.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 2,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-Site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Example Company",
      minimumSalary: 25,
      maximumSalary: 30,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 3,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 20,
      maximumSalary: 35,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Java Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 4,
      jobTitle: "Java Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 35,
      maximumSalary: 40,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "AI Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 5,
      jobTitle: "AI Developer",
      jobPositioning: "Normal",
      employeeType: "Internship",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 50,
      maximumSalary: 55,
      postedBy: "shashitejjag2k2@gmail.com",
      jobApplicationStatus: null,
    },
    {
      title: "Frontend Developer",
      experience: "2yrs-5yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 6,
      jobTitle: "Frontend Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 2,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 7.5,
      maximumSalary: 8.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Systems Engineer ",
      experience: "0yrs-0yrs",
      description: "Role",
      jobId: 7,
      jobTitle: "Systems Engineer ",
      jobPositioning: null,
      employeeType: "Internship",
      jobDescription: "Role",
      keySkills: "Linux, Networking",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "HYDERABAD",
      jobMode: "Hybrid",
      educationalQualification: "Bachelor's Degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Network engineer",
      experience: "0yrs-0yrs",
      description:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      jobId: 9,
      jobTitle: "Network engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      keySkills: "linux",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "Vizag",
      jobMode: "Hybrid",
      educationalQualification: "PhD",
      companyName: "hitachi ds",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: null,
      jobApplicationStatus: null,
    },
  ].map((job) => skillsArray.concat(job.keySkills.split(",")));
  const tempLocation = [
    {
      title: "Software Engineer",
      experience: "0yrs-5yrs",
      description: "Developing software applications",
      jobId: 1,
      jobTitle: "Software Engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription: "Developing software applications",
      keySkills: "Java, Spring Boot, Hibernate",
      minimumWorkExperience: 0,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "On-site",
      educationalQualification: "Bachelor's degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 6.5,
      maximumSalary: 7.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 2,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-Site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Example Company",
      minimumSalary: 25,
      maximumSalary: 30,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Full Stack Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 3,
      jobTitle: "Full Stack Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 20,
      maximumSalary: 35,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Java Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 4,
      jobTitle: "Java Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "capgemini Company",
      minimumSalary: 35,
      maximumSalary: 40,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "AI Developer",
      experience: "10yrs-15yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 5,
      jobTitle: "AI Developer",
      jobPositioning: "Normal",
      employeeType: "Internship",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 10,
      maximumWorkExperience: 15,
      location: "New York",
      jobMode: "On-site",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 50,
      maximumSalary: 55,
      postedBy: "shashitejjag2k2@gmail.com",
      jobApplicationStatus: null,
    },
    {
      title: "Frontend Developer",
      experience: "2yrs-5yrs",
      description: "This is a Full Stack Developer position.",
      jobId: 6,
      jobTitle: "Frontend Developer",
      jobPositioning: "Normal",
      employeeType: "Full-time",
      jobDescription: "This is a Full Stack Developer position.",
      keySkills: "Java, JavaScript, React",
      minimumWorkExperience: 2,
      maximumWorkExperience: 5,
      location: "Pune",
      jobMode: "Remote",
      educationalQualification: "Bachelor's Degree",
      companyName: "Cognizent Company",
      minimumSalary: 7.5,
      maximumSalary: 8.5,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "closed",
    },
    {
      title: "Systems Engineer ",
      experience: "0yrs-0yrs",
      description: "Role",
      jobId: 7,
      jobTitle: "Systems Engineer ",
      jobPositioning: null,
      employeeType: "Internship",
      jobDescription: "Role",
      keySkills: "Linux, Networking",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "HYDERABAD",
      jobMode: "Hybrid",
      educationalQualification: "Bachelor's Degree",
      companyName: "Hitachi Vantara",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: "shashiteja@gmail.com",
      jobApplicationStatus: "open",
    },
    {
      title: "Network engineer",
      experience: "0yrs-0yrs",
      description:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      jobId: 9,
      jobTitle: "Network engineer",
      jobPositioning: null,
      employeeType: "Full-time",
      jobDescription:
        "Minimum 3+ yrs experience in the field of on-premies servers.",
      keySkills: "linux",
      minimumWorkExperience: 0,
      maximumWorkExperience: 0,
      location: "Vizag",
      jobMode: "Hybrid",
      educationalQualification: "PhD",
      companyName: "hitachi ds",
      minimumSalary: 0,
      maximumSalary: 0,
      postedBy: null,
      jobApplicationStatus: null,
    },
  ].map((job) => locationJobs.concat(job.location));
  function flattenArray(arr) {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
      []
    );
  }

  // const uniqueSkills = [...new Set(flattenArray(temp))]
  // console.log("KeySkills",uniqueSkills);

  // const uniqueLocations = [...new Set(flattenArray(tempLocation))]
  // console.log("KeySkills",uniqueLocations);


  const [jobMode, setJobMode] = useState([]);
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleApplyFilters = (reset) => {
    let filters
    
    if(reset=='reset'){
      setEmployeeType([]);
      setJobMode([])
      setLocation([]);
      setJobMode([])
       filters = {
        // experience: { from: experienceFrom, to: experienceTo },
        employeeType : [],
        keySkills : [],
        location : [],
        // salary: { from: salaryFrom, to: salaryTo },
        jobMode : [],
      };
    }else {
       filters = {
        // experience: { from: experienceFrom, to: experienceTo },
        employeeType,
        keySkills,
        location,
        // salary: { from: salaryFrom, to: salaryTo },
        jobMode,
      };
    }
   
    console.log("filters", fetchedJobs, filters);
    // Apply filters to fetchedJobs
    const filteredResult = fetchedJobs.filter((job) => {
      const isEmployeeTypeMatch =
        filters.employeeType.length === 0 ||
        filters.employeeType.includes(job.employeeType);

      const isKeySkillsMatch =
        filters.keySkills.length === 0 ||
        filters.keySkills.some((skill) =>
          job.keySkills.split(",").includes(skill)
        );

      const isLocationMatch =
        filters.location.length === 0 ||
        filters.location.includes(job.location);

      const isJobModeMatch =
        filters.jobMode.length === 0 || filters.jobMode.includes(job.jobMode);

      // Return true if all conditions are met
      return (
        // isExperienceInRange &&
        isEmployeeTypeMatch &&
        isKeySkillsMatch &&
        isLocationMatch &&
        isJobModeMatch
        // isLocationMatch &&
        // isSalaryInRange &&
      );
    });

    // Update filtered jobs state
    setFilteredJobs(filteredResult);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/applyJob`, {
        ...jobDetails,
        appliedBy: localStorage.getItem("email"),
      });
      console.log("applied job", response);
      setState({
        severity: "error",
        open: true,
        message: "Applied Job successfully",
      });
    } catch (error) {
      console.log("error appllying", error);
      setState({
        severity: "error",
        open: true,
        message: error.response.data,
      });
    }
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAlljobs`);
        console.log("all jobs", response.data);

        setFetchedJobs(
          response.data?.map((job) => ({
            title: job.jobTitle,
            experience: `${job.minimumWorkExperience}yrs-${job.maximumWorkExperience}yrs`,
            description: job.jobDescription,
            ...job,
          }))
        );
        setFilteredJobs( response.data?.map((job) => ({
          title: job.jobTitle,
          experience: `${job.minimumWorkExperience}yrs-${job.maximumWorkExperience}yrs`,
          description: job.jobDescription,
          ...job,
        })))
        const temp = response.data.map((job) => skillsArray.concat(job.keySkills.split(",")));
    
  const uniqueSkills = [...new Set(flattenArray(temp))]
  console.log("KeySkills",uniqueSkills);
  setUniqSkills(uniqueSkills);
const tempLocation = response.data.map((job) => locationJobs.concat(job.location));
const uniqueLocations = [...new Set(flattenArray(tempLocation))]
console.log("Locations",uniqueLocations);
setUniqLocations(uniqueLocations)
      
        // setUniqSkills();
      } catch (error) {
        console.log("error", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    fetchJobs();
  }, []);

  const items = filteredJobs?.map((job) => (
    <Card sx={{ display: "flex", m: 2, py: 6, flexDirection : "column", backgroundColor : indigo[100], borderRadius : 5, height : 250 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5"  fontWeight={600} sx={{my : 1}}>
              {job.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}
              
              fontWeight={600}
            >
              
                <WorkOutline sx={{ px : 1}}/>
              {" "} Exp : {job.experience}
            </Typography>
            <Typography  variant="subtitle1"
              
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}><Business sx={{ px : 1}}/> {job.employeeType}</Typography>
          <Typography  variant="subtitle1"
              
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}><LocationOnOutlinedIcon sx={{ px : 1}}/> {job.location}</Typography>
        </CardContent>
      </Box>
      <Button
        sx={{ mx: 3, my: 2, p :1, }}
        variant="contained"
        size="small"
        onClick={() => {
          setJobDetails(job);
          setIsOpen(true);
        }}
      >
        Apply
      </Button>
    </Card>
  ));

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="job-modal-title"
        aria-describedby="job-modal-description"
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 3,
          }}
        >
          <Grid item>
            <Typography variant="h5" id="job-modal-title" gutterBottom>
              Job Details
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: blue[100],
                  paddingBlock: 20,
                }}
              >
                <Grid item>
                  <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" id="job-modal-title" gutterBottom>
                      Job Details
                    </Typography>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      variant="outlined"
                      sx={{ borderRadius: 20 }}
                    >
                      <Icon
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Close />
                      </Icon>
                    </Button>
                  </Stack>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={1} sx={{px : 40}}>
                    <Typography variant="body1">
                      <strong>Job ID:</strong> {jobDetails.jobId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Job Title:</strong> {jobDetails.jobTitle}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Type:</strong> {jobDetails.employeeType}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Job Description:</strong>{" "}
                      {jobDetails.jobDescription}...
                    </Typography>
                    <Typography variant="body1">
                      <strong>Key Skills:</strong> {jobDetails.keySkills}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Minimum Work Experience:</strong>{" "}
                      {jobDetails.minimumWorkExperience}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Maximum Work Experience:</strong>{" "}
                      {jobDetails.maximumWorkExperience}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Location:</strong> {jobDetails.location}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Job Mode:</strong> {jobDetails.jobMode}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Educational Qualification:</strong>{" "}
                      {jobDetails.educationalQualification}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Company Name:</strong> {jobDetails.companyName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Minimum Salary:</strong>{" "}
                      {jobDetails.minimumSalary} LPA
                    </Typography>
                    <Typography variant="body1">
                      <strong>Maximum Salary:</strong>{" "}
                      {jobDetails.maximumSalary} LPA
                    </Typography>
                  </Grid>
                </Grid>
                <Button onClick={handleSubmit} variant="contained">
                  Confirm Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
     

      <Stack direction={"row"} spacing={2}>
        <div
          style={{ backgroundColor: blue[100], height: "100vh", width: "30%" }}
        >
          <Button  variant="contained" sx={{m:1}}startIcon={<ArrowBack/>} onClick={()=>{navigate('/jobseeker')}}>Back</Button>
          <Grid container spacing={2} direction={"column"} sx={{p : 2, }}>
            {/* <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ display: "block" }}>Experience: </Typography>
              <Stack spacing={2} direction={"row"} sx={{ mx: 1 }}>
                <TextField
                  sx={{ width: "90%" }}
                  type="number"
                  label="Experience From"
                  value={experienceFrom}
                  onChange={(e) => setExperienceFrom(e.target.value)}
                />
                <TextField
                  sx={{ width: "90%" }}
                  type="number"
                  label="Experience To"
                  value={experienceTo}
                  onChange={(e) => setExperienceTo(e.target.value)}
                />
              </Stack>
            </Grid>*/}
            <Grid item xs={1} >
            <Grid container spacing={2}>
              <Grid xs={6} item>
              <Typography align="center">
                Job Type:{" "}
              </Typography>
              </Grid>
              <Grid xs={6} item>
              <Select
               fullWidth
                multiple
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
                label="Employee Type"
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
              </Grid>

              </Grid>
            </Grid>
            <Grid item xs={3}>
            <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography align="center">Skills: </Typography>
              </Grid>
              <Grid xs={6} item>
              <Select
                fullWidth
                multiple
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                label="Key Skills"
              >
                {uniqueSkills.map((skill,index)=><MenuItem key={index} value={skill}>{skill}
                </MenuItem>)}
              </Select></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography align="center">
                Location:{" "}
              </Typography>
              </Grid>
              <Grid item xs={6}>
              <Select
               fullWidth
                multiple
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
              >
                {uniqLocations.map((location,index)=><MenuItem key={index} value={location}>{location}
                </MenuItem>)}
              </Select>
              </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={1}>
              <Typography sx={{ display: "inline-block" }}>Salary: </Typography>
              <Stack spacing={2} direction={"row"}>
                <TextField
                  sx={{ width: "25%" }}
                  type="number"
                  label="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                />
                <TextField
                  sx={{ width: "25%" }}
                  type="number"
                  label="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                />
              </Stack>
            </Grid> */}
            <Grid item xs={2}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography align="center">
                Job Mode:{" "}
              </Typography>
              </Grid>
              <Grid item xs={6}>
              <Select
               fullWidth
                multiple
                value={jobMode}
                onChange={(e) => setJobMode(e.target.value)}
                label="Job Mode"
              >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="On-site">Onsite</MenuItem>
              </Select>
              </Grid>
              </Grid>
            </Grid>
            <Stack direction={'row'}>
            <Button
            variant="contained"
            onClick={handleApplyFilters}
            sx={{ m: 2 }}
          >
            Apply Filters
          </Button>
          <Button
           variant="contained"
           onClick={()=>handleApplyFilters("reset")}
      
          startIcon={<Refresh/>}
          sx={{backgroundColor : 'warning.main', m: 2}}
          >
           Reset
          </Button>
            </Stack>
          
          </Grid>
        </div>
        <Box sx={{py  :2}}>
          <Grid container spacing={2}>{items.length > 0 ? (
            items.map((item) => 
            <Grid xs={12}>

{    item}
            </Grid>
        
          
          )
          ) : (
            <Typography variant="h2">No Data</Typography>
          )}</Grid>
        </Box>
      </Stack>

      
    </>
  );
};

export default ViewAll;
