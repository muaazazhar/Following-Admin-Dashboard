import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import * as React from 'react';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import avatar_img from '../../assets/avatar_img.png';
import dev from '../../services/axios-client';
import { useNavigate } from 'react-router-dom';
import share_icon from '../../assets/share_icon.png';
import TransactionStatus from './TransactionStatus';
import SubHeaderText from '../Text/SubHeaderText';
import CustomizedSwitches from '../CustomButton/IOSSwitch';
import PrimaryBtn from '../CustomButton/PrimaryBtn';

function createData(id, name, date, title, status, action) {
    return { id, name, date, title, status, action };
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
    padding: { xs: '5px 8px', md: '8px 10px', lg: '18px 16px' },
    borderTop: '1px solid #e9edf4 !important',
    borderBottom: '1px solid #e9edf4 !important',
};

function Notifications() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState({});
    const naviagte = useNavigate();

    React.useEffect(() => {
        setRows([
            createData(
                '#234',
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
                    <Box>Joan Powell</Box>
                </Grid>,
                '06 Jul 23',
                'Campaign 1',
                <TransactionStatus status={1} />,
                <img src={share_icon} />,
            ),
            createData(
                '#234',
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
                    <Box>Joan Powell</Box>
                </Grid>,
                '06 Jul 23',
                'Campaign 1',
                <TransactionStatus status={1} />,
                <img src={share_icon} />,
            ),
            createData(
                '#234',
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
                    <Box>Joan Powell</Box>
                </Grid>,
                '06 Jul 23',
                'Campaign 1',
                <TransactionStatus status={0} />,
                <img src={share_icon} />,
            ),
            createData(
                '#234',
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
                    <Box>Joan Powell</Box>
                </Grid>,
                '06 Jul 23',
                'Campaign 1',
                <TransactionStatus status={1} />,
                <img src={share_icon} />,
            ),
            createData(
                '#234',
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
                    <Box>Joan Powell</Box>
                </Grid>,
                '06 Jul 23',
                'Campaign 1',
                <TransactionStatus status={0} />,
                <img src={share_icon} />,
            ),
        ]);
    }, []);

    const getAllDocuments = async (page = 1) => {
        await dev
            .get(`/documents?page=${page}&per_page=10`, {
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
        <Grid container mt="45px">
            {rows.map((row, i) => (
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    sx={{
                        backgroundColor: '#fff',
                    }}
                >
                    <Grid xs="3">
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            padding={'0px 28px'}
                            // sx={{
                            //     borderRight:
                            //         '4px solid rgba(108, 95, 252, 0.2)',
                            // }}
                        >
                            <Box>
                                <SubHeaderText
                                    text="23 Oct"
                                    color="#8F8FB1"
                                    customstyle={{
                                        fontWeight: 600,
                                        fontSize: '13px',
                                        textAlign: 'right',
                                    }}
                                />
                                <SubHeaderText
                                    text="03:15"
                                    color="#8F8FB1"
                                    customstyle={{
                                        fontWeight: 600,
                                        fontSize: '21px',
                                        textAlign: 'right',
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs="auto">
                        <Box
                            sx={{
                                borderRadius: '9px',
                                backgroundColor: '#fff',
                                border: '3px solid #6c5ffc',
                                boxSizing: 'border-box',
                                width: '18px',
                                height: '18px',
                                marginRight: '-11px',
                            }}
                        ></Box>
                    </Grid>
                    <Grid
                        xs="7"
                        sx={{
                            borderLeft: '4px solid rgba(108, 95, 252, 0.2)',
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            columnGap={'12px'}
                            sx={{
                                borderRadius: '6px',
                                backgroundColor: '#fff',
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.03)',
                                width: '100%',
                                textAlign: 'left',
                                fontSize: '15px',
                                color: '#100f15',
                                marginLeft: '45px',
                                padding: '14px 20px',
                            }}
                        >
                            <Avatar
                                alt={'avt'}
                                src={avatar_img}
                                variant="square"
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '7px',
                                }}
                            />
                            <Box flexGrow={2}>
                                <SubHeaderText
                                    text="Dennis Trexy"
                                    color="#100F15"
                                    customstyle={{
                                        fontSize: '13px',
                                    }}
                                />
                                <SubHeaderText text="2 Members Accepted your Request." />
                            </Box>
                            <Box flexGrow={1}>
                                <SubHeaderText
                                    text="2 Hrs ago"
                                    color="#74829C"
                                    customstyle={{
                                        float: 'right',
                                        fontSize: '11px',
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    {rows.length - 1 != i && (
                        <Grid
                            container
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        >
                            <Grid xs="3"></Grid>
                            <Grid xs="auto">
                                <Box
                                    sx={{
                                        borderLeft:
                                            '4px solid rgba(108, 95, 252, 0.2)',
                                        height: '30px',
                                        width: '80%',
                                        marginLeft: '7px',
                                    }}
                                ></Box>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            ))}
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    margin: '25px 0px 60px',
                }}
            >
                <PrimaryBtn text="Load more" style={{ padding: '7px 32px' }} />
            </Grid>
        </Grid>
    );
}

export default Notifications;
