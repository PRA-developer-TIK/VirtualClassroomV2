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
import ImageIcon from '@mui/icons-material/Image';
import ImgModal from "../teacher/ImageModal";
import { useLocalContext } from "../Context/context";
export default function AllFAQ({questions}) {
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

  return(
    <>
    {questions.map((question,index)=>(
      <div
      key={index}
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "2%",
        border: "1px solid black",
        display:"flex",

      }}
    >
      <Accordion
        sx={{
          mt: 1,
          width:"100%"
        }}
      >
        <AccordionSummary
          expandIcon={question.imgURL!==""? <ImageIcon sx={{m:1}} onClick={(e)=>{setOpenImg(true);setUrl(question.imgURL);console.log(url)}}/>:<ExpandMoreIcon onClick={handleOpen}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography   >{question.question}  </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          {question.answers.map((ans,idx)=>(
            <ListItem
            alignItems="flex-start"
            style={{ border: "1px solid black" }}
          >
            <ListItemAvatar>
              <Avatar alt="avtUrl" src={ans.avatarURL} />
            </ListItemAvatar>
            <ListItemText
            sx={{mt:2}}
              primary={ans.answer}
              
            />
          </ListItem>
          ))}
        </AccordionDetails>
      </Accordion>
      {openImg && <ImgModal  url={url}/>}
    </div>
    ))}
    </>
  )
}
