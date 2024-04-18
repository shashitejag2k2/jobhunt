import React from 'react'
import {Box,Toolbar,Typography,Button,IconButton,AppBar} from '@mui/material'
import { useLocation } from 'react-router-dom';


const Header = () => {
  const location = useLocation();
    const { email } = location.state || {};
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Hunt
          </Typography>
          <Button color="inherit">{email}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header