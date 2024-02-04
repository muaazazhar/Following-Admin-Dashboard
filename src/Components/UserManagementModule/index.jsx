import { Avatar, Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import {React, useEffect, useState} from "react";
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
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import HeaderText from "../Text/HeaderText";
import dev from "../../services/axios-client";
import { Link, useNavigate } from 'react-router-dom';
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import PaginationWrapper from "../Wrapper/PaginationWrapper";
import Pagination from "../Pagination";
import Loader from "../Loader";
import WarningDialog from "../Popups/WarningDialog";
import FormSubmitDialog from "../Popups/formSubmitDialog";

function createData(id, avatar, name, address, cell_no, email, role, action_btns) {
  return { id, avatar, name, address, cell_no, email, role, action_btns };
}

const headerColumnStyle = {
  fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "IBM Plex Sans", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px"}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "10px 16px"}
}



function UserManagementModule() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState({});

  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState("id");
  const [modal, setModal] = useState({ open: false });
  const [responseModal, setResponseModal] = useState({ open: false });
  const [loading, setLoading] = useState(false);
  
  const handleClose = (flag) => {
    if (flag) {
      handleMerchantDelete(selectedDocument);
    }
    setModal({ ...modal,open: false });
  };
  const handleResponseClose = () => {
    setResponseModal({ ...responseModal, open: false });
    getAllMerchants();
};

  const handleOpen = (id) => {
    setSelectedDocument(id);
    setModal({ open: true, title: "Are you sure to delete this Merchant Record?", cancelBtn: "Cancel", submitBtn: "Delete"});
  };


  useEffect(() => {
    getAllMerchants(1);
  }, []);

  const getAllMerchants = (page) => {
    setLoading(true);
    dev.get(`/merchant?page=${page}&per_page=10`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      setRows(response.data.data.map((data) => {
        const docTypeToLink = {};
        const documents = data.documents;
        documents?.forEach((document) => {
          docTypeToLink[document.docType] = document.docLink;
        });
        return createData(data.id, <Avatar alt={data.name} src={docTypeToLink?.Logo} style={{backgroundSize: 'cover', backgroundPosition: 'top center'}} />, data.name, data.address, data.contactNumber, "abc@gmail.com", "Admin", <Grid Container direction="row" alignItems="center" minWidth={"100px"}>          <Tooltip title="View Details" placement="top"><img onClick={() => navigate(`/merchant-details/${data.id}`)} src={share_icon} style={{ cursor: "pointer" }} /></Tooltip>          <Tooltip title="Edit Merchant" placement="top"><img src={edit_icon} onClick={() => navigate(`/merchant-details/${data.id}/update`)} style={{ margin: "0px 15px", cursor: "pointer" }} /></Tooltip>          <Tooltip title="Delete Merchant" placement="top"><img src={delete_icon} onClick={() => handleOpen(data.id)} style={{ cursor: "pointer" }} /></Tooltip></Grid>)
      }
      ));
      delete response.data.data;
      setPage(response.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log(error)
    })
  };


  const handleMerchantDelete = (id) => {
    dev.delete(`/merchant/${id}`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      setLoading(false);
      if (response.data) {
        setResponseModal({
          open: true,
          title: 'Merchant deleted successfully',
      });
      }
    }).catch((error) => {
      console.log(error)
      setLoading(false);
      setResponseModal({
        error: true,
        open: true,
        title: 'Failed to delete merchant',
      });
      
    })
  
  };
  
  const handleClick = () => {
    navigate('/create-merchant-account')
  }

  const handlePageChange = async page => {
    await getAllMerchants(page)
  }

  return (
    <Grid container sx={{backgroundColor: "#FFFFFF", height:"100%"}}>
      <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
      <WarningDialog modal={modal} onClose={handleClose} />
      <Loader loading={loading} />
      <HeaderWrapper>
                <HeaderText
                    text="User Management"
                    color="#272727"
                    style={{
                        fontWeight: 700,
                        fontSize: '32px',
                        lineHeight: '32px',
                    }}
                />
            </HeaderWrapper>
        <Grid xs={12} mt="20px" sx={{ backgroundColor: "#FFFFFF", padding: "30px",  }}>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
            <HeaderText text="All Merchants"/>    
            <PrimaryBtn onClick={handleClick} text="+ Create New Merchent"/>
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
            <TableCell sx={headerColumnStyle}>ID</TableCell>
            <TableCell sx={headerColumnStyle}>Logo</TableCell>
            <TableCell sx={headerColumnStyle}>Name</TableCell>
            <TableCell sx={headerColumnStyle}>Address</TableCell>
            <TableCell sx={headerColumnStyle}>Contact No</TableCell>
            {/* <TableCell sx={headerColumnStyle}>Email</TableCell>
            <TableCell sx={headerColumnStyle}>Role</TableCell> */}
            <TableCell sx={headerColumnStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
            <TableBody
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              }
            }}
            >
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell sx={bodyColumnStyle}>
                {row.id}
              </TableCell>
              <TableCell sx={bodyColumnStyle}>{row.avatar}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.name}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.address}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.cell_no}</TableCell>
              {/* <TableCell sx={bodyColumnStyle}>{row.email}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.role}</TableCell> */}
              <TableCell sx={bodyColumnStyle}>{row.action_btns}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
        <PaginationWrapper border={"#DADDE1"} pt={26} pb={210} mt={22} >
          <Pagination currentPage={page?.page} pageSize={page?.per_page} totalUsers={page?.total} onPageChange={handlePageChange} />
      </PaginationWrapper> 
    </Grid>
    </Grid>
  );
}

export default UserManagementModule;



