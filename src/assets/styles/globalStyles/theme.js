import { createTheme } from '@mui/material/styles';
const customTheme=createTheme({
    //colors
    palette:{
        primary :{
            main:"#212118",
        },

    },
    //typography fpr fonts
    typography:{
       fontFamily:"Titillium+Web",
       fontWeightLight:400,
       fontWeightRegular:500,
       fontWeightMedium:600,
       fontWeightBold:700,
    }


});

export default customTheme;