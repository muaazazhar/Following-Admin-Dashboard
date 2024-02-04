import { Dialog, Modal } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import file from "./file.pdf";
import { PDFViewer } from '@react-pdf/renderer';
import PdfComp from './PdfComp';





const DocumentPopup = ({ isOpen, onClose, documentUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
    console.log('onDocumentLoadSuccess', documentUrl);

    return (

      <Dialog
        open={isOpen}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    onClose(event, reason);
                }
            }}
      >
            <CloseIcon onClick={onClose} sx={{position:"absolute", top:"5px", right:"5px", cursor:"pointer"}}/>
            {documentUrl.endsWith('.pdf') ? (
      
      
          
          <PdfComp pdfFile={documentUrl}/>
   
    
                
                
      ) : (
                    <img src={documentUrl} style={{minWidth: "500px", minHeight:"500px"}} alt="Document" />
      )}
    </Dialog>
  );
};

export default DocumentPopup;
