import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

const SocialMediaTable = ({ socialMediaChannels }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}
        >
            {socialMediaChannels.map((channel) => (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Platform</TableCell>
                                <TableCell>Content Needed</TableCell>
                                <TableCell>Bank Account</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '600' }}>
                                    {channel.platform || 'Dummy'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>
                                    {Array.isArray(channel.content)
                                        ? channel.content[0]['label']
                                        : channel.content['label'] || 'Dummy'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>
                                    {channel.brandAccount || 'Dummy'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: '600' }}>
                                    {channel.description || 'Dummy'}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </Box>
    );
};

export default SocialMediaTable;
