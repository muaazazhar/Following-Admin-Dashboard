import { Avatar, Box, Button, Grid, Typography, styled } from "@mui/material";
import * as React from "react";
import HeaderText from "../Text/HeaderText";
import InfoLabel from "../Text/InfoLabel";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import SubHeaderText from "../Text/SubHeaderText";
import { useNavigate, useParams } from "react-router-dom";
import dev from "../../services/axios-client";
import HeaderWrapper from "../Wrapper/HeaderWrapper";
import FormSubmitDialog from "../Popups/formSubmitDialog";
import WarningDialog from "../Popups/WarningDialog";
import Loader from "../Loader";
import DocumentPopup from "../ViewDocument";


function MerchantDetails() {

  let { merchantId, update } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));
  const [merchant, setMerchant] = React.useState({});
  const [edit, setEdit] = React.useState(update ? true : false);
  const [merchantData, setMerchantData] = React.useState({});
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = React.useState({});
  const [modal, setModal] = React.useState({ open: false });
  const [responseModal, setResponseModal] = React.useState({ open: false });
  const [loading, setLoading] = React.useState(false);
  const [navi, setNavi] = React.useState(false);

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
      handleMerchantDelete(merchant.id);
    }
    setModal({ ...modal,open: false });
  };
  const handleResponseClose = () => {
    setResponseModal({ open: false });
    if(navi)
    navigate("/user-management-module")
};

  const handleOpen = (id) => {
    setNavi(true);
    setModal({ open: true, title: "Are you sure to delete this Merchant Record?", cancelBtn: "Cancel", submitBtn: "Delete"});
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  React.useEffect(() => { 
    setLoading(true);
    dev.get(`/merchant/${merchantId}`, {
      headers: {
       "token": user.token
     },
    }).then((response) => {
      setLoading(false);
    setMerchant(response.data.data);
    }).catch((error) => {
      setLoading(false);
      console.log(error)
    })
    
  }, [])

  const handleEditClick = async () => {
    if (edit) {
      const formData = new FormData();
      Object.keys(merchantData).forEach((key) => {
          formData.append(key, merchantData[key]);
      });

      try {
        const response = await dev.put(`/merchant/${merchantId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": user.token
          },
        });

      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }
    setEdit(!edit);
  }
  
  const DocumentUpload = async (e) => {
    const { name, files } = e.target;
    setMerchantData((prevInputData) => ({
      ...prevInputData,
      [name]: files[0],
    }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchantData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };


  const docTypeToLink = {};
  const documents = merchant.documents;
  documents?.forEach((document) => {
    docTypeToLink[document.docType] = {link: document.docLink, id: document.id, docName: document.docName};
  });

  const handleMerchantDelete = (id) => {
    setLoading(true);
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

  const handleDeleteDocument = async (doc) => {
    setNavi(false);
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
    <Grid container sx={{backgroundColor: "#F9F9F9", height:"100%"}}>
      <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
      <WarningDialog modal={modal} onClose={handleClose} />
      {(popupIsOpen && selectedDocument) && <DocumentPopup
        isOpen={popupIsOpen}
        onClose={closePopup}
        documentUrl={selectedDocument}
      />}
      <Loader loading={loading} />
      <HeaderWrapper>
          <HeaderText text="Merchant Details"/>  
      </HeaderWrapper>
        { merchant?.id &&
        <Grid xs={12} sx={{ backgroundColor: "#FFFFFF", mt: "20px", padding: "30px", borderRadius: "7px", boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", }}>
          <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
            <Typography sx={{borderRadius: "5px",fontSize: "18px", lineHeight: "22px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#FFF", padding: "11px 4px", backgroundColor: "#6c5ffc"}}>
            Id: {merchant.id}
            </Typography>
            <Box>
              <Button onClick={handleEditClick} variant="contained" color="inherit" sx={{
                backgroundColor: edit ? "#6c5ffc" : "#f9f9f9", color: edit ? "#FFFFFF" : "#282F53", textTransform: "capitalize", mr: "20px",
                '&:hover': {
                  backgroundColor: edit ? '#8a7fff' : '#f9f9f9', // Change the hover background color
                  color: edit ? '#282F53' : '#282F53', // Optionally, you can change the text color on hover
              },
              }}>{edit ? "Save" : "Edit"}</Button>
            <Button onClick={() => handleOpen(merchant.id)} variant="contained" color="error"  sx={{ backgroundColor: "#E94E51", color: "#FFFFFF", textTransform: "capitalize" }}>Delete</Button>
            </Box>
        </Grid>
        <Grid container sx={{ height: "100%", padding: {xs:"20px 0px",  md:"30px 2% 6% 2%", lg:"40px 11% 8% 12%",} }}>
            <Grid xs={12}>
            <Box sx={{ cursor: "pointer" }} component={"label"}>
                  <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                      onChange={DocumentUpload}
                      name="merchantLogo"
                      disabled={!edit}
                />
                <Avatar alt={merchant.name} src={docTypeToLink?.Logo.link} sx={{ width: "100px", height: "100px" }} />
                  </Box>
              
          </Grid>
          <Grid xs={12} md={6} pt="10px">
          <HeaderText text="Personal Details" />
              <InfoLabel label="Name" value={merchantData.name ? merchantData.name : merchant.name} name="name" onChange={edit ? handleInputChange : null} />
              <InfoLabel label="Address" value={merchantData.address ? merchantData.address : merchant.address} name="address" onChange={edit ? handleInputChange : null} />
              {/* <InfoLabel label="Email" value={merchant.email}/>
              <InfoLabel label="Password" value="pass*****" />
              <InfoLabel label="Role of Account" value={merchant.role}/> */}
              <InfoLabel label="Contact Name" value={merchantData.contactName ? merchantData.contactName : merchant.contactName} name="contactName" onChange={edit ? handleInputChange : null} />
              <InfoLabel label="Contact Person Number" value={merchantData.contactNumber ? merchantData.contactNumber : merchant.contactNumber} name="contactNumber" onChange={edit ? handleInputChange : null}/>
              <InfoLabel label="User Created By" value="1"/>
          </Grid> 
          <Grid xs={12} md={6} sx={{ borderTop: { sm : "1px solid#E9EDF4", md:"none"}, borderLeft: { sm : "none", md:"1px solid#E9EDF4"}, pl: {md: "7%", lg:"12%"}, pt: {xs: "20px", md:"10px" }, mt: {xs:"20px " ,md:"0px"}}}>
            <Grid
            container
            alignContent={"center"}
            justifyContent="space-between" 
            direction="row" 
            alignItems="center"
          >
                <HeaderText text="Files" />
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
            mt="10px"    
          >
              
                <Box sx={{ margin:"10px 0px",padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600", color: "#212529", cursor: "pointer", textDecoration: "none" }}>
                DOC
                </Box>
                
                <Box display={"flex"}>
                  <Box sx={{ cursor: "pointer" }} component={"label"}>
                  <VisuallyHiddenInput
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={DocumentUpload}
                      name="merchantTradeLicense"
                      disabled={!edit}
                  /> 
                  <SubHeaderText text="Change" />
                  </Box>
                <a href={docTypeToLink["Trade License"].link} target="_blank" style={{textDecoration: "none"}}>
                <Box sx={{cursor: "pointer", margin:"0px 15px"}}>
                  <SubHeaderText text="Download" />
                </Box>
                </a>  
                <Box sx={{cursor: "pointer"}} onClick={() => handleViewIconClick(`${docTypeToLink["Trade License"].link}`)}>
                  <SubHeaderText text="View"  />
                </Box>
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
            mt="10px"    
                >
              
                <Box sx={{margin:"10px 0px", padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600",color: "#212529", cursor: "pointer"}}>
                DOC
                    </Box>
                    <Box display={"flex"}>
                    <Box sx={{ cursor: "pointer" }} component={"label"}>
                  <VisuallyHiddenInput
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={!edit}
                      onChange={DocumentUpload}
                      name="merchantAdditionalDocuments"
                  /> 
                  <SubHeaderText text="Change" />
                    </Box>
                
                <a href={docTypeToLink["Additional Documents"].link} target="_blank" style={{textDecoration: "none"}}>
                <Box sx={{cursor: "pointer", margin:"0px 15px"}}>
                  <SubHeaderText text="Download" />
                </Box>
                </a>    
                <Box sx={{cursor: "pointer"}} onClick={() => handleViewIconClick(`${docTypeToLink["Additional Documents"].link}`)}>
                  <SubHeaderText text="View"   />
                </Box>
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
            mt="10px"    
                >
                
                <Box sx={{margin:"10px 0px",padding: "8px 36px", borderRadius: "7px", backgroundColor: "#f9f9f9", fontSize: "14px", lineHeight: "21px", fontWeight: "600",color: "#212529", cursor: "pointer"}}>
                DOC
                  </Box>
                  <Box display={"flex"}>
                <Box sx={{ cursor: "pointer" }} component={"label"}>
                  <VisuallyHiddenInput
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={!edit}
                      onChange={DocumentUpload}
                      name="merchantContract"
                  /> 
                  <SubHeaderText text="Change" />
                  </Box>
                  <a href={docTypeToLink["Contract"].link} target="_blank" style={{textDecoration: "none"}}>
                <Box sx={{cursor: "pointer", margin:"0px 15px"}}>
                  <SubHeaderText text="Download" />
                    </Box>
                    </a>
                    <Box sx={{cursor: "pointer"}} onClick={() => handleViewIconClick(`${docTypeToLink["Contract"].link}`)}>
                  <SubHeaderText text="View"  />
                </Box>
                </Box>
          </Grid>     
          </Grid>   
        </Grid>
        </Grid>
        }
    </Grid> 
  );
}

export default MerchantDetails;



