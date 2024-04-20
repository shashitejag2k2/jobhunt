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
import { Button, Stack, TableHead, Typography } from "@mui/material";
import { ArrowBack, MailOutline, RemoveRedEye } from "@mui/icons-material";
import { blue, indigo } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const jobseekerRow = [
  createData("Olivia", "Orion Technologies", "ID-014"),
  createData("Noah", "NetPro Innovations", "ID-015"),
  createData("Sophia", "Swift Systems Ltd.", "ID-016"),
  createData("Liam", "Lunar Labs Inc.", "ID-017"),
  createData("Ava", "AlphaTech Solutions", "ID-018"),
  createData("William", "WebWizards Ltd.", "ID-019"),
  createData("Isabella", "Infinite IT Innovations", "ID-020"),
  createData("James", "Jupiter Software", "ID-021"),
  createData("Charlotte", "CloudCom Systems", "ID-022"),
  createData("Ethan", "EagleEye Technologies", "ID-023"),
  createData("Amelia", "Apex Solutions", "ID-024"),
  createData("Michael", "MegaByte Innovations", "ID-025"),
  createData("Emma", "Endless Systems Corp.", "ID-026"),
];
const rows = [
  createData("Software Developer", 746, 583),
  createData("Data Analyst", 932, 214),
  createData("System Administrator", 518, 397),
  createData("Network Engineer", 625, 378),
  createData("UX Designer", 802, 141),
  createData("Product Manager", 453, 267),
  createData("Cybersecurity Specialist", 859, 697),
  createData("DevOps Engineer", 675, 329),
  createData("Quality Assurance Tester", 976, 501),
  createData("Business Analyst", 833, 185),
  createData("Project Manager", 602, 417),
  createData("IT Support Specialist", 739, 365),
  createData("Cloud Architect", 720, 278),
];

export default function ActiveJobs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [jobSeekers, setJobseekers] = React.useState(null);
  const [job, setJob] = React.useState(null);
  const [seekerDetails, setSeekerDetails] = React.useState("");
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAllJobs`);
        console.log("Response for getting jobs", response);
      } catch (error) {
        console.log("error getting jobs", error);
      }
    };
    fetchData();
  }, []);
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

  return (
    <>
      <Stack direction={"column"}>
        {!job && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
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
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.calories}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.fat}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setJob(row.name);
                          setJobseekers(true);
                        }}
                      >
                        <Typography variant="h6">Proceed</Typography>
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
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setJobseekers(false);
              setJob(false);
            }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        )}
        {jobSeekers && (
          <TableContainer component={Paper} sx={{ backgroundColor: blue[100] }}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? jobseekerRow.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.calories}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.fat}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "warning.main" }}
                        startIcon={<RemoveRedEye />}
                      >
                        Start Review
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "success.main" }}
                        startIcon={<MailOutline />}
                      >
                        Send Mail
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
    </>
  );
}
