import React, { useState } from "react";
import { TextField, Box, Container, Button } from "@material-ui/core";
import { width } from "@mui/system";
import useStyles from "../../assets/styles/globalStyles/styles.js";
import { useLocalContext } from "../Context/context";
import firebase from "@firebase/app-compat";
import { v4 as uuidv4 } from "uuid";
import AllAnnouncements from "./AllAnnouncements";

function Announcement({ classData }) {
  const { storage, db, loggedUserMail, loggedUser } = useLocalContext();

  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const handleChange = (e) => {
    // To get type of file pdf,doc,img etc.
    // console.log("file is ",e.target.files[0].name.split('.').slice(-1)[0])
    setFileType(e.target.files[0].name.split(".").slice(-1)[0]);
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    const uploadImage = storage.ref(`${fileType}s/${file.name}`).put(file);
    let url;
    const id = uuidv4();
    uploadImage.on("state_changed", async () => {
      url = await storage.ref(`${fileType}s`).child(file.name).getDownloadURL();
      console.log("code is", classData.code);
      console.log(url);

      try {
        await db
          .collection("announcements")
          .doc(classData.code)
          .collection("allAnnouncements")
          .doc(id)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            text: inputValue,
            sender: loggedUserMail,
            ownerAvatarURL: loggedUser.photoURL,
          });
      } catch (e) {
        alert(e);
      }
    });
  };
  const classes = useStyles();

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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div style={{ padding: "2%" }}>
          <input
            onChange={(e) => handleChange(e)}
            variant="outlined"
            color="primary"
            type="file"
          />

          <div style={{ float: "right" }}>
            <button
              onClick={(e) => {
                handleUpload(e);
              }}
              className={classes.postBtn}
            >
              {" "}
              POST
            </button>
          </div>
        </div>
      </Box>
      <AllAnnouncements classData={classData} />
    </Container>
  );
}

export default Announcement;
