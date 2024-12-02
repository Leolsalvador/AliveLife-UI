import React from 'react';
import { Box, Typography, Modal, Button, TextField, Grid } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';


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

export default function ErrorModal({ open, handleClose, handleConfirm, setPassword }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{...modalStyle, width: '30%'}}>
                <WarningAmberIcon sx={{ fontSize: 80, color: 'red' }} />
                <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Escreva a senha para confirmar o pré-diagnóstico
                </Typography>
                <TextField  
                    sx={{ '& label': { color: 'black' },
                        '& input': { color: 'black' },
                        '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' } }
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon sx={{ color: 'black', opacity: '60%' }} />
                        </InputAdornment>
                        ),
                    }}
                />
                <Grid container justifyContent="center" alignItems="center">
                    <Button
                        variant="contained"
                        sx={{ marginTop: '20px', backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                        onClick={handleConfirm}
                    > 
                        Confirmar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </Grid>
                <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold', color: 'red' }}>
                    Atenção, em caso de confirmação o pré-diagnóstico será enviado para o paciente.
                </Typography>
            </Box>
        </Modal>
    );
}
