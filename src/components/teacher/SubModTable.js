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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

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
        <TableCell align="right">{module.pdfURL?.length}</TableCell>
        <TableCell align="right">{module.docURL?.length}</TableCell>
        <TableCell align="right">{module.imgURL?.length}</TableCell>
        <TableCell align="right">{module.linkURL?.length}</TableCell>
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
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
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
                      <TableCell>{data.name}</TableCell>
                      <TableCell align="right"><PictureAsPdfIcon/></TableCell>
                      
                    </TableRow>
                  ))}
                  {module.imgURL?.map((data) => (
                    <TableRow key={data.timestamp}>
                    {/* {console.log("tpe is ",data.timestamp.toDate().toISOString().substr(11,12))} */}
                      <TableCell component="th" scope="row">
                      {data.timestamp.toDate().toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell>{data.timestamp.toDate().toLocaleTimeString()}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell align="right"><PictureAsPdfIcon/></TableCell>
                      
                    </TableRow>
                  ))}
                  {module.linkURL?.map((data) => (
                    <TableRow key={data.timestamp}>
                      {/* <TableCell component="th" scope="row">
                      {data.timestamp.toDate().toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell>{data.timestamp.toDate().toLocaleTimeString()}</TableCell> */}
                      <TableCell >{data.URL}</TableCell>
                      <TableCell align="right"><PictureAsPdfIcon/></TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable({subMod}) {
    console.log("in table subMods",subMod);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subMod.map((subModule) => (
            <Row key={subModule.modId} module={subModule} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
