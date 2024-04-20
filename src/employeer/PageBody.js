import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Icon, Paper, styled } from "@mui/material";
import ActiveJobs from "./ActiveJobs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { blue, green, indigo, orange } from "@mui/material/colors";
import {
  AssessmentOutlined,
  AssignmentInd,
  AutoAwesome,
  Person2,
} from "@mui/icons-material";
const PageBody = () => {
  const navigate = useNavigate();
  const handleChnage = (e) => {
    navigate("/jobcreate");
  };
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomPaper onClick={handleChnage} gradientColor={blue[300]}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="black"
              fontWeight={600}
            >
              Create A Job{" "}
              <Icon>
                <AddCircleIcon />
              </Icon>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Click to create
            </Typography>
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomPaper onClick={handleChnage} gradientColor={orange[300]}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="black"
              fontWeight={600}
            >
              No. of Applications{" "}
              <Icon>
                <Person2 />
              </Icon>
            </Typography>
            <Typography variant="h3" color="text.secondary">
              {347}
            </Typography>
          </CustomPaper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CustomPaper onClick={handleChnage} gradientColor={indigo[200]}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="black"
              fontWeight={600}
            >
              No. of Ongoing{" "}
              <Icon>
                <AssignmentInd />
              </Icon>
            </Typography>
            <Typography variant="h3" color="text.secondary">
              {45}
            </Typography>
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomPaper onClick={handleChnage} gradientColor={green[400]}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="black"
              fontWeight={600}
            >
              My Subscription{" "}
              <Icon>
                <AutoAwesome />
              </Icon>
            </Typography>
            <Typography variant="h4">{"Basic"}</Typography>
          </CustomPaper>
        </Grid>
      </Grid>
      <ActiveJobs />
    </div>
  );
};

export default PageBody;
