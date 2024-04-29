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
  Icon,
  Modal,
  Snackbar,
  Stack,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  CheckCircleSharp,
  Error,
  MailOutline,
  PlusOneRounded,
  RemoveRedEye,
} from "@mui/icons-material";
import { blue, indigo, orange, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


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

export default function EmployerTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open,setOpen] = useState(false)
const [subId,setSubID] = useState(null)
const [dummy,setDummy] = useState(false)
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const validationSchema = Yup.object().shape({
    subscriptionType: Yup.string().required("Subscription type is required"),
    numberOfJobs: Yup.number()
      .required("Number of jobs is required")
      .positive("Number of jobs must be positive"),
    // duration: Yup.number()
    //   .required("Duration is required")
    //   .positive("Duration must be positive"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
  });

 
    const formik = useFormik({
      initialValues: {
        subscriptionType: '',
        numberOfJobs: 0,
        // duration: 0,
        price: 0,
      },
      validationSchema,
      onSubmit: (values) => {
        axios.put('http://localhost:8080/updateSubscription', {id:subId,...values})
          .then((response) => {
            console.log('Subscription updated successfully', response.data);
            setState({
              severity: "success",
              open: true,
              message: "Succesfully updated subscription!",
            });
            onClose();
          })
          .catch((error) => {
            console.error('Error updating subscription', error);
            setState({
              severity: "error",
              open: true,
              message: error.code,
            });
          });
      },
    });
  
  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };
  const onClose = () => {
    setOpen(false);
    setSubID(null);
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
        setRows(response.data);

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
  }, [dummy]);
  React.useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getSubscriptions`
        );
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
  }, [open]);
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
  const handleStatus = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/postStatus?status=${data.status}&emailId=${data.emailId}`
      );
      console.log("Successfully updated status", response.data);
      setState({
        severity: "success",
        open: true,
        message: "Succesfully updated!",
      });
      setDummy(!dummy)
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
  const handleAdd = (values)=>{
    axios.post(`http://localhost:8080/createSubscription`,values)
    .then((response) => {
      console.log('Subscription updated successfully', response.data);
      setState({
        severity: "success",
        open: true,
        message: "Succesfully created subscription!",
      });
      onClose();
    })
    .catch((error) => {
      console.error('Error adding subscription', error);
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
    });
  }
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
      <Modal open={open} onClose={onClose}>
      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor : "white", boxShadow: 24, p: 4, width: 400 }}>
        <form onSubmit={formik.handleSubmit} style={{backgroundColor : "white", padding:4}}>
          <Stack spacing={2}>

          <TextField
            fullWidth
            id="subscriptionType"
            name="subscriptionType"
            label="Subscription Type"
            value={formik.values.subscriptionType}
            onChange={formik.handleChange}
            error={formik.touched.subscriptionType && Boolean(formik.errors.subscriptionType)}
            helperText={formik.touched.subscriptionType && formik.errors.subscriptionType}
          />
          <TextField
            fullWidth
            id="numberOfJobs"
            name="numberOfJobs"
            type="number"
            label="Number of Jobs"
            value={formik.values.numberOfJobs}
            onChange={formik.handleChange}
            error={formik.touched.numberOfJobs && Boolean(formik.errors.numberOfJobs)}
            helperText={formik.touched.numberOfJobs && formik.errors.numberOfJobs}
          />
          {/* <TextField
            fullWidth
            id="duration"
            name="duration"
            type="number"
            label="Duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          /> */}
          <TextField
            fullWidth
            id="price"
            name="price"
            type="number"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          </Stack>
        
          {subId!==null && <Button type="submit" variant="contained" color="primary">
            Update
          </Button>}
          {subId == null && <Button onClick={()=>{handleAdd(formik.values)}} variant="contained" color="primary">
            Add Subscription
          </Button> }
        </form>
      </Box>
    </Modal>
      <Grid container spacing={2} direction="row">
        {/* Card for Editing Subscription */}

        {subscriptions.map((sub, index) => (
          <Grid item xs={3} key={index} onClick={()=>{setOpen(true); setSubID(sub.id);
           formik.setFieldValue('subscriptionType', sub.subscriptionType)
           formik.setFieldValue('numberOfJobs', parseInt(sub.numberOfJobs))

           formik.setFieldValue('duration', sub.duration)
           formik.setFieldValue('price', sub.price)

           
           }}>
            <CustomPaper sx={{ backgroundColor: yellow[200] }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="black"
                >
                  {sub.subscriptionType}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Limit : {sub.numberOfJobs} Applicants
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  Duration : {sub.duration} Months
                </Typography> */}
                <Typography variant="body2" color="textSecondary" component="p">
                  Price : {sub.price} $
                </Typography>
              </CardContent>
            </CustomPaper>
          </Grid>
        ))}
        <Grid item xs={3} onClick={()=>{setOpen(true);}}>
        <CustomPaper sx={{ backgroundColor: yellow[200] }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  color="black"
                >
                  Create New Subscription
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                 <Icon>
                  <Add/>
                  </Icon> Click here
                </Typography>
              </CardContent>
            </CustomPaper>
        </Grid> 
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
                {/* <StyledTableCell>Expiration</StyledTableCell> */}
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
                  {/* <TableCell style={{ width: 160 }}>
                    {new Date(row.subscriptionExprirationDate).toLocaleString()}
                  </TableCell> */}
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
                        handleStatus({ status : "approve", emailId  :row.emailId });
                      }}
                      disabled={row.status == 'approve' || row.status == 'reject'}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "error.main" }}
                      startIcon={<Error />}
                      disabled={row.status == 'reject'}

                      onClick={() => {
                        handleStatus({ status : "reject", emailId  :row.emailId });
                        
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
