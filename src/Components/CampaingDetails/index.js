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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import HeaderWrapper from '../Wrapper/HeaderWrapper';
import Loader from '../Loader';
import { useNavigate, useParams } from 'react-router-dom';
import RecordBox from '../CampaignRecord/RecordBox';
import PrimaryButton from '../Buttons/PrimaryButton';
import OnGoingCampaignBox from '../CampaignRecord/OnGoingCampaignBox';
import CampaignDetailWrapper from './ContainerWrapper';
import CampaignStatus from './CampaignStatus';
import InfoLabel from '../Text/InfoLabel';
import SubHeaderText from '../Text/SubHeaderText';
import PropertiesWrapper from './PropertiesWrapper';
import FormSubmitDialog from '../Popups/formSubmitDialog';
import WarningDialog from '../Popups/WarningDialog';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const registerSchema = object({
    name: string()
        .nonempty('Name is required')
        .max(32, 'Name must be less than 100 characters'),
});

const headerColumnStyle = {
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'capitalize',
    fontWeight: '700',
    color: '#212529',
    textAlign: 'left',
    marginBottom: '10px',
    padding: 0,
    width: '300px',
};

const bodyColumnStyle = {
    fontSize: '16px',
    lineHeight: '21px',
    color: '#212529',
    fontWeight: 500,
    textAlign: 'left',
    padding: 0,
    width: '300px',
    paddingTop: '10px',
};

