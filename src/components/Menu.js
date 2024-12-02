import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { backgroundNavBar } from '../utils';
import icon from '../images/Background.png'
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from './UserContext'

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { userRole } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedPage, setSelectedPage] = React.useState('');

    const doctorPages = ['Análise', 'Pacientes'];
    const patientPages = ['Tela Inicial', 'Documentos'];
    const atendentesPages = ['Usuários'];
    const settings = ['Logout'];

    const pages = userRole === 'Médico' ? doctorPages : userRole === 'Paciente' ? patientPages : atendentesPages;

  
    React.useEffect(() => {
      const path = location.pathname;

      if (path.includes('analise')) {
        setSelectedPage('Análise');
      } else if (path.includes('patients')) {
        setSelectedPage('Pacientes');
      } else if (path === '/') {
        setSelectedPage('Tela Inicial');
      } else if (path.includes('documents')) {
        setSelectedPage('Documentos');
      }
    }, [location]);

    const handleMenuItemClick = (page) => {
      setSelectedPage(page);
      if (page === "Tela Inicial"){
        navigate('/');
      } else if (page === "Documentos"){
        navigate('/documents')
      } else if (page === "Análise"){
        navigate('/analise')
      } else if (page === "Pacientes"){
        navigate('/patients')
      }
    };
  
    const handleMenuItemClickSettings = (setting) => {
      if (setting === "Logout"){
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        navigate('/login');
      }
    };
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  return (
    <AppBar position="static" sx={backgroundNavBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <img
                src={icon}
                alt="logo"
                style={{width: '95px', height: '88px'}}
            />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{ 
                  my: 2, 
                  color: 'black', 
                  display: 'block', 
                  marginLeft: "60px",
                  borderBottom: selectedPage === page ? '2px solid green' : 'none'  // Adicione essa linha
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{color: "black", fontSize: "40px"}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography 
                    textAlign="center"
                    onClick={() => handleMenuItemClickSettings(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
