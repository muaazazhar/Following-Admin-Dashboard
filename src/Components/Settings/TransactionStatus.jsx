import { Box, Grid, Typography } from '@mui/material';
const TransactionStatus = ({  status=1}) => {
    return (
        <Box
        sx={{
            padding: '6px 0px',
            textAlign: 'center',
            backgroundColor: status ? '#6C5FFC' : '#01AB3B',
            color: '#FFFFFF',
            width: '80px',
            borderRadius: '100px',
        }}
    >
        {status ? 'PAID' : 'Resolved'}
    </Box>
    );
};

export default TransactionStatus;
