import { Box, Grid, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const TransactionStatus = ({ label = null, status=1, icon = null }) => {
    return (
        <Grid container direction="row"
        justifyContent="center"
        alignItems="center">
        <Box
        sx={{
            padding: '6px 11px',
            border: `1px solid ${status ? "#01AB3B" :"#e94e51"}`,
            backgroundColor: '#FFFFFF',
            color: `${status ? "#01AB3B" :"#e94e51"}`,
            fontWeight: 600,
            width: '110px',
            borderRadius: '100px',
            display: "flex",
        }}
    >
                {icon ? <CheckCircleRoundedIcon sx={{ mr: "10px" }}  /> : <CancelRoundedIcon sx={{ mr: "10px" }}/>}
        <Typography>{label? label : icon ? "Approved" : "Rejected" }</Typography>
            </Box>
            </Grid>
    );
};

export default TransactionStatus;
