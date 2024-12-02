import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from '../images/Background.png';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userLogin } from '../axios';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { buttonStyles, BACKGROUND_BUTTON, BACKGROUND_PAPER } from '../utils';
import { useUser } from '../components/UserContext';
import { Checkbox, Typography, Link, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ color: "#ffff" }}>
      {'Copyright © Alive&Life '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { setUserRole } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(username, password);
      localStorage.setItem('userToken', response.data.access);
      document.cookie = `sessionid=${response.data.sessionid}`;
      setUserRole(response.data.user_role);
      if (response.data.user_role === 'Médico')
        navigate('/analise');
      else if (response.data.user_role === 'Paciente')
        navigate('/');
      else if (response.data.user_role === 'Atendente')
        navigate('/users');
      else
        navigate('/');
    } catch (error) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Background})`,
            backgroundSize: '70%', // Ajusta o tamanho da imagem
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square 
          sx={{
            backgroundColor: BACKGROUND_PAPER, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', // Distribui o espaço entre o conteúdo e o rodapé
            height: '100%', // Garante que o Grid ocupe toda a altura do container pai
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: BACKGROUND_BUTTON }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color={'white'}>
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                sx={{ '& label': { color: '#ffffff' },
                      '& input': { color: '#ffffff' },
                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ffffff' } }
                 }}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#ffffff', opacity: '60%' }} />
                      </InputAdornment>
                    ),
                }}
              />
              <TextField  
                sx={{ '& label': { color: '#ffffff' },
                      '& input': { color: '#ffffff' },
                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ffffff' } }
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senhas"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#ffffff', opacity: '60%' }} />
                      </InputAdornment>
                    ),
                }}
              />
              <Checkbox
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                sx={{ color: '#ffffff' }}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <Typography variant="caption" sx={{ color: '#ffffff' }}>
                Aceito o <Link
                  component="button"
                  onClick={(e) => {
                    e.preventDefault(); // Impede que o formulário seja enviado
                    handleOpenModal(); // Abre a modal
                  }}
                  sx={{ color: '#ffffff' }}
                >
                  termo de uso e privacidade
                </Link>
              </Typography>

              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Termo de uso e privacidade</DialogTitle>
                <DialogContent>
                  <Typography variant="h4" gutterBottom>
                    Termo de Uso e Política de Privacidade
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Última atualização:</strong> 01 de dezembro de 2024
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    1. Introdução
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Bem-vindo ao nosso serviço! Este Termo de Uso e Política de Privacidade
                    tem como objetivo informar as condições de uso da nossa plataforma e
                    como seus dados pessoais são coletados, utilizados, armazenados e
                    protegidos. Ao utilizar nossos serviços, você declara estar de acordo
                    com os termos abaixo.
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    2. Aceitação dos Termos
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Ao acessar ou utilizar a plataforma, você concorda integralmente com
                    este Termo de Uso e Política de Privacidade. Caso não concorde,
                    recomendamos que interrompa imediatamente o uso dos serviços.
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    3. Uso da Plataforma
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>3.1. Cadastro:</strong> Para acessar algumas funcionalidades da
                    plataforma, você precisará criar uma conta e fornecer informações
                    pessoais como nome, e-mail e telefone. É sua responsabilidade garantir
                    que as informações fornecidas sejam verdadeiras e atualizadas.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>3.2. Proibições:</strong> É proibido utilizar a plataforma para:
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Práticas ilícitas ou que violem direitos de terceiros;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Transmissão de malware, vírus ou qualquer outro código malicioso;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Acessar áreas restritas ou sistemas da plataforma de forma não
                        autorizada.
                      </Typography>
                    </li>
                  </ul>
                  <Typography variant="body1" gutterBottom>
                    <strong>3.3. Suspensão de Acesso:</strong> Nos reservamos o direito de
                    suspender ou encerrar o acesso de qualquer usuário que viole os termos
                    aqui estabelecidos.
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    4. Coleta e Uso de Dados Pessoais
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>4.1. Dados Coletados:</strong> Coletamos as seguintes
                    informações:
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        <strong>Dados fornecidos pelo usuário:</strong> Nome, e-mail,
                        telefone, endereço e outras informações inseridas voluntariamente.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        <strong>Dados coletados automaticamente:</strong> Informações de
                        navegação, como endereço IP, cookies, localização aproximada e tipo
                        de dispositivo.
                      </Typography>
                    </li>
                  </ul>
                  <Typography variant="body1" gutterBottom>
                    <strong>4.2. Finalidade do Uso de Dados:</strong> Os dados coletados são
                    utilizados para:
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Garantir o funcionamento da plataforma;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Melhorar sua experiência como usuário;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Enviar comunicações sobre produtos, serviços e atualizações;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">Cumprir obrigações legais.</Typography>
                    </li>
                  </ul>

                  <Typography variant="h5" gutterBottom>
                    5. Direitos do Usuário
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Você tem direito a:
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Acessar, corrigir ou excluir seus dados pessoais;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Solicitar a revogação do consentimento para uso de dados;
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Saber como e por que seus dados estão sendo tratados.
                      </Typography>
                    </li>
                  </ul>

                <Typography variant="h5" gutterBottom>
                  6. Segurança dos Dados
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Adotamos medidas de segurança técnica e organizacional para proteger
                  seus dados contra acessos não autorizados, perdas ou destruição. No
                  entanto, nenhum sistema é 100% seguro, e não nos responsabilizamos por
                  ataques cibernéticos fora do nosso controle.
                </Typography>

                <Typography variant="h5" gutterBottom>
                  7. Alterações no Termo
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Este Termo de Uso e Política de Privacidade pode ser alterado a qualquer
                  momento. Recomendamos que você revise este documento periodicamente. As
                  alterações entram em vigor assim que publicadas na plataforma.
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Obrigado por utilizar nossos serviços!</strong>
                </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Fechar
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                disabled={!checked}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ...buttonStyles }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
          <Box sx={{ py: 2 }}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Login ou senha incorretos!
          </Alert>
        </Snackbar>
      </Stack>
    </ThemeProvider>
  );
}
