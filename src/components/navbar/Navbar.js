import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import ProfileMenu from './ProfileMenu';
import { useHistory } from 'react-router';
import { AddCircleOutlineSharp } from '@mui/icons-material';
//firebase imports
import db,{auth} from "../../firebase/config";




function NavbarHome({user}) {
  const history=useHistory();
  return (
       <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <Link to="/"><img style={{width:"50px"}} src="https://www.pngrepo.com/png/237114/512/dummy-crash.png" alt="logo"/></Link>
          </Typography>
          {user?
          <>
          {user.displayName==="teacher"?
          <Button style={{backgroundColor:"#FFCA28"}}  onClick={()=>history.push("/joinOrCreate")} > CreateClass <AddCircleOutlineSharp/></Button>
          :
          <Button style={{backgroundColor:"#FFCA28"}} onClick={()=>history.push("/joinOrCreate")} > Join Class <AddCircleOutlineSharp/></Button>

          }
          
          <ProfileMenu/>
          </>
          :
          <>
          <Button color="inherit" onClick={()=>history.push("/login")} > Login</Button>
          </>
          }
        </Toolbar>
      </AppBar>
    </Box>
      
  );
}

export default NavbarHome;
