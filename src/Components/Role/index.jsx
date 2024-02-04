import { Box, Button, Grid, InputBase, Typography, } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MainAuthContainer from '../MainAuthContainer';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Role = () => {
  	
    const role = [
        {
            id: 1,
            name: 'Admin',
        },
        {
            id: 2,
            name: 'Administrator',
        },
        {
            id: 3,
            name: 'Role Name'
        },
        {
            id: 4,
            name: 'Role Name'
        },
        {
            id: 5,
            name: 'Role Name'
        },
        {
            id: 6,
            name: 'Role Name'
        }
    ];

    const [ selectedRole, setSelectedRole] = useState([])

    const removeId = (idToRemove) => {
        const updatedSelectId = selectedRole.filter((id) => id !== idToRemove);
        setSelectedRole(updatedSelectId);
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
                        <Typography sx={{ fontSize: "24px", lineHeight: "28.8px", fontWeight: "600", fontFamily: "'IBM Plex Sans'", color: "#424344", textAlign: "center" }}>Welcome Back!</Typography>
                        <Typography sx={{ fontSize: "16px", lineHeight: "28.8px", fontFamily: "'IBM Plex Sans'", color: "#6c757d", textAlign: "center", }}>Please Select Your Role</Typography>
                        <Box  sx={{width: "100%", margin: "30px 0px"}}>
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        >
                        {role.map((r, index) => {
                            return (
                        
                                selectedRole.includes(r.id)
                                    ?
                                    <Grid md={"4"} justifyContent="center"
                                        alignItems="center" >
                                        <Box onClick={() => removeId(r.id)} sx={{ height: "80px", backgroundColor: "#6c5ffc", margin: "10px 10px", borderRadius: "7px", cursor: "pointer", padding:"5px 5px 0px" }}>
                                            <CheckCircleIcon sx={{color: "#FFFFFF", float: "right", flexGrow:2}} />
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >

                                                <Typography textAlign="center"> {r.name}</Typography>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    :
                                    <Grid md={"4"} justifyContent="center"
                                        alignItems="center" >
                                        <Box onClick={() => setSelectedRole([...selectedRole,r.id])} sx={{ height: "80px", backgroundColor: "#ECF0FA", margin: "10px 10px", borderRadius: "7px", cursor: "pointer" }}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                height={"100%"}
                                            >
                                                <Typography textAlign="center" sx={{ margin: "auto 0px" }}> {r.name}</Typography>
                                            </Grid>
                                        </Box>
                                    </Grid>
                            )
                        }
                        )
                        
                        }
                        </Grid>        
                        </Box>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: "#6c5ffc", color: "#FFFFFF" }}>Continue</Button>
                        <Button variant="outlined" fullWidth sx={{  color: "#6c5ffc", borderColor: "#6c5ffc", mt:"10px" }}>Create New Role</Button>

            </Grid>
        </MainAuthContainer>           

    )
    };
                  									
export default Role;
                  									