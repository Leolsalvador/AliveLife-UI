import React, { useEffect } from "react";
import Menu from "../components/Menu";
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { paperStyle } from "../utils";
import { getFiles, getDiagnosis } from "../axios";
import selectImg from "../images/select.png"

export default function Documents() {
    const [loading, setLoading] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [diagnosis, setDiagnosis] = React.useState("");
    const [patient, setPatient] = React.useState("");
    const [medical, setMedical] = React.useState("");
    const [fileName, setFileName] = React.useState("");

    useEffect(() => {
        listFiles();
    }, [])

    const listFiles = async () => {
        setLoading(true);

        try{
            const response = await getFiles();
            setFiles(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const HandleChangeName = async (id, name) => {
        setLoading(true);

        try{
            const response = await getDiagnosis(id);
            const diagnosisData = response.data[0];

            if (diagnosisData) {
                setDiagnosis(diagnosisData.diagnosis);
                setPatient(diagnosisData.patient);
                setMedical(diagnosisData.Medical);
                setFileName(name);  
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Menu />
            <Paper sx={paperStyle}>
                <Grid container>
                    <Grid item xs={3} sx={{ backgroundColor: "#00382C", height: "100vh", padding: "20px" }}>
                        <Typography variant="h6" sx={{ color: "white", marginBottom: "20px" }}>
                            Meus Documentos:
                        </Typography>
                        {files.map((file) => (
                            <Button 
                                key={file._id}
                                variant="contained"
                                sx={{backgroundColor: '#364257',
                                        color: '#FFF',
                                        marginTop: "10px",
                                        width: "250px",
                                        height: "50px"}}
                                onClick={() => HandleChangeName(file.id, file.name)}
                                >
                                {file.name}
                            </Button>
                        ))}
                    </Grid>

                    {!fileName ? (
                        <Grid 
                            item 
                            xs={9} 
                            sx={{ 
                                padding: "40px", 
                                display: "flex", 
                                flexDirection: "column",
                                justifyContent: "center", 
                                alignItems: "center", 
                                height: "100vh"  
                            }}
                        >
                            <Typography variant="h4">
                                Selecione um exame
                            </Typography>
                        
                            {/* Adicionando a imagem abaixo do texto */}
                            <Box
                                component="img"
                                src={selectImg}
                                alt="Selecione um exame"
                                sx={{ width: "150px", marginTop: "20px" }}
                            />
                        </Grid>
                    ) : (
                        <Grid item xs={9} sx={{ padding: "40px" }}>
                            <Typography variant="h5" gutterBottom>
                                Pré-diagnóstico do: {fileName}
                            </Typography>

                            <Box sx={{ marginBottom: "20px" }}>
                                <Typography variant="body1">
                                    <strong>Paciente:</strong> {patient}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Médico Solicitante:</strong> Dr. {medical}
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                {diagnosis.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: "20px" }}>
                                Assinado: <br />
                                Dr. {medical} <br />
                            </Typography>
                        </Grid>
                    )}

                </Grid>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
