import { Button } from '@mui/material';

const PrimaryBtn = ({text="text", bgColor="#272727" ,color="#FFFFFF", startIcon=null , onClick=null, fullWidth=null, style={} }) => {
    return (
        <Button fullWidth={fullWidth} variant="contained" onClick={onClick} startIcon={startIcon} sx={{ backgroundColor: bgColor, fontSize: "13px", color: color, textTransform:"capitalize" , ...style }}>{text}</Button>
    )
    };
                  									
export default PrimaryBtn;
                  									