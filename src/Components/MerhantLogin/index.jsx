import { Box, Button, Grid, IconButton, InputAdornment, InputBase, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import NewMainAuthContainer from '../NewMainAuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dev from '../../services/axios-client';
import authService from '../../services/authService';
import LinkButton from '../CustomButton/LinkButton';
import Loader from '../Loader';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <NewMainAuthContainer>
            <Loader loading={loading} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                sx={{ width: '100%', height: '100%', padding: '20px 6% 20px 7%' }}
            >
                <Typography
                    sx={{
                        fontSize: '42px',
                        lineHeight:"40px",
                        fontWeight: '600',
                        fontFamily: "Clash Display",
                        color: '#000000',
                    }}
                >
                    Hello Partners.
                </Typography>
                <Typography
                    sx={{
                        fontSize: '42px',
                        lineHeight:"40px",
                        fontWeight: '600',
                        fontFamily: "Clash Display",
                        color: '#000000',
                    }}
                >
                    Login.
                </Typography>
                <Box
                    sx={{
                        marginTop: '80px',
                        marginBottom: '40px',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        
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
                        
                        <InputBase
                            fullWidth
                            sx={{
                                ml: 0,
                                flex: 1,
                                fontSize: "38px", letterSpacing: "-0.07em", fontFamily: "'Work Sans'", color: "#999", textAlign: "left", display: "flex", alignItems: "center",
                            }}
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
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
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
                        <InputBase
                            fullWidth
                            name="password"
                            id="password"
                        onChange={handleInputChange}    
                        sx={{
                            ml: 0,
                            flex: 1,
                            fontSize: "38px", letterSpacing: "-0.07em", fontFamily: "'Work Sans'", color: "#999", textAlign: "left", display: "flex", alignItems: "center",
                        }}
                        placeholder={'Password'}
                        //type={"password"}
                        inputProps={{
                            'aria-label': 'Password',
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        required
                        type={
                            show ? 'text' : 'password'
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShow(!show)}
                                    onMouseDown={
                                        handleMouseDownPassword
                                    }
                                    edge="end"
                                    sx={{ mr: '5px' }}
                                >
                                    {show ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
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
                                fontSize: "16px", letterSpacing: "-0.05em", lineHeight: "19.5px", fontWeight: "500", fontFamily: "'Work Sans'", color: "#000", textAlign: "left",
                                mt: '16px',
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
                    
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "#272727",
                        height: "56px",
                        fontSize: "18px",
                        margin: "70px 0px 150px",
                        fontFamily: "Work Sans",
                        color: "#fff",
                        textAlign: "left",
                        width:"220px"
                    }}
                >
                    LOGIN
                </Button>
                <Typography
                    sx={{
                        fontSize: '18px',
                        
                        fontWeight: '500',
                        fontFamily: "Work Sans",
                        color: "#40403c",
                        textAlign: 'right',
                    }}
                >
                    Don’t have an Account? Join Now
                </Typography>
            </Grid>
        </NewMainAuthContainer>
    );
};

export default MerhantLogin;
