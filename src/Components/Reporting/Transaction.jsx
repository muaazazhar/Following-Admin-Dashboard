import {
    Box,
    Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import "./table.css";



const ReportingTransaction = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [rows, setRows] = useState([
    ]);


    return (
        <Grid container sx={{ backgroundColor: '#F9F9F9' }}>
            <Loader loading={loading} />
            <Grid
                item xs={12}
            >
                <HeaderText text="Payment Transactions" />
            </Grid>
            <Grid
                xs={12}
                sx={{
                    backgroundColor: '#FFFFFF',
                    mt: '20px',
                    height: "75vh",
                    padding: '30px',
                    borderRadius: '7px',
                    boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                }}
            ></Grid>
        </Grid>
    );
};

export default ReportingTransaction;
