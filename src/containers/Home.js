import React from "react";
import Menu from "../components/Menu";
import Grid from '@mui/material/Grid'
import { Paper, Typography } from '@mui/material';
import { paperStyle } from "../utils";
import { BACKGROUND_BUTTON } from "../utils";
// import Video from "../images/video.mp4"

export default function Home() {
    return (
        <React.Fragment>
            <Menu />
            <Paper sx={paperStyle}>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                            Bem-vindo ao Sistema de Análise Automatizada de Relatórios Médicos
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ padding: "80px" }}>
                        <Typography variant="body1" align="center">
                            Nossa aplicação utiliza tecnologias avançadas de Inteligência Artificial e Processamento de Linguagem Natural para transformar relatórios médicos em PDF em diagnósticos preliminares rápidos e precisos. Desenvolvida com o objetivo de aprimorar a eficiência dos processos clínicos, nossa ferramenta oferece aos profissionais de saúde uma maneira intuitiva e eficaz de acessar insights e melhorar o atendimento aos pacientes.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6" align="center" sx={{color: BACKGROUND_BUTTON}}>
                            Vídeo de Apresentação
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <video width="800" height="450" controls>
                            <source src={Video} type="video/mp4" />
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                    </Grid> */}
                </Grid>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
