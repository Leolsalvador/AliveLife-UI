import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Button, TextField, Avatar, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { buttonStyles, BACKGROUND_BUTTON_DISABLE, paperStyle, searchBoxStyle } from '../utils';
import Menu from '../components/Menu';
import { getPatients } from '../axios'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';


const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        listPatients();
    }, [])

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const listPatients = async () => {
        setLoading(true);

        try {
            const response = await getPatients();
            setPatients(response.data.patients)
            setLoading(false);
        } catch (error) {
            console.error('Erro no upload:', error);
        }
    };

    const historyPatient = (id) => {
        console.log(selectedPatient)
        navigate('/docs_patients', { state: { patientId: id } })
    }

    if (loading) {
        return <LoadingScreen message="Carregando Dados"/>;
    }

    return (
        <React.Fragment>
            <Menu />
            <Paper sx={paperStyle} >
                <Box sx={{ padding: '20px' }}>
                    <Box sx={searchBoxStyle}>
                        <TextField
                            variant="outlined"
                            placeholder="Pesquisar pelo paciente..."
                            value={searchTerm}
                            sx={{
                                width: '100%',
                                maxWidth: '300px',
                                height: '33px',
                                backgroundColor: '#038C65',
                                '& .MuiInputBase-root': {
                                    height: '33px',
                                    padding: '0 14px',
                                    backgroundColor: '#038C65',
                                },
                                '& .MuiInputBase-input': {
                                    color: '#fff',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#fff',
                                    },
                                },
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#fff' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '10px',
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
                                        padding: '10px',
                                        borderRadius: '8px',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '0 28px',
                                    }}
                                    onClick={() => handleSelectPatient(patient)}
                                >
                                    <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: BACKGROUND_BUTTON_DISABLE, borderRadius: '10px', justifyContent: 'center', minWidth: '300px' }}>
                                        <Avatar sx={{ width: 60, height: 60, marginBottom: '15px', marginLeft: '40%' }} />
                                        <Typography variant="body1">Paciente: {patient.id}</Typography>
                                        <Typography variant="body1">
                                            <strong>Nome:</strong> {patient.name}
                                        </Typography>
                                        <Button sx={buttonStyles} variant="contained" onClick={() => historyPatient(patient.id)}>
                                            Acessar histórico
                                        </Button>
                                    </Paper>
                                </Box>
                            ))}
                    </Box>
                </Box>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
};

export default Patients;
