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
  Button,
  Card,
  CardContent,
  CardMedia,
  Icon,
  Modal,
  Stack,
} from "@mui/material";
import {
  Close,
  PlayArrow,
  Search,
  SkipNext,
  SkipPrevious,
  SkipPreviousOutlined,
  TrackChanges,
} from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blue, indigo } from "@mui/material/colors";
import axios from "axios";

const ViewAll = () => {
  const navigate = useNavigate();
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [fetchedHighJobs, setFetchedHighJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const [jobDetails, setJobDetails] = React.useState({});

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/applyJob`, {
        ...jobDetails,
        appliedBy: localStorage.getItem("email"),
      });
      console.log("applied job", response);
    } catch (error) {
      console.log("error appllying", error);
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
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchJobs();
  }, []);

  const items = fetchedJobs?.map((job) => (
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
                      {jobDetails.minimumSalary}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Maximum Salary:</strong>{" "}
                      {jobDetails.maximumSalary}
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
      <Box>

        {items.length>0 ? items.map((item) => item): <Typography variant="h2">No Data</Typography>}
        </Box>
    </>
  );
};

export default ViewAll;
