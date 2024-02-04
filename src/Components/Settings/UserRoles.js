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

function UserRoles() {
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
        <Grid container mt="35px">
            {rows.map((row, i) => (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        margin: '10px 0px',
                        borderRadius: '7px',
                        backgroundColor: '#fff',
                        border: '1px solid #e9edf4',
                        boxSizing: 'border-box',
                        padding: '25px 0px 25px 42px',
                    }}
                    columns={14}
                >
                    <Grid xs="10" md="10" lg="8">
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
                    </Grid>
                    <Grid xs="2" md="2" lg="3">
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            columnGap={'10px'}
                        >
                            <Box>
                                <SubHeaderText text="Admin" />
                                <CustomizedSwitches defaultChecked={false} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs="2" md="2" lg="3">
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            columnGap={'10px'}
                        >
                            <Box>
                                <SubHeaderText text="Report" />
                                <CustomizedSwitches />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default UserRoles;
