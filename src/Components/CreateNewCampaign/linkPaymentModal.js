import { Modal } from '@mui/material';
import React from 'react';

const linkPaymentModal = ({ open }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: '#FFFFFF',
                    mt: '20px',
                    padding: '30px 0px',
                    borderRadius: '7px',
                    boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                    height: '70vh',
                }}
            >
                <Grid
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs="12" textAlign={'center'}>
                        <CheckCircleRoundedIcon
                            sx={{
                                color: '#01AB3B',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    </Grid>
                    <Grid item xs="12" mt="20px" mb="10px" textAlign={'center'}>
                        <HeaderText text="Thank You for Creating the Campaign" />
                    </Grid>
                    <Grid item xs="12" textAlign={'center'}>
                        <SubHeaderText text="The payment link will be shared you soon" />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            mt: '20px',
                        }}
                    >
                        <PrimaryBtn
                            text="Go Back"
                            fullWidth={true}
                            onClick={() => navigate('/campaign-records')}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default linkPaymentModal;
