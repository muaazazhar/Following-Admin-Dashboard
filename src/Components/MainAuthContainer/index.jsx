import { Box, Grid,  } from '@mui/material';
import back_btn from "../../assets/back_btn.png";
import login_img from "../../assets/login_img.png";
import { useNavigate } from 'react-router-dom';

const MainAuthContainer = ({backBtnStatus= false,children}) => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
  	
    return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
        bgcolor={"#88a9ef"}
    >

    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{borderRadius: "20px", width:{md:"80%", sm: "80%", xs: "90%"}}}   
            >
        
                <Grid item md={6} xs={12} sx={{ backgroundColor: "#EDF0F5", borderRadius: "20px 0px 0px 20px", height: { md: "600px" }, display: { xs: "none", md: "block"} }}>
                
                {backBtnStatus && <Grid xs={12} sx={{ margin: "20px 60px" }}>
                        <img src={back_btn} style={{cursor: "pointer"}} onClick={goBack} />
                        </Grid>}
                    <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{height: backBtnStatus ? "80%" : "100%"}} 
                >
                        <Box sx={{width: {md: "90%", lg: "80%"}}}>
                            <img src={login_img} width="100%" />
                        </Box>
                        </Grid>
            </Grid>
            <Grid item md={6} xs={12}sx={{backgroundColor: "#FFFFFF", borderRadius: { xs: "20px" ,md:"0px 20px 20px 0px"}, height:{md:"600px"}}}>
                        {backBtnStatus && <Grid xs={12} sx={{ margin:{ sm: "20px 40px", xs: "20px 20px", } , display: {md: "none"} }}>
                        <img src={back_btn} style={{cursor: "pointer"}} onClick={goBack} />
                </Grid>}
                    {children}
            </Grid>   
    </Grid>        
            
    </Grid>        
    )
    };
                  									
export default MainAuthContainer;
                  									