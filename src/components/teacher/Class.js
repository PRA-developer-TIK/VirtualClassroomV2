import useStyles from "../../assets/styles/globalStyles/styles";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/material";
import Module from "./Module"
import Announcement from "../Announcement/Announcement"
import FAQ from "../FAQs/FAQ"
function Class({classData}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("module");
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value="module" label="Modules"  />
        <Tab value="announce" label="Announcements" />
        <Tab value="grades" label="Grades" />
        <Tab value="FAQs" label="FAQs" />
      </Tabs>
    </Box>
    <Container>
   { value==="module" ?
    <Module/> :value==="announce"?<Announcement classData={classData}/> :value==="grades"?"grades":value==="FAQs"?<FAQ/>:null } 
    
    </Container>

    
    </>

    
  );
}
export default Class;

