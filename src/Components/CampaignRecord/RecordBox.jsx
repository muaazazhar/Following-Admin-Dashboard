import { Grid, Typography } from '@mui/material';

const RecordBox = ({ value, text }) => {
    return (
        <Grid
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 25px rgba(168, 180, 208, 0.1)',
                width: '150px',
                height: '150px',
                padding: '40px 30px',
                margin: '20px 20px 0px 0px',
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#282f53',
                }}
            >
                {value}
            </Typography>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: "'IBM Plex Sans'",
                    color: '#74829c',
                }}
            >
                {text}
            </Typography>
        </Grid>
    );
};

export default RecordBox;
