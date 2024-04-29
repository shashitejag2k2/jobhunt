import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Alert,
  Button,
  Grid,
  Icon,
  Modal,
  Snackbar,
  Stack,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Close,
  DoneAllRounded,
  Error,
  Forward,
  MailOutline,
  RemoveRedEye,
  Update,
  ViewAgenda,
} from "@mui/icons-material";
import { blue, indigo } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(jobDetails) {
  const {
    jobId,
    jobTitle,
    jobPositioning,
    employeeType,
    jobDescription,
    keySkills,
    minimumWorkExperience,
    maximumWorkExperience,
    location,
    jobMode,
    educationalQualification,
    companyName,
    minimumSalary,
    maximumSalary,
    postedBy,
    jobApplicationStatus
  } = jobDetails;

  return {
    jobId,
    jobTitle,
    jobPositioning,
    employeeType,
    jobDescription,
    keySkills,
    minimumWorkExperience,
    maximumWorkExperience,
    location,
    jobMode,
    educationalQualification,
    companyName,
    minimumSalary,
    maximumSalary,
    postedBy,
    jobApplicationStatus
  };
}

// const jobseekerRow = [
//   createData("Olivia", "Orion Technologies", "ID-014"),
//   createData("Noah", "NetPro Innovations", "ID-015"),
//   createData("Sophia", "Swift Systems Ltd.", "ID-016"),
//   createData("Liam", "Lunar Labs Inc.", "ID-017"),
//   createData("Ava", "AlphaTech Solutions", "ID-018"),
//   createData("William", "WebWizards Ltd.", "ID-019"),
//   createData("Isabella", "Infinite IT Innovations", "ID-020"),
//   createData("James", "Jupiter Software", "ID-021"),
//   createData("Charlotte", "CloudCom Systems", "ID-022"),
//   createData("Ethan", "EagleEye Technologies", "ID-023"),
//   createData("Amelia", "Apex Solutions", "ID-024"),
//   createData("Michael", "MegaByte Innovations", "ID-025"),
//   createData("Emma", "Endless Systems Corp.", "ID-026"),
// ];

