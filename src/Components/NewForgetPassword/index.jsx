
import validator from 'validator';
import { Box, Button, Grid, IconButton, InputAdornment, InputBase, Typography } from '@mui/material';
import NewMainAuthContainer from '../NewMainAuthContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FormSubmitDialog from '../Popups/formSubmitDialog';

const NewForgetPassword = () => {
    const [user, setUser] = useState({ email: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Message");
    const [show, setShow] = useState(false);
    const [responseModal, setResponseModal] = useState({ open: false });
  
    const [error, setError] = useState(false);
    const handleInputChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleResponseClose = () => {
        setResponseModal({ ...responseModal, open: false });
        goBack();
    };

    const handleForgetPasswordRequest = async () => {
        setLoading(true);
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        console.log(user.email);
        // Test the input value against the regular expression
        const isValidEmail = validator.isEmail(user.email);;
        console.log(isValidEmail);
        if (isValidEmail) {
            try {
                const response = await dev.post("merchant/sendverificationcode", user, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            
                if (response) {
                    setResponseModal({
                        open: true,
                        title: 'Password Reset Email Sent',
                        description: `A password reset message was sent to your email address.
                        Please check your registered emai`,
                        customBtn: true
                    });
                }
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
            }
        } else setError(true);
       setLoading(false)
      }; 
    
      
    useEffect(() =>{
    },[])
    return (
        <NewMainAuthContainer>
            <FormSubmitDialog modal={responseModal} onClose={handleResponseClose} />
            <Loader loading={loading} />
            <Grid
                container
                justifyContent="start"
                alignItems="start"
                sx={{ width: '100%', height: '80vh', padding: '40px 6% 55px 7%' }}
            >
            <Grid xs={12}>
            <Typography
                sx={{
                            fontSize: '42px',
                    lineHeight:"40px",
                    fontWeight: '600',
                    fontFamily: "Clash Display",
                    color: '#000000',
                }}
            >
                Reset 
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
                Password
                    </Typography>
                    <Typography
                sx={{
                    fontSize: '24px',
                    fontWeight: '500',
                    fontFamily: "Clash Display",
                            color: '#000000',
                    marginTop:"20px"
                }}
            >
                Please enter your registered email
                    </Typography>
                    
                </Grid>
                <Grid sx={12}>
                
                    
                    <InputBase
                        fullWidth
                        sx={{
                            ml: 0,
                            flex: 1,
                            fontSize: "38px", letterSpacing: "-0.07em", fontFamily: "'Work Sans'", color: "#999", textAlign: "left", display: "flex", alignItems: "left",
                        }}
                        placeholder="Email"
                        type="email"
                        inputProps={{ 'aria-label': 'email', maxLength: 40  }}
                        autoComplete="email"
                        onChange={handleInputChange}
                        name="email"
                        id="email"
                    />
                    <Button
                variant="contained"
                sx={{
                    borderRadius: "10px",
                    backgroundColor: "#272727",
                    height: "56px",
                    fontSize: "18px",
                    fontFamily: "Work Sans",
                    color: "#fff",
                    textAlign: "left",
                    width: "460px",
                    marginTop:'30px'
                }}
                onClick={handleForgetPasswordRequest}
            >
                SEND VERIFICATION CODE
                </Button>
                </Grid>
                <Grid xs={12}>
            
                </Grid>
                
            </Grid>
            <Grid sx={12}>
                <Grid onClick={goBack} display={"flex"} sx={{cursor:"pointer", marginLeft:"75px"}}>
                <KeyboardBackspaceIcon />
            <Typography
                sx={{
                    fontSize: '18px',
                    alignItems:"center",
                    fontWeight: '500',
                    fontFamily: "Work Sans",
                    color: "#40403c",
                    textAlign: 'left',
                    marginLeft:"5px"
                }}
                >   

                Back to login
                    </Typography>
                    </Grid>
                    </Grid>
    </NewMainAuthContainer>         

    )
    };
                  									
export default NewForgetPassword;
                  									