import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Alert,
  CardActionArea,
  Grid,
  Icon,
  Paper,
  Snackbar,
  styled,
} from "@mui/material";
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
  const [totalCount, setTotalCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);
  const [mySubscription, setMySubscription] = useState(false);
  const [subList, setSubList] = useState([]);

  const [expriryDate, setExpiryDate] = useState('')
  const [dummy,setDummy] = useState(false)
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [onGoing, setOgoing] = useState(56);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCardSelect = (card) => setSelectedCard(card);
  const handleChnage = (e) => {
    navigate("/jobcreate");
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState((prev) => ({ ...prev, message: "", open: false }));
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
      const response = await axios.put(`http://localhost:8080/updateEmployerSubscription`, {
        subscriptionType: subs[selectedCard],
        emailId : localStorage.getItem('email')
      });
      console.log("sucesfully upgraded", response);
      const user = JSON.parse(localStorage.getItem('user'))
      const upgraded = {...user, subscriptionType : subs[selectedCard]}
      localStorage.setItem('user',JSON.stringify(upgraded))
      setState({
        severity: "success",
        open: true,
        message: "Sucesfully upgraded",
      });
      setOpen(false);
      setDummy(!dummy)
    } catch (error) {
      setState({
        severity: "error",
        open: true,
        message: error.code,
      });
      console.log("error while upgrading", error);
    }
  };
  useState(() => {
    const fetchStat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getApplicationCount?employeerMail=${localStorage.getItem(
            "email"
          )}`
        );
        const response2 = await axios.get(
          `http://localhost:8080/getSubscription?employeerMail=${localStorage.getItem(
            "email"
          )}`
        );
        const response3 = await axios.get(
          `http://localhost:8080/getRemainingJobCount?subscriptionType=${JSON.parse(localStorage.getItem(
            "user"
          )).subscriptionType}`
        );
        const response4 = await axios.get(
          `http://localhost:8080/getSubscriptions`
        );
        console.log("succesfully fetched stats", response.data);
        console.log("succesfully fetched subs", response2.data);
        console.log("succesfully fetched subs", response3.data);
        console.log("succesfully fetched subs", response4.data);



        setTotalCount(response.data.jobCount);
        setMySubscription(response2.data)
        setExpiryDate(response.data.SubscriptionExprirationDate)
        setRemainingCount(response3.data-response.data.jobCount)
        setSubList(response4.data)
      } catch (error) {
        console.log("error fetching stats", error);
        setState({
          severity: "error",
          open: true,
          message: error.code,
        });
      }
    };

    fetchStat();
  }, [dummy]);
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
          {subList?.map((sub,index)=><Card
            onClick={() => handleCardSelect(index+1)}
            style={{
              ...cardStyle,
              border: selectedCard === index+1 ? `5px solid ${blue[600]}` : "none",
              backgroundColor: selectedCard === index+1 ? "whitesmoke" : blue[300],
            }}
          >
            <CardContent>
              {JSON.parse(localStorage.getItem('user')).subscriptionType === sub.subscriptionType && (
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              )}
              <Typography variant="h5" component="h2">
                {sub.subscriptionType}
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {sub.numberOfJobs}</Typography>
              <Typography color="textSecondary">Price : {sub.price}$</Typography>

           

              {selectedCard == index+1 && mySubscription !== sub.subscriptionType && !!mySubscription && (
                <Button onClick={handleSubmit} variant="outlined">
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card>)}
          {/* <Card
            onClick={() => handleCardSelect(2)}
            style={{
              ...cardStyle,
              border: selectedCard === 2 ? `5px solid ${blue[600]}` : "none",
              backgroundColor: selectedCard === 2 ? "whitesmoke" : orange[200],
            }}
          >
            <CardContent>
              {mySubscription == "Standard" && (
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              )}
              <Typography variant="h5" component="h2">
                Standard
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {100}</Typography>

              {selectedCard == 2 && mySubscription !== "Standard" && !!mySubscription && (
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
              {mySubscription === "Premium" && (
                <Typography variant="h5" component="h2">
                  Current Plan{" "}
                  <Icon>
                    <AutoAwesome />
                  </Icon>
                </Typography>
              )}
              <Typography variant="h5" component="h2">
                Premium
              </Typography>
              <Typography color="textSecondary">Jobs Limit : {100}</Typography>

              {selectedCard == 3 && mySubscription !== "Premium" && !!mySubscription && (
                <Button onClick={handleSubmit} variant="outlined">
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card> */}
        </div>
      </Modal>
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
      <Grid container spacing={2}>
        {<Grid item xs={12} sm={6} md={3}>
          <CustomPaper onClick={() => { if(remainingCount<=0){
             setState({
              severity: "error",
              open: true,
              message: "Your subscription limit is reached, please upgrade",
            });
            }else {
              handleChnage();
            }}} gradientColor={blue[300]}>
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
        </Grid>}
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
              {totalCount}
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
              No. of Remaining{" "}
              <Icon>
                <AssignmentInd />
              </Icon>
            </Typography>
            <Typography variant="h3" color="text.secondary">
              {remainingCount}
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
            <Typography variant="h4">{JSON.parse(localStorage.getItem('user')).subscriptionType}</Typography>
            {/* <Typography variant="h6" color="black">{expriryDate}</Typography> */}
          </CustomPaper>
        </Grid>
      </Grid>
      <ActiveJobs />
    </div>
  );
};

export default PageBody;
