import {
    Box,
    Button,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import validationService from '../../services/validationService';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dev from '../../services/axios-client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OnGoingCampaignBox = ({ campaign }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCompleted = async () => {
        await dev.put(
            `/campaign/${campaign.id}`,
            { isActive: false },
            {
                headers: {
                    token: user.token,
                },
            },
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDetails = () => {
        navigate(`/campaign-details/${campaign.id}`);
    };

    return (
        <Grid
            container
            direction="column"
            sx={{
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '1px 1px 1px 1px grey',
                mt: '22px',
                minWidth: '275px',
                maxWidth: '300px',
            }}
        >
            <Box
                mb="30px"
                sx={{
                    backgroundColor: '#F5F5F5',
                    maxHeight: '96px',
                    maxWidth: '100%',
                    borderRadius: '10px',
                    padding: '29px 15px 12px 12px',
                    position: 'relative',
                }}
            >
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '400',
                        color: '#74829c',
                        mb: '10px',
                    }}
                >
                    {validationService.formatDate(campaign.createdAt)}
                </Typography>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#282f53',
                        mb: '10px',
                    }}
                >
                    {campaign.title}
                </Typography>
                <IconButton
                    onClick={(event) => {
                        setOpen(true);
                        setAnchorEl(event.currentTarget);
                    }}
                    sx={{
                        position: 'absolute',
                        right: '8px',
                        top: '33px',
                    }}
                >
                    <MoreVertIcon fontSize="12px" />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleDetails}>Details</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ ml: '12px' }}>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#282f53',
                        mb: '10px',
                    }}
                >
                    Social Media Channels
                </Typography>
                {campaign.socialMediaChannels.split(',').map((social) => (
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        &bull; {social}
                    </Typography>
                ))}
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        backgroundColor: '#01AB3B',
                        textTransform: 'none',
                        width: '95%',
                        mt: '35px',
                        mb: '12px',
                    }}
                    onClick={handleCompleted}
                >
                    Mark as Completed
                </Button>
            </Box>
        </Grid>
    );
};

export default OnGoingCampaignBox;
