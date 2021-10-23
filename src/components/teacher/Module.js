import React, { useState } from "react";
import { TextField, Box, Container, Button } from "@material-ui/core";
import { width } from "@mui/system";
import useStyles from "../../assets/styles/globalStyles/styles.js";
import { useLocalContext } from "../Context/context";
import AllModules from "./AllModules";
import firebase from "@firebase/app-compat";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FileUploadIcon from '@mui/icons-material/FileUpload';
function Module({ modules, classData,progress }) {
  const { storage, db, loggedUserMail, loggedUser } = useLocalContext();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLinks, setInputLinks] = useState([]);
    const [module, setModule] = React.useState("");
  const [files, setFiles] = useState([]);

    const handleChangeModule = (event) => {
    setModule(event.target.value);
  };

  const handleChange = (e) => {
   
    setFiles(Object.keys(e.target.files).map(key=>(e.target.files[key])));
  };
  const handleUpload = async (e) => {
    
    let id = inputTitle;
    let dbRef = db
      .collection("CreatedClasses")
      .doc(classData.ownerMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Modules")
      .doc(module)
      .collection("SubMod")
      .doc(inputTitle);

    if (files.length > 0 && inputTitle) {
      files.forEach(async (file,idx) => {
        let imgTypes = ["png", "jpeg", "jpg"];
        let docTypes = [
          "doc",
          "docx",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        let fileType = files[idx].name.split(".").slice(-1)[0].toLowerCase();
        const uploadImage = storage.ref(`${fileType}s/${file.name}`).put(file);
        let url;
        uploadImage.on("state_changed", async (snapshot) => {
          url = await storage.ref(`${fileType}s`).child(file.name).getDownloadURL();
          console.log("code is", classData.code);
          console.log(url);

          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("progress", progress);

          let obj = {};
          obj.URL = url;
          obj.name = file.name;
          obj.timestamp=firebase.firestore.Timestamp.now();
          


          if (progress === 100) {
            try {
              console.log("filetyoe is ",fileType);
              if (fileType === "pdf") {
                await dbRef.set(
                  {
                    id: id,
                    timestamp : firebase.firestore.Timestamp.now(),
                    text: inputTitle,
                    sender: loggedUserMail,
                    ownerAvatarURL: loggedUser.photoURL,
                    pdfURL: firebase.firestore.FieldValue.arrayUnion(obj),
                  },
                  { merge: true }
                );
              } else if (imgTypes.includes(fileType)) {
                await dbRef.set(
                  {
                    id: id,
                    timestamp : firebase.firestore.Timestamp.now(),
                    text: inputTitle,
                    sender: loggedUserMail,
                    ownerAvatarURL: loggedUser.photoURL,
                    text: inputTitle,
                    imgURL: firebase.firestore.FieldValue.arrayUnion(obj),
                  },
                  { merge: true }
                );
              } else if (docTypes.includes(fileType)) {
                await dbRef.set(
                  {
                    id: id,
                    timestamp : firebase.firestore.Timestamp.now(),
                    text: inputTitle,
                    sender: loggedUserMail,
                    ownerAvatarURL: loggedUser.photoURL,
                    text: inputTitle,
                    docURL: firebase.firestore.FieldValue.arrayUnion(obj),
                  },
                  { merge: true }
                );
              }

              if (inputLinks !== []) {
                await dbRef.set(
                  {
                    linkURL: inputLinks
                  },
                  { merge: true }
                );
              }
            } catch (e) {
              alert(e);
            }
          }


        });

      })
      

    } else if (inputTitle) {
      try {
        if (inputLinks !== []) {
          await dbRef.set(
            {
              linkURL: inputLinks,
            },
            { merge: true }
          );
        }

        await dbRef.set(
          {
            id: id,
            timestamp : firebase.firestore.Timestamp.now(),
            text: inputTitle,
            sender: loggedUserMail,
            ownerAvatarURL: loggedUser.photoURL,
            text: inputTitle,
            pdfURL:[],
            docURL:[],
            imgURL:[],
          },
          { merge: true }
        );
      } catch (e) {

      }
    } else {
      alert("input value needed")
    }

  };

    const handleAddModule = async (e) => {
    e.preventDefault();

    let modCt = modules.length;
    console.log("modCt", modCt);
    await db
      .collection("CreatedClasses")
      .doc(classData.ownerMail)
      .collection("ClassC")
      .doc(classData.code)
      .collection("Modules")
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

  
  const classes = useStyles();

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
          label="Links goes here"
          onChange={(e) => {
            setInputLinks(e.target.value.split(" "));
          }}
        />

        <div style={{ padding: "2%" }}>

        <label>
            <FileUploadIcon />
            <input
              onChange={(e) => handleChange(e)}
              multiple
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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

export default Module;









