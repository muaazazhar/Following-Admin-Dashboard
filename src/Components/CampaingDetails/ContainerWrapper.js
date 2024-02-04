import { Grid } from '@mui/material';
const CampaignDetailWrapper = ({ children }) => {
    return (
        <Grid
            container
            direction="row"
            sx={{
                mt: '10px',
                borderRadius: '7px',
                backgroundColor: '#fff',
                boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                // padding: {
                //     xs: '12px 20px 12px 26px',
                //     sm: '15px 30px 16px 36px',
                //     md: '17px 50px 18px 56px',
                //     lg: '17px 50px 18px 96px',
                // },
            }}
        >
            {children}
        </Grid>
    );
};

export default CampaignDetailWrapper;
