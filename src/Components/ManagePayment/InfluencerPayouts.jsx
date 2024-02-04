import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dev from "../../services/axios-client";
import Pagination from "../Pagination";
import PaginationWrapper from "../Wrapper/PaginationWrapper";

function createData(date, name, amount, fee , total) {
  return { date, name, amount, fee , total };
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

function InfluencerPayoutsTable() {
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
        createData(convertDate(item.createdAt), item.user.name, `$ ${item.amount}`, `$ ${item.fee}`, `$ ${Number(item.amount)+Number(item.fee)}`),
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
                  borderBottom: "1px solid #E9EDF4",
                }
            }}
            >
          <TableRow>
            <TableCell sx={headerColumnStyle}>Date</TableCell>
            <TableCell sx={headerColumnStyle}>Name</TableCell>
            <TableCell sx={headerColumnStyle}>Amount</TableCell>
            <TableCell sx={headerColumnStyle}>fee</TableCell>
            <TableCell sx={headerColumnStyle}>Total</TableCell>
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
                sx={{height: "20px"}}
            ></TableRow>
          {rows?.map((row, index) => (
            <TableRow
              key={row.index}
            >
              <TableCell sx={bodyColumnStyle}>
                {row.date}
              </TableCell>
              <TableCell sx={bodyColumnStyle}>{row.name}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.amount}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.fee}</TableCell>
              <TableCell sx={{...bodyColumnStyle, fontWeight: 700}}>{row.total}</TableCell>
            </TableRow>
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

export default InfluencerPayoutsTable;



