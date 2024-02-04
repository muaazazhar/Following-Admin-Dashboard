import { Grid, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { object, string } from 'zod';
import { useEffect, useState } from 'react';
import HeaderText from '../Text/HeaderText';
import dev from '../../services/axios-client';
import HeaderWrapper from '../Wrapper/HeaderWrapper';
import Loader from '../Loader';
import { useNavigate } from 'react-router';
import RecordBox from './RecordBox';
import PrimaryButton from '../Buttons/PrimaryButton';
import OnGoingCampaignBox from './OnGoingCampaignBox';
import CampaignDetails from '../CampaingDetails';
import { Tabs } from 'antd';
import CompletedCampaignBox from './CompletedGoingCampaign';

const registerSchema = object({
    name: string()
        .nonempty('Name is required')
        .max(32, 'Name must be less than 100 characters'),
});

const CampaignRecord = () => {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [onGoing, setOnGoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const dummyCompleted = [
        {
            socialMediaChannels: 'Facebook, TikTok',
            isActive: false,
            title: 'Dummy Completed',
            id: 194,
        },
    ];

    useEffect(() => {
        getAllCampaigns();
    }, []);

    const getAllCampaigns = async (page = 1) => {
        setLoading(true);
        await dev
            .get(`/campaign?page=${page}&per_page=100`, {
                headers: {
                    token: user.token,
                },
            })
            .then((response) => {
                if (response.data) {
                    setRows(response.data);
                }
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    const handleOngoingAndCompletedCampaigns = () => {
        const onGoing = [],
            completed = [];
        rows.data?.forEach((campaign) => {
            if (campaign.isActive === true) onGoing.push(campaign);
            else completed.push(campaign);
        });
        setOnGoing([...onGoing]);
        setCompleted([...completed]);
    };

    const handleCampaignChange = (index) => {
        console.log(index);
        return index === 0 ? (
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
                columns={12}
                gap={3}
            >
                {onGoing.map((campaign) => {
                    return (
                        <Grid xs="auto">
                            <OnGoingCampaignBox campaign={campaign} />
                        </Grid>
                    );
                })}
            </Grid>
        ) : (
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
                columns={12}
                gap={3}
            >
                {(completed?.length > 0 ? completed : dummyCompleted).map(
                    (campaign) => {
                        return (
                            <Grid xs="auto">
                                <CompletedCampaignBox campaign={campaign} />
                            </Grid>
                        );
                    },
                )}
            </Grid>
        );
    };

    useEffect(() => {
        if (rows?.data) handleOngoingAndCompletedCampaigns();
    }, [rows]);

    return (
        <Grid container sx={{ backgroundColor: 'white', height: '100%' }}>
            <Loader loading={loading} />
            {rows.data && (
                <>
                    <HeaderWrapper>
                        <HeaderText text="Monitor and Analyze Campaign Performance" />
                    </HeaderWrapper>
                    <Grid
                        container
                        maxWidth={'510px'}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <RecordBox
                            text={'No of Clicks'}
                            value={rows.totalSums[0].totalClicks}
                        />
                        <RecordBox
                            text={'Impressions'}
                            value={rows.totalSums[0].totalImpressions}
                        />
                        <RecordBox
                            text={'Conversions'}
                            value={rows.totalSums[0].totalConversions}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="20px"
                        mb="20px"
                    >
                        <HeaderText text={`Ongoing Campaigns`} />
                        <PrimaryButton
                            text={'+ Create New Campaign'}
                            onClick={() => navigate('/create-new-campaign')}
                        />
                    </Grid>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        size={15}
                        itemActiveColor="black"
                        itemColor="gray"
                        itemHoverColor="black"
                    >
                        {new Array(2).fill(null).map((_, i) => {
                            const id = String(i + 1);
                            return (
                                <Tabs.TabPane
                                    key={id}
                                    tab={
                                        i === 0
                                            ? 'Ongoing Campaigns'
                                            : 'Past Campaigns'
                                    }
                                >
                                    {handleCampaignChange(i)}
                                </Tabs.TabPane>
                            );
                        })}
                    </Tabs>
                </>
            )}
        </Grid>
    );
};

export default CampaignRecord;
