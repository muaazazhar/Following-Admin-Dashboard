import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import HeaderText from "../Text/HeaderText";
import PrimaryBtn from "../CustomButton/PrimaryBtn";
import warning_icon from "../../assets/warning_icon.png";

export default function WarningDialog(props) {
    const { onClose, modal, cancelBtn , submitBtn } = props;

  const handleClose = (flag) => {
    onClose(flag);
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
          <DialogTitle sx={{padding:"24px 24px 20px"}}>
              <img style={{width:"48px", height:"48px"}} src={warning_icon} />
      </DialogTitle>
      <DialogContent>
              {modal.title && <HeaderText text={modal.title} />}
      </DialogContent>
          <DialogActions sx={{padding:"15px 24px 24px"}}>
        {modal.cancelBtn && <PrimaryBtn text={modal.cancelBtn} fullWidth={true} onClick={() => handleClose(false)} style={{fontSize:"16px",border:"1px solid #E9EDF4", color: "#303038", backgroundColor: "#FFFFFF"}} />}
        {modal.submitBtn && <PrimaryBtn text={modal.submitBtn} fullWidth={true} onClick={() => handleClose(true)} style={{fontSize:"16px", color: "#FFFFFF", backgroundColor: "#D92D20", border:"1px solid #D92D20",}}/>}
      </DialogActions>
    </Dialog>
  );
}

