import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField ,Container,Grid} from "@mui/material";
import { FormControl, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from '@mui/icons-material/Send';
import useStyles from "../../assets/styles/globalStyles/styles";
import {Link} from "react-router-dom";
import Card from "../Classes/ClassCard" 

function JoinCreateClass({ role }) {
  const classes = useStyles();
  const [className,setClassName]=useState("");
  const [classCode,setclassCode]=useState("");
  const history =useHistory();
  return (
    <Container className={classes.appBarSpacer}>
    <div style={{textAlign:"center"}}  >
      {role === "Teacher" ?
        <h1>Enter a className and we will create a classroom for you</h1>
        :
        <h1>Enter a classroom code to join class</h1>
          
      }
    <form onSubmit={(e) => {
      if(role === "Teacher"){
        history.push("/allClasses");
      }else{
        console.log("student class");

      }
      
     }}>
    <FormControl className={classes.forms}>
      {role === "Teacher" ? (
        <span>
        
          <TextField
            type="text"
            label="className"
            variant="outlined"
            color="primary"
            name="email"
            onChange={(e)=>setClassName(e.target.value)}
          />
          <Button type="submit"><AddCircleIcon fontSize="large"  /></Button>
          </span>
        
      ) : (
        <span>
          <TextField
            type="text"
            label="classCode"
            variant="outlined"
            color="primary"
            name="email"
          />
          <Button type="submit"><SendIcon fontSize="large"/></Button>
          </span>
       
      )}
      </FormControl>
    </form>
    </div>
    </Container>
  );
}

export default JoinCreateClass;
