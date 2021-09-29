import React, { useState, useEffect } from "react";
import { Box, TextField, Container } from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AllModules from "./AllModules";
import firebase from "@firebase/app-compat";

export default function Module({ modules, classData }) {
  const classes = useStyles();

  const { loggedUserMail, db, storage } = useLocalContext();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLink, setInputLink] = useState("");
  console.log(inputTitle,inputLink)

  //module select
  const [module, setModule] = React.useState("");

  const handleChangeModule = (event) => {
    setModule(event.target.value);
    console.log(event.target.value);
  };

  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleChangeFile = (e) => {
    setFileType(e.target.files[0].name.split(".").slice(-1)[0]);
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    if (file) {
      const uploadFile = storage.ref(`${fileType}s/${file.name}`).put(file);
      let url;
      uploadFile.on("state_changed", async (snapshot) => {
        url = await storage
          .ref(`${fileType}s`)
          .child(file.name)
          .getDownloadURL();
        console.log("code is", classData.code);
        console.log(url);

        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress",progress)
        if (progress === 100) {
          try {
            await db
              .collection("CreatedClasses")
              .doc(
                loggedUserMail !== classData.ownerMail
                  ? classData.ownerMail
                  : loggedUserMail
              )
              .collection("ClassC")
              .doc(classData.code)
              .collection("modules")
              .doc(module)
              .update({
                content: firebase.firestore.FieldValue.arrayUnion({
                  fileURL: url,
                  title: inputTitle,
                  link: inputLink,
                  avatarURL: classData.ownerAvatarURL,
                }),
              });
          } catch (e) {
            alert(e);
          }
        }
      });
    } else {
      try {
        await db
          .collection("CreatedClasses")
          .doc(
            loggedUserMail !== classData.ownerMail
              ? classData.ownerMail
              : loggedUserMail
          )
          .collection("ClassC")
          .doc(classData.code)
          .collection("modules")
          .doc(module)
          .update({
            content: firebase.firestore.FieldValue.arrayUnion({
              fileUrl: null,
              title: inputTitle,
              link: inputLink,
              avatarURL: classData.ownerAvatarURL,
            }),
          });
      } catch (e) {
        alert(e);
      }
    }
  };

  //adding module to database
  const handleAddModule = async (e) => {
    e.preventDefault();

    let modCt = modules.length;
    await db
      .collection("CreatedClasses")
      .doc(loggedUserMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("modules")
      .doc(`module${++modCt}`)
      .set({
        moduleName: `module${modCt}`,
        content: [],
      });
  };

  return (
    <Container>
      {loggedUserMail === classData.ownerMail && (
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
            label="Title"
            fullWidth
            variant="filled"
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />

          <TextField
            fullWidth
            label="Link goes here"

            onChange={(e) => {
              setInputLink(e.target.value);
            }}
          />

          <div style={{ padding: "2%" }}>
            <input
              onChange={(e) => handleChangeFile(e)}
              variant="outlined"
              color="primary"
              type="file"
            />

            <button
              onClick={(e) => {
                handleAddModule(e);
              }}
              style={{ margin: "0 1% 1% 8%", padding: "1%" }}
            >
              Add module
            </button>

            <div style={{ float: "right" }}>
              <button
                onClick={(e) => handleUpload()}
                className={classes.postBtn}
              >
                POST
              </button>
            </div>
            <FormControl
              style={{ width: "20%", float: "right", margin: "0 2% 2% 2%" }}
            >
              <InputLabel id="demo-simple-select-label">MODULE</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={module}
                label="Module"
                onChange={(e) => handleChangeModule(e)}
              >
                {modules.map((data, index) => (
                  <MenuItem key={index} value={data.moduleName}>
                    {data.moduleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      )}

      <AllModules modules={modules} classData={classData}/>
    </Container>
  );
}
