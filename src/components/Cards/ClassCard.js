import React from "react";
import db,{ auth} from "../../firebase/config";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Link,useHistory} from "react-router-dom"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


export default function ClassCard({classData}) {
  let date = new Date().toISOString().slice(0, 10)
  const history =useHistory();
  return (
    <Card sx={{ maxWidth: 350 ,backgroundColor:"#fefefz",}}
    
    >
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={classData.ownerAvatarURL}/>}
        title={classData.ownerMail.split("@")[0]}
        subheader={classData.dateCreated}
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {classData.className}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {classData.domain}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {classData.subject}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  onClick={()=>history.push(`/${classData.code}`)}>Open</Button>
      </CardActions>
    </Card>
  );
}
