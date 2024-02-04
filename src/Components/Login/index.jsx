import { Box, Button, Grid, InputBase, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import MainAuthContainer from '../MainAuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dev from '../../services/axios-client';
import authService from '../../services/authService';
import LinkButton from '../CustomButton/LinkButton';
import Loader from '../Loader';
import { Visibility } from '@mui/icons-material';

const MerhantLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Message");
    const [show, setShow] = useState(false);
    const handleInputChange = (e) => {
        setError(false);
        const { name, value } = e.target;
        setUser((prevInputData) => ({
            ...prevInputData,
            [name]: value,
        }));
    };

    const ValidateSignInRequest = async () => {
        const emailValidationResult = authService.validateEmail(user.email);
        const passwordValidationResult = authService.validatePassword(user.password);
        if (emailValidationResult) {
            setErrorMessage(emailValidationResult);
            setError(true);
            return;
        }
        else if(passwordValidationResult){
            setErrorMessage(passwordValidationResult);
            setError(true);
            return;
        }
        else {
    await handleSignInRequest();
    }
    }

    const handleSignInRequest = async () => {
        setLoading(true);
        try {
            const response = await dev.post('/merchant/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response?.data?.token) {
                // Handle the response
                authService.doLogIn(JSON.stringify(response.data));
                navigate('/');
            }
            setLoading(false);
        } catch (error) {
            setError(true)
            setErrorMessage(error.response.data.message)
            // Handle errors
            console.error('Error:', error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <MainAuthContainer>
            <Loader loading={loading} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: '100%', height: '100%', padding: '20px 15%' }}
            >
                <Typography
                    sx={{
                        fontSize: '24px',
                        lineHeight: '28.8px',
                        fontWeight: '600',
                        fontFamily: "'IBM Plex Sans'",
                        color: '#424344',
                        textAlign: 'center',
                    }}
                >
                    SIGN IN !
                </Typography>
                <Typography
                    sx={{
                        fontSize: '16px',
                        lineHeight: '28.8px',
                        fontFamily: "'IBM Plex Sans'",
                        color: '#6c757d',
                        textAlign: 'center',
                    }}
                >
                    Please enter your merchant login Credentials
                </Typography>
                <Box
                    sx={{
                        marginTop: '30px',
                        marginBottom: '20px',
                        border: '1px solid #6c5ffc',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        height: '44px',
                        width: '100%',
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        height={'100%'}
                        width={'100%'}
                    >
                        <Grid
                            item
                            xs={'auto'}
                            sx={{
                                backgroundColor: '#6c5ffc',
                                margin: 'auto 0px',
                                width: '36px',
                                height: '100%',
                                padding: '12px',
                            }}
                        >
                            <EmailIcon
                                sx={{ color: '#FFFFFF', fontSize: '12px' }}
                            />
                        </Grid>
                        <InputBase
                            fullWidth
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Email"
                            type="email"
                            inputProps={{ 'aria-label': 'email', maxLength: 40  }}
                            autoComplete="email"
                            onChange={handleInputChange}
                            name="email"
                            id="email"
                        />
                    </Grid>
                </Box>
                <Box
                    sx={{
                        border: '1px solid #6c5ffc',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        height: '44px',
                        width: '100%',
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        height={'100%'}
                        width={'100%'}
                    >
                        <Grid
                            item
                            xs={'auto'}
                            sx={{
                                backgroundColor: '#6c5ffc',
                                margin: 'auto 0px',
                                width: '36px',
                                height: '100%',
                                padding: '12px',
                            }}
                        >
                            {show ? (
                                <Visibility
                                    onClick={() => setShow(!show)}
                                    sx={{
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                    }}
                                />
                            ) : (
                                <VisibilityOffIcon
                                    onClick={() => setShow(!show)}
                                    sx={{
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                    }}
                                />
                            )}
                        </Grid>
                        <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            fullWidth
                            placeholder="Password"
                            type={show ? 'text' : 'password'}
                            inputProps={{ 'aria-label': 'password',maxLength: 20  }}
                            autoComplete="current-password"
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                        />
                    </Grid>
                </Box>
                {error&&<Box sx={{ width: '100%' }}>
                        <Typography
                            sx={{
                                fontSize: '13px',
                                lineHeight: '19.5px',
                                fontWeight: '500',
                                fontFamily: "'IBM Plex Sans'",
                                color: '#D92D20',
                                textAlign: 'center',
                                mt: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            {errorMessage}
                        </Typography>
                </Box>}
                <Box sx={{ width: '100%' }}>
                    <LinkButton to="/forget/password">
                        <Typography
                            sx={{
                                fontSize: '13px',
                                lineHeight: '19.5px',
                                fontWeight: '500',
                                fontFamily: "'IBM Plex Sans'",
                                color: '#6c5ffc',
                                textAlign: 'right',
                                mt: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            Forgot Password?
                        </Typography>
                    </LinkButton>
                </Box>
                <Button
                    variant="contained"
                    onClick={ValidateSignInRequest}
                    fullWidth
                    sx={{
                        backgroundColor: '#6c5ffc',
                        color: '#FFFFFF',
                        margin: '30px 0px',
                    }}
                >
                    Sign In
                </Button>
                <Typography
                    sx={{
                        fontSize: '16px',
                        lineHeight: '28.8px',
                        fontWeight: '500',
                        fontWeight: '600',
                        fontFamily: "'IBM Plex Sans'",
                        color: '#100F15',
                        textAlign: 'center',
                    }}
                >
                    Don’t have an Account?
                </Typography>
                <LinkButton to="/admin/login">
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '28.8px',
                            fontWeight: '500',
                            fontFamily: "'IBM Plex Sans'",
                            color: '#6c5ffc',
                            textAlign: 'center',
                        }}
                    >
                        Login with Super Admin
                    </Typography>
                </LinkButton>
            </Grid>
        </MainAuthContainer>
    );
};

export default MerhantLogin;
