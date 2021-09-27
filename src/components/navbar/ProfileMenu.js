import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';

//firebase imports
import {auth} from "../../firebase/config";

export default function AccountMenu() {
  const history=useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
     
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = (e) => {
    console.log(e.target.innerText)   
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }} src="https://www.pngrepo.com/png/237114/512/dummy-crash.png">M</Avatar>
          </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{history.push("/updateProf")}}>
          <Avatar  /> My account 
        </MenuItem>
        <MenuItem>
          <Avatar /> Home
        </MenuItem>
        <MenuItem onClick={()=>{history.push("/allClasses")}}>
          <Avatar /> My Classes
        </MenuItem>
        <MenuItem onClick={()=>{auth.signOut();history.push("/login")}}>
          <Avatar /> 
          LogOut
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
