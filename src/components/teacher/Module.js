import React, { useState } from "react";
import { Box, TextField, Container } from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles";
import { useLocalContext } from "../Context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AllModules from "./AllModules";
import firebase from "@firebase/app-compat";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';


export default function Module({ modules, classData }) {
  const classes = useStyles();

  const { loggedUserMail, db, storage } = useLocalContext();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLink, setInputLink] = useState("");

  //module select
  const [module, setModule] = React.useState("");

  const handleChangeModule = (event) => {
    setModule(event.target.value);
    console.log("MODULE IS ",module)
  };

  const [files, setFiles] = useState([]);

  const handleChangeFile = (e) => {
    const filesArr = [];
    Object.keys(e.target.files).forEach((key) => {
      // console.log(e.target.files[key].name.split(".").slice(-1)[0]);
      filesArr.push(e.target.files[key]);
    });
    console.log(filesArr);

    // filesArr.forEach(file=>console.log(file.name));
    setFiles(filesArr);
  };

  const handleUpload = async (e) => {
    const valid = ["pdf", "docx", "png", "jpeg", "jpg"];

    files.forEach(async (file) => {
      let fileType = file.name.split(".").slice(-1)[0].toLowerCase();
      console.log("filetype is ",fileType);

      if (valid.includes(fileType)) {
        const uploadFile = storage.ref(`${fileType}s/${file.name}`).put(file);

        uploadFile.on("state_changed", async (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("progress", progress);
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
                    title: inputTitle,
                    pdfURL:
                      fileType === "pdf"
                        ? await storage
                            .ref(`${fileType}s`)
                            .child(file.name)
                            .getDownloadURL()
                        : "",
                    docURL:
                      fileType === "docx"
                        ? await storage
                            .ref(`${fileType}s`)
                            .child(file.name)
                            .getDownloadURL()
                        : "",
                    imgURL:
                      fileType === "png" ||
                      fileType ==="jpeg" ||
                      fileType ==="jpg"
                        ? await storage
                            .ref(`${fileType}s`)
                            .child(file.name)
                            .getDownloadURL()
                        : "",
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
        alert("file invalid", file.name);
      }
    });
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
            <input
              onChange={(e) => handleChangeFile(e)}
              variant="outlined"
              color="primary"
              type="file"
              multiple
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
              <InputLabel id="demo-simple-select-label">ADD TO</InputLabel>
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

      <AllModules modules={modules} classData={classData} />
    </Container>
  );
}
