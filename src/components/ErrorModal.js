import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function ErrorModal({ open, handleClose, errorMessage }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <ErrorIcon sx={{ fontSize: 80, color: 'red' }} />
                <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Ocorreu um erro!
                </Typography>
                {errorMessage && (
                    <Typography variant="body2" sx={{ marginTop: '10px', color: 'gray', textAlign: 'center' }}>
                        {errorMessage}
                    </Typography>
                )}
            </Box>
        </Modal>
    );
}
