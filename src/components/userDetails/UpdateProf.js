import React from 'react'
import { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@mui/material";
import { FormControl, Button } from "@mui/material";
import useStyles from "../../assets/styles/globalStyles/styles";

function UpdateProf() {
    const classes=useStyles();

    const [name, setName] = useState("");
    const [avatarUrl, setavatarUrl] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("updated",name,avatarUrl);
    }

    return (
        <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1 style={{ textAlign: "center" }}>HELLO PLEASE UPDATE </h1>

      <FormControl noValidate autoComplete="on" className={classes.forms}>
        <TextField
          label="email"
          type="email"
          variant="outlined"
          color="primary"
          name="email"
          className={classes.inputFields}
          
        />
        <TextField
          label="password"
          type="password"
          variant="outlined"
          color="primary"
          name="password"
          className={classes.inputFields}
          
        />
        <TextField
          label="name"
          type="name"
          variant="outlined"
          color="primary"
          name="name"
          className={classes.inputFields}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="avatarUrl"
          type="text"
          variant="outlined"
          color="primary"
          name="avatarUrl"
          className={classes.inputFields}
          onChange={(e) => setavatarUrl(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.inputFields}
        >
          Update
        </Button>
      </FormControl>
    </form>
    )
}

export default UpdateProf
