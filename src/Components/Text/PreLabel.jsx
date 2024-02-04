import {Grid, InputBase, Typography} from '@mui/material';
const PreLabel = ({label="text"}) => {
    return (
        <Grid xs="12" mb="10px">
        <Typography component={"span"} sx={{fontSize: "16px", lineHeight: "21px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: "#74829c", textAlign: "left",}}>
            {label}
        </Typography>
        </Grid>
    )
    };
                  									
export default PreLabel;
                  									