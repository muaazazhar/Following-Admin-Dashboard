import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import avatar_img from '../../assets/avatar_img.png';
import delete_icon from '../../assets/delete_icon.png';
import view_icon from '../../assets/view_icon.png';
import download_icon from '../../assets/download_icon.png';
import dev from '../../services/axios-client';
import Pagination from '../Pagination';
import PaginationWrapper from '../Wrapper/PaginationWrapper';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TransactionStatus from './TransactionStatus';

function createData(name,date, amount,method, status) {
    return { name,date, amount,method, status };
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

function TransactionHistoryTable() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState({});

    React.useEffect(() => {
        setRows([
            createData(
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
                'Jun 07,2023, 11:00 PM',
                "- $1200",
                'Online Payment',
                <TransactionStatus label='Cash Out' status={0} icon={1} />,
            ),
            createData(
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
                'Jun 07,2023, 11:00 PM',
                
                "- $1200",
                'Online Payment',
                <TransactionStatus label='Cash Out' status={0}/>,
            ),
            createData(
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
                'Jun 07,2023, 11:00 PM',
                
                "- $1200",
                'Online Payment',
                <TransactionStatus label='Cash Out' status={0} icon={1} />,
            ),
            createData(
                
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
                'Jun 07,2023, 11:00 PM',
                
                "- $1200",
                'Online Payment',
                <TransactionStatus label='Cash Out' status={0} icon={1} />,
            ),
            createData(
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
                'Jun 07,2023, 11:00 PM',
                
                "- $1200",
                'Online Payment',
                <TransactionStatus label='Cash Out' status={0} icon={1} />,
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
                            
                            <TableCell sx={headerColumnStyle}>Name</TableCell>
                            <TableCell sx={headerColumnStyle}>Date</TableCell>
                            <TableCell sx={headerColumnStyle}>Amount</TableCell>
                            <TableCell sx={headerColumnStyle}>
                                Payment method
                            </TableCell>
                            
                            <TableCell sx={headerColumnStyle}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: 'none',
                            },
                        }}
                    >
                        <TableRow sx={{ height: '20px' }}></TableRow>
                        {rows?.map((row, index) => (
                            <TableRow key={row.index}>
                               
                                <TableCell sx={bodyColumnStyle}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={bodyColumnStyle}>
                                    {row.date}
                                </TableCell>
                                <TableCell
                                    sx={{ ...bodyColumnStyle, fontWeight: 700, color: '#E94E51' }}
                                >
                                    {row.amount}
                                </TableCell>
                                <TableCell sx={{ ...bodyColumnStyle, fontWeight: 700 }}>
                                    {row.method}
                                </TableCell>
                                
                                
                                
                                <TableCell
                                    sx={{
                                        ...bodyColumnStyle,
                                        textAlign: 'center',
                                    }}
                                >
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationWrapper border={'#E9EDF4'} pt={20} pb={210} mt={22}>
                <Pagination
                    currentPage={page?.page}
                    pageSize={page?.per_page}
                    totalUsers={page?.total}
                    onPageChange={handlePageChange}
                />
            </PaginationWrapper>
        </>
    );
}

export default TransactionHistoryTable;
