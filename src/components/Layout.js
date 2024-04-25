import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  AppBar,
  Avatar,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logout, PersonAdd, Settings, TrackChanges } from "@mui/icons-material";

const Layout = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            Job Hunt
          </Typography>
          {localStorage.getItem('email') && <Stack direction={"row"} spacing={2}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} alt={localStorage.getItem('email')}/>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={()=>{navigate("/profile")}}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <TrackChanges fontSize="small" />
                </ListItemIcon>
                Track Applications
              </MenuItem> */}
            </Menu>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                navigate("/login");
                localStorage.removeItem('email')
              }}
            >
              Logout
            </Button>
          </Stack>}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Layout;
