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
  Icon,
  Modal,
  Snackbar,
  Stack,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Business,
  Close,
  LocationCity,
  PlayArrow,
  Search,
  SkipNext,
  SkipPrevious,
  SkipPreviousOutlined,
  TrackChanges,
  Work,
  WorkOutline,
} from "@mui/icons-material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blue, indigo } from "@mui/material/colors";
import axios from "axios";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const Carousel = ({ items }) => {
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
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
   
      <Grid xs={3} >
        {items.map((item, index) => (
         
            <div key={index}>{item}</div>
       
        ))}
      </Grid>
  );
};

const PageBody = (props) => {
  const navigate = useNavigate();
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [fetchedHighJobs, setFetchedHighJobs] = useState([]);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };

  const [jobDetails, setJobDetails] = React.useState({});

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/applyJob`, {
        ...jobDetails,
        appliedBy: localStorage.getItem("email"),
      });
      console.log("applied job", response);
      setState({
        severity: "success",
        open: true,
        message: "Applied to Job Successfully!",
      });
      setIsOpen(false)
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
            experience: `${job.minimumWorkExperience}-${job.maximumWorkExperience} Yrs`,
            description: job.jobDescription,
            ...job,
          }))
        );

        
      } catch (error) {
        console.log("error", error);
        setState({
          severity: "error",
          open: true,
          message: "Error while fetching jobs",
        });
      }
    };
    fetchJobs();
  }, []);

  // useEffect(() => {
  //   const getHightJob = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/getHighPayingJobs`
  //       );
  //       console.log("hight paying jobs", response.data);
  //       setFetchedHighJobs(
  //         response.data?.map((job) => ({
  //           title: job.jobTitle,
  //           experience: `${job.minimumWorkExperience}yrs-${job.maximumWorkExperience}yrs`,
  //           description: job.jobDescription,
  //           ...job,
  //         }))
  //       );
  //     } catch (error) {
  //       console.log("error while fetching high paying jobs", error);
  //       setState({
  //         severity: "error",
  //         open: true,
  //         message: "Error while fetching high paying jobs",
  //       });
  //     }
  //   };
  //   getHightJob();
  // }, []);
  const searchJobs = async () => {
    try {
      console.log("key word", searchTerm)
      const response = await axios.get(
        `http://localhost:8080/searchJobListings?keyword=${searchTerm}`
      );
      console.log("response ffrom serach", response.data);
      setState({
        severity: "success",
        open: true,
        message: "Found Jobs",
      });
      setIsSearching(true);
      setSearchedJobs(
        response.data?.map((job) => ({
          title: job.jobTitle,
          experience: `${job.minimumWorkExperience}-${job.maximumWorkExperience} Yrs`,
          description: job.jobDescription,
          ...job,
        }))
      );
    } catch (error) {
      console.log("error while searching", error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
  };
  const items = fetchedJobs?.map((job) => (
    <Card sx={{ display: "flex", m: 2, py: 2, flexDirection: 'column',  }}>
      <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "space-between",
        // }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {job.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Exp : {job.experience}
          </Typography>
          <Typography variant="body2">{job.description}</Typography>
        </CardContent>
      </Box>
      <Button
        sx={{ mx: 3, my: 5 }}
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
  const highItems = fetchedHighJobs?.map((job) => (
    <Card sx={{ display: "flex", m: 2, py: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {job.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Exp : {job.experience}
          </Typography>
          <Typography variant="body2">{job.description}</Typography>
        </CardContent>
      </Box>
      <Button
        sx={{ mx: 3, my: 5 }}
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
  const searchItems = searchedJobs?.map((job) => (
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
const handleEnter = (event)=>{
  console.log(event)
  if (event.key === 'Enter'){
    searchJobs();
  }
 
}
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
                  <Grid container sx={{display:'flex',justifyContent:'center',mx:7}} direction="column" spacing={1}>
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
                      {jobDetails.jobDescription}
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
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" , justifyContent : "space-around"}}>
        {isSearching && <Button startIcon={<ArrowBack/>} sx={{ml : 2}}variant="contained" onClick={()=>{
          setIsSearching(false);
          setSearchTerm("");
        }}>Back</Button>}
        <TextField
          variant="outlined"
          width="50%"
          placeholder="Search..."
          fullWidth
          size="small"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          sx={{ width: "50%", marginLeft: 40, display: "inline-block" }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ backgroundColor: "whitesmoke" }}>
                <Search />
              </IconButton>
            ),
          }}
        />
        <Stack direction={"row"} spacing={2} sx={{py : 2, display : "flex", justifyContent : "center", alignItems : "center"}}>
          <Button
            variant="contained"
            onClick={() => {
              searchJobs();
            }}
          sx={{height : 50}}
          onKeyDown={handleEnter}
          >
            Search
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/viewAll");
            }}
            sx={{height : 50}}
          >
          <Typography variant="body2">View All</Typography>  
          </Button>
          <Button
            onClick={() => {
              navigate("/trackApplications");
            }}
            startIcon={<TrackChanges />}
            variant="contained"
            size="small"
            sx={{height : 50}}
          >
            <Typography variant="body2">Track Applications</Typography> 
          </Button>
        </Stack>
      </div>
      {/* <Typography variant="h5" fontWeight={600}>Trending Jobs</Typography> */}
      {!isSearching && (
        <>
        {fetchedJobs.length==0&&<Typography variant="h3" align="center" sx={{backgroundColor : indigo[100], borderRadius : 10, p :2, color : 'gray'}}>No Jobs Available</Typography>}
       <Grid container sx={{ backgroundColor: indigo[300] }} direction={'row'}>
  {fetchedJobs.map((item, index) => (
    <Grid key={index} xs={3}>
      <Card sx={{ display: "flex", m: 2, py: 2, flexDirection: 'column', height : 250 }}>
        <Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5"  fontWeight={600} sx={{my : 1}}>
              {item.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}
              
              fontWeight={600}
            >
              
                <WorkOutline sx={{ px : 1}}/>
              {" "} Exp : {item.experience}
            </Typography>
            <Typography  variant="subtitle1"
              
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}><Business sx={{ px : 1}}/> {item.employeeType}</Typography>
          <Typography  variant="subtitle1"
              
              display={'flex'}
              sx={{ alignItems : "center", my : 1 }}><LocationOnOutlinedIcon sx={{ px : 1}}/> {item.location}</Typography>
          
          </CardContent>
        </Box>
        <Button
          sx={{ mx: 3, my: 2}}
          variant="contained"
          size="small"
          onClick={() => {
            setJobDetails(item);
            setIsOpen(true);
            
          }}
        >
          Apply
        </Button>
      </Card>
    </Grid>
  ))}
</Grid>
{/* <Grid container sx={{ backgroundColor: indigo[300] }} direction={'row'}>
  {fetchedJobs.slice(0,4).map((item, index) => (
    <Grid key={index} xs={3}>
      <Card sx={{ display: "flex", m: 2, py: 2, flexDirection: 'column', height : 250  }}>
        <Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {item.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Exp : {item.experience}
            </Typography>
            <Typography variant="body2">{item.description.slice(0,70)}....</Typography>
          </CardContent>
        </Box>
        <Button
          sx={{ mx: 3, my: 5 }}
          variant="contained"
          size="small"
          onClick={() => {
            setJobDetails(item);
            setIsOpen(true);
          }}
        >
          Apply
        </Button>
      </Card>
    </Grid>
  ))}
</Grid> */}


{/* 
          <Typography variant="h5" fontWeight={600}>
            High Paying Jobs
          </Typography>
          <Box sx={{ backgroundColor: blue[300] }}>
            <Carousel items={highItems} />
          </Box> */}
        </>
      )}
      {isSearching && (
        <Grid container>
          {searchItems.length > 0 ? (
            searchItems.map((item,index) => <Grid item key={index} xs={4}>

{item}
            </Grid>)
          ) : (
            <Typography variant="h2">No Data</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default PageBody;
