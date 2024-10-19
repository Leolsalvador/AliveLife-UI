import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de sucesso do Material-UI

// Estilo da modal de sucesso
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

export default function SuccessModal({ open, handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <CheckCircleIcon sx={{ fontSize: 80, color: 'black' }} />
                <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Arquivo enviado com sucesso!
                </Typography>
            </Box>
        </Modal>
    );
}
