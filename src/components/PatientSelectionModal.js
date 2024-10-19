import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, TextField, Modal } from '@mui/material';
import { buttonStyles, BACKGROUND_BUTTON, BACKGROUND_BUTTON_DISABLE, modalStyle} from '../utils';


export default function PatientSelectionModal({ open, handleClose, onSelectPatient, patients }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleSelectAndClose = () => {
        if (selectedPatient) {
            onSelectPatient(selectedPatient);
            handleClose();
        }
    };

    const handleCancel = () => {
        setSelectedPatient(null);
        handleClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                    <Typography>
                        Selecione o paciente
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Pesquisar pelo paciente..."
                        value={searchTerm}
                        sx={{ 
                            width: '100%',  
                            maxWidth: '300px',  
                            height: '33px',  
                            '& .MuiInputBase-root': {  
                                height: '33px',  
                                padding: '0 14px',  
                            }
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Box 
                    sx={{ 
                        marginTop: '20px', 
                        maxHeight: '80%',
                        overflowY: 'auto'
                    }}
                >
                    {patients
                        .filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((patient) => (
                            <Box
                                key={patient.name}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedPatient === patient ? BACKGROUND_BUTTON : BACKGROUND_BUTTON_DISABLE,
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                                onClick={() => handleSelectPatient(patient)}
                            >
                                <Avatar src={patient.avatar} alt={patient.name} sx={{ marginRight: '10px' }} />
                                <Typography variant="body1">{patient.name}</Typography>
                            </Box>
                        ))}
                </Box>
                <Box sx={{ 
                    position: 'fixed',
                    bottom: 0,
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: '10px',
                    padding: '10px',
                    backgroundColor: 'white',
                    width: '90%'
                }}>
                    <Button variant="contained" onClick={handleCancel} sx={{backgroundColor: 'red'}}>
                        Cancelar
                    </Button>
                    <Button variant="contained" disabled={!selectedPatient} onClick={handleSelectAndClose} sx={buttonStyles}>
                        Selecionar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

