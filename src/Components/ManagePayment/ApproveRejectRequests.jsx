import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import Table, { tableClasses } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
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
import { useNavigate } from "react-router-dom";
import share_icon from "../../assets/share_icon.png";
import TransactionStatus from "./TransactionStatus";

function createData(id, name, date, amount, status) {
  return { id, name, date, amount, status };
}

const headerColumnStyle = {
   fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px",}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: { xs: "5px 8px", md: "8px 10px", lg: "25px 16px" },
  borderTop: "1px solid #e9edf4 !important",
  borderBottom: "1px solid #e9edf4 !important",
}


function ApproveRejectRequestsTable() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState({});
  const [data, setData] = React.useState([]);

  const convertDate = (date) => {
    const inputDate = new Date(date);

    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    };
    
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate
    
  }


  React.useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async (page = 1) => {
    console.log(`Getting all /payments/influencer`);
    await dev.get(`/payments/influencer`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        setData(response.data);
          const data = response.data.map((item) =>
          createData(`#${item.id}`, item.user.name, convertDate(item.createdAt), `$${item.amount}`, <TransactionStatus status={item.status === "Approved" ? 1:0} icon={item.status === "Approved" ? 1:0} />,),
        );
        setRows(data);
        
      }
    }).catch((error) => console.log(error))
  }

  const handlePageChange = async page => {
    await getAllDocuments(page)
  }


  

  

  return (
    <>
      <TableContainer >
      <Table >
            <TableHead
                sx={{
                [`& .${tableCellClasses.root}`]: {
                }
            }}
            >
          <TableRow>
            <TableCell sx={headerColumnStyle}>Id</TableCell>
            <TableCell sx={headerColumnStyle}>Name</TableCell>
              <TableCell sx={headerColumnStyle}>Date</TableCell>
              <TableCell sx={headerColumnStyle}>Date</TableCell>
            <TableCell sx={{headerColumnStyle, textAlign: "center"}}>Status</TableCell>
          </TableRow>
        </TableHead>
            <TableBody
            sx={{
              
              [`& .${tableCellClasses.root}`]: {
                // borderRadius: "7px",
                // borderTop: "1px solid #e9edf4 !important",
                // borderBottom: "1px solid #e9edf4 !important",
              },
              [`& .${tableRowClasses.root}`]: {
                // backgroundColor: "#FFFFFF",
                // borderRadius: "7px",
                // borderCollapse: "unset !important",
                // boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", border: "1px solid #e9edf4 !important", boxSizing: "border-box", width: "100%"
              },
            }}
          >
          
            {rows?.map((row, index) => (
            <>
            <div style={{height:'15px'}}> </div>
            <TableRow
                  key={row.index}
                  sx={{"border":"1px solid #e9edf4 !important", }}
            >
              <TableCell sx={{...bodyColumnStyle, borderLeft: "1px solid #e9edf4 !important", borderRadius: "7px 0px 0px 7px" }}>
                {row.id}
              </TableCell>
              <TableCell sx={bodyColumnStyle}>{row.name}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.date}</TableCell>
              <TableCell sx={{...bodyColumnStyle, fontWeight: 600} }>{row.amount}</TableCell>
              <TableCell sx={{...bodyColumnStyle, borderRight: "1px solid #e9edf4 !important", borderRadius: "0px 7px 7px 0px" }}>{row.status}</TableCell>
                </TableRow>
                </>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <PaginationWrapper border={"#E9EDF4"} pt={20} pb={210} mt={22} >
          <Pagination currentPage={page?.page} pageSize={page?.per_page} totalUsers={page?.total} onPageChange={handlePageChange} />
      </PaginationWrapper>  
      </>
  );
}

export default ApproveRejectRequestsTable;



