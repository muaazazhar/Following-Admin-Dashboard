import { Typography } from '@mui/material';
import { fontFamily } from '@mui/system';
const SubHeaderText = ({
    text = 'text',
    color = '#212529',
    customstyle = {},
    error ={},
    required = false
}) => {
    return (
        <Typography
            sx={{
                fontSize: '14px',
                lineHeight: '22px',
                fontFamily: "'IBM Plex Sans'",
                color: error?.message ? "#d32f2f" : color,
                
                ...customstyle,
            }}
        >
            {text}{required && '*'}
        </Typography>
    );
};

export default SubHeaderText;
