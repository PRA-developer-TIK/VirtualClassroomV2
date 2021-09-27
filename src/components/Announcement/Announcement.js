import React from "react";
import { TextField, Box, Container, Button } from "@material-ui/core";
import { width } from "@mui/system";
import useStyles from "../../assets/styles/globalStyles/styles.js"

const handleChange = () => {};
const handleUpload = () => {};

function Announcement() {
    const classes=useStyles();

  return (
      <Container>
    <Box
      sx={{
        width: "80%",
        border: "1px solid black",
        padding: "2%",
        borderRadius: 10,
        m: "auto",
        mt: 1,
      }}
      boxShadow={6}
    >
      <TextField
          id="filled-multiline-static"
          label="Multiline"
          fullWidth
          multiline
          rows={4}
          variant="filled"
          defaultValue="Default Value"
        />
      <div style={{ padding: "2%" }}>
        <input
          onChange={handleChange}
          variant="outlined"
          color="primary"
          type="file"
        />

        <div style={{ float: "right" }}>
          <button className={classes.postBtn}> POST</button>
          
        </div>
      </div>
    </Box>
    
    </Container>
  );
}

export default Announcement;