const initialValues = {
  employeeType: "",
  jobDescription: "",
  keySkills: "",
  minimumWorkExperience: "",
  maximumWorkExperience: "",
  location: "",
  educationalQualification: "",
  companyName: "",
  salary: "",
  jobTitle: "",
  minimumSalary: "",
  maximumSalary: "",
  jobMode: "",
};
export default function ActiveJobs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [jobSeekers, setJobseekers] = React.useState(null);
  const [job, setJob] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues);
  const [openCloseJobModal, setOpenCloseJobModal] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [jobDetails, setJobDetails] = React.useState({});
  const [dummy, setDummy] = React.useState(false);
  const [jobseekerRow, setJobSeekerRow] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobClose,setJobClose] = useState('')
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const handleOpenCloseJobModal = () => setOpenCloseJobModal(true);
  const handleCloseCloseJobModal = () => setOpenCloseJobModal(false);

  const handleConfirmCloseJob = async () => {
    // Add logic to confirm closing the job
    try {
      const response = await axios.put(
        `http://localhost:8080/updateJobApplicationStatus?jobId=${jobDetails.jobId}`
      );
      console.log("closed application", response);
    } catch (error) {
      console.log(error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
    console.log("Job closed");
    handleCloseCloseJobModal();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getalljobs?postedBy=${localStorage.getItem(
            "email"
          )}`
        );
        console.log("Response for getting jobs", response);
        setJobs(response.data);
      } catch (error) {
        console.log("error getting jobs", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    fetchData();
  }, [dummy]);

  useEffect(() => {
    const getJobseekers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getSeekersByJob?employeerMail=${localStorage.getItem(
            "email"
          )}&jobId=${job}`
        );
        console.log("response of job seekers", response.data);
        setJobSeekerRow(response.data);
      } catch (error) {
        console.log("error while job seekers", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    if (jobSeekers) {
      getJobseekers();
    }
  }, [jobSeekers]);
  const rows = jobs.map((job) => createData(job));
  const [seekerDetails, setSeekerDetails] = React.useState("");
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleApplicationCLose = async()=>{
    try {
     const response = await axios.put(`http://localhost:8080/updateJobApplicationStatus?jobId=${jobClose}`);
     console.log('updated succesfully',response)
     setState({
      severity: "success",
      open: true,
      message: "Job updated Succesfully",
    });
    setDummy(!dummy)
    handleCloseCloseJobModal();
    } catch (error) {
      console.log("error while updating",error)
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
  }
  const handleSubmit = async () => {
    console.log("Form submitted:", formValues);
    try {
      const response = await axios.put(
        `http://localhost:8080/updateJob`,
        formValues
      );
      console.log("the job is upated", response);
      setState({
        severity: "success",
        open: true,
        message: "Job updated Succesfully",
      });
      setDummy(!dummy);
    } catch (error) {
      console.log("error while updating job", error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
    handleClose(); // Close the modal after submission
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleMail = async (obj) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/Mail?employeerEmailId=${localStorage.getItem(
          "email"
        )}&jobseekerMailId=${obj.emailId}&username=${obj.name}&status=${
          obj.status
        }&jobId=${job}`
      );
      const response2 = await axios.post(`http://localhost:8080/updateStatus`, {
        appliedBy: obj.emailId,
        jobId: job,
        status: obj.status,
      });
      console.log("status updated", response2.data);
      console.log("mail sent succesfully", response.data);
      setState({
        severity: "success",
        open: true,
        message: "Mail Sent",
      });
    } catch (error) {
      console.log("Error while sending mail", error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="employeeType"
                label="Employee Type"
                value={formValues.employeeType}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="jobDescription"
                label="Job Description"
                value={formValues.jobDescription}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="keySkills"
                label="Key Skills"
                value={formValues.keySkills}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="minimumWorkExperience"
                label="Work Experience"
                value={formValues.minimumWorkExperience}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="maximumWorkExperience"
                label="Work Experience"
                value={formValues.maximumWorkExperience}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="location"
                label="Location"
                value={formValues.location}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="educationalQualification"
                label="Educational Qualification"
                value={formValues.educationalQualification}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                value={formValues.companyName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="minimumSalary"
                label="Salary"
                value={formValues.minimumSalary}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="maximumSalary"
                label="Salary"
                value={formValues.maximumSalary}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="jobTitle"
                label="Job Title"
                value={formValues.jobTitle}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="jobMode"
                label="Job Mode"
                value={formValues.jobMode}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openCloseJobModal}
        onClose={handleCloseCloseJobModal}
        aria-labelledby="close-job-modal-title"
        aria-describedby="close-job-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 10,
            border: "4px solid black",
          }}
        >
          <h2 id="close-job-modal-title">Confirm Close Job</h2>
          <p id="close-job-modal-description">
            Are you sure you want to close this job?
          </p>
          <Button
            onClick={handleApplicationCLose}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Confirm
          </Button>
          <Button
            onClick={handleCloseCloseJobModal}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
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
                <Grid item sx={{display: 'flex', justifyContent : 'center', alignItems : "center",mx:7}}>
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
                    <Box >

                    {/* <Typography variant="body1">
                      <strong>Job Description:</strong>{" "}
                      {jobDetails.jobDescription.slice(0,100)}
                    </Typography>
                    <Typography variant="body1">
                      {jobDetails.jobDescription.slice(200,300)}
                    </Typography>
                    <Typography variant="body1">
                      {jobDetails.jobDescription.slice(300,jobDetails.jobDescription.length)}
                    </Typography> */}
                    <Typography variant="body1">
                      <strong>Job Description:</strong>{" "}
                      {jobDetails.jobDescription}
                    </Typography>
                    </Box>
                   
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
      <Stack direction={"column"}>
        {!job && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Job ID</StyledTableCell>
                  <StyledTableCell>Job Title</StyledTableCell>

                  <StyledTableCell>Job Type</StyledTableCell>
                  <StyledTableCell>Job Location</StyledTableCell>
                  <StyledTableCell align="center">View</StyledTableCell>
                  <StyledTableCell align="center">Proceed</StyledTableCell>
                  <StyledTableCell align="center">Update</StyledTableCell>
                  <StyledTableCell align="center">Close</StyledTableCell>
                </TableRow>
              </TableHead>
              {rows.length > 0 && <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{ width: 160 }}>{row.jobId}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.jobTitle}
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      {row.employeeType}
                    </TableCell>
                    <TableCell style={{ width: 160 }}>{row.location}</TableCell>
                    <TableCell style={{ width: 160 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setJobDetails(row);
                          setIsOpen(true);
                        }}
                        startIcon={<ViewAgenda />}
                      >
                        <Typography variant="h6">view</Typography>
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setJob(row.jobId);
                          setJobseekers(true);
                          setJobTitle(row.jobTitle);
                        }}
                        startIcon={<Forward />}
                      >
                        <Typography variant="h6">Proceed</Typography>
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpen();
                          setJobDetails(row);
                          setFormValues(row);
                        }}
                        sx={{ backgroundColor: "warning.main" }}
                        startIcon={<Update />}
                      >
                        <Typography variant="h6">Update</Typography>
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenCloseJobModal();
                          setJobDetails(row);
                          setJobClose(row.jobId)
                        }}
                        disabled={row.jobApplicationStatus == 'closed'}
                        startIcon={<Close />}
                        sx={{ backgroundColor: "error.main" }}
                      >
                        <Typography variant="h6">Close</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>}
              {rows.length == 0 && <TableBody>
                <Typography  align="center"variant="h4" color="gray"sx={{backgroundColor:indigo[100], borderRadius:5, p  :4, width : '100%'}}> create jobs to view here</Typography>
                </TableBody>}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Stack>
      <Stack direction={"column"}>
        {jobSeekers && (
          <Grid conatainer >
<Grid item xs={2}>
<Button
            variant="contained"
            size="small"
            onClick={() => {
              setJobseekers(false);
              setJob(false);
            }}
            sx={{  m: 3 ,p :2 }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
  </Grid>
  <Grid item xs={10}>

  </Grid>

            </Grid>
          
        )}
        {/* {
        "jobSeekerId": 1,
        "name": "Shashi Teja",
        "emailId": "shashiteja@gmail.com",
        "password": "12345",
        "collegeName": "CMR",
        "experience": 2,
        "skills": "java,react,springboot,aws"
    }, */}
        {jobSeekers && (
          <TableContainer component={Paper} sx={{ backgroundColor: blue[100] }}>
            <Typography variant="h4" sx={{backgroundColor : indigo[100], borderRadius : 5, p : 2}}>{jobTitle}</Typography>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Job Seeker ID</StyledTableCell>
                  <StyledTableCell align="center">name</StyledTableCell>
                  <StyledTableCell align="center">Email ID</StyledTableCell>
                  <StyledTableCell align="center">College Name</StyledTableCell>
                  <StyledTableCell align="center">Experience</StyledTableCell>
                  <StyledTableCell align="center">Skills</StyledTableCell>
                  <StyledTableCell align="center">Review</StyledTableCell>
                  <StyledTableCell align="center">Approve</StyledTableCell>
                  <StyledTableCell align="center">Reject</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? jobseekerRow.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : jobseekerRow
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.jobSeekerId}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.emailId}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.collegeName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.experience}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.skills}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "warning.main", p: 2 }}
                        onClick={() => handleMail({ status: "review", ...row })}
                      >
                        <Icon>
                          <RemoveRedEye />
                        </Icon>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "success.main", p: 2 }}
                        onClick={() =>
                          handleMail({ status: "approve", ...row })
                        }
                        disabled={row.status=='approve' || row.status == 'review'}
                      >
                        <Icon>
                          <DoneAllRounded />
                        </Icon>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "error.main", p: 2 }}
                        onClick={() => handleMail({ status: "reject", ...row })}
                        disabled={row.status=='approve'}
                      >
                        <Icon>
                          <Error />
                        </Icon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {jobseekerRow.length == 0 && <TableBody >
                <Typography variant="h4" align="center" color="gray" sx={{backgroundColor:indigo[100], borderRadius:5, p  :4, width : '100%'}}> No Applicants for this job</Typography>
                </TableBody>}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Box>
  );
}
