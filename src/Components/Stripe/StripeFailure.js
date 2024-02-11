import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import CancelIcon from '@mui/icons-material/Cancel';

const StripeFailure = ({ showModal, setStripe, onClose }) => {
    const handleTryAgain = () => {
        setStripe(true);
        onClose();
    };
    return (
        <Modal
            open={showModal}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    width: '30%',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#FFEBED',
                        height: '150px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        borderRadius: '10px',
                    }}
                >
                    <CancelIcon
                        sx={{
                            height: '50px',
                            width: '50px',
                            color: '#E94E51',
                        }}
                    />
                    <Typography sx={{ fontWeight: '600', color: '#E94E51' }}>
                        Payment Failed
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '10px',
                        margin: '16px 30px',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: '500',
                                fontSize: '14px',
                                mt: '30px',
                                color: '#74829C',
                            }}
                        >
                            Sorry, this payment couldn't be processed,
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: '500',
                                fontSize: '14px',
                                color: '#74829C',
                                textAlign: 'center',
                            }}
                        >
                            Try again later
                        </Typography>
                    </Box>
                </Box>
                <Box display={'flex'} sx={{ gap: '10px', m: '30px 40px' }}>
                    <PrimaryBtn
                        text="Try Again"
                        fullWidth={true}
                        onClick={handleTryAgain}
                    />
                    <PrimaryBtn
                        text="Close"
                        fullWidth={true}
                        onClick={onClose}
                        style={{ backgroundColor: '#E94E51' }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default StripeFailure;
