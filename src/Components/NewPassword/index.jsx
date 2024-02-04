
import { Link, useLocation, useNavigate } from 'react-router-dom';



import validator from 'validator';
import { Box, Button, Grid, IconButton, InputAdornment, InputBase, Typography } from '@mui/material';
import NewMainAuthContainer from '../NewMainAuthContainer';
import { useEffect, useState } from 'react';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FormSubmitDialog from '../Popups/formSubmitDialog';

const NewPassword = () => {

    const location = useLocation();

    // Parse the query parameters from the location
    const searchParams = new URLSearchParams(location.search);

    // Get the 'token' parameter from the URL
    const token = searchParams.get('token');
  	
    console.log(token);

    const [user, setUser] = useState({});
    const [responseModal, setResponseModal] = useState({ open: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const handleInputChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    setUser((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
    };
    
    console.log(user);
    
    const handleSignInRequest = async () => {
        if (token) {
            
            try {
                dev.post(`/merchant/checkrequestvalid?token=${token}`, {user}, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(async response =>  {
                    if (response.data) { 
                     const data = { password: user.password}
                const response = await dev.post(`/merchant/update-password?token=${token}`, data, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            
                if (response.data) {
                    navigate("/login");
                }
            }
                })
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
            }
        }
       
    };
    
    const goBack = () => {
        navigate(-1);
    };

    const handleResponseClose = () => {
        setResponseModal({ ...responseModal, open: false });
        goBack();
    };
    

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
            Create New
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
            Please enter your new password
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
                    placeholder="Password"
                    name="password"
                    type='password'
                    inputProps={{ 'aria-label': 'password' }}
                    
                    
                    onChange={handleInputChange}
                    />
                    <InputBase
                    fullWidth
                    sx={{
                        ml: 0,
                        flex: 1,
                        marginTop: "20px",
                        fontSize: "38px", letterSpacing: "-0.07em", fontFamily: "'Work Sans'", color: "#999", textAlign: "left", display: "flex", alignItems: "left",
                    }}
                    placeholder="Confirm Password"
                    name="confirm-password"
                    type='password'
                    inputProps={{ 'aria-label': 'confirm-password' }}
                    onChange={handleInputChange}
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
                marginTop:'45px'
            }}
            onClick={handleSignInRequest}
        >
            CREATE PASSWORD
            </Button>
            </Grid>
            
        </Grid>
</NewMainAuthContainer>          

    )
    };
                  									
export default NewPassword;
                  									