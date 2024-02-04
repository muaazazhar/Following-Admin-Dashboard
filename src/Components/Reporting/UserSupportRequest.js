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

function UserSupportRequestTable() {
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

    const handlePageChange = async (page) => {
        await getAllDocuments(page);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead
                        sx={{
                            [`& .${tableCellClasses.root}`]: {},
                        }}
                    >
                        <TableRow>
                            <TableCell sx={headerColumnStyle}>
                                Ticket #
                            </TableCell>
                            <TableCell sx={headerColumnStyle}>Name</TableCell>
                            <TableCell sx={headerColumnStyle}>
                                Campaign Title
                            </TableCell>
                            <TableCell sx={headerColumnStyle}>Date</TableCell>
                            <TableCell sx={headerColumnStyle}>
                                Request status
                            </TableCell>
                            <TableCell sx={headerColumnStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                // borderRadius: "7px",
                                // borderTop: "1px solid #e9edf4 !important",
                                // borderBottom: "1px solid #e9edf4 !important",
                            },
                            [`& .${tableRowClasses.root}`]: {
                                // backgroundColor: "#FFFFFF",
                                // borderRadius: "7px",
                                // borderCollapse: "unset !important",
                                // boxShadow: "0px 8px 24px rgba(168, 180, 208, 0.1)", border: "1px solid #e9edf4 !important", boxSizing: "border-box", width: "100%"
                            },
                        }}
                    >
                        {rows?.map((row, index) => (
                            <>
                                <div style={{ height: '15px' }}> </div>
                                <TableRow
                                    key={row.index}
                                    sx={{
                                        border: '1px solid #e9edf4 !important',
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            ...bodyColumnStyle,
                                            borderLeft:
                                                '1px solid #e9edf4 !important',
                                            borderRadius: '7px 0px 0px 7px',
                                        }}
                                    >
                                        {row.id}
                                    </TableCell>
                                    <TableCell sx={bodyColumnStyle}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell sx={bodyColumnStyle}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            ...bodyColumnStyle,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {row.date}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            ...bodyColumnStyle,
                                            width: {
                                                xs: '120px',
                                            },
                                        }}
                                    >
                                        {row.status}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            ...bodyColumnStyle,
                                            borderRight:
                                                '1px solid #e9edf4 !important',
                                            borderRadius: '0px 7px 7px 0px',
                                        }}
                                    >
                                        {row.action}
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserSupportRequestTable;
