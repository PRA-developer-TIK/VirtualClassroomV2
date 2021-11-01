import React, { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import useStyles from "../../assets/styles/globalStyles/styles";
import { TextField, Button } from "@material-ui/core";
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useLocalContext } from "../Context/context";
import {useRef} from 'react';




export default function AllStudentsTable({ id,classData,studentsdata}) {
  const { db } = useLocalContext();
  const classes = useStyles();
  const [names,setnames] = useState([]);
  const [mails,setmails] = useState([]);
  const [marks,setmarks] = useState([]);
  const [status,setstatus] = useState([]);
  const [assignmentmarks,setassignmarks] = useState(0);
  let btnRef = useRef();

  const onBtnClick = e => {
    if(btnRef.current){
      btnRef.current.setAttribute("disabled", "disabled");
    }
  }

  const requiredinfo= () => {
    console.log("Class is",id)
    if (classData) {
        studentsdata.forEach(async(student)=>{
            let Students=names
            let mail_id=mails
            Students.push(student.name) 
            mail_id.push(student.email_id)
            setnames(Students)
            setmails(mail_id)
            let stat=status
            let mks=marks
            const studentAssignmentinfo = await db
              .collection("CreatedClasses")
              .doc(classData.ownerMail)
              .collection("ClassC")
              .doc(classData.code)
              .collection("Status")
              .doc(student.email_id)
              .collection("Assignment")
              .doc(id)
              .get()

              if(studentAssignmentinfo.exists){
                  if(studentAssignmentinfo.data().Status == true){
                      stat.push(studentAssignmentinfo.data().UploadedURL)
                      mks.push(studentAssignmentinfo.data().Marks)
                  }else{
                      stat.push("Not Completed Yet")
                      mks.push("--")
                  }
                  
              }
              else{
                  stat.push("Not Reached")
                  mks.push("--")
              }
              setstatus(stat)
              setmarks(mks)
              
            })
            console.log(names)
            console.log(status)
            console.log(marks)
                  
    }
  };

  const handleaddmarks = async (e,index) => {
  

    try {
      const addClass = await db
        .collection("CreatedClasses")
        .doc(classData.ownerMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Status")
        .doc(mails[index])
        .collection("Assignment")
        .doc(id)
        .set({
          Marks:assignmentmarks,
        },
        { merge: true });
  
        

    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Button
            variant="contained"
            color="primary"
            size="medium"
            ref={btnRef} 
            onClick={(e)=>{onBtnClick(e);requiredinfo()}}>
              Get Data
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {status.map((stat,index)=>(
            marks[index]==="--"?  
            <TableRow >
            <TableCell>{names[index]}</TableCell>
            <TableCell>{stat}</TableCell>
            <TableCell>{marks[index]}</TableCell>
            </TableRow>
            :marks[index]=="-1"?
            <TableRow >
            <TableCell>{names[index]}</TableCell>
            <TableCell align="center"><a href={stat} target="_blank" rel="noreferrer"><PictureAsPdfIcon /></a></TableCell>
            <TableCell><TextField
              label="Marks"
              type="number"
              variant="outlined"
              color="primary"
              size="small"
              className={classes.createInputFields}
              inputProps={{ min: 0, max: 10 }}
              onChange={(e) => setassignmarks(parseInt(e.target.value))}
            /><Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            onClick={(e) => {
              handleaddmarks(e,index);
            }}
          >
            Add
          </Button></TableCell>
            </TableRow>
          :
          <TableRow >
          <TableCell>{names[index]}</TableCell>
          <TableCell align="center"><a href={stat} target="_blank" rel="noreferrer"><PictureAsPdfIcon /></a></TableCell>
          <TableCell>{marks[index]}</TableCell>
          </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}