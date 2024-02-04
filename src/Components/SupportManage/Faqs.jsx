import { Avatar, Box, Button, Container, Divider, Grid, InputBase, Typography } from "@mui/material";
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
import dev from "../../services/axios-client";
import Pagination from "../Pagination";
import PaginationWrapper from "../Wrapper/PaginationWrapper";
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import AccectSelect from "../Input/AccectSelect";
import share_icon from "../../assets/share_icon.png";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import Header from "../Header";
import HeaderText from "../Text/HeaderText";

function createData(id, name, date,amount,action_btns1,action_btns2) {
  return { id, name,date, amount,action_btns1,action_btns2};
}

const headerColumnStyle = {
   fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px",}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "10px 16px"}
}

const options = [
  {
    value: 1,
    label: "Approved",
    bcolor: "#DAF9E4",
    color: "#01AB3B"
  },
  {
    value: 0,
    label: "Declined",
    bcolor: "#FFDFE1",
    color: "#E94E51"
  }
]

function Faqs() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([1,2]);
  const [page, setPage] = React.useState({});
 

  const getAllDocuments = async (page=1) => {
    await dev.get(`/documents?page=${page}&per_page=10`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        
        const data = response.data.data.map((data) =>
          createData(data.merchantId, data.merchant.name, <Box alignItems="center" sx={{ display: "flex", }}> <Box sx={{ border: "1px solid", borderRadius: "5px", border: "1px solid #e9edf4", boxSizing: "border-box", padding: "8px 3px 0px", mr: "10px" }}><img src={data.docLink} width="40px" height="30px" /></Box> {data.docType}</Box>, <Box sx={{ padding: "8px", textAlign: "center", borderRadius: "100px", backgroundColor: "#f9f9f9", width: "67px", fontSize: "14px", lineHeight: "21px", fontWeight: "600", color: "#6C5FFC", textTransform: "uppercase" }}>{data.docName.split('.').pop()}</Box>, <Grid Container direction="row" alignItems="center" minWidth={"100px"}><a href={data.docLink} target="_blank"><img src={view_icon} style={{ cursor: "pointer" }} /><img src={download_icon} style={{margin: "0px 12%", cursor: "pointer" }} /></a><img src={delete_icon} onClick={() => handleDeleteDocument(data.id)} style={{ cursor: "pointer" }} /></Grid>)
        );
        setRows(data);
        setPage(response.data)
      }
    }).catch((error) => console.log(error))
  }

  const handlePageChange = async page => {
    await getAllDocuments(page)
  }

  const handleDeleteDocument = async (id) => {
    await dev.delete(`/documents/${id}`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {

      }
    }).catch((error) => console.log(error))
  }

  

  

  return (
    <>
      <Grid container mt="10px">
        {rows.map((row, i) =>
          <>
      <Grid item xs={12} sx={{margin:"20px 0px"}} >
        <HeaderText text="Question" />
      </Grid>
      <Grid item xs={12}>
      <InputBase
                fullWidth
                        sx={{
                            padding: "22px 20px", flex: 1, color: "#808080", fontSize: "14px", lineHeight: "21px",
                            borderRadius: "4px", backgroundColor: "#fff", border: "1px solid #e9edf4", boxSizing: "border-box", 
                        }}
                placeholder={"Type a new FAQ"}
                type={"text"}
                inputProps={{ 'aria-label': "Type a new FAQ" }}
                required
        />
      </Grid>
      <Grid item xs={12} sx={{margin:"20px 0px"}} >
        <HeaderText text="Answer" />
      </Grid>
      <Grid item xs={12}>
      <InputBase
                fullWidth
                        sx={{
                            padding: "22px 20px", flex: 1, color: "#808080", fontSize: "14px", lineHeight: "21px",
                            borderRadius: "4px", backgroundColor: "#fff", border: "1px solid #e9edf4", boxSizing: "border-box", 
                        }}
                placeholder={"Type your answer against your FAQ"}
                type={"text"}
                inputProps={{ 'aria-label': "Type your answer against your FAQ" }}
                required
        />
      </Grid>
      { i+1!==rows.length && <Grid xs="12">
        <Divider sx={{margin:"34px 0px 14px"}} />
      </Grid>}
          </>)}
      </Grid>
      <Grid container mt="40px" mb="50px">
        <PrimaryBtn text="Add More FAQ" onClick={() => setRows([...rows,rows.length])} style={{ padding: "5px 17px" }} />
        <PrimaryBtn text="Save" style={{padding:"5px 47px", ml:"20px"}} />
      </Grid>
    </>
  );
}

export default Faqs;



