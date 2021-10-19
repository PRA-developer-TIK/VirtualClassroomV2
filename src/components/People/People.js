import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import validator from 'validator';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocalContext } from "../Context/context";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Button,
  TextField,
} from "@mui/material";


export default function People({ classData ,rows }) {
  const { db, loggedUserMail} = useLocalContext();
  const [email, setEmail] = useState("");
  const [count, setcount] = useState(0);
  const [searchmail, setMail] = useState("");
  const [rowsintable, settablerows] = useState(rows);
  const [error, setError] = useState(false);
  const [errortxt, setErrortxt] = useState("");
  const [errortoadd, setErrortoadd] = useState(false);
  const [errortxttoadd, setErrortxttoadd] = useState("");

  const addstudent = async(e) => {
    if (validator.isEmail(email)) {
      try {
        const no_module_snap = await db
          .collection("CreatedClasses")
          .doc(loggedUserMail)
          .collection("ClassC")
          .doc(classData.code)
          .collection("modules")
          .get()
        
        setcount(no_module_snap.size)
        
        var prog_array = []
        console.log(count)
        count == 0? prog_array = []: count == 1? prog_array=[0]:prog_array = Array(count).fill(0)
        const addtoclass = await db
          .collection("CreatedClasses")
          .doc(loggedUserMail)
          .collection("ClassC")
          .doc(classData.code)
          .collection("Status")
          .doc(email)
          .set({
            email_id: email,
            name: "",
            Enrolled_Status: false,
            Progress: prog_array,
          });
  
      }catch (e) {
        console.log(e);
      }
    } else {
      setErrortoadd(true);
      setErrortxttoadd("Enter a Valid Email");
      return;
    }

    
  }
  const searchstudent = async(e) =>{
    if (validator.isEmail(searchmail)) {
      if (searchmail != "" ) {
        const student_doc = await db
        .collection("CreatedClasses")
        .doc(loggedUserMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Status")
        .doc(searchmail)
        .get()
        let temp_array=[student_doc.data()]
        if (student_doc.exists) {
          settablerows(temp_array);
        }else {
          setError(true);
          setErrortxt("No Such Student in the class");
          return;
        }
      }
      else {
        settablerows(rows);
      }
    }
    else {
      setError(true);
      setErrortxt("Enter a Valid Email");
      return;
    }
  }

    function giveprogress (stats,prog){
      if (stats == true) {
        let comp_mod=[]
        for(let i=0;i<prog.length;i++){
          if(prog[i]==1){
            comp_mod.push(i+1);
          }
        }
        var p =0
        prog.length === 0? p=0 : p = (comp_mod.length/prog.length)*100
        //setcomprog(comp_mod);
        return (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={p} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {`${Math.round(p)}%`}
              </Typography>
            </Box>
          </Box>
        );
      }else {
        return (<Alert severity="error">Not Enrolled</Alert>);
      }
    }


    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name=="" ? '---' : row.name}
              </TableCell>
              <TableCell align="centre">{row.email_id}</TableCell>
              <TableCell align="centre">{giveprogress(row.Enrolled_Status,row.Progress)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Detailed Progress
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell><h3>Modules</h3></TableCell>
                          <TableCell align="centre"><h3>Status</h3></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.Progress.map((prog,index)=>(
                           prog===1?  
                            <TableRow >
                            <TableCell>Module {index+1}</TableCell>
                            <TableCell><Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Completed</Alert>
                            </TableCell>
                          </TableRow>
                          :
                          <TableRow >
                              <TableCell>Module {index+1}</TableCell>
                              <TableCell>Incomplete</TableCell>
                            </TableRow>
                          
                          ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
    
    
    return (
        
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "background.paper",
              width: "auto",
            }}
          >
          <div style={{ display: "flex", marginTop: "20px" }}>
          <TextField
                  align="centre"
                  label="Add New Students Email"
                  type="email"
                  variant="outlined"
                  color="primary"
                  error={errortoadd}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errortoadd && errortxttoadd}
                  style={{ width: "100%", margin: "1%" }}
                  required={false}
                />
            <Button
                onClick={(e) => {setEmail("");addstudent(e)}}
                style={{ margin: "1%" }}
                variant="outlined"
              >
                Add
              </Button>
            </div>
          </Box>
          <div style={{ display: "flex", marginTop: "20px" }}>
          <TextField
                  align="centre"
                  label="Search by Students email"
                  type="email"
                  variant="outlined"
                  color="primary"
                  error={error}
                  onChange={(e) => setMail(e.target.value)}
                  helperText={error && errortxt}
                  style={{ width: "100%", margin: "1%" }}
                  required={false}
                />
            <Button
                onClick={(e) => searchstudent(e)}
                style={{ margin: "1%" }}
                variant="outlined"
              >
                Search
              </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="centre"><h2>Name</h2></TableCell>
                        <TableCell align="centre"><h2>Email</h2></TableCell>
                        <TableCell align="centre"><h2>Progress</h2></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rowsintable.map((row) => (
                      <Row key={row.email_id} row={row} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
