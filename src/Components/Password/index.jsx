import { Box, Button, Grid, InputBase, Typography, } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import MainAuthContainer from '../MainAuthContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dev from '../../services/axios-client';

const Password = () => {

    const location = useLocation();

    // Parse the query parameters from the location
    const searchParams = new URLSearchParams(location.search);

    // Get the 'token' parameter from the URL
    const token = searchParams.get('token');
  	
    console.log(token);

    const [user, setUser] = useState({});
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
    

    return (
    <MainAuthContainer>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{width: '100%', height: '100%', padding: "20px 15%"}}        
            >
                        <Typography sx={{ fontSize: "24px", lineHeight: "28.8px", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#424344", textAlign: "center" }}>New Password</Typography>
                        <Typography sx={{ fontSize: "16px", lineHeight: "28.8px", fontFamily: "'IBM Plex Sans'", color: "#6c757d", textAlign: "center", }}>Please enter new password</Typography>
                        <Box  sx={{border: "1px solid #6c5ffc", backgroundColor: "transparent", borderRadius: "5px", boxSizing: "border-box",  height: "44px", width: "100%", margin: "20px 0px"}}>
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
                                <VisibilityOffIcon sx={{ color: "#FFFFFF", fontSize: "12px" }} />
                                </Grid>
                                <InputBase
                                    sx={{ ml: 2, flex: 1 }}
                                    fullWidth
                                    placeholder="Password"
                                    name="password"
                                    type='password'
                                    inputProps={{ 'aria-label': 'password' }}
                                    onChange={handleInputChange}
                                />
                        </Grid>        
                        </Box>
                        <Box  sx={{border: "1px solid #6c5ffc", backgroundColor: "transparent", borderRadius: "5px", boxSizing: "border-box",  height: "44px", width: "100%"}}>
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
                                <VisibilityOffIcon sx={{ color: "#FFFFFF", fontSize: "12px" }} />
                                </Grid>
                                <InputBase
                                    sx={{ ml: 2, flex: 1 }}
                                    fullWidth
                                    placeholder="Confirm Password"
                                    name="confirm-password"
                                    type='password'
                            inputProps={{ 'aria-label': 'confirm password' }}
                            onChange={handleInputChange}
                                />
                        </Grid>        
                        </Box>
                        <Button variant="contained" onClick={handleSignInRequest} fullWidth sx={{ backgroundColor: "#6c5ffc", color: "#FFFFFF", margin: "30px 0px" }}>Save</Button>

            </Grid>
        </MainAuthContainer>           

    )
    };
                  									
export default Password;
                  									