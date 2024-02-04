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
    InputAdornment,
    TextField,
    Typography,
    Box,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WrapperStandardTextField from '../Wrapper/WrapperStandardTextField';
import { LoadingButton } from '@mui/lab';

const CampaignStep5 = ({ setIndex }) => {
    const dummyData = [
        { influencerPay: 'Nano<25k', stories: 200, posts: 300 },
        { influencerPay: 'Micro A 25k - 150k', stories: 150, posts: 250 },
        { influencerPay: 'Micro A 150k - 200k', stories: 150, posts: 250 },
        { influencerPay: 'Mega>500', stories: 300, posts: 400 },
    ];
    const [quantities, setQuantities] = useState(
        Array(dummyData.length).fill(1),
    );

    const headerLabels = [
        'Influencer Pay',
        "Story's",
        "Post's",
        'Quantity',
        'Total Price',
    ];

    const increaseQuantity = (index) => {
        setQuantities((prev) =>
            prev.map((quantity, i) => (i === index ? quantity + 1 : quantity)),
        );
    };

    const decreaseQuantity = (index) => {
        setQuantities((prev) =>
            prev.map((quantity, i) =>
                i === index && quantity > 1 ? quantity - 1 : quantity,
            ),
        );
    };

    const calculateTotalPrice = (item, index) => {
        return quantities[index] * (item.stories + item.posts);
    };

    const calculateTotalPriceForAllItems = () => {
        return dummyData.reduce(
            (total, item, index) => total + calculateTotalPrice(item, index),
            0,
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'white' }}>
                            {headerLabels.map((label, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <Box
                                        display={'flex'}
                                        sx={{
                                            width: '100%',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                backgroundColor: '#F1F1F1',
                                                width: '207px',
                                                height: '50px',
                                                borderRadius: '5px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '18px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {item.influencerPay}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {item.stories}
                                </TableCell>
                                <TableCell align="center">
                                    {item.posts}
                                </TableCell>
                                <TableCell align="center">
                                    <Box
                                        display={'flex'}
                                        justifyContent={'center'}
                                        sx={{ width: '100%' }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                decreaseQuantity(index)
                                            }
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <p
                                            style={{
                                                border: '1px solid #E9EDF4',
                                                borderRadius: '10px',
                                                width: '60px',
                                            }}
                                        >
                                            {quantities[index]}
                                        </p>
                                        <IconButton
                                            onClick={() =>
                                                increaseQuantity(index)
                                            }
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {calculateTotalPrice(item, index)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                align="right"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Total Price:
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {calculateTotalPriceForAllItems()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                display={'flex'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}
            >
                <LoadingButton
                    variant="contained"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#272727',
                        border: '1px solid #272727',
                        textTransform: 'capitalize',
                        mt: '20px',
                        mr: '20px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setIndex((prev) => prev - 1)}
                >
                    Back
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#272727',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        mt: '30px',
                    }}
                >
                    Proceed To Payment
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default CampaignStep5;
