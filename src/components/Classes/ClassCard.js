import React from "react";
import db,{ auth} from "../../firebase/config";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Link,useHistory} from "react-router-dom"

export default function ClassCard() {
  let date = new Date().toISOString().slice(0, 10)
  const history =useHistory();
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />}
        title="Pratik Vartak"
        subheader={date}
      />
      <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObUFXtEjRgU9ZY_P0CzWIF2oXFAV8CxwXCA&usqp=CAU"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Enrolled
        </Typography>
        <Typography variant="body2" color="text.secondary">
          About this classroom
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  onclick={()=>history.push("/aClass")}><Link underline="none" to="/aClass" >Open</Link></Button>
      </CardActions>
    </Card>
  );
}
