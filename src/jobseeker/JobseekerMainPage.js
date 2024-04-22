import React from "react";
import Header from "./Header";
import PageBody from "./PageBody";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import {
  ArrowBack,
  BackHand,
  Close,
  FirstPage,
  Forward,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  TrackChanges,
  Update,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import axios from "axios";

const JobseekerMainPage = () => {
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allMyJobs, setAllMyJobs] = useState([]);

  useState(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/myJobs?email=${localStorage.getItem("email")}`
        );
        console.log("fetched my jobs", response.data);
        setAllMyJobs(response.data);
      } catch (error) {
        console.log("error fetching your jobs", error);
      }
    };
    if (showTable) {
      fetchMyJobs();
    }
  }, [showTable]);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rows = [
    createData("Software Developer", 7, 583),
    createData("Data Analyst", 9, 214),
    createData("System Administrator", 5, 397),
    createData("Network Engineer", 6, 378),
    createData("UX Designer", 8, 141),
    createData("Product Manager", 4, 267),
    createData("Cybersecurity Specialist", 8, 697),
    createData("DevOps Engineer", 6, 329),
    createData("Quality Assurance Tester", 9, 501),
    createData("Business Analyst", 3, 185),
    createData("Project Manager", 2, 417),
    createData("IT Support Specialist", 9, 365),
    createData("Cloud Architect", 10, 278),
  ];
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
          {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
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
          {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
        </IconButton>
      </Box>
    );
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return (
    <div>
     <PageBody setShowTable={setShowTable} />
      {/* {showTable && (
        <Button
          variant="contained"
          onClick={() => {
            if(showTable)
              setShowTable(false);
          }}
          sx={{ m: 1, p: 2 }}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      )} */}
      {/* {showTable && (
        // <TableContainer component={Paper}>
        //   <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        //     <TableHead>
        //       <TableRow>
        //         <StyledTableCell>Job Title</StyledTableCell>
        //         <StyledTableCell>Experience(yrs)</StyledTableCell>
        //         <StyledTableCell>CTC(in INR, K)</StyledTableCell>
        //         <StyledTableCell align="center">Proceed</StyledTableCell>
        //         <StyledTableCell align="center">Track</StyledTableCell>
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {(rowsPerPage > 0
        //         ? rows.slice(
        //             page * rowsPerPage,
        //             page * rowsPerPage + rowsPerPage
        //           )
        //         : rows
        //       ).map((row) => (
        //         <TableRow key={row.name}>
        //           <TableCell component="th" scope="row">
        //             {row.name}
        //           </TableCell>
        //           <TableCell style={{ width: 160 }}>{row.calories}</TableCell>
        //           <TableCell style={{ width: 160 }}>{row.fat}</TableCell>
        //           <TableCell style={{ width: 160 }}>
        //             <Button
        //               variant="contained"
        //               onClick={() => {

        //               }}
        //               startIcon={<Forward />}
        //             >
        //               <Typography variant="h6">Apply</Typography>
        //             </Button>
        //           </TableCell>

        //           <TableCell style={{ width: 160 }}>
        //             <Button
        //               variant="contained"

        //               startIcon={<TrackChanges />}
        //               sx={{ backgroundColor: "success.main" }}
        //             >
        //               <Typography variant="h6">Track</Typography>
        //             </Button>
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //       {emptyRows > 0 && (
        //         <TableRow style={{ height: 53 * emptyRows }}>
        //           <TableCell colSpan={6} />
        //         </TableRow>
        //       )}
        //     </TableBody>
        //     <TableFooter>
        //       <TableRow>
        //         <TablePagination
        //           rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        //           colSpan={3}
        //           count={rows.length}
        //           rowsPerPage={rowsPerPage}
        //           page={page}
        //           slotProps={{
        //             select: {
        //               inputProps: {
        //                 "aria-label": "rows per page",
        //               },
        //               native: true,
        //             },
        //           }}
        //           onPageChange={handleChangePage}
        //           onRowsPerPageChange={handleChangeRowsPerPage}
        //           ActionsComponent={TablePaginationActions}
        //         />
        //       </TableRow>
        //     </TableFooter>
        //   </Table>
        // </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Job Title</StyledTableCell>
                <StyledTableCell>Posted By</StyledTableCell>
                <StyledTableCell>Applied By</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Job ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? allMyJobs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.job_id}>
                  <TableCell component="th" scope="row">
                    {row.job_title}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>{row.posted_by}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.applied_by}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.status}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.job_id}</TableCell>
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
      )} */}
    </div>
  );
};

export default JobseekerMainPage;
