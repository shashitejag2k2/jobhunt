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
  Checkbox,
  FormControlLabel,
  Icon,
  MenuItem,
  Modal,
  Select,
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
  const [experienceFrom, setExperienceFrom] = useState("");
  const [experienceTo, setExperienceTo] = useState("");
  const [employeeType, setEmployeeType] = useState([]);
  const [keySkills, setKeySkills] = useState([]);
  const [location, setLocation] = useState([]);
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [jobMode, setJobMode] = useState([]);

  const handleApplyFilters = () => {
    const filters = {
      experience: { from: experienceFrom, to: experienceTo },
      employeeType,
      keySkills,
      location,
      salary: { from: salaryFrom, to: salaryTo },
      jobMode,
    };

    // Apply filters to fetchedJobs
    const filteredResult = fetchedJobs.filter((job) => {
      // Apply each filter condition
      const isExperienceInRange =
        (!filters.experience.from ||
          parseFloat(job.experience) >= parseFloat(filters.experience.from)) &&
        (!filters.experience.to ||
          parseFloat(job.experience) <= parseFloat(filters.experience.to));

      const isEmployeeTypeMatch =
        filters.employeeType.length === 0 ||
        filters.employeeType.includes(job.employeeType);

      const isKeySkillsMatch =
        filters.keySkills.length === 0 ||
        filters.keySkills.every((skill) => job.keySkills.includes(skill));

      const isLocationMatch =
        filters.location.length === 0 ||
        filters.location.includes(job.location);

      const isSalaryInRange =
        (!filters.salary.from ||
          parseFloat(job.salary) >= parseFloat(filters.salary.from)) &&
        (!filters.salary.to ||
          parseFloat(job.salary) <= parseFloat(filters.salary.to));

      const isJobModeMatch =
        filters.jobMode.length === 0 || filters.jobMode.includes(job.jobMode);

      // Return true if all conditions are met
      return (
        isExperienceInRange &&
        isEmployeeTypeMatch &&
        isKeySkillsMatch &&
        isLocationMatch &&
        isSalaryInRange &&
        isJobModeMatch
      );
    });

    // Update filtered jobs state
    setFetchedJobs(filteredResult);
  };

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
      <Stack direction={"row"} spacing={2}>
        <div style={{ backgroundColor: blue[100], height: "100vh" }}>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            sx={{ m: 2 }}
          >
            Apply Filters
          </Button>
          <Grid container spacing={2} direction={"column"}>
            <Grid
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
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ display: "inline-block" }}>
                Job Type:{" "}
              </Typography>{" "}
              <Select
                sx={{ width: "50%" }}
                multiple
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
                label="Employee Type"
              >
                <MenuItem value="fulltime">Full-time</MenuItem>
                <MenuItem value="parttime">Part-time</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ display: "inline-block" }}>Skills: </Typography>{" "}
              <Select
                sx={{ width: "50%" }}
                multiple
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                label="Key Skills"
              >
                <MenuItem value="nodejs">Node.js</MenuItem>
                <MenuItem value="mern">MERN Stack</MenuItem>
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="mongodb">MongoDB</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ display: "inline-block" }}>
                Location:{" "}
              </Typography>
              <Select
                sx={{ width: "60%" }}
                multiple
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
              >
                <MenuItem value="hyderabad">Hyderabad</MenuItem>
                <MenuItem value="pune">Pune</MenuItem>
                <MenuItem value="mumbai">Mumbai</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}>
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
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ display: "inline-block" }}>
                Job Mode:{" "}
              </Typography>
              <Select
                sx={{ width: "50%" }}
                multiple
                value={jobMode}
                onChange={(e) => setJobMode(e.target.value)}
                label="Job Mode"
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
                <MenuItem value="onsite">Onsite</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </div>
        <Box>
          {items.length > 0 ? (
            items.map((item) => item)
          ) : (
            <Typography variant="h2">No Data</Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default ViewAll;
