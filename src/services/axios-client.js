import axios from 'axios';
import authService from './authService';

let dev = axios.create({
    baseURL: `https://following-backend-dev-be2ebc5fdad3.herokuapp.com`,
});

dev.interceptors.response.use(
    (response) => {
        // If the response is successful, return it as is
        return response;
    },
    (error) => {
        // Check if the error message is "Token invalid"
        // error.response && error.response.data && error.response.data.error === 'Token invalid'
        console.log(error);
        if (
            error.response &&
            error.response.data &&
            error.response.data.message === 'Token invalid'
        ) {
            authService.logOut();
        }
        // If it's not the "Token invalid" error, simply return the error
        return Promise.reject(error);
    },
);

export default dev;

export const prod = axios.create({
    baseURL: `https://following-backend-prod-5a60f5d0c64e.herokuapp.com`,
});
