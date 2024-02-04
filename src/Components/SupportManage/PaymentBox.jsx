import { Box, Grid } from '@mui/material';
import SubHeaderText from '../Text/SubHeaderText';
const PaymentBox = ({ label = 'label', value = null }) => {
    return (
        <Grid xs="auto">
            <Box
                sx={{
                    borderRadius: '7px',
                    backgroundColor: '#fff',
                    boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                    width: '185px',
                    padding: '17px 20px 26px 17px',
                }}
            >
                <SubHeaderText text={label} color="#212529" />
                <SubHeaderText
                    text={value}
                    color="#212529"
                    customstyle={{
                        fontSize: '22px',
                        mt: '16px',
                        fontWeight: 600,
                    }}
                />
            </Box>
        </Grid>
    );
};

export default PaymentBox;
