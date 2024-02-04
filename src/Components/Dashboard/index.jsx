import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import avatar_img from "../../assets/avatar_img.png";
import delete_icon from "../../assets/delete_icon.png";
import share_icon from "../../assets/share_icon.png";
import edit_icon from "../../assets/edit_icon.png";
import HeaderText from "../Text/HeaderText";
import InfoLabel from "../Text/InfoLabel";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import SubHeaderText from "../Text/SubHeaderText";

function createData(id, avatar, name, address, cell_no, email, role, action_btns) {
  return { id, avatar, name, address, cell_no, email, role, action_btns };
}

const rows = [
  createData(1, <Avatar alt="Remy Sharp" src={avatar_img} />, "Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}} /><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),
  createData(2, <Avatar alt="Remy Sharp" src={avatar_img} />, "Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}} /><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),,
  createData(3, <Avatar alt="Remy Sharp" src={avatar_img} />, "Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}}/><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),,
  createData(4, <Avatar alt="Remy Sharp" src={avatar_img}/>,"Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}}/><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),,
  createData(5, <Avatar alt="Remy Sharp" src={avatar_img} />, "Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}}/><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),,
  createData(6, <Avatar alt="Remy Sharp" src={avatar_img} />, "Joan Powell", "Associate Developer", "1234567890", "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center"><img src={share_icon} style={{cursor:"pointer"}}/><img src={edit_icon}  style={{margin:"0px 15px", cursor:"pointer"}}/><img src={delete_icon} style={{cursor:"pointer"}}/></Grid>),,
];

const headerColumnStyle = {
  fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left",
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left",
}

function DashboardPage() {
  return (
    <div style={{padding:"75px 0px 0px 270px"}}>
    <Grid container sx={{backgroundColor: "#F9F9F9", height:"100%", padding: "38px 34px",}}>
      <Grid xs={12}>
          <HeaderText text="Merchant Details"/>  
      </Grid>
        <Grid xs={12} sx={{ backgroundColor: "#FFFFFF", mt: "20px", padding: "30px", borderRadius: "7px", boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", }}>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
            <Typography sx={{borderRadius: "5px",fontSize: "18px", lineHeight: "22px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#FFF", padding: "11px 4px", backgroundColor: "#6c5ffc"}}>
            Id: 01
            </Typography>
            <Box>
            <Button variant="contained" color="inherit" sx={{ backgroundColor: "#f9f9f9", color: "#282F53", textTransform: "capitalize", mr:"20px" }}>Edit</Button>
            <Button variant="contained" color="error"  sx={{ backgroundColor: "#E94E51", color: "#FFFFFF", textTransform: "capitalize" }}>Delete</Button>
            </Box>
        </Grid>
        <Grid container sx={{ height: "100%", padding: "40px 11% 8% 12%", }}>
          <Grid xs={12}>
              <Avatar alt="Remy Sharp" src={avatar_img} sx={{ width: "100px", height: "100px" }} />
          </Grid>
          <Grid xs={12} md={6} pt="10px">
          <HeaderText text="Personal Details" />
          <InfoLabel label="Name" value="Joan Powell" />
              <InfoLabel label="Name" value="Joan Powell" />
              <InfoLabel label="Address" value="ABC" />
              <InfoLabel label="Email" value="abc@gmail.com" />
              <InfoLabel label="Password" value="12345******" />
              <InfoLabel label="Role of Account" value="Admin" />
              <InfoLabel label="Contact Name" value="ABC" />
              <InfoLabel label="Contact Person Number:" value="1234567890" />
              <InfoLabel label="User Created By" value="3"/>
          </Grid> 
          <Grid xs={12} md={6} sx={{ borderLeft: "1px solid#E9EDF4", pl: "12%", pt: "10px" }}>
            <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
                <HeaderText text="Files" />
                <PrimaryBtn text="See All Documents"/>
          </Grid>
          <Grid xs={12} mt="20px">
            <SubHeaderText text="Trade License" />    
          </Grid>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-around" 
            direction="row" 
            alignItems="center"
            mt="20px"    
          >
                <Box sx={{padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600",color: "#212529", cursor: "pointer"}}>
                DOC
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Change" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Download" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Delete" color="#E94E51" />
                </Box>
                
          </Grid>
          <Grid xs={12} mt="20px">
            <SubHeaderText text="Additional Documents" />    
          </Grid>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-around" 
            direction="row" 
            alignItems="center"
            mt="20px"    
          >
                <Box sx={{padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600",color: "#212529", cursor: "pointer"}}>
                DOC
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Change" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Download" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Delete" color="#E94E51" />
                </Box>
          </Grid>
          <Grid xs={12} mt="20px">
            <SubHeaderText text="Contract" />    
          </Grid>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-around" 
            direction="row" 
            alignItems="center"
            mt="20px"    
          >
                <Box sx={{padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600",color: "#212529", cursor: "pointer"}}>
                DOC
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Change" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Download" />
                </Box>
                <Box sx={{cursor: "pointer"}}>
                  <SubHeaderText text="Delete" color="#E94E51" />
                </Box>
                
          </Grid>     
          </Grid>   
        </Grid>
      </Grid>
    </Grid>
    </div>  
  );
}

export default DashboardPage;



