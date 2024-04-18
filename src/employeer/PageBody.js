import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ActiveJobs from './ActiveJobs';
const PageBody = () => {
    const navigate = useNavigate();
    const handleChnage=(e)=>{
        navigate('/jobcreate')

    }
  return (
    <div>

<Card sx={{ maxWidth: 345 }} onClick={handleChnage}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create A Job
          </Typography>
          <Typography variant="body2" color="text.secondary">
            click to create
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <ActiveJobs/>
    </div>
  )
}

export default PageBody