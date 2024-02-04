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
import doc_img from "../../assets/doc_img.png";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import HeaderText from "../Text/HeaderText";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import dev from "../../services/axios-client";
import Pagination from "../Pagination";
import PaginationWrapper from "../Wrapper/PaginationWrapper";
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import WarningDialog from "../Popups/WarningDialog";
import FormSubmitDialog from "../Popups/formSubmitDialog";
import Loader from "../Loader";
import DocumentPopup from "../ViewDocument";

function createData(id, name, document, type, action_btns) {
  return { id, name, document, type, action_btns };
}

const headerColumnStyle = {
  fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px"}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "10px 16px"}
}

function AllDocuments() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState({});
  const [selectedDocument, setSelectedDocument] = React.useState({});
  const [modal, setModal] = React.useState({ open: false });
  const [responseModal, setResponseModal] = React.useState({ open: false });
  const [loading, setLoading] = React.useState(false);
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);

  const handleViewIconClick = (data) => {
    setSelectedDocument(data);
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setSelectedDocument({});
    setPopupIsOpen(false);
  };
  
  const handleClose = (flag) => {
    if (flag) {
      handleDeleteDocument(selectedDocument);
    }
    setModal({ ...modal,open: false });
  };
  const handleResponseClose = () => {
    getAllDocuments();
    setResponseModal({ open: false });
};

  const handleOpen = (doc) => {
    setSelectedDocument(doc);
    setModal({ open: true, title: "Are you sure to delete this Merchant Record?", cancelBtn: "Cancel", submitBtn: "Delete"});
  };



  React.useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async (page = 1) => {
    setLoading(true);
    await dev.get(`/documents?page=${page}&per_page=10`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        const data = response.data.data.map((data) =>
          createData(data.merchantId, data.merchant.name, <Box alignItems="center" sx={{ display: "flex", }}> <Box sx={{ border: "1px solid", borderRadius: "5px", border: "1px solid #e9edf4", boxSizing: "border-box", padding: "8px 3px 0px", mr: "10px" }}><img alt={data.docName.split('.').pop()} src={data.docLink}  onError={(event) => {event.target.src = doc_img;}} width="40px" height="30px" /></Box> {data.docType}</Box>, <Box sx={{ padding: "8px", textAlign: "center", borderRadius: "100px", backgroundColor: "#f9f9f9", width: "67px", fontSize: "14px", lineHeight: "21px", fontWeight: "600", color: "#6C5FFC", textTransform: "uppercase" }}>{data.docName.split('.').pop()}</Box>, <Grid Container direction="row" alignItems="center" minWidth={"100px"}><Tooltip title="View" placement="top"><img onClick={() => handleViewIconClick(data)} src={view_icon} style={{ cursor: "pointer" }} /></Tooltip>         <a href={data.docLink} target="_blank"> <Tooltip title="Download" placement="top"><img src={download_icon} style={{margin: "0px 12%", cursor: "pointer" }} /></Tooltip></a>          <Tooltip title="Delete" placement="top"><img src={delete_icon} onClick={() => handleOpen(data)} style={{ cursor: "pointer" }} /></Tooltip></Grid>)
        );
        setRows(data);
        setPage(response.data)
      }
    }).catch((error) => console.log(error))
    setLoading(false);
  }

  const handlePageChange = async page => {
    await getAllDocuments(page)
  }

  const handleDeleteDocument = async (doc) => {
    setLoading(true);
    await dev.delete(`/documents/${doc.id}`, {
      data:{docName: doc.docName},
      headers: {
        "token": user.token
      },
    }).then((response) => {
      setLoading(false);
      if (response.data) {
        setResponseModal({
          open: true,
          title: 'Document deleted successfully',
      });
      }
    }).catch((error) => {
      setLoading(false)
      console.log(error)
      setResponseModal({
        error: true,
        open: true,
        title: 'Failed to delete document',
    });
    })
  }

  

  return (
    <Grid sx={{ height: "100%", }}>
      <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
      <WarningDialog modal={modal} onClose={handleClose} />
      {(popupIsOpen && selectedDocument.docLink) && <DocumentPopup
        isOpen={popupIsOpen}
        onClose={closePopup}
        documentUrl={selectedDocument.docLink}
      />}
      <Loader loading={loading} />
      <HeaderWrapper>
      <HeaderText text="All Documents"/>  
      </HeaderWrapper>
        <Grid xs={12} sx={{ backgroundColor: "#FFFFFF", mt: "20px", padding: "30px", borderRadius: "7px", boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", }}>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
            <HeaderText text="All Merchants"/>  
            {/* <PrimaryBtn text="Upload New Document" startIcon={<FileUploadOutlinedIcon />} /> */}
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
            <TableCell sx={headerColumnStyle}>Merchant Id</TableCell>
            <TableCell sx={headerColumnStyle}>Merchant Name</TableCell>
            <TableCell sx={headerColumnStyle}>Documents</TableCell>
            <TableCell sx={headerColumnStyle}>Doc Type</TableCell>
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
          {rows?.map((row, index) => (
            <TableRow
              key={row.index}
            >
              <TableCell sx={bodyColumnStyle}>
                {row.id}
              </TableCell>
              <TableCell sx={bodyColumnStyle}>{row.name}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.document}</TableCell>
              <TableCell sx={bodyColumnStyle}>{row.type}</TableCell>
              <TableCell sx={{...bodyColumnStyle, paddingLeft: "0px", paddingRight:"0px"}}>{row.action_btns}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <PaginationWrapper border={"#E9EDF4"} pt={20} pb={210} mt={22} >
          <Pagination currentPage={page?.page} pageSize={page?.per_page} totalUsers={page?.total} onPageChange={handlePageChange} />
      </PaginationWrapper>  
      </Grid>
    </Grid>
  );
}

export default AllDocuments;



