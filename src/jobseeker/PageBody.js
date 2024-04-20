import React, { useRef } from "react";
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
import { Button, Card, CardContent, CardMedia, Stack } from "@mui/material";
import {
  PlayArrow,
  Search,
  SkipNext,
  SkipPrevious,
  SkipPreviousOutlined,
} from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blue, indigo } from "@mui/material/colors";

const cardData = [
  {
    title: "Live From Space",
    artist: "Mac Miller",
    image: "/static/images/cards/live-from-space.jpg",
  },
  // Add more card data as needed
];

// const Carousel = ({ items }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     centerMode: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="carousel-container">
//       <Slider {...settings}>
//         {items.map((item, index) => (
//           <div key={index}>
//             <div className="carousel-item" color="black">
//               {item}
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };
const Carousel = ({ items }) => {
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: autoplay,
  //   autoplaySpeed: 2000,
  //   centerMode: true,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const handlePauseAutoplay = () => {
    setAutoplay(false);
  };

  const handleGoToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const handleGoToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const handleMoreJobs = () => {
    // Your logic to handle "More Jobs" button click
    alert("More jobs!");
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        {items.map((item, index) => (
          <div key={index}>
            <div className="carousel-item">{item}</div>
            {index === 10 && (
              <div className="more-jobs-button">
                <button onClick={handleMoreJobs}>More Jobs</button>
              </div>
            )}
          </div>
        ))}
      </Slider>
      <div className="carousel-navigation">
        <button className="prev-button" onClick={handleGoToPrevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="next-button" onClick={handleGoToNextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <button className="pause-button" onClick={handlePauseAutoplay}>
          <i className="fas fa-pause"></i>
        </button>
      </div>
    </div>
  );
};

const jobs = [
  {
    title: "Software Engineer",
    experience: "5+ years",
    description: "Join our innovative tech company and work on cutting-edge projects.",
  },
  {
    title: "Data Scientist",
    experience: "3+ years",
    description: "Be part of our data science team and solve complex analytical problems.",
  },
  {
    title: "Product Manager",
    experience: "7+ years",
    description: "Lead the development of our flagship products and drive business growth.",
  },
  {
    title: "UX Designer",
    experience: "4+ years",
    description: "Craft intuitive user experiences that delight our customers.",
  },
  {
    title: "Marketing Analyst",
    experience: "2+ years",
    description: "Analyze market trends and consumer behavior to drive marketing strategies.",
  },
  {
    title: "Frontend Developer",
    experience: "3+ years",
    description: "Create beautiful and responsive user interfaces for our web applications.",
  },
  {
    title: "HR Manager",
    experience: "6+ years",
    description: "Lead our human resources team and foster a positive work environment.",
  },
  {
    title: "Financial Analyst",
    experience: "4+ years",
    description: "Analyze financial data to provide insights and support strategic decisions.",
  },
  {
    title: "Sales Executive",
    experience: "2+ years",
    description: "Drive sales growth and build strong relationships with our clients.",
  },
  {
    title: "Customer Support",
    experience: "1+ years",
    description: "Provide exceptional customer service and support to our valued customers.",
  },
];
const items = jobs.map((job) => (
  <Card sx={{ display: "flex", m: 2, py : 6 }}>
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent : 'space-between' }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Exp : {job.experience}
        </Typography>
        <Typography variant="body2">
          {job.description}
        </Typography>
      </CardContent>
    </Box>
    <Button sx={{mx : 3, my : 5}} variant="contained" size="small">
      Apply
    </Button>
  </Card>
));

const PageBody = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <TextField
          variant="outlined"
          width="50%"
          placeholder="Search..."
          fullWidth
          size="small"
          sx={{ width: "50%", marginLeft: 40, display: "inline-block" }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ backgroundColor: "whitesmoke" }}>
                <Search />
              </IconButton>
            ),
          }}
        />
        <Stack direction={'row'} spacing={2}>
        <Button variant="contained">Search</Button>
        <Button variant="contained" onClick={()=>{props.setShowTable(true)}}>View All</Button>
        </Stack>
       
      </div>
      <Typography variant="h5" fontWeight={600}>Trending Jobs</Typography>
      <Box sx={{ backgroundColor: indigo[300] }}>
        <Carousel items={items} />
      </Box>

      <Typography variant="h5" fontWeight={600}>High Paying Jobs</Typography>
      <Box sx={{ backgroundColor: blue[300] }}>
        <Carousel items={items} />
      </Box>
    </div>
  );
};

export default PageBody;
