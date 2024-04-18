import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Header from './Header';
import Box from '@mui/material/Box';
const JobDescription = () => {
  return (
    <div>
        <div><Header/></div>
    
    
    <Paper elevation={3} style={{  maxWidth: 900 ,alignItems:'center', marginTop:20,marginLeft:180 }}>
     
      <CardContent style={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
        <Box mt={2} >
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Box>
      </CardContent>
      
    </Paper>

    <Paper elevation={3} style={{  maxWidth: 900 ,maxHeight:400,alignItems:'center', marginTop:20,marginLeft:180 }}>
     
      <CardContent style={{ flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          Job Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description
        </Typography>
        
      </CardContent>
      
    </Paper>

    </div>
       
  )
}

export default JobDescription