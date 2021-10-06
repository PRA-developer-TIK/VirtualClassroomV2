import React from "react"
import { Box,Modal} from "@material-ui/core";
import { useLocalContext } from "../Context/context";
const ImgModal=({url})=>{


  const {openImg,setOpenImg}=useLocalContext();
 

  
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
  <Modal
  open={openImg}
  onClose={()=>setOpenImg(false)}
  
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <img src={url} style={{width:"100%"}} alt="img"/>

  </Box>
</Modal>)

}

export default ImgModal;