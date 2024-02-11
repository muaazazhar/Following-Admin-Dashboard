import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Box, Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StripeModal = ({
    showModal,
    setSuccessModal,
    setFilureModal,
    onClose,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log(elements.getElement(CardElement));

        if (!stripe || !elements) {
            return;
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            console.log(paymentMethod);

            if (error) {
                console.error(error);
                setError(error.message);
                setFilureModal(true);
                onClose();
                return;
            }
            setSuccessModal(true);
            onClose();
        } catch (error) {
            setFilureModal(true);
            onClose();
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Modal
            open={showModal}
            onClose={onClose}
            sx={{
                height: '100dvh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '40%',
                    margin: '0 auto',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <img
                    src="/Stripe.png"
                    alt=""
                    style={{ alignSelf: 'center', width: '100%' }}
                />
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        transition: 'border-color 0.3s ease',
                        '&:hover': {
                            borderColor: '#4CAF50',
                        },
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Box>
                <Button
                    color="success"
                    variant="contained"
                    onClick={handlePayment}
                >
                    Pay
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Box>
        </Modal>
    );
};

export default StripeModal;
