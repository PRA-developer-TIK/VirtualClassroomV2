import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { FormControl, TextField, Button } from "@material-ui/core";
import { useLocalContext } from "../Context/context";
import useStyles  from "../../assets/styles/globalStyles/styles";

function CreateClass() {
  const {
    createClassDialog,
    setCreateClassDialog,
    loggedUserMail,
    loggedUser,
    db,
  } = useLocalContext();
  const classes = useStyles();

  const [className, setClassName] = useState("");
  const [subject, setSuject] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = async (e) => {
    console.log(className, subject, domain, loggedUser.uid, loggedUserMail);
    e.preventDefault();

    try {
      const addClass = await db
        .collection("CreatedClasses")
        .doc(loggedUserMail)
        .collection("classes")
        .add({
          owner: loggedUserMail,
          className: className,
          subject: subject,
          domain: domain,
          id: loggedUser.uid,
        });
      setCreateClassDialog(false);
      console.log("class added", addClass);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      onClose={() => setCreateClassDialog(false)}
      aria-labelledby="customized-dialog-title"
      open={createClassDialog}
      maxWidth="xs"
    >
      <DialogContent>
        <form>
          <h1 style={{ textAlign: "center" }}>CREATE CLASS </h1>

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
