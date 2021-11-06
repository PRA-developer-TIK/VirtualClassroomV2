import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { FormControl, TextField, Button } from "@material-ui/core";
import FormHelperText from '@mui/material/FormHelperText';
import { useLocalContext } from "../Context/context";
import useStyles from "../../assets/styles/globalStyles/styles";
import firebase from "@firebase/app-compat";
import { v4 as uuidv4 } from "uuid";
import validator from 'validator';

function CreateClass() {
  //global imports states
  const {
    createClassDialog,
    setCreateClassDialog,
    loggedUserMail,
    loggedUser,
    db,
  } = useLocalContext();
  const classes = useStyles();

  //input states
  const [className, setClassName] = useState("");
  const [subject, setSuject] = useState("");
  const [domain, setDomain] = useState("");
  const [mails, setmails] = useState("");
  const [mailarray, setmailarray] = useState([]);
  const [invalidmails, setinvalidmails] = useState([]);
  const [mailcount, setmailcount] = useState(0);
  const [noofmods, setmodcount] = useState(0);

  
  const shownumber = (e) => {
    setmails(e.target.value)
    console.log(mails)
    var lines = mails.split(/\n/);
    var output = []
    var n = 0
    for (var i = 0; i < lines.length; i++) {
      if (/\S/.test(lines[i])) {
        output.push(lines[i]);
      }
    }
    n = output.length
    setmailarray(output)
    setmailcount(n)
  }
  //firebase details

  const handleSubmit = async (e) => {
    console.log(className, subject, domain, mails,loggedUserMail );
    e.preventDefault();
    console.log("id is ", uuidv4());
    console.log("timestamp");
    setmailcount(0)
    const id = uuidv4();

    try {
      const addClass = await db
        .collection("CreatedClasses")
        .doc(loggedUserMail)
        .collection("ClassC")
        .doc(id)
        .set({
          code: id,
          dateCreated: new Date().toISOString().substr(0, 10),
          ownerMail: loggedUserMail,
          className: className,
          subject: subject,
          domain: domain,
          ownerAvatarURL:loggedUser.photoURL,
          enrolled: [],
        });

        for (let j=1;j<=noofmods;j++){
          await db
          .collection("CreatedClasses")
          .doc(loggedUserMail)
          .collection("ClassC")
          .doc(id)
          .collection("Modules")
          .doc(`module${j}`)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            modName: `module${j}`,
          });
        }
      
      let temp_invalidmails = []
      for (let i=0;i<mailarray.length;i++){
          let current_mail=mailarray[i]
          let prog_array = Array(noofmods).fill(0)
           if(validator.isEmail(current_mail)) {
              const mail_list = await db
                .collection("CreatedClasses")
                .doc(loggedUserMail)
                .collection("ClassC")
                .doc(id)
                .collection("Status")
                .doc(current_mail)
                .set({
                  email_id: current_mail,
                  name: "",
                  Enrolled_Status: false,
                  Progress: prog_array,
                });
            } else {
              temp_invalidmails.push(current_mail)
            }
            
      }
      console.log(temp_invalidmails)
      setinvalidmails(temp_invalidmails)
        
      setCreateClassDialog(false);
      console.log("class added", addClass);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Dialog
      onClose={() =>{ setCreateClassDialog(false);setmailcount(0) }}
      aria-labelledby="customized-dialog-title"
      open={createClassDialog}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <form>
          <h1 style={{ textAlign: "center" }}>Create Class </h1>

          <FormControl noValidate autoComplete="on" className={classes.forms}>
            <TextField
              label="Class Name"
              type="text"
              variant="outlined"
              color="primary"
              className={classes.createInputFields}
              required={true}
              onChange={(e) => setClassName(e.target.value)}
            />
            <TextField
              label="Subject"
              type="text"
              variant="outlined"
              color="primary"
              name="password"
              className={classes.createInputFields}
              onChange={(e) => setSuject(e.target.value)}
            />
            <TextField
              label="Domain"
              type="text"
              variant="outlined"
              color="primary"
              name="Domain"
              className={classes.createInputFields}
              onChange={(e) => setDomain(e.target.value)}
            />
            <TextField
              label="No Of Modules"
              type="number"
              variant="outlined"
              color="primary"
              className={classes.createInputFields}
              required={true}
              inputProps={{ min: 1, max: 10 }}
              onChange={(e) => setmodcount(parseInt(e.target.value))}
            />
            <TextField
              label="Students mails"
              type="text"
              multiline
              maxRows={4}
              variant="outlined"
              color="primary"
              className={classes.createInputFields}
              onChange={(e) => shownumber(e)}
              aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text">{mailcount} students mails present</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateClass;
