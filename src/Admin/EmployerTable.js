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
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Stack,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircleSharp,
  Error,
  MailOutline,
  RemoveRedEye,
} from "@mui/icons-material";
import { blue, indigo, orange, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
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

function createData(
  employeeId,
  name,
  emailId,
  companyName,
  subscriptionType,
  subscriptionExprirationDate
) {
  return {
    employeeId,
    name,
    emailId,
    companyName,
    subscriptionType,
    subscriptionExprirationDate,
  };
}

// const rows = [
//   createData("Alice", "Acme Technologies", "ID-001"),
//   createData("Bob", "Binary Solutions", "ID-002"),
//   createData("Charlie", "Cyber Innovations", "ID-003"),
//   createData("David", "DataWorks Inc.", "ID-004"),
//   createData("Emily", "E-Tech Enterprises", "ID-005"),
//   createData("Frank", "Future Systems Corp.", "ID-006"),
//   createData("Grace", "Global IT Solutions", "ID-007"),
//   createData("Henry", "HyperTech Labs", "ID-008"),
//   createData("Ivy", "Infinity Software", "ID-009"),
//   createData("Jack", "Java Wizards Ltd.", "ID-010"),
//   createData("Kelly", "KeyTech Innovations", "ID-011"),
//   createData("Liam", "Logic Innovations Inc.", "ID-012"),
//   createData("Mia", "MetaTech Solutions", "ID-013"),
// ];

export default function EmployerTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([
    {
      employeeId: 709733,
      name: "Shashi Teja",
      emailId: "Shashi@gmail.com.com",
      companyName: "Hitachi vantara",
      subscriptionType: "Premium",
      subscriptionExprirationDate: "2024-11-09T18:30:00.000+00:00",
    },
    {
      employeeId: 709734,
      name: "John Doe",
      emailId: "john.doe@example.com",
      companyName: "Acme Corporation",
      subscriptionType: "Standard",
      subscriptionExprirationDate: "2025-01-15T10:00:00.000+00:00",
    },
    {
      employeeId: 709735,
      name: "Jane Smith",
      emailId: "jane.smith@example.com",
      companyName: "Tech Solutions Inc.",
      subscriptionType: "Basic",
      subscriptionExprirationDate: "2024-10-22T14:45:00.000+00:00",
    },
    {
      employeeId: 709736,
      name: "Michael Johnson",
      emailId: "michael.johnson@example.com",
      companyName: "Global Technologies",
      subscriptionType: "Premium",
      subscriptionExprirationDate: "2024-12-30T16:20:00.000+00:00",
    },
    {
      employeeId: 709737,
      name: "Emily Wang",
      emailId: "emily.wang@example.com",
      companyName: "Innovative Solutions",
      subscriptionType: "Standard",
      subscriptionExprirationDate: "2024-09-18T09:00:00.000+00:00",
    },
    {
      employeeId: 709738,
      name: "Alexandre Dupont",
      emailId: "alexandre.dupont@example.com",
      companyName: "Visionary Enterprises",
      subscriptionType: "Premium",
      subscriptionExprirationDate: "2025-03-05T13:10:00.000+00:00",
    },
    {
      employeeId: 709739,
      name: "Aisha Khan",
      emailId: "aisha.khan@example.com",
      companyName: "Future Systems Ltd",
      subscriptionType: "Basic",
      subscriptionExprirationDate: "2024-11-22T08:30:00.000+00:00",
    },
    {
      employeeId: 709740,
      name: "Matthew Brown",
      emailId: "matthew.brown@example.com",
      companyName: "GlobalTech Solutions",
      subscriptionType: "Standard",
      subscriptionExprirationDate: "2025-02-14T11:45:00.000+00:00",
    },
    {
      employeeId: 709741,
      name: "Elena Rodriguez",
      emailId: "elena.rodriguez@example.com",
      companyName: "Innovatech Inc.",
      subscriptionType: "Premium",
      subscriptionExprirationDate: "2024-10-01T20:15:00.000+00:00",
    },
    {
      employeeId: 709742,
      name: "Chen Wei",
      emailId: "chen.wei@example.com",
      companyName: "Future Solutions Co.",
      subscriptionType: "Basic",
      subscriptionExprirationDate: "2025-01-30T17:30:00.000+00:00",
    },
  ]);
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [open, setOpen] = useState(false);

  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
  };
  const handleSubmit = () => {
    // Handle form submission here
    console.log("Field 1:", field1);
    console.log("Field 2:", field2);
    // Close the modal after submission
    onClose();
  };
  React.useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getEmployes`);
        console.log("employers list", response.data);
        setRows([]);

        //   {
        //     "employeeId": 709733,
        //     "name": "Shashi Teja",
        //     "emailId": "Shashi@gmail.com.com",
        //     "password": "password123",
        //     "companyName": "Hitachi vantara",
        //     "subscriptionType": "Premium",
        //     "subscriptionExprirationDate": "2024-11-09T18:30:00.000+00:00"
        // },
      } catch (error) {
        console.log("error", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    fetchEmployers();
  }, []);
  React.useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getSubscriptions`);
        setSubscriptions(response.data);
      } catch (error) {
        console.log("error while fetching subs", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };
    fetchSubs();
  }, []);
  const CustomPaper = styled(Paper)(({ theme, gradientColor }) => ({
    // maxWidth: 200,
    minHeight: 100, // Minimum height
    padding: theme.spacing(2),
    margin: 3,
    borderRadius: 5,
    backgroundColor: gradientColor, // Default gradient background
    color: theme.palette.common.white,
    cursor: "pointer",
    transition: "background-image 0.3s ease", // Transition effect for smooth hover
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #38f9d7 0%, #43e97b 100%)", // Gradient background on hover
    },
  }));
  // const rows = employers.map((employer)=>createData(employer))
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleStatus = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/updateEmployerStatus`
      );
      console.log("Successfully updated status", response.data);
      setState({
        severity: "success",
        open: true,
        message: "Succesfully updated!",
      });
    } catch (error) {
      console.log("error while updating", error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    }
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
  return (
    <>
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
      <Grid container spacing={2} direction="row">
        {/* Card for Editing Subscription */}

        {subscriptions.map((sub, index) => (
          <Grid item xs={3} key={index}>
            <CustomPaper sx={{ backgroundColor: yellow[200] }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="black"
                >
                  {sub.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Limit : {sub.limit} Applicants
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Duration : {sub.duration}
                </Typography>
              </CardContent>
            </CustomPaper>
          </Grid>
        ))}
      </Grid>
      <Stack direction={"column"}>
        <TableContainer component={Paper} sx={{}}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Company Name</StyledTableCell>
                <StyledTableCell>Subscription</StyledTableCell>
                <StyledTableCell>Expiration</StyledTableCell>
                <StyledTableCell align="center">Approve</StyledTableCell>
                <StyledTableCell align="center">Reject</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.employeeId}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>{row.name}</TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.companyName}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.subscriptionType}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {new Date(row.subscriptionExprirationDate).toLocaleString()}
                  </TableCell>
                  {/* <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "warning.main" }}
                      startIcon={<RemoveRedEye />}
                    >
                      View
                    </Button>
                  </TableCell> */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "success.main" }}
                      startIcon={<CheckCircleSharp />}
                      onClick={() => {
                        handleStatus("approve");
                      }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "error.main" }}
                      startIcon={<Error />}
                      onClick={() => {
                        handleStatus("reject");
                      }}
                    >
                      Reject
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
      </Stack>
    </>
  );
}
