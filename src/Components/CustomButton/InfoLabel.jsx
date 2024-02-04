import {Typography} from '@mui/material';
const InfoLabel = ({label="text", value="value", color="#212529" }) => {
    return (
        <Typography sx={{fontSize: "14px", mt:"20px" ,textAlign:"left", lineHeight: "22px", fontWeight: "500", fontFamily: "'IBM Plex Sans'", color: color}}>
            <span>{`${label}: `}</span> <b>{value}</b>
        </Typography>
    )
    };
                  									
export default InfoLabel;
                  									