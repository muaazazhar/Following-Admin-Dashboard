import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormDataProvider } from './services/formDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe(
    'pk_test_51OWZbJADTNbHc8P6rxTqJTZmvlk7A8Cvp7cO9wr8y2Nn3kLeCT7g9iXml0hhcM3HIbkWH6rwFzI50A9zRen3CPWk00heWzumz4',
);

root.render(
    <React.StrictMode>
        <FormDataProvider>
            <Elements stripe={stripePromise}>
                <App />
            </Elements>
        </FormDataProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
