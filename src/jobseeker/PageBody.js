import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const PageBody = () => {
    const navigate = useNavigate();
    const redirect = (e)=>{
        navigate('/jobdescription')
    
    }

  return (
    <div>
    <div style={{ display: 'flex', alignItems: 'center',marginTop: '20px' }}>
      <TextField
        variant="outlined"
        width="50%"
        placeholder="Search..."
        fullWidth
        size="small"
        sx={{ width: '50%',marginLeft:40 }}
        InputProps={{
          endAdornment: (
            <IconButton>
              
            </IconButton>
          ),
        }}
      />
    </div>
    <Typography>Trending Jobs</Typography>
    <Box
    width="100%"
    height="200px"
    bgcolor="#f0f0f0" 
    display="flex"
    alignItems="center" 
    justifyContent="space-around" 
  >
     <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 300,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={1} onClick={redirect}>
        
        <Grid item xs={12} sm container sx={{cursor: 'pointer'}}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                FullStack Developer
              </Typography>
              <Typography variant="body2" gutterBottom>
                Skills & Experience Needed: BTech
              </Typography>
              <Typography variant="body2" color="text.secondary">
                0-5 Yrs
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Hyderabad
              </Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Paper>
</Box>

<Typography>High Paying Jobs</Typography>
    <Box
    width="100%"
    height="200px"
    bgcolor="#f0f0f0" 
    display="flex"
    alignItems="center" 
    justifyContent="space-around" 
  >
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 300,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={1}>
        
        <Grid item xs={2} sm container sx={{cursor: 'pointer'}}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Backend Developer
              </Typography>
              <Typography variant="body2" gutterBottom>
                Skills & Experience Needed: BTech
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5-10 Yrs
              </Typography>

              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Hyderabad
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Hyderabad
              </Typography>
            </Grid> */}
          </Grid>
          
        </Grid>
      </Grid>
    </Paper>

</Box>
    </div>
  )
}

export default PageBody