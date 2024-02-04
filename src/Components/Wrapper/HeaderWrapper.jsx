import * as React from 'react';
import { Grid } from '@mui/material';

export default function HeaderWrapper({children}) {
    return (
    <Grid xs={12} sx={{display:"flex",alignItems:"center",padding:{ xs:"10px", sm: "0px", }}}> 
      {children}
    </Grid>         
  );
}
