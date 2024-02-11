import { Grid, Modal } from '@mui/material';
import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HeaderText from '../Text/HeaderText';
import SubHeaderText from '../Text/SubHeaderText';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import { Typography } from 'antd';

const LinkPaymentModal = ({ showModal, onClose }) => {
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
                    width: '30%',
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
                    <Grid item xs="12" textAlign={'center'}>
                        <SubHeaderText text="Your Campaign ID: C123455 has gone for approval. " />
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
                            onClick={onClose}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default LinkPaymentModal;
