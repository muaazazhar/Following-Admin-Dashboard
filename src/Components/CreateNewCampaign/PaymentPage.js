import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import { LoadingButton } from '@mui/lab';
import HeaderText from '../Text/HeaderText';
import SubHeaderText from '../Text/SubHeaderText';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import StripeModal from '../Stripe';
import BankTransferModal from './BankTransferModal';
import LinkPaymentModal from './LinkPaymentModal';
import StripeSuccess from '../Stripe/StripeSuccess';
import StripeFailure from '../Stripe/StripeFailure';

const PaymentPage = () => {
    const dummyData = [
        {
            img: '/Insta.png',
            platform: 'Instagram',
            content: [{ label: 'story' }, { label: 'reels' }],
            hashtags: '#abc,#pak',
            description: 'abc testing',
            brandAccount: '000234233434343',
        },
        {
            img: '/Tiktok.png',
            platform: 'Tiktok',
            content: [{ label: 'reel' }],
            hashtags: '#IK, #UAE',
            description: 'xyz',
            brandAccount: '030349304304304',
        },
        {
            img: '/Snapchat.png',
            platform: 'Snapchat',
            content: [{ label: 'reels' }],
            hashtags: '#IK, #UAE',
            description: 'xyz',
            brandAccount: '030349304304304',
        },
    ];
    const [paymentMethod, setPaymentMethod] = useState('');
    const [stripe, setStripe] = useState(false);
    const [bank, setBank] = useState(false);
    const [link, setLink] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [followerCounts, setFollowerCounts] = useState({
        allRange: 2,
        lessThan20K: 200,
        between20KAnd499K: 200,
        moreThan500K: 200,
    });

    const increaseCount = (type) => {
        setFollowerCounts((prevCounts) => ({
            ...prevCounts,
            [type]: prevCounts[type] + 1,
        }));
    };

    const decreaseCount = (type) => {
        if (followerCounts[type] > 0) {
            setFollowerCounts((prevCounts) => ({
                ...prevCounts,
                [type]: prevCounts[type] - 1,
            }));
        }
    };
    const handlePaymentForm = () => {
        switch (paymentMethod) {
            case 'Online Payment':
                setStripe(true);
                setBank(false);
                setLink(false);
                break;
            case 'Bank Transfer':
                setStripe(false);
                setBank(true);
                setLink(false);
                break;
            case 'Payment Link':
                setStripe(false);
                setBank(false);
                setLink(true);
                break;
        }
    };
    return (
        <Box sx={{ width: '100%' }}>
            <HeaderText text="Payment" color="#282F53" />
            {dummyData.map((channels) => (
                <Box display={'flex'} mt={'24px'}>
                    <TableContainer
                        component={Paper}
                        sx={{ width: '215px', mb: '10px' }}
                    >
                        <Table
                            sx={{ backgroundColor: '#FCFCFC', height: '100%' }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            borderBottom: 'none',
                                            fontWeight: '600',
                                        }}
                                    >
                                        <img src={channels.img} alt="" />
                                        <Typography sx={{ fontWeight: '600' }}>
                                            {channels.platform}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {channels.content.map((content, index) => (
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                borderBottom: 'none',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {content.label}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper} sx={{ mb: '10px' }}>
                        <Table sx={{ height: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    {[
                                        'All Range of Followers',
                                        'Less than 20K Followers',
                                        '20k-499k Followers',
                                        'More Than 500k Followers',
                                    ].map((header, index) => {
                                        // Find the index of "Followers" in the header string
                                        const followersIndex =
                                            header.indexOf('Followers');

                                        // Split the header string into two parts at the index of "Followers"
                                        const firstPart = header.slice(
                                            0,
                                            followersIndex,
                                        );
                                        const secondPart =
                                            header.slice(followersIndex);

                                        return (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                sx={{ fontWeight: '600' }}
                                            >
                                                <img
                                                    src={`${header}.png`}
                                                    alt=""
                                                />
                                                <Typography
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {firstPart}
                                                    <br /> {/* Line break */}
                                                    {secondPart}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {channels.content.map((content, index) => (
                                    <TableRow>
                                        {Object.values(followerCounts).map(
                                            (count, index) => (
                                                <TableCell
                                                    key={index}
                                                    align="center"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            backgroundColor:
                                                                'grey',
                                                            color: 'white',
                                                            width: '20px',
                                                            height: '20px',
                                                            mr: '11px',
                                                        }}
                                                        onCl
                                                        onClick={() =>
                                                            decreaseCount(
                                                                Object.keys(
                                                                    followerCounts,
                                                                )[index],
                                                            )
                                                        }
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    {count}
                                                    <IconButton
                                                        sx={{
                                                            backgroundColor:
                                                                '#A4F400',
                                                            color: 'white',
                                                            width: '20px',
                                                            height: '20px',
                                                            ml: '11px',
                                                        }}
                                                        onClick={() =>
                                                            increaseCount(
                                                                Object.keys(
                                                                    followerCounts,
                                                                )[index],
                                                            )
                                                        }
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>
                                            ),
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
            <Box
                sx={{
                    backgroundColor: '#FCFCFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px 30px',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderRadius: '10px',
                    mt: '20px',
                    boxShadow: '0px 0px 1px 0px gray',
                }}
            >
                <Typography>Total Paid Influencers:</Typography>
                <Typography>Total Barter Influencers:</Typography>
                <Typography>Cost of Influencers:</Typography>
                <Typography>Per Enrollment Fees:</Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px 30px',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    borderRadius: '10px',
                    mt: '20px',
                }}
            >
                <Typography sx={{ color: 'white' }}>
                    Exiting Wallet Balance:{' '}
                    <span style={{ fontWeight: '600' }}> 2000UED</span>
                </Typography>
                <Typography sx={{ color: 'white' }}>
                    Total Cost:
                    <span style={{ fontWeight: '600' }}> 2000</span>
                </Typography>
            </Box>
            <WrapperStandardTextField
                lg={12}
                style={{ paddingRight: '0px', paddingTop: '20px' }}
            >
                <SubHeaderText
                    text="Payment Method"
                    color="#272727"
                    customstyle={{
                        fontWeight: 600,
                    }}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    mt="20px"
                    columnGap={8}
                    rowGap={8}
                >
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            width: '330px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setPaymentMethod('Online Payment');
                                }}
                            >
                                {paymentMethod === 'Online Payment' ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={'/OnlinePayment.png'} />
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{ padding: '24px 28px' }}
                            >
                                <img src="/OnlinePayment_2.png" alt="" />
                                <Typography sx={{ fontWeight: '600' }}>
                                    Online Payment
                                </Typography>
                            </Box>
                            <Typography
                                component={'span'}
                                sx={{ fontSize: '16px', textAlign: 'center' }}
                            >
                                Campaign will go live once payment is manually
                                verified in 2-3 days
                            </Typography>
                        </Grid>
                    </Box>
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            width: '330px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setPaymentMethod('Bank Transfer');
                                }}
                            >
                                {paymentMethod === 'Bank Transfer' ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={'/BankTransfer.png'} />
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{ padding: '24px 28px' }}
                            >
                                <Typography sx={{ fontWeight: '600' }}>
                                    Bank Transfer
                                </Typography>
                            </Box>
                            <Typography
                                component={'span'}
                                sx={{ fontSize: '16px', textAlign: 'center' }}
                            >
                                Campaign will go live once payment is manually
                                verified in 2-3 days
                            </Typography>
                        </Grid>
                    </Box>
                    <Box
                        justifyContent={'center'}
                        alignItems="center"
                        sx={{
                            padding: '10px',
                            borderRadius: '20px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e7e5e5',
                            boxSizing: 'border-box',
                            width: '330px',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                        >
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setPaymentMethod('Payment Link');
                                }}
                            >
                                {paymentMethod === 'Payment Link' ? (
                                    <CheckCircleOutlineRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#01AB3B' }}
                                    />
                                ) : (
                                    <RadioButtonUncheckedRoundedIcon
                                        fontSize="medium"
                                        sx={{ color: '#272727' }}
                                    />
                                )}
                            </span>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            mt="7px"
                        >
                            <img src={'/PaymentLink.png'} />
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{ padding: '24px 28px' }}
                            >
                                <Typography sx={{ fontWeight: '600' }}>
                                    Payment Link
                                </Typography>
                            </Box>
                            <Typography
                                component={'span'}
                                sx={{ fontSize: '16px', textAlign: 'center' }}
                            >
                                Campaign will go live once payment is manually
                                verified in 2-3 days
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
            </WrapperStandardTextField>
            <WrapperStandardTextField md={12} lg={12}>
                <LoadingButton
                    variant="contained"
                    onClick={handlePaymentForm}
                    sx={{
                        backgroundColor: '#272727',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        mt: '10px',
                    }}
                >
                    Continue
                </LoadingButton>
            </WrapperStandardTextField>

            <StripeModal
                showModal={stripe}
                setSuccessModal={setSuccess}
                setFilureModal={setFailure}
                onClose={() => {
                    setStripe(false);
                }}
            />
            <LinkPaymentModal
                showModal={link}
                onClose={() => {
                    setLink(false);
                }}
            />
            <BankTransferModal
                showModal={bank}
                onClose={() => {
                    setBank(false);
                }}
            />
            <StripeSuccess
                showModal={success}
                onClose={() => setSuccess(false)}
            />
            <StripeFailure
                showModal={failure}
                setStripe={setStripe}
                onClose={() => setFailure(false)}
            />
        </Box>
    );
};

export default PaymentPage;
