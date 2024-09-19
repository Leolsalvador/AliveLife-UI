import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from '../images/Background.png'
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userLogin } from '../axios';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { buttonStyles, BACKGROUND_BUTTON, BACKGROUND_PAPER } from '../utils';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(username, password);
      localStorage.setItem('userToken', response.data.access);
      document.cookie = `sessionid=${response.data.sessionid}`;
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                sx={{ '& label': { color: '#ffffff' },
                      '& input': { color: '#ffffff' },
                      '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ffffff' } }
                 }}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
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
                label="Password"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ...buttonStyles }}
                onClick={handleSubmit}
              >
                Login
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
