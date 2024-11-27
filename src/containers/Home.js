import React from "react";
import Menu from "../components/Menu";
import Grid from '@mui/material/Grid'
import { Paper, Typography } from '@mui/material';
import { paperStyle } from "../utils";
import { BACKGROUND_BUTTON } from "../utils";


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
                            Nossa aplicação utiliza tecnologias avançadas de Inteligência Artificial e Processamento de Linguagem Natural para transformar relatórios médicos em PDF em pré-diagnósticos preliminares rápidos e precisos. Desenvolvida com o objetivo de aprimorar a eficiência dos processos clínicos, nossa ferramenta oferece aos profissionais de saúde uma maneira intuitiva e eficaz de acessar insights e melhorar o atendimento aos pacientes.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6" align="center" sx={{color: BACKGROUND_BUTTON}}>
                            Vídeo de Apresentação
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <iframe
                            width="800"
                            height="450"
                            src="https://www.youtube.com/embed/ZVe0vE2ij3w"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Grid>
                </Grid>
            </Paper>
            <Typography align="center" sx={{ marginTop: '20px', color: '#BDBDBD' }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
