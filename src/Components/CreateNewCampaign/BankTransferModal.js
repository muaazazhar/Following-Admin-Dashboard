import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import PrimaryBtn from '../CustomButton/PrimaryBtn';

const BankTransferModal = ({ showModal, onClose }) => {
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
                    padding: '16px 30px',
                    borderRadius: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <img src="/bank 1.png" alt="" />
                    <Typography sx={{ fontWeight: '600' }}>
                        Your Bank Transfer Request Has Been Sent!{' '}
                    </Typography>
                    <Typography sx={{ fontWeight: '500', fontSize: '14px' }}>
                        Usually, the process takes 24 hrs. We will notify you as
                        soon as your account will be verified.
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '14px',
                            textDecoration: 'underline',
                            mt: '30px',
                        }}
                    >
                        Account Details
                    </Typography>
                </Box>
                <Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        mt={'30px'}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: '600',
                            }}
                        >
                            Account Holder Name:
                        </Typography>
                        <Typography
                            sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                        >
                            Following FZC
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        mt={'30px'}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: '600',
                            }}
                        >
                            IBAN:
                        </Typography>
                        <Typography
                            sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                        >
                            AE823423823641823418239
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        mt={'30px'}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: '600',
                            }}
                        >
                            Buisness Address:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                            >
                                Co working, Business Center, Sharjah Publishing
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '18.2px',
                                    textAlign: 'end',
                                }}
                            >
                                City Fre Zone , Sharjah, United Arab Emirates
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display={'flex'} sx={{ gap: '10px', mt: '30px' }}>
                    <PrimaryBtn
                        text="Go Back"
                        fullWidth={true}
                        onClick={onClose}
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

export default BankTransferModal;
