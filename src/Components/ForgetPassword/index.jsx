import { Box, Button, Grid, InputBase, Typography, } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import LinkButton from '../CustomButton/LinkButton';
import { useState } from 'react';
import dev from '../../services/axios-client';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import validator from 'validator';
import NewMainAuthContainer from '../NewMainAuthContainer';

const NewForgetPassword = () => {

    const [user, setUser] = useState({email: ""});
  
    const [error, setError] = useState(false);
    const handleInputChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
    };
    
    const handleForgetPasswordRequest = async () => {
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
                    console.log(response);
                }
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
            }
        } else setError(true);
       
      };    
  	
    return (
    <NewMainAuthContainer>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{width: '100%', height: '100%', padding: "20px 15%"}}        
            >
                        <Typography sx={{ fontSize: "24px", lineHeight: "28.8px", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#424344", textAlign: "center" }}>Forgot Password</Typography>
                        <Typography sx={{ fontSize: "16px", lineHeight: "28.8px", fontFamily: "'IBM Plex Sans'", color: "#6c757d", textAlign: "center", }}>Please Enter Your Registered Email</Typography>
                        <Box  sx={{ marginTop: "30px", marginBottom: "20px" ,border: "1px solid #6c5ffc", backgroundColor: "transparent", borderRadius: "5px", boxSizing: "border-box", height: "44px", width: "100%"}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                            height={'100%'}
                            width={"100%"}   
                        >
                            <Grid
                            item 
                            xs={"auto"}    
                            sx={{backgroundColor: "#6c5ffc", margin: "auto 0px", width: "36px", height: "100%", padding: "12px"}}    
                        >
                                <EmailIcon sx={{ color: "#FFFFFF", fontSize: "12px" }} />
                                </Grid>
                                <InputBase
                                    fullWidth
                                    sx={{ ml: 2, flex: 1 }}
                                    name="email"
                                    placeholder="Email"
                                    type='email'
                                    inputProps={{ 'aria-label': 'email' }}
                                    required
                                    onChange={handleInputChange}
                                />
                    </Grid>  
                    
                </Box>
                    <Box sx={{width: "100%", mt: "10px" , mb: "30px"}}>
                    <PrimaryBtn text='Send Verification Code' fullWidth={true} onClick={handleForgetPasswordRequest} />
                    </Box>
                    <LinkButton to="/login" style={{textDecoration: "none"}} >
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"       
                        >
                    <ArrowBackIcon sx={{ color: "#6c5ffc", fontSize: "16px", mr: "10px" }}  />
                    <Typography  sx={{ fontSize: "16px", lineHeight: "28.8px", fontWeight: "500",fontFamily: "'IBM Plex Sans'", color: "#6c5ffc", textAlign: "center"}}>Back to Login</Typography>
                    </Grid>
                    </LinkButton>
            </Grid>
        </NewMainAuthContainer>           

    )
    };
                  									
export default NewForgetPassword;
                  									