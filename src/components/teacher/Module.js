import React, { useState } from "react";
import { Box, TextField, Container,Button } from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AllModules from "./AllModules";
import firebase from "@firebase/app-compat";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";

export default function Module({ modules, classData }) {
  const classes = useStyles();

  const { loggedUserMail, db, storage } = useLocalContext();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLink, setInputLink] = useState("");

  //deleting subMod


  //module select
  const [module, setModule] = React.useState("");
  // console.log("MODULE IS ", module);

  const handleChangeModule = (event) => {
    setModule(event.target.value);
  };

  //setting selected files
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    let imgTypes = ["png", "jpeg", "jpg"];
    let docTypes = [
      "doc",
      "docx",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    let fileType = file.name.split(".").slice(-1)[0].toLowerCase();
    console.log("filetype is ", fileType);
    const uploadFile = storage.ref(`${fileType}s/${file.name}`).put(file);
    const dbRef = db
      .collection("CreatedClasses")
      .doc(loggedUserMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("modules")
      .doc(module)
      .collection("subMod")
      .doc(inputTitle);

    uploadFile.on("state_changed", async (snapshot) => {
      let url = await storage
        .ref(`${fileType}s`)
        .child(file.name)
        .getDownloadURL();
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("progress", progress);

      let obj = {};
      obj.URL = url;
      obj.name = file.name;
      obj.timestamp = firebase.firestore.Timestamp.now();

      if (progress === 100) {
        try {
          if (fileType === "pdf") {
            await dbRef.set(
              {
                modId: inputTitle,
                pdfURL: firebase.firestore.FieldValue.arrayUnion(obj),
              },
              { merge: true }
            );
          } else if (imgTypes.includes(fileType)) {
            await dbRef.set(
              {
                modId: inputTitle,
                imgURL: firebase.firestore.FieldValue.arrayUnion(obj),
              },
              { merge: true }
            );
          } else if (docTypes.includes(fileType)) {
            await dbRef.set(
              {
                modId: inputTitle,
                docURL: firebase.firestore.FieldValue.arrayUnion(obj),
              },
              { merge: true }
            );
          }

          if (inputLink !== "") {
            await dbRef.set(
              {
                linkURL: firebase.firestore.FieldValue.arrayUnion({
                  URL: inputLink,
                }),
              },
              { merge: true }
            );
          }
        } catch (e) {
          alert(e);
        }
      }
    });
  };

  //adding module to database
  const handleAddModule = async (e) => {
    e.preventDefault();

    let modCt = modules.length;
    console.log("modCt", modCt);
    await db
      .collection("CreatedClasses")
      .doc(loggedUserMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("modules")
      .doc(`module${++modCt}`)
      .set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        modName: `module${modCt}`,
      });
    
    await db.collection("CreatedClasses")
      .doc(loggedUserMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Status").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var temp_prog = doc.data().Progress;
            temp_prog.push(0);
            doc.ref.update({
                Progress: temp_prog
            });
        });
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
            <label>
              <ImageIcon />
              <input
                onChange={(e) => handleChange(e)}
                type="file"
                accept=".png,.jpg,.jpeg"
                style={{ display: "none" }}
              />
            </label>

            <label>
              <InsertDriveFileIcon />
              <input
                onChange={(e) => handleChange(e)}
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: "none" }}
              />
            </label>

            <label>
              <PictureAsPdfIcon />
              <input
                onChange={(e) => handleChange(e)}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
              />
            </label>

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
              <InputLabel  id="demo-simple-select-label">ADD TO</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={module}
                label="Module"
                onChange={(e) => handleChangeModule(e)}
              >
                {modules.map((data, index) => (
                  <MenuItem key={index} value={data.modName}>
                    {data.modName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      )}

      <AllModules modules={modules} classData={classData} />
    </Container>
  );
}
