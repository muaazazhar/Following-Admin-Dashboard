import * as React from 'react';
import { Grid } from '@mui/material';



export default function WrapperStandardTextField({md=12, lg= 6, children, style}) {
    return (
    <Grid xs={12} md={md} lg={lg} padding={"10px 80px 0px 0px"} sx={style}> 
      {children}
    </Grid>         
  );
}
