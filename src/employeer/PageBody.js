import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Icon, Paper, styled } from "@mui/material";
import ActiveJobs from "./ActiveJobs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { blue, green, indigo, orange, red } from "@mui/material/colors";
import { Modal, Button } from "@mui/material";
import {
  AssessmentOutlined,
  AssignmentInd,
  AutoAwesome,
  Person2,
} from "@mui/icons-material";
import axios from "axios";

const cardStyle = {
  minWidth: 275,
  maxWidth: 300,
  margin: "20px",
  cursor: "pointer",
};

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const subs = {
  1: "Basic",
  2: "Standard",
  3: "Premium",
};
const PageBody = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCardSelect = (card) => setSelectedCard(card);
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
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/upgradeSub`, {
        subscription: subs[selectedCard],
      });
      console.log("sucesfully upgraded", response);
      setOpen(false);
    } catch (error) {
      console.log("error while upgrading", error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="selectable-cards-modal"
        aria-describedby="modal-with-selectable-cards"
        style={modalStyle}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Card
            onClick={() => handleCardSelect(1)}
            style={{
              ...cardStyle,
              border: selectedCard === 1 ? `5px solid ${blue[600]}` : "none",
              backgroundColor: selectedCard === 1 ? "whitesmoke" : blue[300],
            }}
          >
            <CardContent>
              {
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              }
              <Typography variant="h5" component="h2">
                Basic
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {10}</Typography>
              <Typography color="textSecondary">
                Subscription Date : {"10-02-2024"}
              </Typography>
              <Typography color="textSecondary">
                Duration : {3} Months
              </Typography>
              {selectedCard == 1 && (
                <Button onClick={handleSubmit} variant="outlined">
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card>
          <Card
            onClick={() => handleCardSelect(2)}
            style={{
              ...cardStyle,
              border: selectedCard === 2 ? `5px solid ${blue[600]}` : "none",
              backgroundColor: selectedCard === 2 ? "whitesmoke" : orange[200],
            }}
          >
            <CardContent>
            {
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              }
              <Typography variant="h5" component="h2">
                Standard
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {100}</Typography>
              <Typography color="textSecondary">
                Duration : {10} Months
              </Typography>
              {selectedCard == 2 && (
                <Button onClick={handleSubmit} variant="outlined">
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card>
          <Card
            onClick={() => handleCardSelect(3)}
            style={{
              ...cardStyle,
              border: selectedCard === 3 ? `5px solid ${blue[600]}` : "none",
              backgroundColor: selectedCard === 3 ? "whitesmoke" : red[200],
            }}
          >
            <CardContent>
            {
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              }
              <Typography variant="h5" component="h2">
                Premium
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {100}</Typography>
              <Typography color="textSecondary">Duration : {20} Months</Typography>
              {selectedCard == 3 && (
                <Button onClick={handleSubmit} variant="outlined">
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </Modal>
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
          <CustomPaper gradientColor={orange[300]}>
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
          <CustomPaper gradientColor={indigo[200]}>
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
          <CustomPaper onClick={handleOpen} gradientColor={green[400]}>
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
