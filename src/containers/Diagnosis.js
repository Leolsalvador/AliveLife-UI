import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box, Button, TextareaAutosize } from '@mui/material';
import Menu from '../components/Menu';
import { paperStyle, buttonStyles, paperStyleInternal } from '../utils';
import { updateDiagnosis, approvedDiagnosis, updateDiagnosisText } from '../axios';
import LoadingScreen from '../components/LoadingScreen';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Diagnosis() {
    const location = useLocation();
    const { content: initialContent, idFile } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(initialContent);
    const [diagnosisEdit, setDiagnosisEdit] = useState(false);
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
    };

    const confirmDiagnosis = async () => {
        setLoading(true);

        try {
            const response = await approvedDiagnosis(content.id);
            setLoading(false);
            navigate('/analise', { state: { successPage: true } })
        } catch (error) {
            console.error('Erro no upload:', error);
        }        
    };

    const handleChange = (event) => {
        setContent({
            ...content,
            diagnosis: event.target.value,
        });

        setDiagnosisEdit(true);
    };

    const handleChangeDiagnosis = async () => {
        setLoading(true);

        const data = {
            diagnosis: content.diagnosis,
        };

        try {
            const response = await updateDiagnosisText(content.id, data);
            setContent(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro no upload:', error);
        }
        setDiagnosisEdit(false);
    };

    if (loading) {
        if (diagnosisEdit) {
            return <LoadingScreen message="Salvando alterações"/>;
        }
        return <LoadingScreen message="Gerando pré-diagnóstico"/>;
    };

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
                    Gerar outro Pré-Diagnóstico
                </Button>
                {diagnosisEdit && (
                    <Button
                        variant="contained"
                        sx={buttonStyles}
                        onClick={handleChangeDiagnosis}
                    >
                        Salvar Alterações
                    </Button>    
                )}

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
                            <TextareaAutosize
                                value={content.diagnosis}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    minHeight: "150px",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "none",
                                    resize: "none",
                                    outline: "none",
                                    fontSize: "16px",
                                    fontFamily: "Roboto, sans-serif",
                                }}
                                placeholder="Edite este texto..."
                            />
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
