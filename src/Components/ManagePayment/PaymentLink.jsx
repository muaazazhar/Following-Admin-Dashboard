import {
    Box,
    Grid,
    InputBase,
} from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import social_icon from "../../assets/social_icon.png";
import "./table.css";
import SubHeaderText from '../Text/SubHeaderText';
import PrimaryBtn from '../CustomButton/PrimaryBtn';



const PaymentLink = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));


    return (
        <Grid container sx={{ backgroundColor: '#F9F9F9', height: '100%' }}>
            <Loader loading={loading} />
            <Grid
                item xs={12}
            >
                <HeaderText text="Create Payment Link" />
            </Grid>
            <Grid
                xs={12}
                sx={{
                    backgroundColor: '#FFFFFF',
                    mt: '20px',
                    padding: '26px 35px 35px',
                    borderRadius: '7px',
                    boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                }}
            >
               <Grid xs="12">
                    <img src={social_icon} style={{width:"50px", height: "50px"}} />
                </Grid>
                <Grid xs={12} mt="30px" mb="20px">
                    <HeaderText text='Share the payment link' color='#282F53' style={{fontWeight:600}} />
                </Grid>
                <Grid xs="12">
                <InputBase
                fullWidth
                        sx={{
                            padding: "22px 20px", flex: 1, color: "#808080", fontSize: "14px", lineHeight: "21px",
                            borderRadius: "4px", backgroundColor: "#fff", border: "1px solid #e9edf4", boxSizing: "border-box", 
                        }}
                placeholder={"https://"}
                type={"text"}
                inputProps={{ 'aria-label': "https://" }}
                required
                />
                </Grid>
                <Grid xs="12" mb="30px" mt="10px" >
                    <SubHeaderText text='Copy and Paste the above link ' color='#282F53' customstyle={{fontWeight: 600}} />
                </Grid>
                <Grid xs="12">
                    <PrimaryBtn bgColor='#6C5FFC' text='Share' />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PaymentLink;
