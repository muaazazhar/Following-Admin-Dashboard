import { Avatar, Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
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
import FormSubmitDialog from "../Popups/formSubmitDialog";
import WarningDialog from "../Popups/WarningDialog";
import Loader from "../Loader";

function createData(id, name, email, activity, history , action_btns) {
  return { id, name, email, activity, history , action_btns };
}

const headerColumnStyle = {
   fontSize: "14px", lineHeight: "21px", textTransform: "uppercase", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#2e3138", textAlign: "left", marginBottom: "5px", padding: {xs:"8px 8px", md: "10px 10px", lg: "16px 16px",}
}

const bodyColumnStyle = {
  fontSize: "14px", lineHeight: "21px", fontFamily: "'IBM Plex Sans'", color: "#212529", textAlign: "left", padding: {xs:"5px 8px", md: "8px 10px", lg: "25px 16px"}
}


function ActiveInfluencers() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState({});
  const naviagte = useNavigate();
  const [selectedDocument, setSelectedDocument] = React.useState({});
  const [modal, setModal] = React.useState({ open: false });
  const [responseModal, setResponseModal] = React.useState({ open: false });
  const [loading, setLoading] = React.useState(false);
  
  const handleClose = (flag) => {
    if (flag) {
      handleDeleteDocument(selectedDocument);
    }
    setModal({ ...modal,open: false });
  };
  const handleResponseClose = () => {
    setResponseModal({ open: false });
};

  const handleOpen = (doc) => {
    setSelectedDocument(doc);
    setModal({ open: true, title: "Are you sure to delete this Influencer Record?", cancelBtn: "Cancel", submitBtn: "Delete"});
  };


  React.useEffect(() => {
    getAllDocuments();
   
  }, []);

  const getAllDocuments = async (page=1) => {
    await dev.get(`/admin/getAllInfluencers?page=${page}&per_page=10`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        
        const data = response.data.data.map((data) =>
          createData(data.id, data.name, data.email,
            <PrimaryBtn style={{minWidth:{md:"140px"}, }} text="Show Activity" onClick={() => naviagte(`/influencer-records-activity/${data.id}`)} />,
            <PrimaryBtn style={{minWidth:{md:"140px"}}} text="Login History" onClick={() => naviagte(`/influencer-records-history/${data.id}`)} />,
            <Grid Container direction="row" alignItems="center" minWidth={"60px"}><Tooltip title="View Details" placement="top"><img src={share_icon}  style={{ cursor: "pointer", marginRight: "20px" }} /></Tooltip><Tooltip title="Delete" placement="top"><img src={delete_icon} onClick={() => handleOpen(data)} style={{ cursor: "pointer" }} /></Tooltip></Grid>),
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
    await dev.put(`/admin/deleteUser`, {
      data:{email: doc.email},
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
    <>
      <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
      <WarningDialog modal={modal} onClose={handleClose} />
      <Loader loading={loading} />
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
            <TableCell sx={headerColumnStyle}>Full Name</TableCell>
            <TableCell sx={headerColumnStyle}>Email</TableCell>
            <TableCell sx={{...headerColumnStyle, width: "120px"}}>Activity</TableCell>
            <TableCell sx={{...headerColumnStyle, width: "120px"}}>History</TableCell>
            <TableCell sx={{...headerColumnStyle, textAlign: "center"}}></TableCell>
          </TableRow>
        </TableHead>
            <TableBody
            sx={{
              
              [`& .${tableCellClasses.root}`]: {
                borderRadius: "7px",
                borderTop: "1px solid #e9edf4 !important",
                borderBottom: "1px solid #e9edf4 !important",
              },
              [`& .${tableRowClasses.root}`]: {
                backgroundColor: "#FFFFFF",
                borderRadius: "7px",
                borderCollapse: "unset !important",
                boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", border: "1px solid #e9edf4 !important", boxSizing: "border-box", width: "100%"
              },
            }}
          >
          
            {rows?.map((row, index) => (
            <>
            <div style={{height:'15px'}}> </div>
            <TableRow
                key={row.index}
            >
              <TableCell sx={{...bodyColumnStyle, borderLeft: "1px solid #e9edf4 !important", }}>
                {row.id}
              </TableCell>
              <TableCell sx={{...bodyColumnStyle, minWidth: "150px", maxWidth:"250px", width:"200px"}}>{row.name}</TableCell>
              <TableCell sx={{...bodyColumnStyle, minWidth: "150px", maxWidth:"250px", width:"200px"}}>{row.email}</TableCell>
              <TableCell sx={{...bodyColumnStyle, minWidth: "120px", maxWidth:"180px", width:"150px"}}>{row.activity}</TableCell>
              <TableCell sx={{...bodyColumnStyle, minWidth: "120px", maxWidth:"180px", width:"150px"}}>{row.history}</TableCell>
              <TableCell sx={{...bodyColumnStyle, borderRight: "1px solid #e9edf4 !important", textAlign: "center",}}>{row.action_btns}</TableCell>
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

export default ActiveInfluencers;



