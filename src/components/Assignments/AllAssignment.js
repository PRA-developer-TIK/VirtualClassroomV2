import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import { Avatar, Box,Container,Grid } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Chip from '@mui/material/Chip';
import ImgModal from "../teacher/ImageModal";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from "@mui/icons-material/Image";
import StatusList from "./AssignmentStatus";
const AllAssignment = ({ classData,modules,Assignments,studentsdata }) => {
    const { db,openImg,setOpenImg,setOpenFileType } = useLocalContext();
    const [url,setUrl]=useState("");
    const [expanded, setExpanded] = React.useState(false);

    const [status,showStatus]=useState(false);

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
        
    <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      > 
      {Assignments.map((item, index) => (
        
        //   <Accordion
        //   onClick={() => {
        //   }}
        //   key={index}
        //   style={{
            
        //     width: "80%",
        //     margin: "auto",
        //     marginTop: "2%",
        //     border: "1px solid black",
        //     display: "block",
        //   }}
        //     expanded={expanded === `${item.Modname}`}
        //     onChange={handleChange(item.Modname)}
        //     sx={{
        //       mt: 1,
        //       backgroundColor:"White",
        //       color:"black"
        //     }}
        //   >
        //     <AccordionSummary
        //       expandIcon={<ExpandMoreIcon style={{color:"black"}} />}
        //       aria-controls="panel1a-content"
        //       id="panel1a-header"
        //     >
        //       <Typography sx={{ width: "50%", flexShrink: 0 }}>
        //       <Box
        //   key={index}
        //   sx={{
        //     width: "80%",
        //     border: "1px solid black",
        //     padding: "2%",
        //     borderRadius: 10,
        //     m: "auto",
        //     mt: 1,

        //   }}
        //   boxShadow={6}
        // >
        
        <Card sx={{ margin:"2%",width:"35%",backgroundColor:"#fefefe",padding:2}}  key={index}>

          {!status ?
          <>
           <div style={{ float: "right", padding: "2%" ,cursor:"pointer" }}>
           <DeleteIcon sx={{color:"#d11a2a"}} onClick={()=>handleDelAssignment(item.Modname,item.id)} />
         </div>
         <div className="amt__Cnt">
           <h2 className="amt__txt">{item.Title}</h2> 
           <h5 className="amt__txt">{item.Modname}</h5>
           <p className="amt__txt">{item.text}</p>
            
           {
             item.pdfURL?.map((pdf, idx) => (
               <Chip color="primary"
               onClick={(e) => { setOpenImg(true); setUrl(pdf.URL); }} style={{ margin: "1%" }}
               size="small" icon={<PictureAsPdfIcon />}
               label={pdf.name.substr(0, 10)}
             />
               

             ))
           }
           {
             item.docURL?.map((doc, idx) => (
               <Chip color="info"
               onClick={(e) => { setOpenFileType("doc");setOpenImg(true); setUrl(doc.URL); }} style={{ margin: "1%" }}
               size="small" icon={<InsertDriveFileIcon />}
               label={doc.name.substr(0, 10)}
             />


             ))
           }
           {
             item.imgURL?.map((img, idx) => (
               <Chip color="secondary"
               onClick={(e) => { setOpenImg(true); setUrl(img.URL); }} style={{ margin: "1%" }}
               size="small" icon={<ImageIcon />}
               label={img.name.substr(0, 10)}
             />


             ))
           }




         </div>
         <Button key={index} onClick={()=>{console.log("btn id",index);showStatus(true)}} variant="contained" color="success" size="small" sx={{float:"right"}}>Status</Button>
         </>

         :
         <>
         <StatusList/>
         <Button key={index} onClick={()=>showStatus(false)} variant="contained" color="error" size="small" sx={{float:"right"}}>back</Button>
         </>

          }
          
           
            
          
          </Card>
          // </Box>

          //     </Typography>

          //   </AccordionSummary>
          //   <AccordionDetails>
          //     <AllStudentsTable id={item.id} classData={classData} studentsdata={studentsdata}/>
          //     {/* <Requiredinfo id={item.id} /> */}
          //   </AccordionDetails>
          // </Accordion>
        
      ))}
      {openImg && <ImgModal url={url} />}
      </Grid>
  
    )
}

export default AllAssignment
