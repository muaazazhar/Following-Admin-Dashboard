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
import HeaderWrapper from '../Wrapper/HeaderWrapper';
import AccectSelect from '../Input/AccectSelect';

function createData(id, name, method, role, date, amount, status) {
    return { id, name, method, role, date, amount, status };
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

function MerchantPaymentsTable() {
    const user = JSON.parse(localStorage.getItem('user'));
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState({});
  const [data, setData] = React.useState([]);

  const convertDate = (date) => {
    const inputDate = new Date(date);

    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    };
    
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate
    
  }


  React.useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async (page = 1) => {
    console.log(`Getting all /payments/merchant`);
    await dev.get(`/payments/merchant`, {
      headers: {
        "token": user.token
      },
    }).then((response) => {
      if (response.data) {
        setData(response.data);
          const data = response.data.map((item) =>
          createData(
            `#${item.id}`,
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={'10px'}
            >
                <Avatar
                    alt={'avt'}
                    src={item.merchant.profile}
                    sx={{ width: '50px', height: '50px' }}
                />
                <Box>{item.merchant.name}</Box>
            </Grid>,
            'Online Payment',
            'Admin',
            convertDate(item.createdAt),
            `$ ${item.amount}`,
            <Box
                sx={{
                    padding: '6px 20px',
                    backgroundColor: '#6C5FFC',
                    color: '#FFFFFF',
                    width: '60px',
                    borderRadius: '100px',
                }}
            >
                {item.status}
            </Box>,
        ),
        );
        setRows(data);
        
      }
    }).catch((error) => console.log(error))
  }

  const handlePageChange = async page => {
    await getAllDocuments(page)
  }


    



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
                            <TableCell sx={headerColumnStyle}>ID</TableCell>
                            <TableCell sx={headerColumnStyle}>Name</TableCell>
                            <TableCell sx={headerColumnStyle}>
                                Payment method
                            </TableCell>
                            <TableCell sx={headerColumnStyle}>Role</TableCell>
                            <TableCell sx={headerColumnStyle}>Date</TableCell>
                            <TableCell sx={headerColumnStyle}>Amount</TableCell>
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
                                    {row.id}
                                </TableCell>
                                <TableCell sx={bodyColumnStyle}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={bodyColumnStyle}>
                                    {row.method}
                                </TableCell>
                                <TableCell sx={bodyColumnStyle}>
                                    {row.role}
                                </TableCell>
                                <TableCell sx={bodyColumnStyle}>
                                    {row.date}
                                </TableCell>
                                <TableCell
                                    sx={{ ...bodyColumnStyle, fontWeight: 700 }}
                                >
                                    {row.amount}
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

export default MerchantPaymentsTable;
