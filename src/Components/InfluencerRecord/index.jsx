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
import view_icon from "../../assets/view_icon.png";
import download_icon from "../../assets/download_icon.png";
import doc_img from "../../assets/doc_img.png";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import HeaderText from "../Text/HeaderText";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import dev from "../../services/axios-client";
import Pagination from "../Pagination";
import PaginationWrapper from "../Wrapper/PaginationWrapper";
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import InfluencerRequets from "./Requests";
import ActiveInfluencers from "./ActiveInfluencers";
import { useLocation } from "react-router-dom";

function createData(id, name, document, type, action_btns) {
  return { id, name, document, type, action_btns };
}

const headerColumnStyle = {
   fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px",}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "10px 16px"}
}

const activeHeader = {
  cursor: "pointer", padding:"19px 22px" ,fontSize: "20px", lineHeight: "22px", fontWeight: "500", color: "#6c5ffc", textAlign: "center", border: "1px solid #E9EDF4", borderBottom: "1px solid white !important" , borderRadius: "5px 5px 0px 0px",
}

const nonActiveHeader = {
  cursor: "pointer", padding:"19px 22px" ,fontSize: "20px", lineHeight: "22px", fontWeight: "500", color: "#74829C", textAlign: "center",
}

function InfluencerRecord() {
  const [active, setActive] = React.useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  React.useEffect(() => {
    if (queryParams.get('active')) {
      setActive(1);
    }
  }, []);

  return (
    <Grid sx={{ height:"100%",}}>
      <HeaderWrapper>
      <HeaderText text="Influencer"/>  
      </HeaderWrapper>
        <Grid xs={12} sx={{ backgroundColor: "#FFFFFF", mt: "20px", padding: "30px", borderRadius: "7px", boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", }}>
        
      <TableContainer >
      <Table  >
            <TableHead
                sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "1px solid #E9EDF4",
                }
            }}
            >
          <TableRow>
                <TableCell width={"86px"} sx={!active ? activeHeader : nonActiveHeader} onClick={() => setActive(0)}>Requests</TableCell>
                <TableCell sx={active ? activeHeader : nonActiveHeader }width={"168px"} onClick={() => setActive(1)}>Active Influencers</TableCell>
            <TableCell sx={{...headerColumnStyle}}></TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </TableContainer>
        {active===0 && <InfluencerRequets />}
        {active===1 && <ActiveInfluencers />}
      </Grid>
    </Grid>
  );
}

export default InfluencerRecord;



