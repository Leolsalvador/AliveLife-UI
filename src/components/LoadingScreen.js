import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingScreen() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f0f2f5', gap: 2 }}
    >
      <CircularProgress size={100} />
      <Typography variant="h5" component="h2" sx={{color: "#000"}}>
        Load data, please wait...
      </Typography>
    </Box>
  );
}

export default LoadingScreen;