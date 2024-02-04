import * as React from 'react';
import { Box, Divider } from '@mui/material';

export default function PaginationWrapper({pt=0,pb=0,mt=0, border= null, children}) {
  return (
    <>
      {border && <Divider  sx={{borderColor: border , mt: `${mt}px`}} />}
      <Box sx={{ pt: `${pt}px`, pb: `${pb}px` }}>
      {children}
      </Box> 
    </>  
  );
}
