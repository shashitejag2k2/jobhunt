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
import { Button, Card, CardContent, CardMedia, Icon, Modal, Stack } from "@mui/material";
import {
  Close,
  PlayArrow,
  Search,
  SkipNext,
  SkipPrevious,
  SkipPreviousOutlined,
} from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blue, indigo } from "@mui/material/colors";
import axios from "axios";

const cardData = [
  {
    title: "Live From Space",
    artist: "Mac Miller",
    image: "/static/images/cards/live-from-space.jpg",
  },
  // Add more card data as needed
];


const Carousel = ({ items }) => {
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const handlePauseAutoplay = () => {
    setAutoplay(false);
  };

  const handleGoToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const handleGoToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const handleMoreJobs = () => {
    // Your logic to handle "More Jobs" button click
    alert("More jobs!");
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        {items.map((item, index) => (
          <div key={index}>
            <div className="carousel-item">{item}</div>
            {index === 10 && (
              <div className="more-jobs-button">
                <button onClick={handleMoreJobs}>More Jobs</button>
              </div>
            )}
          </div>
        ))}
      </Slider>
      <div className="carousel-navigation">
        <button className="prev-button" onClick={handleGoToPrevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="next-button" onClick={handleGoToNextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <button className="pause-button" onClick={handlePauseAutoplay}>
          <i className="fas fa-pause"></i>
        </button>
      </div>
    </div>
  );
};

const jobs = [
  {
    title: "Software Engineer",
    experience: "5+ years",
    description: "Join our innovative tech company and work on cutting-edge projects.",
  },
  {
    title: "Data Scientist",
    experience: "3+ years",
    description: "Be part of our data science team and solve complex analytical problems.",
  },
  {
    title: "Product Manager",
    experience: "7+ years",
    description: "Lead the development of our flagship products and drive business growth.",
  },
  {
    title: "UX Designer",
    experience: "4+ years",
    description: "Craft intuitive user experiences that delight our customers.",
  },
  {
    title: "Marketing Analyst",
    experience: "2+ years",
    description: "Analyze market trends and consumer behavior to drive marketing strategies.",
  },
  {
    title: "Frontend Developer",
    experience: "3+ years",
    description: "Create beautiful and responsive user interfaces for our web applications.",
  },
  {
    title: "HR Manager",
    experience: "6+ years",
    description: "Lead our human resources team and foster a positive work environment.",
  },
  {
    title: "Financial Analyst",
    experience: "4+ years",
    description: "Analyze financial data to provide insights and support strategic decisions.",
  },
  {
    title: "Sales Executive",
    experience: "2+ years",
    description: "Drive sales growth and build strong relationships with our clients.",
  },
  {
    title: "Customer Support",
    experience: "1+ years",
    description: "Provide exceptional customer service and support to our valued customers.",
  },
];


const PageBody = (props) => {
  const navigate = useNavigate();
  const [fetchedJobs,setFetchedJobs] = useState([])
  const [fetchedHighJobs,setFetchedHighJobs] = useState([])

const [isOpen,setIsOpen] = React.useState(false);
const handleClose = () => {setIsOpen(false)}
const [jobDetails,setJobDetails] = React.useState({});

const handleSubmit = async()=>{
  try {
    const response = await axios.post(`http://localhost:8080/applyJob`,{...jobDetails, appliedBy : localStorage.getItem("email")});
    console.log('applied job', response)
  } catch (error) {
    console.log('error appllying', error)
  }
}
useEffect(()=>{
  const fetchJobs= async ()=>{
    try {
      const response = await axios.get(`http://localhost:8080/getAlljobs`)
      console.log('all jobs', response.data)
      setFetchedJobs(response.data?.map((job)=>({title : job.jobTitle, experience : `${job.minimumWorkExperience}yrs-${job.maximumWorkExperience}yrs`, description : job.jobDescription, ...job})))
    } catch (error) {
      console.log('error',error)
    }
  }
  fetchJobs()
},[])

useEffect(()=>{
  const getHightJob = async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/getHighPayingJobs`)
      console.log("hight paying jobs", response.data)
      setFetchedHighJobs(response.data?.map((job)=>({title : job.jobTitle, experience : `${job.minimumWorkExperience}yrs-${job.maximumWorkExperience}yrs`, description : job.jobDescription, ...job})))
    } catch (error) {
      console.log(
        'error while fetching high paying jobs',error
      )
    }
  }
  getHightJob()
},[])
const items = fetchedJobs?.map((job) => (
  <Card sx={{ display: "flex", m: 2, py : 6 }}>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent : 'space-between' }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Exp : {job.experience}
        </Typography>
        <Typography variant="body2">
          {job.description}
        </Typography>
      </CardContent>
    </Box>
    <Button sx={{mx : 3, my : 5}} variant="contained" size="small" onClick={()=>{setJobDetails(job); setIsOpen(true)}}>
      Apply
    </Button>
  </Card>
));
const highItems = fetchedHighJobs?.map((job) => (
  <Card sx={{ display: "flex", m: 2, py : 6 }}>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent : 'space-between' }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Exp : {job.experience}
        </Typography>
        <Typography variant="body2">
          {job.description}
        </Typography>
      </CardContent>
    </Box>
    <Button sx={{mx : 3, my : 5}} variant="contained" size="small" onClick={()=>{setJobDetails(job); setIsOpen(true)}}>
      Apply
    </Button>
  </Card>
));
  return (
    <div>
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
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding : 3,  }}
      >
        <Grid item>
          <Typography variant="h5" id="job-modal-title" gutterBottom>
            Job Details 
          </Typography>
         
        </Grid>
        <Grid item >
          <Grid container direction="column" spacing={1} >
           <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor : blue[100], paddingBlock : 20 }}
              >
                <Grid item >
                  <Stack direction={'row'} spacing={2}>
                  <Typography variant="h5" id="job-modal-title" gutterBottom >
                    Job Details 
                  </Typography>
                  <Button  onClick={()=>{setIsOpen(false)}} variant="outlined" sx={{borderRadius : 20}}>
                    <Icon  sx={{display : 'flex', justifyContent:'center', alignItems : "center"}}>
                      <Close/>
                    </Icon>
                  </Button>
                  </Stack>
                  
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={1}>
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
                      <strong>Job Description:</strong> {jobDetails.jobDescription}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Key Skills:</strong> {jobDetails.keySkills}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Minimum Work Experience:</strong> {jobDetails.minimumWorkExperience}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Maximum Work Experience:</strong> {jobDetails.maximumWorkExperience}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Location:</strong> {jobDetails.location}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Job Mode:</strong> {jobDetails.jobMode}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Educational Qualification:</strong> {jobDetails.educationalQualification}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Company Name:</strong> {jobDetails.companyName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Minimum Salary:</strong> {jobDetails.minimumSalary}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Maximum Salary:</strong> {jobDetails.maximumSalary}
                    </Typography>
                  </Grid>
                </Grid>
                <Button onClick={handleSubmit} variant='contained'>
         Confirm Apply
        </Button>
              </Grid>
          </Grid>
        </Grid>
       
      </Grid>

    </Modal>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <TextField
          variant="outlined"
          width="50%"
          placeholder="Search..."
          fullWidth
          size="small"
          sx={{ width: "50%", marginLeft: 40, display: "inline-block" }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ backgroundColor: "whitesmoke" }}>
                <Search />
              </IconButton>
            ),
          }}
        />
        <Stack direction={'row'} spacing={2}>
        <Button variant="contained">Search</Button>
        <Button variant="contained" onClick={()=>{props.setShowTable(true)}}>View All</Button>
        </Stack>
       
      </div>
      {/* <Typography variant="h5" fontWeight={600}>Trending Jobs</Typography> */}
      <Box sx={{ backgroundColor: indigo[300] }}>
        <Carousel items={items} />
      </Box>

      <Typography variant="h5" fontWeight={600}>High Paying Jobs</Typography>
      <Box sx={{ backgroundColor: blue[300] }}>
        <Carousel items={highItems} />
      </Box>
    </div>
  );
};

export default PageBody;
