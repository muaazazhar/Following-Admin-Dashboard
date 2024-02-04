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
import { useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import SubHeaderText from '../Text/SubHeaderText';
import PaymentBox from './PaymentBox';
import MerchantPaymentsTable from './MerchantPayments';
import InfluencerPayoutsTable from './InfluencerPayouts';
import TransactionHistoryTable from './TransactionHistory';
import ApproveRejectRequestsTable from './ApproveRejectRequests';
import PaymentLink from './PaymentLink';

const registerSchema = object({
    name: string()
        .nonempty('Name is required')
        .max(32, 'Name must be less than 100 characters'),
});

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

const ManagePayment = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [active, setActive] = useState(0);
   
    const navigate = useNavigate();
    useEffect(() => {}, []);

    
    return (
        <Grid container sx={{ backgroundColor: '#F9F9F9', height: '100%' }}>
            <Loader loading={loading} />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <HeaderText text="Manage Payments" />
                <PrimaryBtn startIcon={<SwapVertIcon />} text="Transactions" />
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={'10px'}
                mt="20px"
            >
                <PaymentBox label="Total Balance" value={'$ 1,23456'} />
                <PaymentBox label="Previous Payout" value={'$ 1000'} />
                <PaymentBox label="Total Balance" value={'$ 1000'} />
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
                                    sx={
                                        active === 0
                                            ? activeHeader
                                            : nonActiveHeader
                                    }
                                    onClick={() => setActive(0)}
                                >
                                    Influencer Payouts
                                </TableCell>
                                <TableCell
                                    sx={
                                        active === 1
                                            ? activeHeader
                                            : nonActiveHeader
                                    }
                                    onClick={() => setActive(1)}
                                >
                                    Merchant Payments
                                </TableCell>
                                <TableCell
                                    sx={
                                        active === 2
                                            ? activeHeader
                                            : nonActiveHeader
                                    }
                                    onClick={() => setActive(2)}
                                >
                                    Approve / Reject Requests
                                </TableCell>
                                <TableCell
                                    sx={
                                        active === 3
                                            ? activeHeader
                                            : nonActiveHeader
                                    }
                                    onClick={() => setActive(3)}
                                >
                                    Monitor Transaction History
                                </TableCell>
                                <TableCell
                                    sx={{ ...headerColumnStyle }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                {active === 0 && <InfluencerPayoutsTable />}
                {active === 1 && <MerchantPaymentsTable />}
                {active === 2 && <ApproveRejectRequestsTable />}
                {active === 3 && <TransactionHistoryTable />}
            </Grid>
        </Grid>
    );
};

export default ManagePayment;
