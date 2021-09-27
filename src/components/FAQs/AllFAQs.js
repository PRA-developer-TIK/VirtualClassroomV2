import React from "react";
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
export default function AllFAQ() {
  const classes = useStyles();

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

  const QModal=()=>{
      return(
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <TextField
          id="filled-multiline-static"
          label="Multiline"
          fullWidth
          multiline
          rows={4}
          variant="filled"
          defaultValue="Default Value"
        />
    <button onClick={()=>handleOpen()} style={{ padding: "1%",float:"right" }}>Post</button>
    </Box>
  </Modal>)
  }
  return (
    <div
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
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={()=>handleOpen()}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Accordion 1 </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListItem
            alignItems="flex-start"
            style={{ border: "1px solid black" }}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
            <img
              className={classes.listImg}
              src="https://www.pngrepo.com/png/237114/512/dummy-crash.png"
              alt="help"
            />
          </ListItem>
        </AccordionDetails>
      </Accordion>
      <QModal/>
      
      
    </div>
    
  );
}
