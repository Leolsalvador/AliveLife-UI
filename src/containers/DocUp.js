import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import Menu from '../components/Menu';
import { paperStyle, buttonStyles, paperStyleInternal } from '../utils';
import { uploadFile, getPatients, deleteFile, diagnosisGenerate } from '../axios';
import LoadingScreen from '../components/LoadingScreen';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientSelectionModal from '../components/PatientSelectionModal';


export default function DocUp() {
    const location = useLocation();
    const { dataFile } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [openModal, setOpenModal] = useState(false);
    
    const [patients, setPatients] = useState([]);
    const [idFile, setIdFile] = useState(0);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        listPatients();
        if (content === '') postUploadFile();
    }, [content]);

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

    const postUploadFile = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', dataFile.name);
        formData.append('file', dataFile);

        try {
            const response = await uploadFile(formData);
            setContent(response.content);
            setIdFile(response.id);
            setLoading(false);
        } catch (error) {
            navigate('/analise', { state: { errorPage: true } })
            console.error('Erro no upload:', error);
        }
    };

    const cancelOperation = async () => {
        setLoading(true);

        try {
            const response = await deleteFile(idFile);
            console.log(response);
            setLoading(false);
            navigate('/analise')
        } catch (error) {
            console.error('Erro no upload:', error);
        }
    };

    const confirmUpload = async () => {
        setLoading(true);

        const data = {
            "idUser": selectedPatient.id
        }

        try {
            const response = await diagnosisGenerate(idFile, data);
            setLoading(false);
            navigate('/diagnosis', {state: { content: response, idFile }})
            // navigate('/analise', { state: { successPage: true } })
        } catch (error) {
            console.error('Erro no upload:', error);
        }        
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setOpenModal(false);
    };

    if (loading) {
        return <LoadingScreen message="Gerando o Pré-Diagnóstico"/>;
    }

    return (
        <React.Fragment>
            <Menu />
            <Box sx={{marginTop: "20px", marginLeft: "20px", display: 'flex', gap: '10px' }}>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={handleOpenModal}
                >
                    Selecionar o paciente
                </Button>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={confirmUpload}
                    disabled={!selectedPatient}
                >
                    Confirmar
                </Button>
                <Button
                    variant="contained"
                    sx={{backgroundColor: "red"}}
                    onClick={cancelOperation}
                >
                    Cancelar
                </Button>
            </Box>
            <Paper sx={{ ...paperStyle, padding: '50px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={3} sx={{ ...paperStyleInternal, marginTop: '33px', marginBottom: '50px' }}>
                        <Box sx={{ backgroundColor: '#364257', padding: '20px', borderRadius: '8px', color: 'white', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                <strong>Nome do arquivo:</strong><br /> {dataFile.name}
                            </Typography>
                        </Box>

                        {selectedPatient && (
                            <Box sx={{ backgroundColor: '#364257', padding: '20px', borderRadius: '8px', color: 'white' }}>
                                <Typography variant="body1">
                                    <strong>Paciente:</strong><br /> {selectedPatient.name}
                                </Typography>
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={9}>
                        <Paper sx={paperStyleInternal}>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: 'white' }}>
                                {content}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>

            <PatientSelectionModal
                open={openModal}
                handleClose={handleCloseModal}
                onSelectPatient={handleSelectPatient}
                patients={patients}
            />

        </React.Fragment>
    );
}
