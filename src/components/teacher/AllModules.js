import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, TextField, Container } from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import ImgModal from "./ImageModal";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

export default function AllModules({ classData,modules }) {
  const classes = useStyles();
  console.log(classData)

  // console.log("modules are", modules);

  const { loggedUserMail, db,openImg, setOpenImg } = useLocalContext();

  //open closing accordion
  const [open, setOpen] = React.useState(false);
  const [url,setUrl]=useState("");
  const handleOpen = () => setOpen(true);

  return (
    <>
      {modules.map((data, index) => (
        <div
          key={index}
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "2%",
            border: "1px solid black",
            display: "block",
          }}
        >
          <Accordion
            sx={{
              mt: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={() => handleOpen()} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                {data.moduleName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                data.content.map((subMod,index)=>(
                  <ListItem
                  onClick={()=>console.log(index)}
                  key={index}
                alignItems="flex-start"
                style={{ border: "1px solid black" }}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={classData.ownerAvatarURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={subMod.title}
                  secondary={
                    <React.Fragment>
                      
                      <a href={subMod.link} target="blank">{subMod.link}</a>
                    </React.Fragment>
                  }
                />

                <div style={{display:"flex",cursor:"pointer",width:"15%"}}> 
                <InsertDriveFileIcon sx={{m:1}} onClick={e=>window.location.href=`${subMod.docURL}`}/>
        
                <PictureAsPdfIcon sx={{m:1}} onClick={e=>window.location.href=`${subMod.pdfURL}`}/>
                <ImageIcon sx={{m:1}} onClick={(e)=>{setOpenImg(true);setUrl(subMod.imgURL);console.log(url)}}/>
                </div>


                {/* <img
                key={index}
                
                className={classes.listImg}
                  style={{cursor:"pointer"}}
                  src={subMod.imgURL}
                  alt="help"
                />
                 */}
                 {openImg && <ImgModal  url={url}/>}
               
               
              </ListItem>
                ))
              }
            </AccordionDetails>
          </Accordion>
          
        </div>
      ))}
    </>
  );
}
