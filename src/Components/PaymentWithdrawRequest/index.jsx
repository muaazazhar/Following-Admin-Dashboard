import {
    Box,
    Grid,
    styled,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    tableCellClasses,
    TableBody,
    Paper,
    tableClasses,
} from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import ApproveRejectRequestsTable from './ApproveRejectRequests';
import ViewRequestTable from './ViewRequest';
import share_icon from "../../assets/share_icon.png";
import "./table.css";


const headerColumnStyle = {
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontFamily: "'IBM Plex Sans'",
    color: '#2e3138',
    textAlign: 'left',
    marginBottom: '5px',
    padding: { xs: '8px 8px', md: '10px 10px', lg: '16px 16px' },
};

const bodyColumnStyle = {
    fontSize: '14px',
    lineHeight: '21px',
    fontFamily: "'IBM Plex Sans'",
    color: '#212529',
    textAlign: 'left',
    padding: { xs: '5px 8px', md: '8px 10px', lg: '10px 16px' },
};

const activeHeader = {
    cursor: 'pointer',
    padding: '19px 22px',
    fontSize: '20px',
    lineHeight: '22px',
    fontWeight: '500',
    color: '#6c5ffc',
    textAlign: 'center',
    border: '1px solid #E9EDF4',
    borderRadius: '5px 5px 0px 0px',
    borderCollapse: 'null',
};

const nonActiveHeader = {
    cursor: 'pointer',
    padding: '19px 22px',
    fontSize: '20px',
    lineHeight: '22px',
    fontWeight: '500',
    color: '#74829C',
    textAlign: 'center',
};

const PaymentWithdrawRequest = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [rows, setRows] = useState([
    ]);


    return (
        <Grid container sx={{ backgroundColor: '#F9F9F9', height: '100%' }}>
            <Loader loading={loading} />
            <Grid
                item xs={12}
            >
                <HeaderText text="Influencer Withdrawal Request" />
            </Grid>
            <Grid
                xs={12}
                sx={{
                    backgroundColor: '#FFFFFF',
                    mt: '20px',
                    padding: '30px',
                    borderRadius: '7px',
                    boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead
                            sx={{
                                [`& .${tableCellClasses.root}`]: {
                                    borderBottom: '1px solid #E9EDF4',
                                },
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={active === 0 ? activeHeader : nonActiveHeader}
                                    style={{width:"140px"}}
                                    onClick={() => setActive(0)}
                                >
                                    View Requests
                                </TableCell>
                                <TableCell
                                    sx={
                                        active === 1
                                            ? activeHeader
                                            : nonActiveHeader
                                    }
                                    style={{width:"280px"}}
                                    onClick={() => setActive(1)}
                                >
                                    Approved / Declined Requests
                                </TableCell>
                                <TableCell
                                    sx={{ ...headerColumnStyle }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                {active === 0 && <ViewRequestTable />}
                {active === 1 && <ApproveRejectRequestsTable />}
            </Grid>
        </Grid>
    );
};

export default PaymentWithdrawRequest;
