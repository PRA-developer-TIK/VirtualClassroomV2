import { Avatar, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import "../../assets/styles/globalStyles/Styles.css";
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
  console.log(announcments);
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
            <div className="amt__Cnt">
              <div className="amt__top">
                <Avatar src={item.ownerAvatarURL} />
                <div>{item.sender}</div>
              </div>
              <p className="amt__txt">{item.text}</p>
              <img className="amt__img" src={item.imageUrl} alt={item.text}/>
              <a href={item.imageUrl}>Link</a>
            </div>
          </div>
        </Box>
      ))}
    </>
  );
};

export default Announcment;
