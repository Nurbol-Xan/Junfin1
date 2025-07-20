import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../images/logo12.png';

const Footer = () => (
  <Box sx={{ py: 4, textAlign: 'center', color: 'grey.600', fontSize: 14, bgcolor: '#f7faff', mt: 6 }}>
    <img src={logo} alt="JUNFIN" style={{ height: 32, marginBottom: 8 }} />
    <Typography>
      © 2025 JUNFIN. Barcha huquqlar himoyalangan.
    </Typography>
  </Box>
);

export default Footer;
