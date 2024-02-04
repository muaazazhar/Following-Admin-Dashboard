import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Grid, Typography } from '@mui/material';
import SubHeaderText from './SubHeaderText';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
     
  'label + &': {
    marginTop: theme.spacing(3),
    fontSize: "14px", lineHeight: "21px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#282f53", textAlign: "left",
       
    },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));


export default function CustomizedInputsStyled({label="label", color="#000000", children, mt, error={},required=false, type="text", hideLable=false, height=null }) {
    return (
    <Box mt={mt}>
        { !hideLable && <Typography sx={{ fontSize: "14px", fontFamily: "'IBM Plex Sans'", color: error?.message ? "#d32f2f" : color, fontWeight: 600,}}>
          {label} {required && "*"} 
        </Typography>}
    <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="center"
              
              sx={{ marginTop: mt? mt :"10px",border:  error?.message ? "1px solid #d32f2f" : "1px solid #E9EDF4", backgroundColor: "transparent", borderRadius: "5px", boxSizing: "border-box", height: height? height :"38px", width: "100%", cursor: "pointer" }}
              component={type === "file" ? "label" : ""   }
    >
              <>{type === "file" && <Typography sx={{ color: "#495057", backgroundColor: "#E9EDF4", padding: "8px 10px", fontSize: "14px", lineHeight: "20px", mr:"20px", borderRadius:"5px 0px 0px 5px",  }}>Choose File</Typography>}    {children}</>
    </Grid>
          {/* {(type != "file" && error?.message) && <Typography sx={{ fontSize: "10px", lineHeight: "18px", fontFamily: "'IBM Plex Sans'", color: "#d32f2f", mt: "5px" ,}}>
              {error.message}
          </Typography>}     */}
    </Box>       
  );
}
