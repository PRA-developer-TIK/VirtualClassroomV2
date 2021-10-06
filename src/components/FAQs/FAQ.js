import React, { useState } from "react";
import { TextField, Box, Container, Button } from "@material-ui/core";
import useStyles from "../../assets/styles/globalStyles/styles.js";
import AllFAQ from "./AllFAQs";
import firebase from "@firebase/app-compat";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocalContext } from "../Context/context";

function FAQ({ questions, classData }) {
  const classes = useStyles();
  let ct = 0;

  const { db, storage,loggedUser } = useLocalContext();

  const [quesNum, setQuesNum] = useState("");

  const [inputQuestion, setInputQuestion] = useState("");
  const  [inputAns,setInputAns]=useState("");
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAns=async()=>{
    try {
      await db
        .collection("FAQs")
        .doc(classData.code)
        .collection("allFAQs")
        .doc(quesNum)
        .set({
          answers:firebase.firestore.FieldValue.arrayUnion({
            avatarURL:loggedUser.photoURL,
            answer:inputAns,
          }) 
        },{merge:true});
    } catch (e) {
      alert(e);
    }

  }

  const handleUpload = (e) => {
    const valid = ["pdf", "docx", "png", "jpeg", "jpg"];
    let fileType = file.name.split(".").slice(-1)[0].toLowerCase();
    if (valid.includes(fileType)) {
      const uploadFile = storage.ref(`${fileType}s/${file.name}`).put(file);

      uploadFile.on("state_changed", async (snapshot) => {
        let url = await storage
          .ref(`${fileType}s`)
          .child(file.name)
          .getDownloadURL();
        console.log("code is", classData.code);
        console.log(url);
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress", progress);
        if (progress === 100) {
          let quesLen = questions.length;
          try {
            await db
              .collection("FAQs")
              .doc(classData.code)
              .collection("allFAQs")
              .doc(`question${++quesLen}`)
              .set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                name: `question${quesLen}`,
                imgURL: url,
                question: inputQuestion,
                answers: [],
              });
          } catch (e) {
            alert(e);
          }
        }
      });
    } else {
      alert("file invalid", file.name);
    }
  };

  const [showQues, setShowQues] = useState(false);
  const [showAns, setShowAns] = useState(false);

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
        {!showAns && !showQues && (
          <>
            <button
              onClick={() => {
                setShowQues(true);
              }}
            >
              {" "}
              Ask
            </button>
            <button
              onClick={() => {
                setShowAns(true);
              }}
            >
              {" "}
              Answer
            </button>
          </>
        )}

        {showQues && (
          <>
            <TextField
              id="filled-multiline-static"
              label="Ask Question"
              fullWidth
              multiline
              rows={4}
              variant="filled"
              defaultValue="Default Value"
              onChange={(e) => setInputQuestion(e.target.value)}
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
                  onClick={() => {
                    handleUpload();
                  }}
                  className={classes.postBtn}
                >
                  {" "}
                  POST
                </button>
                <button
                  onClick={() => {
                    setShowQues(false);
                  }}
                  className={classes.postBtn}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {showAns && (
          <>
            <TextField
              id="filled-multiline-static"
              label="Ask Question"
              fullWidth
              multiline
              rows={4}
              variant="filled"
              defaultValue="Default Value"
              onChange={(e) => setInputAns(e.target.value)}
            />
            <FormControl style={{ width: "20%", margin: "0 2% 2% 2%" }}>
              <InputLabel id="demo-simple-select-label">ADD TO</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quesNum}
                label="Module"
                onChange={(e) => {
                  setQuesNum(e.target.value);
                  
                }}
              >
                {questions.map((ques, index) => (
                  <MenuItem key={index} value={ques.name}>
                    {ques.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ float: "right" }}>
              <button
                onClick={() => {
                  handleAns();
                }}
                className={classes.postBtn}
              >
                {" "}
                Ans
              </button>
              <button
                onClick={() => {
                  setShowAns(false);
                }}
                className={classes.postBtn}
              >
                {" "}
                Cancel
              </button>
            </div>
          </>
        )}
      </Box>

      <AllFAQ questions={questions} />
    </Container>
  );
}

export default FAQ;
