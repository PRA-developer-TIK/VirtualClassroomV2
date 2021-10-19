import { Avatar, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import "../../assets/styles/globalStyles/Styles.css";
import DeleteIcon from '@mui/icons-material/Delete';
const Announcment = ({ classData }) => {
  const [announcments, setAnnouncments] = useState([]);
  const { db } = useLocalContext();
  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcements")
        .doc(classData.code)
        .collection("allAnnouncements")
        .onSnapshot((snap) => {
          setAnnouncments(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
  // console.log(announcments);

  const handleDelAnn=(id)=>{
    db
    .collection("announcements")
    .doc(classData.code)
    .collection("allAnnouncements")
    .doc(id)
    .delete();
    
  }
  return (
    <>
      {announcments.map((item, index) => (
        <Box
          key={index}
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

          <div key={index} className="amt">
            <div style={{ float: "right", padding: "2%" ,cursor:"pointer" }}>
              <DeleteIcon onClick={()=>handleDelAnn(item.id)} />
            </div>
            <div className="amt__Cnt">
              <div className="amt__top">
                <Avatar src={item.ownerAvatarURL} />

                <div>{item.sender}</div>

              </div>

              <p className="amt__txt">{item.text}</p>
              {
                item.imgURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} style={{ width: "100%" }} >

                  </embed>


                ))
              }
              {
                item.docURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} style={{ width: "40%" }}>

                  </embed>


                ))
              }
              {
                item.pdfURL?.map((obj, idx) => (
                  <embed key={idx} src={obj.URL} width="50" height="50">

                  </embed>


                ))
              }


            </div>
          </div>
        </Box>
      ))}
    </>
  );
};

export default Announcment;
