import { Box, Grid,  } from '@mui/material';
import following_logo from "../../assets/following_logo.png";
import { useNavigate } from 'react-router-dom';


const NewMainAuthContainer = ({backBtnStatus= false,children}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
  	
    return (
    <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={'100vh'}
        bgcolor={"#fcfcfc"}
    >

        <Grid md="9" >
            {children}
        </Grid>   
            <Grid md="3" sx={{minHeight:"100vh", height:"100%", maxHeight:"100%"}} padding={"80px 42px"}
        bgcolor={"#111111"}>
            <img src={following_logo} width="177px" />
        </Grid>
    </Grid>        
    )
    };
                  									
export default NewMainAuthContainer;
                  									