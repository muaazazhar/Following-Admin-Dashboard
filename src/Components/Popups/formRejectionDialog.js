import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { DialogActions, DialogContent, InputBase } from '@mui/material';
import HeaderText from '../Text/HeaderText';
import SubHeaderText from '../Text/SubHeaderText';
import PrimaryBtn from '../CustomButton/PrimaryBtn';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function FormRejectionDialog(props) {
    const { onClose, modal } = props;

    const [reason, setReason] = React.useState('');

    const handleClose = () => {
        onClose(reason);
    };

    return (
        <Dialog
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose(event, reason);
                }
            }}
            open={modal.open}
            sx={{ textAlign: 'center' }}
            disableBackdropClick
        >
            <DialogTitle>
                <CancelRoundedIcon
                    sx={{
                        color: '#E94E51',
                        width: '40px',
                        height: '40px',
                    }}
                />
            </DialogTitle>
            <DialogContent>
                {modal.title && <HeaderText text={modal.title} />}
                <InputBase
                    fullWidth
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    sx={{
                        mt: '32px',
                        width: { xs: '300px', md: '350px' },
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                        border: '1px solid #e9edf4',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        flexShrink: '0',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 18px 25px',
                        textAlign: 'center',
                        fontSize: '16px',
                        color: '#74829c',
                    }}
                    placeholder={'Type Your Message...'}
                    type={'text'}
                    inputProps={{
                        'aria-label': 'Message',
                    }}
                    required
                />
            </DialogContent>
            <DialogActions sx={{ padding: '8px 24px 24px' }}>
                <PrimaryBtn
                    text="Send"
                    fullWidth={true}
                    onClick={handleClose}
                />
            </DialogActions>
        </Dialog>
    );
}
