import { Avatar, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import "../../assets/styles/globalStyles/Styles.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinkIcon from "@mui/icons-material/Link";
import ImgModal from "../teacher/ImageModal";
import ImageIcon from "@mui/icons-material/Image";
const Announcment = ({ classData }) => {
  const [announcments, setAnnouncments] = useState([]);
  const { db, openImg, setOpenImg, setUrl, url } = useLocalContext();
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

  const handleDelAnn = (id) => {
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
            <div style={{ float: "right", padding: "2%", cursor: "pointer" }}>
              <DeleteIcon onClick={() => handleDelAnn(item.id)} />
            </div>
            <div className="amt__Cnt">
              <div className="amt__top">
                <Avatar src={item.ownerAvatarURL} />

                <div>{item.sender}</div>

              </div>

              <h2 className="amt__txt">{item.text}</h2>

              <div>
                {item.pdfURL?.map((pdf, idx) => (

                  <Chip color="primary"
                    onClick={(e) => { setOpenImg(true); setUrl(pdf.URL); }} style={{ margin: "1%" }}
                    size="small" icon={<PictureAsPdfIcon />}
                    label={pdf.name.substr(0, 10) + "..."}

                  />
                ))


                }
              </div>

              <div>
                {item.imgURL?.map((pdf, idx) => (

                  <Chip color="secondary"
                    onClick={(e) => { setOpenImg(true); setUrl(pdf.URL); }} style={{ margin: "1%" }}
                    size="small" icon={<ImageIcon />}
                    label={pdf.name.substr(0, 10)}
                  />
                ))


                }
              </div>
              <div>
                {item.linkURL?.map((URL, idx) => (

                  <a style={{textDecoration:"none"}} href={URL.substr(0, 7) === "http://" ? URL : `http://${URL}`} target="_blank" rel="noreferrer" >
                    <Chip color="info"
                      style={{ margin: "1%" ,cursor:"pointer"}}
                      size="small" icon={<LinkIcon />}
                      label={URL.substr(0, 10)}
                    />
                  </a>
                ))


                }
              </div>

            </div>
          </div>
        </Box>
      ))}
      {openImg && <ImgModal url={url} />}
    </>
  );
};

export default Announcment;
