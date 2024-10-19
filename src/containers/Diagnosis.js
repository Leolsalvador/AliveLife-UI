import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box, Button } from '@mui/material';
import Menu from '../components/Menu';
import { paperStyle, buttonStyles, paperStyleInternal } from '../utils';
import { updateDiagnosis, approvedDiagnosis } from '../axios';
import LoadingScreen from '../components/LoadingScreen';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Diagnosis() {
    const location = useLocation();
    const { content: initialContent, idFile } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(initialContent);
    const navigate = useNavigate();

    const generateOther = async () => {
        setLoading(true);

        try {
            const response = await updateDiagnosis(content.id);
            setContent(response);
            setLoading(false);
        } catch (error) {
            console.error('Erro no upload:', error);
        }
    }

    const confirmDiagnosis = async () => {
        setLoading(true);

        try {
            const response = await approvedDiagnosis(content.id);
            setLoading(false);
            navigate('/analise', { state: { successPage: true } })
        } catch (error) {
            console.error('Erro no upload:', error);
        }        
    }

    if (loading) {
        return <LoadingScreen message="Gerando o diagnóstico"/>;
    }

    return (
        <React.Fragment>
            <Menu />
            <Box sx={{marginTop: "20px", marginLeft: "20px", display: 'flex', gap: '10px' }}>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={confirmDiagnosis}
                >
                    Aprovar
                </Button>
                <Button
                    variant="contained"
                    sx={buttonStyles}
                    onClick={generateOther}
                >
                    Gerar outro Diagnóstico
                </Button>
            </Box>
            <Paper sx={{ ...paperStyle, padding: '50px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={3} sx={{ ...paperStyleInternal, marginTop: '33px', marginBottom: '50px' }}>
                        <Box sx={{ backgroundColor: '#364257', padding: '20px', borderRadius: '8px', color: 'white', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                <strong>Status:</strong>
                                <br />
                                <Typography variant="body1" component="span" sx={{ color: 'red' }}>
                                    {content.approved ? 'Aprovado' : 'Pendente'}
                                </Typography>
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#364257', padding: '20px', borderRadius: '8px', color: 'white', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                <strong>Paciente:</strong><br /> {content.patient}
                            </Typography>
                        </Box>

                        <Box sx={{ backgroundColor: '#364257', padding: '20px', borderRadius: '8px', color: 'white', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                <strong>Médico:</strong><br /> {content.Medical}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={9}>
                        <Paper sx={paperStyleInternal}>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: 'white' }}>
                                {content.diagnosis}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
