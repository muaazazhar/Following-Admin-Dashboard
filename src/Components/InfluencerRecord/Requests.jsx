import { Avatar, Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import FormRejectionDialog from "../Popups/formRejectionDialog";
import FormSubmitDialog from "../Popups/formSubmitDialog";
import WarningDialog from "../Popups/WarningDialog";
import Loader from "../Loader";

function createData(id, name, email, phone, action_select , action_btns) {
  return { id, name, email, phone, action_select , action_btns };
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

function InfluencerRequets() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState({});
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = React.useState({});
  const [modal, setModal] = React.useState({ open: false });
  const [formModal, setFormModal] = React.useState({ open: false });
  const [responseModal, setResponseModal] = React.useState({ open: false });
  const [loading, setLoading] = React.useState(false);
  
  const handleClose = (flag) => {
    if (flag) {
      handleDeleteDocument(selectedDocument);
    }
    setModal({ ...modal,open: false });
  };
  const handleResponseClose = () => {
    setResponseModal({ ...responseModal,open: false });
};

  const handleOpen = (doc) => {
    setSelectedDocument(doc);
    setModal({ open: true, title: "Are you sure to delete this Influencer Record?", cancelBtn: "Cancel", submitBtn: "Delete"});
  };

  const handleClickOpen = (e,email) => {
      if(e.value===0)
        setFormModal({ open: true, title: "Send Disapproval Reason", error: true, email: email });
    if (e.value === 1) {
      ApproveUser({email: email});
    }
  };

  const handleFormClose = (reason) => {
    ApproveUser({email: formModal.email, reason: reason , isApproved: false  });
    setFormModal({ ...modal,open: false });
  };

  React.useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async (page = 1) => {
    await dev.get(`/admin/getAllInfluencers?page=${page}&per_page=10`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        
        const data = response.data.data.map((data) =>
        createData(data.id, data.name, data.email, data.phoneNumber, <AccectSelect options={options} defaultValue={data.isApproved?options[0]:options[1]} onChange={(e) => handleClickOpen(e,data.email)} />, <Grid Container direction="row" alignItems="center" ><Tooltip title="View Details" placement="top"><img src={share_icon}  style={{ cursor: "pointer", marginRight: "20px" }} /></Tooltip><Tooltip title="Delete" placement="top"><img src={delete_icon} onClick={() => handleOpen(data)} style={{ cursor: "pointer" }} /></Tooltip></Grid>)
        );
        setRows(data);
        setPage(response.data)
      }
    }).catch((error) => console.log(error))
  }

  const handlePageChange = async page => {
    await getAllDocuments(page)
  }

  const handleDeleteDocument = async (doc) => {
    setLoading(true);
    const data = {
      email: doc.email,
    };
    await dev.put(`/admin/deleteUser`,data ,
   {
      headers: {
          token: user.token,
      },
    }
    ).then((response) => {
      setLoading(false);
      if (response.data) {
        getAllDocuments(page?.page)
        setResponseModal({
          open: true,
          title: 'Influencer deleted successfully',
      });
      }
    }).catch((error) => {
      setLoading(false)
      console.log(error)
      setResponseModal({
        error: true,
        open: true,
        title: 'Failed to delete Influencer',
    });
    })
  }

  const ApproveUser = async (data) => {
    await dev.put(`/admin/approveUser`, data ,{
      headers: {
        "token": user.token
      },
    }).then((response) => {
      getAllDocuments(page?.page)
      if (response.data) {

      }
    }).catch((error) => console.log(error))
  }

  

  console.log(page);

  return (
    <>
      <FormRejectionDialog modal={formModal} onClose={handleFormClose} /> 
      <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
      <WarningDialog modal={modal} onClose={handleClose} />
      <Loader loading={loading} />
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
            <TableCell sx={headerColumnStyle}>Id</TableCell>
            <TableCell sx={headerColumnStyle}>Full Name</TableCell>
            <TableCell sx={headerColumnStyle}>Email</TableCell>
            <TableCell sx={headerColumnStyle}>{`Phone (w/otp)`}</TableCell>
            <TableCell sx={headerColumnStyle}>Approval status</TableCell>
            <TableCell sx={{...headerColumnStyle, textAlign: "center"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
            <TableBody
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              }
            }}
            >
          {rows?.map((row, index) => (
            <TableRow
              key={row.index}
            >
              <TableCell sx={bodyColumnStyle}>
                {row.id}
              </TableCell>
              <TableCell sx={{...bodyColumnStyle, maxWidth: "150px"}}>{row.name}</TableCell>
              <TableCell sx={{...bodyColumnStyle, maxWidth: "150px"}}>{row.email}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.phone}</TableCell>
              <TableCell sx={{...bodyColumnStyle, minWidth:"130px", width:"185px"}}>{row.action_select}</TableCell>
              <TableCell sx={{...bodyColumnStyle, paddingLeft: "0px", paddingRight:"0px", textAlign: "center"}}>{row.action_btns}</TableCell>
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

export default InfluencerRequets;



