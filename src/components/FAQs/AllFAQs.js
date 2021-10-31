import React,{useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box,Modal,TextField} from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles";
import ImgModal from "../teacher/ImageModal";
import { useLocalContext } from "../Context/context";
import DeleteIcon from '@mui/icons-material/Delete';
import firebase from "@firebase/app-compat";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";



export default function AllFAQ({questions,classData}) {
  const classes = useStyles();
  const { loggedUserMail, db,openImg, setOpenImg } = useLocalContext();
  const [url,setUrl]=useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleDelFaq=async(ques,ans)=>{
   let faq=await db
        .collection("FAQs")
        .doc(classData.code)
        .collection("allFAQs")
        .doc(ques.name)
        .update({
          answers:firebase.firestore.FieldValue.arrayRemove(ans)
        })
  }

  return(
    <>
    {questions.map((question,index)=>(
    //   <div
    //   key={index}
    //   style={{
    //     width: "80%",
    //     margin: "auto",
    //     marginTop: "2%",
    //     border: "1px solid black",
    //     display:"flex",

    //   }}
    // >
      <Accordion
      key={index}
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "2%",
        border: "2px solid #f44336",
        
        borderRadius:5

      }}
        
      >
        <AccordionSummary
          expandIcon={question.imgURL!==""? <NotListedLocationIcon sx={{m:1,color:"#d50000 "}} onClick={(e)=>{setOpenImg(true);setUrl(question.imgURL);console.log(url)}}/>:null}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography   >{question.question}  </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          { question.pdfURL?.map((pdf,idx)=>(
            
            <Chip onClick={(e)=>{setOpenImg(true);setUrl(pdf.URL);console.log(url)}} style={{margin:"1%"}} size="small" icon={<PictureAsPdfIcon />} label={pdf.name} />
            
          
      
          ))

          }
          {question.answers.map((ans,idx)=>(
            <ListItem
            key={idx}
            alignItems="flex-start"
            style={{ border: "2px solid #aeea00",borderRadius:5,marginBottom:"1%" }}
            
          >
            <ListItemAvatar>
              <Avatar alt="avtUrl" src={ans.avatarURL} />
            </ListItemAvatar>
            <ListItemText
            sx={{mt:2}}
              primary={ans.answer}
              
            />
            <DeleteIcon onClick={()=>handleDelFaq(question,ans)} style={{cursor:"pointer"}}/>
          </ListItem>
          ))}
        </AccordionDetails>
        {openImg && <ImgModal  url={url}/>}
      </Accordion>
      
    // </div>
    ))}
    </>
  )
}
