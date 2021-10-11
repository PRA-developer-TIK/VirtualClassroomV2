import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import { CompressOutlined } from '@mui/icons-material';



function Row({module}) {
  
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {module.modId}
        </TableCell>
        <TableCell align="center">{module.pdfURL?.length || 0}</TableCell>
        <TableCell align="center">{module.docURL?.length || 0}</TableCell>
        <TableCell align="center">{module.imgURL?.length || 0 }</TableCell>
        <TableCell align="center">{module.linkURL?.length || 0}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {module.pdfURL?.map((data) => (
                    <TableRow key={data.timestamp}>
                      <TableCell component="th" scope="row">
                      {data.timestamp.toDate().toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell>{data.timestamp.toDate().toLocaleTimeString()}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell align="right"><PictureAsPdfIcon/></TableCell>
                      
                    </TableRow>
                  ))}
                  {module.docURL?.map((data) => (
                    <TableRow key={data.timestamp}>
                      <TableCell component="th" scope="row">
                      {data.timestamp.toDate().toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell>{data.timestamp.toDate().toLocaleTimeString()}</TableCell>
                      <TableCell>{data.name.slice(0,10)}...</TableCell>
                      <TableCell align="right"><InsertDriveFileIcon/></TableCell>
                      
                    </TableRow>
                  ))}
                  {module.imgURL?.map((data) => (
                    <TableRow key={data.timestamp}>
                    {/* {console.log("tpe is ",data.timestamp.toDate().toISOString().substr(11,12))} */}
                      <TableCell component="th" scope="row">
                      {data.timestamp.toDate().toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell>{data.timestamp.toDate().toLocaleTimeString()}</TableCell>
                      <TableCell>{data.name.slice(0,10)}...</TableCell>
                      <TableCell align="right"><ImageIcon /></TableCell>
                      
                    </TableRow>
                  ))}
                  
                  <div>
                  <h4>Links</h4>
                  {module.linkURL?.map((data,index) => (
                    <div key={index} style={{display:"flex"}}>
                      <Typography sx={{flexGrow:0}} >{data.URL.substr(0,7)==="http://"?data.URL:`http://${data.URL}`}</Typography>
                      <Typography sx={{alignItems:"flex-end"}}   ><a href={data.URL.substr(0,7)==="http://"?data.URL:`http://${data.URL}`} target="_blank"  rel="noreferrer" ><LinkIcon/></a></Typography>
                    </div>
                  ))}
                  </div>

                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable({subMod}) {
    console.log("in table subMods",subMod);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>SubModule</TableCell>
            <TableCell align="center">Pdfs</TableCell>
            <TableCell align="center">Docs</TableCell>
            <TableCell align="center">Images</TableCell>
            <TableCell align="center">Urls</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subMod.map((subModule,index) => (
            <Row key={index} module={subModule} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