const CampaignDetails = () => {
    let { campaignId, update } = useParams();
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [userList, setUserList] = useState([]);
    const [index, setIndex] = useState(0);
    const [selectedCampaign, setSelectedCampaign] = useState({});
    const [navi, setNavi] = useState(false);
    const [modal, setModal] = useState({ open: false });
    const [responseModal, setResponseModal] = useState({ open: false });
    const [rows, setRows] = useState([
        { name: 'Influencer 1', status: 1 },
        { name: 'Influencer 2', status: 2 },
        { name: 'Influencer 3', status: 0 },
    ]);

    const [campaign, setCampaign] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCampaign();
    }, []);

    const handleClose = (flag) => {
        if (flag) {
            handleCampaignDelete(selectedCampaign);
        }
        setModal({ ...modal, open: false });
    };
    const handleResponseClose = () => {
        setResponseModal({ open: false });
        if (navi) navigate('/campaign-records');
    };

    const handleOpen = (id) => {
        setNavi(true);
        setSelectedCampaign(id);
        setModal({
            open: true,
            title: 'Are you sure to delete this Campaign?',
            cancelBtn: 'Cancel',
            submitBtn: 'Delete',
        });
    };

    const handleCampaignDelete = (id) => {
        setLoading(true);
        dev.delete(`/campaign/${id}`, {
            headers: {
                token: user.token,
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.data) {
                    setResponseModal({
                        open: true,
                        title: 'Merchant deleted successfully',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setResponseModal({
                    error: true,
                    open: true,
                    title: 'Failed to delete merchant',
                });
            });
    };

    const getCampaign = async () => {
        setLoading(true);
        await dev
            .get(`/campaign/single/${campaignId}`, {
                headers: {
                    token: user.token,
                },
            })
            .then((response) => {
                if (response.data.data) {
                    setCampaign(response.data.data);
                }
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    const edit = false;

    return (
        <Grid container sx={{ height: '100%', width: '100%' }}>
            <FormSubmitDialog
                modal={responseModal}
                onClose={handleResponseClose}
            />
            <WarningDialog modal={modal} onClose={handleClose} />
            <Loader loading={loading} />
            {campaign?.id && (
                <>
                    <Box mb={'17px'}>
                        <HeaderWrapper>
                            <HeaderText text="Campaign Details" />
                        </HeaderWrapper>
                    </Box>
                    <CampaignDetailWrapper>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                sx={{ width: '100%' }}
                            >
                                <Button
                                    startIcon={<KeyboardBackspaceIcon />}
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        border: '2px solid black',
                                        color: '#282f53',
                                        textTransform: 'none',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                    }}
                                    color="info"
                                >
                                    Back
                                </Button>
                                <Box display={'flex'}>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            navigate(
                                                `/campaign-update/${campaign.id}`,
                                            )
                                        }
                                        sx={{
                                            backgroundColor: edit
                                                ? '#6c5ffc'
                                                : '#f9f9f9',
                                            color: edit
                                                ? '#282f53 !important'
                                                : '#282F53 !important',
                                            textTransform: 'capitalize',
                                            mr: '20px',
                                            '&:hover': {
                                                backgroundColor: edit
                                                    ? '#8a7fff'
                                                    : '#f9f9f9', // Change the hover background color
                                                color: edit
                                                    ? '#282F53'
                                                    : '#282F53', // Optionally, you can change the text color on hover
                                            },
                                        }}
                                    >
                                        {edit ? 'Save' : 'Edit'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOpen(campaign.id)}
                                        sx={{
                                            backgroundColor: '#E94E51',
                                            color: '#FFFFFF',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs="12"
                            mt="28px"
                            style={{
                                display: 'flex',
                                backgroundColor: '#272727',
                                color: 'white',
                                justifyContent: 'space-between',
                                height: '67px',
                                alignItems: 'center',
                                borderRadius: '10px',
                                padding: '0px 24px',
                            }}
                        >
                            <HeaderText
                                text="Campaign Details"
                                style={{ color: 'white' }}
                            />
                            <CampaignStatus
                                status={campaign.isActive ? 1 : 0}
                            />
                        </Grid>
                        <Box
                            style={{
                                border: '1px solid #E7E5E5',
                                marginTop: '10px',
                                width: '100%',
                                borderRadius: '10px',
                                padding: '17px 30px',
                            }}
                        >
                            <Grid item xs="12" md="6" lg="7">
                                <InfoLabel
                                    label="Title"
                                    value={campaign.title}
                                />
                            </Grid>
                            <Box sx={{ display: 'flex' }}>
                                <Grid item xs="12" md="6" lg="5">
                                    <InfoLabel
                                        label="Example / Inspo"
                                        value={campaign.inspiration}
                                    />
                                </Grid>
                                <Grid item xs="12" md="6" lg="7">
                                    <InfoLabel
                                        label="How will pay to Influencer"
                                        value={campaign.billing.paymentMethod}
                                    />
                                </Grid>
                            </Box>
                        </Box>
                    </CampaignDetailWrapper>
                    <CampaignDetailWrapper>
                        <Grid
                            item
                            xs="12"
                            mt="28px"
                            style={{
                                display: 'flex',
                                backgroundColor: '#272727',
                                color: 'white',
                                justifyContent: 'space-between',
                                height: '67px',
                                alignItems: 'center',
                                borderRadius: '10px',
                                padding: '0px 24px',
                            }}
                        >
                            <HeaderText text="Eligibility" color="white" />
                        </Grid>
                        <Box
                            style={{
                                border: '1px solid #E7E5E5',
                                marginTop: '10px',
                                width: '100%',
                                borderRadius: '10px',
                                padding: '17px 30px',
                            }}
                        >
                            <Grid xs="12" mt="20px">
                                <SubHeaderText
                                    text="Social Media Channels:"
                                    color="#212529"
                                    customstyle={{ fontWeight: 600, mb: '9px' }}
                                />
                                <ul
                                    style={{
                                        margin: '0',
                                        paddingLeft: '19px',
                                        fontSize: '14px',
                                        color: '#212529',
                                    }}
                                >
                                    {campaign.socialMediaChannels
                                        .split(',')
                                        .map((item) => item.trim())
                                        .map((item, index) => (
                                            <li
                                                key={index}
                                                style={{ marginBottom: '0px' }}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                </ul>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mr: { md: '10', lg: '30px' } }}
                            >
                                <PropertiesWrapper
                                    label="Location"
                                    value={campaign.location}
                                />
                                <PropertiesWrapper
                                    label="Audience Language"
                                    value={campaign.audienceLanguage}
                                />
                                <PropertiesWrapper
                                    label="Audience Gender"
                                    value={campaign.audienceGender}
                                />
                                <PropertiesWrapper
                                    label="Audience Age"
                                    value={campaign.audienceAge}
                                />
                            </Grid>
                        </Box>
                    </CampaignDetailWrapper>
                    <CampaignDetailWrapper>
                        <Grid
                            item
                            xs="12"
                            mt="28px"
                            style={{
                                display: 'flex',
                                backgroundColor: '#272727',
                                color: 'white',
                                justifyContent: 'space-between',
                                height: '67px',
                                alignItems: 'center',
                                borderRadius: '10px',
                                padding: '0px 24px',
                            }}
                        >
                            <HeaderText text="Goals" color="white" />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            columns={17}
                            style={{
                                border: '1px solid #E7E5E5',
                                marginTop: '10px',
                                width: '100%',
                                borderRadius: '10px',
                                padding: '17px 30px',
                            }}
                        >
                            <PropertiesWrapper
                                lg={5}
                                md={5}
                                sm={8}
                                xs={15}
                                label="Content Required"
                            >
                                <ul
                                    style={{
                                        margin: '0',
                                        paddingLeft: '19px',
                                        fontSize: '14px',
                                        color: '#212529',
                                    }}
                                >
                                    {campaign.contentRequirement
                                        .split(',')
                                        .map((item) => item.trim())
                                        .map((item, index) => (
                                            <li
                                                key={index}
                                                style={{ marginBottom: '0px' }}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                </ul>
                            </PropertiesWrapper>
                            <PropertiesWrapper
                                lg={5}
                                md={5}
                                sm={8}
                                xs={15}
                                label="Min.Followers"
                                value={`Min ${campaign.minFollowers} Followers`}
                            />
                            <PropertiesWrapper
                                lg={5}
                                md={5}
                                sm={8}
                                xs={15}
                                label="Engage Rate"
                                value={campaign.engageRate}
                            />
                            <Grid item lg={2} xs={0} />
                        </Grid>
                    </CampaignDetailWrapper>
                    <CampaignDetailWrapper>
                        <Grid
                            item
                            xs="12"
                            mt="28px"
                            style={{
                                display: 'flex',
                                backgroundColor: '#272727',
                                color: 'white',
                                justifyContent: 'space-between',
                                height: '67px',
                                alignItems: 'center',
                                borderRadius: '10px',
                                padding: '0px 24px',
                            }}
                        >
                            <HeaderText text="Billing Info" color="white" />
                        </Grid>
                        <Box
                            style={{
                                border: '1px solid #E7E5E5',
                                marginTop: '10px',
                                width: '100%',
                                borderRadius: '10px',
                                padding: '17px 30px',
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <PropertiesWrapper
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    label="Payment Method"
                                    value={campaign.billing.paymentMethod}
                                />
                                <PropertiesWrapper
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    label="Max Budget Per Influencer"
                                    value={`$${campaign.billing.budgetPerInfluencer}`}
                                />
                                <PropertiesWrapper
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    label="Total Budget for Campaign"
                                    value={`$${campaign.billing.totalBudget}`}
                                    reachEstimation
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                columns={17}
                            >
                                <PropertiesWrapper
                                    lg={5}
                                    md={5}
                                    sm={8}
                                    xs={15}
                                    label="Reach Estimation at Bottom"
                                    value={`$${campaign.billing.reachEstimation}`}
                                />
                                <PropertiesWrapper
                                    lg={5}
                                    md={5}
                                    sm={8}
                                    xs={15}
                                    label="Deal Type"
                                    value={`Discount`}
                                />
                                <PropertiesWrapper
                                    lg={5}
                                    md={5}
                                    sm={8}
                                    xs={15}
                                    label="Total Available Deals"
                                    value={`${campaign.billing.totalDealsAvailable} Deals Remaining`}
                                />
                                <Grid item lg={2} xs={0} />
                            </Grid>
                        </Box>
                    </CampaignDetailWrapper>
                </>
            )}
        </Grid>
    );
};

export default CampaignDetails;
