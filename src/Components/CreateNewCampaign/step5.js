import React, { useState } from 'react';
import {
    Box,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HeaderText from '../Text/HeaderText';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import { Avatar } from 'antd';
import SocialMediaTable from './SocialMediaTable';
import PaymentPage from './PaymentPage';
import { useFormData } from '../../services/formDataContext';

const CampaignStep5 = () => {
    const { user } = JSON.parse(localStorage.getItem('user'));
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const { formData } = useFormData();

    const capitalizedFirstChar = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleProceedToPayment = () => {
        setShowPaymentPage(true);
    };
    return (
        <>
            {showPaymentPage ? (
                <PaymentPage />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <HeaderText
                        text="Your Campaign Summary"
                        color="#282F53"
                        style={{ fontSize: '20px' }}
                    />
                    <Box
                        sx={{
                            backgroundColor: '#FCFCFC',
                            boxShadow: '0px 0px 5px 0px gray',
                            borderRadius: '10px',
                            mt: '35px',
                        }}
                    >
                        <Box
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDirection={'column'}
                            gap={'10px'}
                            padding={'17px 36px'}
                        >
                            <Avatar
                                src={user.image || '/avatar.jpg'}
                                size={{
                                    xs: 24,
                                    sm: 32,
                                    md: 40,
                                    lg: 64,
                                    xl: 80,
                                    xxl: 100,
                                }}
                                style={{
                                    border: '4px solid white',
                                    boxShadow: '0px 0px 5px 0px gray',
                                }}
                            />
                            <Typography>
                                {capitalizedFirstChar(
                                    user.username.split(/(?=[A-Z])/)[0],
                                ) +
                                    ' ' +
                                    user.username.split(/(?=[A-Z])/)[1]}
                            </Typography>
                            <Box
                                display={'flex'}
                                sx={{ gap: '46px', flexWrap: 'wrap' }}
                            >
                                <Typography
                                    sx={{
                                        color: '#74829C',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    <img src="/email.png" />
                                    {` ${user.email}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#74829C',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    <img src="/phone.png" />
                                    {` ${user.phoneNo || '+23982938293'}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#74829C',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    <img src="/location.png" />{' '}
                                    {user.location || 'Sharjah, UAE'}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', mt: '20px' }}>
                                <Typography
                                    sx={{ fontWeight: '600', mb: '10px' }}
                                >
                                    Campaign Details
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                    }}
                                >
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Campaign Id
                                                    </TableCell>
                                                    <TableCell>
                                                        Campaign Title
                                                    </TableCell>
                                                    <TableCell>Age</TableCell>
                                                    <TableCell>
                                                        Gender
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.id || 'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.title ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.audienceAge ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.audienceGender ||
                                                            'Dummy'}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Content Category
                                                    </TableCell>
                                                    <TableCell>
                                                        Enrollment Type
                                                    </TableCell>
                                                    <TableCell>
                                                        Platform
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData
                                                            .contentCategory[
                                                            'label'
                                                        ] || 'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.walkInOrDelivery ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData
                                                            .socialMediaChannels[0][
                                                            'platform'
                                                        ] || 'Dummy'}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    sx={{ fontWeight: '600', mb: '10px' }}
                                >
                                    Address
                                </Typography>
                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>City</TableCell>
                                                    <TableCell>
                                                        Postcode
                                                    </TableCell>
                                                    <TableCell>
                                                        Country
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.city ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.postcode ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.country ||
                                                            'Dummy'}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    sx={{ fontWeight: '600', mb: '10px' }}
                                >
                                    Campaign Type
                                </Typography>
                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        Campaign Type
                                                    </TableCell>
                                                    <TableCell>
                                                        Payment Type
                                                    </TableCell>
                                                    <TableCell>
                                                        Description
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.paidOrBarter[
                                                            'label'
                                                        ] || 'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.paymentMethod ||
                                                            'Dummy'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {formData.campaignDescription ||
                                                            'Dummy'}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    sx={{ fontWeight: '600', mb: '10px' }}
                                >
                                    Eligibilities
                                </Typography>
                                <Box>
                                    <SocialMediaTable
                                        socialMediaChannels={
                                            formData.socialMediaChannels
                                        }
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <WrapperStandardTextField md={12} lg={12}>
                        <LoadingButton
                            variant="contained"
                            onClick={handleProceedToPayment}
                            sx={{
                                backgroundColor: '#272727',
                                color: '#FFFFFF',
                                textTransform: 'capitalize',
                                mt: '10px',
                            }}
                        >
                            Proceed To Payment
                        </LoadingButton>
                    </WrapperStandardTextField>
                </Box>
            )}
        </>
    );
};

export default CampaignStep5;
