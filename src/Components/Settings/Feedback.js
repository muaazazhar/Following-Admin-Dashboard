import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    InputBase,
    Typography,
} from '@mui/material';
import * as React from 'react';
import avatar_img from '../../assets/avatar_img.png';
import delete_icon from '../../assets/delete_icon.png';
import view_icon from '../../assets/view_icon.png';
import download_icon from '../../assets/download_icon.png';
import dev from '../../services/axios-client';
import HeaderText from '../Text/HeaderText';
import SubHeaderText from '../Text/SubHeaderText';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import PrimaryBtn from '../CustomButton/PrimaryBtn';

function createData(id, name, date, amount, action_btns1, action_btns2) {
    return { id, name, date, amount, action_btns1, action_btns2 };
}

const headerColumnStyle = {
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'uppercase',
    fontWeight: '600',
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

const options = [
    {
        value: 1,
        label: 'Approved',
        bcolor: '#DAF9E4',
        color: '#01AB3B',
    },
    {
        value: 0,
        label: 'Declined',
        bcolor: '#FFDFE1',
        color: '#E94E51',
    },
];

function Feedback() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [rows, setRows] = React.useState([1, 2]);
    const [page, setPage] = React.useState({});

    const getAllDocuments = async (page = 1) => {
        await dev
            .get(`/documents?page=${page}&per_page=10`, {
                headers: {
                    token: user.token,
                },
            })
            .then((response) => {
                if (response.data) {
                    const data = response.data.data.map((data) =>
                        createData(
                            data.merchantId,
                            data.merchant.name,
                            <Box alignItems="center" sx={{ display: 'flex' }}>
                                {' '}
                                <Box
                                    sx={{
                                        border: '1px solid',
                                        borderRadius: '5px',
                                        border: '1px solid #e9edf4',
                                        boxSizing: 'border-box',
                                        padding: '8px 3px 0px',
                                        mr: '10px',
                                    }}
                                >
                                    <img
                                        src={data.docLink}
                                        width="40px"
                                        height="30px"
                                    />
                                </Box>{' '}
                                {data.docType}
                            </Box>,
                            <Box
                                sx={{
                                    padding: '8px',
                                    textAlign: 'center',
                                    borderRadius: '100px',
                                    backgroundColor: '#f9f9f9',
                                    width: '67px',
                                    fontSize: '14px',
                                    lineHeight: '21px',
                                    fontWeight: '600',
                                    color: '#6C5FFC',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {data.docName.split('.').pop()}
                            </Box>,
                            <Grid
                                Container
                                direction="row"
                                alignItems="center"
                                minWidth={'100px'}
                            >
                                <a href={data.docLink} target="_blank">
                                    <img
                                        src={view_icon}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <img
                                        src={download_icon}
                                        style={{
                                            margin: '0px 12%',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </a>
                                <img
                                    src={delete_icon}
                                    onClick={() =>
                                        handleDeleteDocument(data.id)
                                    }
                                    style={{ cursor: 'pointer' }}
                                />
                            </Grid>,
                        ),
                    );
                    setRows(data);
                    setPage(response.data);
                }
            })
            .catch((error) => console.log(error));
    };

    const handlePageChange = async (page) => {
        await getAllDocuments(page);
    };

    const handleDeleteDocument = async (id) => {
        await dev
            .delete(`/documents/${id}`, {
                headers: {
                    token: user.token,
                },
            })
            .then((response) => {
                if (response.data) {
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Grid container mt="10px">
                <Grid item xs={12} sx={{ margin: '20px 0px' }}>
                    <HeaderText text="Feedbacks" />
                </Grid>
                {[1, 2, 3, 4].map((data, index) => (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            margin: '10px 0px 0px',
                            padding: '20px 45px 23px',
                            borderRadius: '7px',
                            backgroundColor: '#fff',
                            boxShadow: '0px 8px 24px rgba(168, 180, 208, 0.1)',
                            border: '1px solid #6c5ffc',
                            boxSizing: 'border-box',
                        }}
                        columns={20}
                    >
                        <Grid xs={12} sm={14} md={14} lg={16}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                columnGap={'10px'}
                            >
                                <Avatar
                                    alt={'avt'}
                                    src={avatar_img}
                                    sx={{ width: '50px', height: '50px' }}
                                />
                                <Box>
                                    <SubHeaderText
                                        text="Joan Powell"
                                        customstyle={{ fontWeight: 600 }}
                                    />
                                    <SubHeaderText text="06 Jul 23" />
                                </Box>
                            </Grid>
                            <Divider sx={{ margin: '20px 0px' }} />
                            <SubHeaderText
                                text="Comment Message"
                                customstyle={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                }}
                            />
                        </Grid>
                        <Grid xs={8} sm={6} md={6} lg={4}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                columnGap={'20px'}
                            >
                                <Grid xs="12" textAlign={'center'}>
                                    <StarRoundedIcon
                                        sx={{ color: '#FFCF00' }}
                                    />
                                    <StarRoundedIcon
                                        sx={{ color: '#FFCF00' }}
                                    />
                                    <StarRoundedIcon
                                        sx={{ color: '#FFCF00' }}
                                    />
                                    <StarOutlineRoundedIcon
                                        sx={{ color: '#FFCF00' }}
                                    />
                                    <StarOutlineRoundedIcon
                                        sx={{ color: '#FFCF00' }}
                                    />
                                </Grid>
                                <Grid xs="auto">
                                    <PrimaryBtn
                                        text="Approve"
                                        bgColor="#01AB3B"
                                        style={{
                                            mt: '20px',
                                            padding: '6px 14px',
                                        }}
                                    />
                                </Grid>
                                <Grid xs="auto">
                                    <PrimaryBtn
                                        text={` Reject `}
                                        bgColor="#E94E51"
                                        style={{
                                            mt: '20px',
                                            padding: '6px 20px',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Feedback;
