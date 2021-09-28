import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useLocalContext } from "../Context/context";
import  useStyles from "../../assets/styles/globalStyles/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinClass() {
  const {
    joinClassDialog,
    setJoinClassDialog,
    loggedUser,
    loggedUserMail,
    db,
  } = useLocalContext();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const [classExists, setClassExists] = useState(false);
  const [joinedData, setJoinedData] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    console.log(code, email);

    try {
      const toJoinClass = await db
        .collection("CreatedClasses")
        .doc(email)
        .collection("classes")
        .doc(code)
        .get();

      if (toJoinClass.exists && toJoinClass.owner !== loggedUser.email) {
        console.log("classFound ", toJoinClass.data());
        setClassExists(true);
        setJoinedData(toJoinClass.data());
        setError(false);
      } else {
        setClassExists(false);
        setError(true);
        return;
      }

      if (classExists) {
        console.log("classFound adding data ", joinedData);
        await db
          .collection("joinedClasses")
          .doc(loggedUserMail)
          .collection("classes")
          .doc(code)
          .set({
            joinedData,
          });
        setJoinClassDialog(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={joinClassDialog}
        onClose={() => setJoinClassDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setJoinClassDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            <div className={classes.joinClass}>
              <h4>You are currently logged in as {loggedUser?.email}</h4>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Avatar alt="Remy Sharp" src={loggedUser?.photoURL} />
                <h5 style={{ margin: "10px" }}>{loggedUser?.displayName}</h5>
              </div>
              <Button variant="outlined">Logout</Button>
            </div>
            <div className={classes.joinClass}>
              <h3>Class Code</h3>
              <h4>Ask your teacher for code and then, enter it!!</h4>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <TextField
                  label="Class Code"
                  type="text"
                  variant="outlined"
                  color="primary"
                  error={error}
                  onChange={(e) => setCode(e.target.value)}
                  helperText={error && "No class found"}
                  style={{ width: "50%", margin: "1%" }}
                  required={true}
                />
                <TextField
                  label="Owners email"
                  type="email"
                  variant="outlined"
                  color="primary"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "50%", margin: "1%" }}
                  required={true}
                />
              </div>
              <Button
                onClick={(e) => handleJoin(e)}
                style={{ margin: "1%" }}
                variant="outlined"
              >
                Join
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
