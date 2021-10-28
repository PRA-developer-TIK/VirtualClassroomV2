import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import ImgModal from "./ImageModal";
import SubModTable from "./SubModTable";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { SettingsInputHdmiRounded } from "@material-ui/icons";

export default function AllModules({ classData, modules,progress }) {
  const classes = useStyles();
  console.log(classData);

  //setModules and subModules
  const [currModule, setCurrModule] = useState("");
  const [currSubModule, setCurrSubModule] = useState("");
  const [complete, setComplete] = useState(false);
  


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
      .doc(classData.ownerMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Modules")
      .doc(modName)
      .collection("SubMod")
      .onSnapshot((snap) => {
        setSubModules(snap.docs.map((doc) => doc.data()));
      });
  };

  //toggling complete incomplete module
  const handleToggleMod =async (e,idx)=>{
    e.preventDefault();
    
    console.log("mod idx is ",idx);
    console.log(progress);

      

      progress[idx]=progress[idx]===0?1:0;
      

      await db
      .collection("CreatedClasses")
      .doc(classData.ownerMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Status")
      .doc(loggedUserMail)
      .set({
        Progress:progress,
      },{merge:true})
    
      let assign=await db
      .collection("CreatedClasses")
      .doc(classData.ownerMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Modules")
      .doc(`module${idx+1}`)
      .collection("Assignment")
      .get()
      console.log(assign)

      assign.forEach(async(doc)=>{
        console.log(doc.data())
        await db.collection("CreatedClasses")
        .doc(classData.ownerMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Status")
        .doc(loggedUserMail)
        .collection("Assignment")
        .doc(doc.data().id)
        .set(doc.data());

        await db.collection("CreatedClasses")
        .doc(classData.ownerMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Status")
        .doc(loggedUserMail)
        .collection("Assignment")
        .doc(doc.data().id)
        .update({Marks:0,Status:false,UploadedURL:""});

      })


  }

  //delete module
  const handleDelMod=(e,modName)=>{
    e.preventDefault();
    console.log(modName);
    


  }

  // console.log("subModules are", subModules);
  // console.log("submodules are ",subModules);
  return (
    <>
      {modules.map((data, index) => (
        // <div
        //   onClick={() => {

        //     getSubModules(data.modName);

        //   }}
        //   key={index}
        //   style={{
            
        //     width: "80%",
        //     margin: "auto",
        //     marginTop: "2%",
        //     border: "1px solid red",
        //     display: "block",
        //   }}
        // >
          <Accordion
          onClick={() => {

            getSubModules(data.modName);

          }}
          key={index}
          style={{
            
            width: "80%",
            margin: "auto",
            marginTop: "2%",
            border: "1px solid red",
            display: "block",
          }}
            expanded={expanded === `${data.modName}`}
            onChange={handleChange(data.modName)}
            sx={{
              mt: 1,
              backgroundColor:"black",
              color:"red"
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:"red"}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "50%", flexShrink: 0 }}>
                {data.modName}

              </Typography>
              {loggedUserMail !== classData.ownerMail &&
                (<button style={{ padding: "1px", cursor: "pointer" }} onClick={(e)=>handleToggleMod(e,index)} >
                  {

                    progress && progress[index] ?
                      <CheckCircleIcon color="success" fontSize="medium" />
                      :
                      <AccessTimeIcon color="warning" fontSize="medium" />

                  }


                </button>)
              }

              {/* {loggedUserMail === classData.ownerMail &&
                (<button onClick={(e)=>{handleDelMod(e,data.modName)}}><DeleteIcon /></button>)
              } */}

            </AccordionSummary>
            <AccordionDetails>
              
              <SubModTable subMod={subModules} classData={classData} />
            </AccordionDetails>
          </Accordion>
        // </div>
      ))}
    </>
  );
}
