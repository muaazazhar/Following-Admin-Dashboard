import { Box, Divider, Modal, Typography } from '@mui/material';
import React from 'react';
import PrimaryBtn from '../CustomButton/PrimaryBtn';

const StripeSuccess = ({ showModal, onClose }) => {
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
                        backgroundColor: '#DAFFE7',
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
                    <img
                        src="/Success.png"
                        alt=""
                        style={{
                            height: '50px',
                            width: '86.22px',
                        }}
                    />
                    <Typography sx={{ fontWeight: '600', color: '#01AB3B' }}>
                        Payment Successful
                    </Typography>
                </Box>
                <Box sx={{ m: '16px 30px' }}>
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
                                color: '#74829C',
                            }}
                        >
                            Payment Type:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                            >
                                Online Payment
                            </Typography>
                        </Box>
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
                                color: '#74829C',
                            }}
                        >
                            Mobile Number:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                            >
                                +1 (345) 678234
                            </Typography>
                        </Box>
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
                                color: '#74829C',
                            }}
                        >
                            Email:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                            >
                                influencer@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%' }} />
                <Box sx={{ m: '16px 30px' }}>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        mt={'30px'}
                    >
                        <Typography
                            sx={{
                                fontSize: '22px',
                                lineHeight: '20px',
                                fontWeight: '600',
                                color: '#74829C',
                            }}
                        >
                            Amount Paid:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '22px', lineHeight: '18.2px' }}
                            >
                                2000 UED
                            </Typography>
                        </Box>
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
                                color: '#74829C',
                            }}
                        >
                            Transaction Id:
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: '14px', lineHeight: '18.2px' }}
                            >
                                12345678
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display={'flex'} sx={{ gap: '10px', m: '30px 40px' }}>
                    <PrimaryBtn
                        text="Print"
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

export default StripeSuccess;
