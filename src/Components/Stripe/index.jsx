import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const StripeModal = ({ showModal, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                console.error(error);
                setError(error.message);
                return;
            }

            // Use the obtained PaymentMethod ID to initiate a PaymentIntent
            const { error: intentError } = await stripe.createPaymentIntent({
                payment_method: paymentMethod.id,
                amount: 1000,
                currency: 'usd',
            });

            if (intentError) {
                console.error(intentError.message);
                setError(intentError.message);
            } else {
                console.log('PaymentIntent created successfully');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            {showModal && (
                <div>
                    <div>
                        <button onClick={onClose}>Close</button>
                    </div>
                    <form onSubmit={handlePayment}>
                        <CardElement />
                        <button type="submit">Pay</button>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            )}
        </div>
    );
};

export default StripeModal;
