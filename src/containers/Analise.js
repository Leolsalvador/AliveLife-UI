import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import Menu from '../components/Menu';
import uploadIcon from '../images/uploadIcon.png';
import { paperStyle, paperStyleInternal } from '../utils';
import { useNavigate } from 'react-router-dom';
import UploadFile from '../components/UploadFile';

export default function UploadDocument() {
    const navigate = useNavigate();
    const [dataFile, setDataFile] = React.useState(null)

    useEffect(() => {
        if (dataFile)
            navigate('/docup', { state: { dataFile } });
    })

    return (
        <React.Fragment>
            <Menu />
            <Paper sx={paperStyle}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Análise
                        </Typography>
                        <Box sx={{marginTop: '100px', marginBottom: '100px'}}>
                            <Paper
                                sx={{...paperStyleInternal, padding:"100px"}}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <Box
                                    component="img"
                                    src={uploadIcon}
                                    alt="Upload"
                                    sx={{ width: '100px', marginBottom: '20px' }}
                                />
                                <Typography variant="h6" sx={{ color: 'white' }}>
                                    Arraste e solte o seu documento PDF
                                </Typography>
                                <Box sx={{ display: 'flex'}} justifyContent="center" alignItems="center">
                                    <Typography sx={{ color: '#BDBDBD', marginRight: 1 }}>
                                        ou
                                    </Typography>
                                    <Box sx={{ margin: '0 10px' }}> {/* Pequeno ajuste na margem do botão */}
                                        <UploadFile setDataFile={setDataFile} />
                                    </Box>
                                    <Typography sx={{ color: '#BDBDBD', marginLeft: 1 }}>
                                        do seu dispositivo
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
