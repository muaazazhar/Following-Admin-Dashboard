import { Typography } from '@mui/material';
const HeaderText = ({ text = 'text', color = '#282f53', style = {} }) => {
    return (
        <Typography
            sx={{
                fontSize: '20px',
                lineHeight: '22px',
                fontFamily: "'IBM Plex Sans'",
                color: color,
                fontWeight: 600,
                ...style,
            }}
        >
            {text}
        </Typography>
    );
};

export default HeaderText;
