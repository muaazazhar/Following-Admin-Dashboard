import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { DialogActions, DialogContent } from "@mui/material";
import HeaderText from "../Text/HeaderText";
import SubHeaderText from "../Text/SubHeaderText";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

export default function FormSubmitDialog(props) {
    const { onClose, modal, text } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
    onClose={(event, reason) => {
      if (reason !== 'backdropClick') {
          handleClose(event, reason);
      }
  }}
      open={modal.open}
      sx={{textAlign: "center" }}
    >
          <DialogTitle>
              {modal.error ? <ErrorRoundedIcon sx={{
                  color: "#E94E51", width: '40px',
                  height: '40px',
              }} /> :
                  <CheckCircleRoundedIcon sx={{
                      color: "#01AB3B", width: '40px',
                      height: '40px',
                  }} />}
      </DialogTitle>
      <DialogContent>
              {modal.title && <HeaderText text={modal.title} />}
              {modal.description && <SubHeaderText text={modal.description} customstyle={{maxWidth: "350px", mt:"20px"}} />}
      </DialogContent>
          <DialogActions >
        {modal.customBtn ?
          <div
            style={{
            display: "flex",
            width: "100%",
              textAlign: "center",
            paddingBottom: "20px",
            }}
          >
          <Typography sx={{ cursor:"pointer",width:"100%",fontSize: "16px", letterSpacing: "-0.02em", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#000", textAlign: "center", }} fullWidth={true} onClick={handleClose}>{text ? text : "Go Back"}</Typography> </div> : <PrimaryBtn text={text ? text : "close"} fullWidth={true} onClick={handleClose} />}
      </DialogActions>
    </Dialog>
    
  );
}

