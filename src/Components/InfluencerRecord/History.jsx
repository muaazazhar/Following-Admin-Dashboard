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
import back_btn from "../../assets/back_btn.png";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import HeaderText from "../Text/HeaderText";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import dev from "../../services/axios-client";
import Pagination from "../Pagination";
import PaginationWrapper from "../Wrapper/PaginationWrapper";
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import { useNavigate, useParams } from "react-router-dom";

function createData(date, user_name, ip_address, status) {
  return { date, user_name, ip_address, status};
}

const headerColumnStyle = {
  fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px"}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "10px 16px"}
}

function History() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const naviagte = useNavigate();
  const [page, setPage] = React.useState({
    page: 1,
    per_page: 1,
    total: 1
  });
  const [data, setData] = React.useState([]);
  let { influencerId, update } = useParams();

  const convertDate = (date) => {
    const inputDate = new Date(date);

    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate
    
  }


  React.useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async (page = 1) => {
    console.log(`Getting all documents`);
    await dev.get(`/history/influencer/${influencerId}`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data.data) {
        setData(response.data.data);
        const data = response.data.data.map((item) =>
        createData(convertDate(item.createdAt), item.user.name, "private", item.activity_description),
        );
        setRows(data);
        
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

  const goBack = () => {
    naviagte("/influencer-records?active=1");
};

  

  return (
    <Grid sx={{ height:"100%",}}>
      <HeaderWrapper>
      <img src={back_btn} style={{cursor: "pointer"}} onClick={goBack} />
      <HeaderText text="Login History"/>  
      </HeaderWrapper>
        <Grid xs={12} sx={{ backgroundColor: "#FFFFFF", mt: "20px", padding: "30px", borderRadius: "7px", boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", }}>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
            {data[0]?.user?.name && <HeaderText text={data[0]?.user?.name  }/>}
        </Grid>
      <TableContainer >
      <Table sx={{mt: "25px",}} >
            <TableHead
                sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderTop: "1px solid #E9EDF4",
                  borderBottom: "1px solid #E9EDF4",
                }
            }}
            >
          <TableRow>
            <TableCell sx={headerColumnStyle}>Date & time</TableCell>
            <TableCell sx={headerColumnStyle}>User Name</TableCell>
                <TableCell sx={headerColumnStyle}>IP Address</TableCell>
                <TableCell sx={headerColumnStyle}>Status</TableCell>
          </TableRow>
        </TableHead>
            <TableBody
              sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              }
            }}
            >
              <TableRow
              sx={{'height': "18px"}}
            ></TableRow>
          {rows?.map((row, index) => (
            <TableRow
              key={row.index}
            >
              <TableCell sx={bodyColumnStyle}>
                {row.date}
              </TableCell>
              <TableCell sx={bodyColumnStyle}>{row.user_name}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.ip_address}</TableCell>
              <TableCell sx={{...bodyColumnStyle, paddingLeft: "25px !important", color: row.status=== "Active" ? "#01AB3B" : "#E94E51"}}>{row.status}</TableCell>
            </TableRow>
          ))}
              
        </TableBody>
      </Table>
      </TableContainer>
      <PaginationWrapper border={"#E9EDF4"} pt={30} pb={210} mt={20} >
          <Pagination currentPage={page.page } pageSize={page?.per_page} totalUsers={page?.total} onPageChange={handlePageChange} />
      </PaginationWrapper>  
      </Grid>
    </Grid>
  );
}

export default History;



