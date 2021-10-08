import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import ImgModal from "./ImageModal";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


export default function AllModules({ classData, modules }) {
  const classes = useStyles();
  console.log(classData);

  //setModules and subModules
  const [currModule, setCurrModule] = useState("");
  const [currSubModule, setCurrSubModule] = useState("");


  const { loggedUserMail, db, openImg, setOpenImg } = useLocalContext();

  //open closing accordion
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState("");
  const handleOpen = () => setOpen(true);

  //acccordion controlled
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    
  };

  const [subModules, setSubModules] = useState([]);
  // console.log("currModule ", currModule);
  

  //getting submodules
  const getSubModules = async (modName) => {
    let submodules = await db
    .collection("CreatedClasses")
    .doc(loggedUserMail)
    .collection("ClassC")
    .doc(classData.code)
    .collection("modules")
    .doc(modName)
    .collection("subMod")
    .onSnapshot((snap) => {
      setSubModules(snap.docs.map((doc) => doc.data()));
    });
  };

  //2 params modulename and
  //getting imgUrls
  const getImgUrls = async (e, modName) => {
    e.preventDefault();
    let imgUrls=await db
      .collection("CreatedClasses")
      .doc(loggedUserMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("modules")
      .doc(modName)
      .collection("subMod")
      .onSnapshot((snap) => {
        (snap.docs.map((doc) => console.log(doc.data().imgURL)));
      });
  };

  // console.log("subModules are", subModules);
  console.log("submodules are ",subModules);
  return (
    <>
      {modules.map((data, index) => (
        <div
          onClick={() => {
            
            getSubModules(data.modName);
            
          }}
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
            expanded={expanded === `${data.modName}`}
            onChange={handleChange(data.modName)}
            sx={{
              mt: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                {data.modName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subModules.map((data,idx)=>(
                <div style={{display:"block"}} key={idx}> 
                <ImageIcon
                onClick={(e) => {
                  getImgUrls(e, data.modName);
                }}
              />
              <InsertDriveFileIcon />
              <PictureAsPdfIcon />
              <LinkIcon />
                </div>

              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}
