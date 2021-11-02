import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import { Avatar, Box } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, TextField, Button } from "@material-ui/core";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStyles from "../../assets/styles/globalStyles/styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AllStudentsTable from "./AllStudentsTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllAssignment = ({ classData,modules,Assignments,studentsdata }) => {
    const { db } = useLocalContext();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  
    };

    const handleDelAssignment=(module,id)=>{
        db
        .collection("CreatedClasses")
        .doc(classData.ownerMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Assignment")
        .doc(id)
        .delete();
        
      }

      
    return (
        <>
      {Assignments.map((item, index) => (
        
          <Accordion
          onClick={() => {
          }}
          key={index}
          style={{
            
            width: "80%",
            margin: "auto",
            marginTop: "2%",
            border: "1px solid black",
            display: "block",
          }}
            expanded={expanded === `${item.Modname}`}
            onChange={handleChange(item.Modname)}
            sx={{
              mt: 1,
              backgroundColor:"White",
              color:"black"
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:"black"}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "50%", flexShrink: 0 }}>
              <Box
          key={index}
          sx={{
            width: "80%",
            border: "1px solid black",
            padding: "2%",
            borderRadius: 10,
            m: "auto",
            mt: 1,

          }}
          boxShadow={6}
        >

          <div key={index} className="amt">
            <div style={{ float: "right", padding: "2%" ,cursor:"pointer" }}>
              <DeleteIcon onClick={()=>handleDelAssignment(item.Modname,item.id)} />
            </div>
            <div className="amt__Cnt">
              <h2 className="amt__txt">{item.Title}</h2> 
              <h5 className="amt__txt">{item.Modname}</h5>
              <p className="amt__txt">{item.text}</p>
               
              {
                item.imgURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} style={{ width: "100%" }} >

                  </embed>


                ))
              }
              {
                item.docURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} style={{ width: "40%" }}>

                  </embed>


                ))
              }
              {
                item.pdfURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} width="50" height="50">

                  </embed>


                ))
              }


            </div>
          </div>
          </Box>

              </Typography>

            </AccordionSummary>
            <AccordionDetails>
              <AllStudentsTable id={item.id} classData={classData} studentsdata={studentsdata}/>
              {/* <Requiredinfo id={item.id} /> */}
            </AccordionDetails>
          </Accordion>
        
      ))}
    </>
    )
}

export default AllAssignment
