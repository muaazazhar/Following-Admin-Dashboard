import {Grid, InputBase, Typography} from '@mui/material';
const InfoLabel = ({label="text", value="value", color="#212529", onChange=null, name=null }) => {
    return (
        <Grid xs="12" mt="20px">
        <Typography component={"span"} sx={{fontSize: "14px",textAlign:"left", lineHeight: "22px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: color}}>
            <span>{`${label}: `}</span> <b>{!onChange && value}</b>
        </Typography>
        {onChange && <InputBase
        value={value}
        name={name}
        onChange={onChange}
        sx={{ pl:"5px", fontSize: "14px" ,textAlign:"left", lineHeight: "22px", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: color, border: " 1px solid #E9EDF4", borderRadius: "7px" }}
        placeholder={label}
        type={"text"}
        inputProps={{ 'aria-label': "ID" }}
        />}</Grid>
    )
    };
                  									
export default InfoLabel;
                  									