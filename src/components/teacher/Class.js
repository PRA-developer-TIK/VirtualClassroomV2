import useStyles from "../../assets/styles/globalStyles/styles";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/material";
import Module from "./Module";
import Announcement from "../Announcement/Announcement";
import FAQ from "../FAQs/FAQ";
import { useLocalContext } from "../Context/context";
import People from "../People/People";

function Class({ classData }) {
  const classes = useStyles();
  const { loggedUserMail, db,deleteDialog } = useLocalContext();
  const [value, setValue] = React.useState("module");
  const [modules, setModules] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);

  //getting modules
  useEffect(() => {
    if (classData) {
      console.log("classData", classData);
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(
          loggedUserMail !== classData.ownerMail
            ? classData.ownerMail
            : loggedUserMail
        )
        .collection("ClassC")
        .doc(classData.code)
        .collection("modules")
        .onSnapshot((snap) => {
          setModules(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData,loggedUserMail]);



  //getting all FAQs
  useEffect(() => {
    if (classData) {
      console.log("classData", classData);
      let unsubscribe = db
        .collection("FAQs")
        .doc(classData.code)
        .collection("allFAQs")
        .onSnapshot((snap) => {
          setQuestions(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData,loggedUserMail]);

  //getting people data
  useEffect(() => {
    try {
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedUserMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Status").orderBy('Enrolled_Status','desc').onSnapshot((snap) => {
          setRow(snap.docs.map((doc) => doc.data()));
        });
      
    }catch (e) {
      console.log("error is ",e);
  }
  }, [classData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab value="module" label="Modules" />
          <Tab value="announce" label="Announcements" />
          <Tab value="grades" label="Grades" />
          <Tab value="FAQs" label="FAQs" />
          <Tab value="people" label="ppl" />
        </Tabs>
      </Box>
      <Container>
        {value === "module" ? (
          <Module modules={modules} classData={classData} />
        ) : value === "announce" ? (
          <Announcement classData={classData} />
        ) : value === "grades" ? (
          "grades"
        ) : value === "FAQs" ? (
          <FAQ questions={questions} classData={classData} />
        ) : value === "people" ? (
          <People />
        ) : null}
      </Container>
    </>
  );
}
export default Class;
