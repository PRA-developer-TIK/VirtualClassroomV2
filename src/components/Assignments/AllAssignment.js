import React, { useEffect, useState } from "react";
import { useLocalContext } from "../Context/context";
import { Avatar, Box } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';

const AllAssignment = ({ classData,modules,Assignments }) => {
    const { db } = useLocalContext();
    console.log(Assignments)

    const handleDelAssignment=(module,id)=>{
        db
        .collection("CreatedClasses")
        .doc(classData.ownerMail)
        .collection("ClassC")
        .doc(classData.code)
        .collection("Modules")
        .doc(module)
        .collection("Assignment")
        .doc(id)
        .delete();
        
      }
    return (
        <>
      {Assignments.map((item, index) => (
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
              <DeleteIcon onClick={()=>handleDelAssignment(item.Modname,item.id)} />
            </div>
            <div className="amt__Cnt">
              <h2 className="amt__txt">{item.Title}</h2> 
              <h5 className="amt__txt">{item.Modname}</h5>
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
    )
}

export default AllAssignment
